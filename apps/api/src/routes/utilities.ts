import { and, db, eq, utilities } from "@totem/db";
import { createUtilitySchema } from "@totem/validators";
import { Hono } from "hono";

const router = new Hono();

// GET /api/v1/utilities?tenantId=...&category=...
router.get("/", async (c) => {
  const tenantId = c.req.query("tenantId");
  const category = c.req.query("category");

  if (!tenantId) {
    return c.json({ error: "Missing tenantId" }, 400);
  }

  try {
    const conditions = [eq(utilities.tenantId, tenantId)];
    if (category) {
      conditions.push(eq(utilities.category, category));
    }

    const result = await db
      .select()
      .from(utilities)
      .where(and(...conditions));

    return c.json({ data: result });
  } catch (error) {
    console.error("Failed to fetch utilities:", error);
    return c.json({ error: "Failed to fetch utilities" }, 500);
  }
});

// POST /api/v1/utilities
router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = createUtilitySchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { error: "Validation failed", issues: result.error.issues },
        400,
      );
    }

    const { tenantId, ...utilityData } = result.data;
    const newUtilityId = `utility_${crypto.randomUUID().replace(/-/g, "")}`;

    const inserted = await db
      .insert(utilities)
      .values({
        id: newUtilityId,
        tenantId,
        ...utilityData,
      })
      .returning();

    return c.json(
      { status: "Utility service created", data: inserted[0] },
      201,
    );
  } catch (error) {
    console.error("Failed to create utility:", error);
    return c.json({ error: "Failed to create utility" }, 500);
  }
});

export default router;
