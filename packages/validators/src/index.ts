import { z } from "zod";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** CUID-like non-empty string (accepts any non-empty string — validation is permissive by design) */
const idSchema = z.string().min(1, "ID must not be empty");

// ─── Auth / JWT ───────────────────────────────────────────────────────────────

export const jwtPayloadSchema = z.object({
  deviceId: idSchema,
  tenantId: idSchema,
  exp: z.number().optional(),
  iat: z.number().optional(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

// ─── Device ───────────────────────────────────────────────────────────────────

export const registerDeviceSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  location: z.string().max(255).optional(),
  tenantId: idSchema,
  pairingCode: z.string().length(6, "Pairing code must be 6 characters"),
});

export const createDeviceSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  location: z.string().max(255).optional(),
  tenantId: idSchema,
});

export const heartbeatBodySchema = z.object({
  batteryLevel: z.number().min(0).max(100).optional(),
  appVersion: z.string().max(50).optional(),
  ipAddress: z.string().optional(),
});

export type HeartbeatBody = z.infer<typeof heartbeatBodySchema>;

// ─── Tenant ───────────────────────────────────────────────────────────────────

export const createTenantSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z
    .string()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  settings: z.record(z.string(), z.unknown()).optional(),
});

// ─── Analytics ────────────────────────────────────────────────────────────────

export const analyticsEventSchema = z.object({
  type: z.enum([
    "screen_view",
    "ad_impression",
    "ad_click",
    "poi_view",
    "emergency_tap",
    "session_start",
  ]),
  payload: z.record(z.string(), z.unknown()).default({}),
  occurredAt: z.coerce.date().optional(),
});

export const analyticsEventBatchSchema = z.object({
  events: z.array(analyticsEventSchema).min(1).max(100),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
export type AnalyticsEventBatch = z.infer<typeof analyticsEventBatchSchema>;

// ─── POI Validation ───────────────────────────────────────────────────────────

export const poiMetadataSchema = z.object({
  waterCondition: z.enum(["propria", "impropria"]).optional(),
  activities: z.array(z.string()).optional(),
  difficulty: z.enum(["facil", "moderada", "dificil"]).optional(),
  durationMinutes: z.number().int().positive().optional(),
  distanceKm: z.number().positive().optional(),
  recommendations: z.array(z.string()).optional(),
  lunchHours: z.string().optional(),
  dinnerHours: z.string().optional(),
  conciergeTip: z.string().optional(),
  menuQrUrl: z.string().url().optional(),
  popularDishes: z
    .array(
      z.object({
        name: z.string().min(1),
        photoUrl: z.string().url(),
        category: z.string(),
      })
    )
    .optional(),
});

export const createPoiSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().optional(),
  category: z.enum(["beach", "nature", "historical", "gastronomy"]),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  googlePlaceId: z.string().max(255).optional(),
  address: z.string().optional(),
  bannerUrl: z.string().url().optional(),
  photos: z.array(z.string().url()).default([]),
  accessibility: z.array(z.string()).default([]),
  metadata: poiMetadataSchema.default({}),
  tenantId: idSchema,
});

export type CreatePoiInput = z.infer<typeof createPoiSchema>;

// ─── Hotel Validation ─────────────────────────────────────────────────────────

export const createHotelSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  rating: z.number().min(0).max(5).optional(),
  neighborhood: z.string().max(100).optional(),
  priceRange: z.string().max(50).optional(),
  amenities: z.array(z.string()).default([]),
  photoUrl: z.string().url().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  googlePlaceId: z.string().max(255).optional(),
  tenantId: idSchema,
});

export type CreateHotelInput = z.infer<typeof createHotelSchema>;

// ─── Event Validation ─────────────────────────────────────────────────────────

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  category: z.enum(["show", "festival", "theater", "gastronomy", "exhibition"]),
  location: z.string().min(1, "Location is required").max(255),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  googlePlaceId: z.string().max(255).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isFeatured: z.boolean().default(false),
  price: z.number().min(0).optional(),
  ticketUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
  tenantId: idSchema,
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

// ─── Cinema Validation ────────────────────────────────────────────────────────

export const createMovieSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  synopsis: z.string().optional(),
  genre: z.string().max(100).optional(),
  duration: z.number().int().positive().optional(),
  rating: z.string().max(20).optional(),
  posterUrl: z.string().url().optional(),
  isCurrent: z.boolean().default(true),
  tenantId: idSchema,
});

export const createMovieSessionSchema = z.object({
  movieId: idSchema,
  showTime: z.coerce.date(),
  room: z.string().min(1).max(50),
  audioType: z.string().min(1).max(50),
  price: z.number().min(0).optional(),
  ticketUrl: z.string().url().optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type CreateMovieSessionInput = z.infer<typeof createMovieSessionSchema>;

// ─── Utility Validation ───────────────────────────────────────────────────────

export const createUtilitySchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().optional(),
  category: z.enum(["safety", "health", "pet", "mobility"]),
  subCategory: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  address: z.string().optional(),
  status: z.string().max(50).optional(),
  distanceMeters: z.number().int().positive().optional(),
  operatingHours: z.string().max(100).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  googlePlaceId: z.string().max(255).optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
  tenantId: idSchema,
});

export type CreateUtilityInput = z.infer<typeof createUtilitySchema>;

// ─── Ads Validation ───────────────────────────────────────────────────────────

export const createAdCampaignSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isActive: z.boolean().default(true),
  tenantId: idSchema,
});

export const createAdCreativeSchema = z.object({
  campaignId: idSchema,
  title: z.string().min(1, "Title is required").max(255),
  mediaUrl: z.string().url("Invalid media URL"),
  mediaType: z.enum(["image", "video"]),
  ctaUrl: z.string().url().optional().nullable(),
  durationSeconds: z.number().int().positive().default(15),
});

export type CreateAdCampaignInput = z.infer<typeof createAdCampaignSchema>;
export type CreateAdCreativeInput = z.infer<typeof createAdCreativeSchema>;


