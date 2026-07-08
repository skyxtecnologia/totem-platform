import { and, db, eq, pois } from "@totem/db";
import { createPoiSchema } from "@totem/validators";
import { Hono } from "hono";

const router = new Hono();

// GET /api/v1/pois?tenantId=...&category=...
router.get("/", async (c) => {
  const tenantId = c.req.query("tenantId");
  const category = c.req.query("category");

  if (!tenantId) {
    return c.json({ error: "Missing tenantId" }, 400);
  }

  try {
    const conditions = [eq(pois.tenantId, tenantId)];
    if (category) {
      conditions.push(eq(pois.category, category));
    }

    const result = await db
      .select()
      .from(pois)
      .where(and(...conditions));

    return c.json({ data: result });
  } catch (error) {
    console.error("Failed to fetch POIs:", error);
    return c.json({ error: "Failed to fetch POIs" }, 500);
  }
});

// GET /api/v1/pois/:id?tenantId=...
router.get("/:id", async (c) => {
  const id = c.req.param("id");
  const tenantId = c.req.query("tenantId");

  if (!tenantId) {
    return c.json({ error: "Missing tenantId" }, 400);
  }

  try {
    const result = await db
      .select()
      .from(pois)
      .where(and(eq(pois.id, id), eq(pois.tenantId, tenantId)))
      .limit(1);

    if (result.length === 0) {
      return c.json({ error: "POI not found" }, 404);
    }

    return c.json({ data: result[0] });
  } catch (error) {
    console.error("Failed to fetch POI:", error);
    return c.json({ error: "Failed to fetch POI" }, 500);
  }
});

// POST /api/v1/pois
router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = createPoiSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { error: "Validation failed", issues: result.error.issues },
        400,
      );
    }

    const { tenantId, ...poiData } = result.data;
    const newPoiId = `poi_${crypto.randomUUID().replace(/-/g, "")}`;

    const inserted = await db
      .insert(pois)
      .values({
        id: newPoiId,
        tenantId,
        ...poiData,
      })
      .returning();

    return c.json({ status: "POI created", data: inserted[0] }, 201);
  } catch (error) {
    console.error("Failed to create POI:", error);
    return c.json({ error: "Failed to create POI" }, 500);
  }
});

export default router;
