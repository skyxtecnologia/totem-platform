import { and, db, eq, hotels } from "@totem/db";
import { createHotelSchema } from "@totem/validators";
import { Hono } from "hono";

const router = new Hono();

// GET /api/v1/hotels?tenantId=...&neighborhood=...
router.get("/", async (c) => {
  const tenantId = c.req.query("tenantId");
  const neighborhood = c.req.query("neighborhood");

  if (!tenantId) {
    return c.json({ error: "Missing tenantId" }, 400);
  }

  try {
    const conditions = [eq(hotels.tenantId, tenantId)];
    if (neighborhood) {
      conditions.push(eq(hotels.neighborhood, neighborhood));
    }

    const result = await db
      .select()
      .from(hotels)
      .where(and(...conditions));

    return c.json({ data: result });
  } catch (error) {
    console.error("Failed to fetch hotels:", error);
    return c.json({ error: "Failed to fetch hotels" }, 500);
  }
});

// POST /api/v1/hotels
router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = createHotelSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        { error: "Validation failed", issues: result.error.issues },
        400,
      );
    }

    const { tenantId, ...hotelData } = result.data;
    const newHotelId = `hotel_${crypto.randomUUID().replace(/-/g, "")}`;

    const inserted = await db
      .insert(hotels)
      .values({
        id: newHotelId,
        tenantId,
        ...hotelData,
      })
      .returning();

    return c.json({ status: "Hotel created", data: inserted[0] }, 201);
  } catch (error) {
    console.error("Failed to create hotel:", error);
    return c.json({ error: "Failed to create hotel" }, 500);
  }
});

export default router;
