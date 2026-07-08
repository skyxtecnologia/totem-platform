import { Hono } from "hono";
import { db, adCampaigns, adCreatives, and, eq, gte, lte } from "@totem/db";
import { createAdCampaignSchema, createAdCreativeSchema } from "@totem/validators";

const router = new Hono();

// GET /api/v1/ads?tenantId=...
// Retorna os criativos ativos cuja campanha está na vigência
router.get("/", async (c) => {
  const tenantId = c.req.query("tenantId");

  if (!tenantId) {
    return c.json({ error: "Missing tenantId" }, 400);
  }

  try {
    const today = new Date();

    const result = await db
      .select({
        id: adCreatives.id,
        campaignId: adCreatives.campaignId,
        title: adCreatives.title,
        mediaUrl: adCreatives.mediaUrl,
        mediaType: adCreatives.mediaType,
        ctaUrl: adCreatives.ctaUrl,
        durationSeconds: adCreatives.durationSeconds,
      })
      .from(adCreatives)
      .innerJoin(adCampaigns, eq(adCreatives.campaignId, adCampaigns.id))
      .where(
        and(
          eq(adCampaigns.tenantId, tenantId),
          eq(adCampaigns.isActive, true),
          lte(adCampaigns.startDate, today),
          gte(adCampaigns.endDate, today)
        )
      );

    return c.json({ data: result });
  } catch (error) {
    console.error("Failed to fetch active ads:", error);
    return c.json({ error: "Failed to fetch active ads" }, 500);
  }
});

// POST /api/v1/ads/campaigns
router.post("/campaigns", async (c) => {
  try {
    const body = await c.req.json();
    const result = createAdCampaignSchema.safeParse(body);

    if (!result.success) {
      return c.json({ error: "Validation failed", issues: result.error.issues }, 400);
    }

    const { tenantId, ...campaignData } = result.data;
    const newCampaignId = `campaign_${crypto.randomUUID().replace(/-/g, "")}`;

    await db.insert(adCampaigns).values({
      id: newCampaignId,
      tenantId,
      ...campaignData,
    });

    return c.json({ status: "Ad campaign created", id: newCampaignId }, 201);
  } catch (error) {
    console.error("Failed to create ad campaign:", error);
    return c.json({ error: "Failed to create ad campaign" }, 500);
  }
});

// POST /api/v1/ads/creatives
router.post("/creatives", async (c) => {
  try {
    const body = await c.req.json();
    const result = createAdCreativeSchema.safeParse(body);

    if (!result.success) {
      return c.json({ error: "Validation failed", issues: result.error.issues }, 400);
    }

    const creativeData = result.data;
    const newCreativeId = `creative_${crypto.randomUUID().replace(/-/g, "")}`;

    await db.insert(adCreatives).values({
      id: newCreativeId,
      ...creativeData,
    });

    return c.json({ status: "Ad creative created", id: newCreativeId }, 201);
  } catch (error) {
    console.error("Failed to create ad creative:", error);
    return c.json({ error: "Failed to create ad creative" }, 500);
  }
});

export default router;
