import { and, asc, db, eq, events, gte } from "@totem/db";
import { createEventSchema } from "@totem/validators";
import { Hono } from "hono";

const router = new Hono();

// GET /api/v1/events?tenantId=...&category=...
router.get("/", async (c) => {
  const tenantId = c.req.query("tenantId");
  const category = c.req.query("category");

  if (!tenantId) {
    return c.json({ error: "Missing tenantId" }, 400);
  }

  try {
    const conditions = [eq(events.tenantId, tenantId)];
    if (category) {
      conditions.push(eq(events.category, category));
    }

    // Apenas eventos futuros ou em andamento a partir de hoje
    const today = new Date();
    conditions.push(gte(events.endDate, today));

    const result = await db
      .select()
      .from(events)
      .where(and(...conditions))
      .orderBy(asc(events.startDate));

    return c.json({ data: result });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return c.json({ error: "Failed to fetch events" }, 500);
  }
});

// POST /api/v1/events
router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = createEventSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { error: "Validation failed", issues: result.error.issues },
        400,
      );
    }

    const { tenantId, ...eventData } = result.data;
    const newEventId = `event_${crypto.randomUUID().replace(/-/g, "")}`;

    const inserted = await db
      .insert(events)
      .values({
        id: newEventId,
        tenantId,
        ...eventData,
      })
      .returning();

    return c.json({ status: "Event created", data: inserted[0] }, 201);
  } catch (error) {
    console.error("Failed to create event:", error);
    return c.json({ error: "Failed to create event" }, 500);
  }
});

export default router;
