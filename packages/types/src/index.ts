// ─── Auth / JWT ───────────────────────────────────────────────────────────────

export interface DeviceJWTPayload {
  deviceId: string;
  tenantId: string;
  /** JWT standard expiry (unix timestamp) */
  exp?: number;
  /** JWT standard issued-at (unix timestamp) */
  iat?: number;
}

// ─── Enums ────────────────────────────────────────────────────────────────────

export type DeviceStatus = "online" | "offline" | "pairing" | "error";

export type UserRole = "super_admin" | "tenant_admin" | "editor" | "viewer";

export type AnalyticsEventType =
  | "screen_view"
  | "ad_impression"
  | "ad_click"
  | "poi_view"
  | "emergency_tap"
  | "session_start";

// ─── Core entities ────────────────────────────────────────────────────────────

export interface TenantSettings {
  [key: string]: unknown;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  settings: TenantSettings | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
}

export interface Membership {
  id: string;
  userId: string;
  tenantId: string;
  role: UserRole;
  createdAt: Date;
}

// ─── Devices ──────────────────────────────────────────────────────────────────

export interface Device {
  id: string;
  name: string;
  location: string | null;
  status: DeviceStatus;
  appVersion: string | null;
  lastHeartbeatAt: Date | null;
  tenantId: string;
}

export interface Heartbeat {
  id: string;
  deviceId: string;
  status: DeviceStatus;
  batteryLevel: number | null;
  ipAddress: string | null;
  createdAt: Date;
}

// ─── Content / POIs ───────────────────────────────────────────────────────────

export type ContentModuleType =
  | "tourism"
  | "gastronomy"
  | "cinema"
  | "events"
  | "emergency";

export interface ContentModule {
  id: string;
  tenantId: string;
  type: ContentModuleType;
  title: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type POICategory = "beach" | "nature" | "historical" | "gastronomy";

export interface POIMetadata {
  waterCondition?: "propria" | "impropria";
  activities?: string[];
  difficulty?: "facil" | "moderada" | "dificil";
  durationMinutes?: number;
  distanceKm?: number;
  recommendations?: string[];
  lunchHours?: string;
  dinnerHours?: string;
  conciergeTip?: string;
  menuQrUrl?: string;
  popularDishes?: Array<{
    name: string;
    photoUrl: string;
    category: string;
  }>;
}

export interface POI {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  category: POICategory;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  address: string | null;
  bannerUrl: string | null;
  photos: string[];
  accessibility: string[];
  metadata: POIMetadata;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Hotels ───────────────────────────────────────────────────────────────────

export interface Hotel {
  id: string;
  tenantId: string;
  name: string;
  rating: number | null;
  neighborhood: string | null;
  priceRange: string | null;
  amenities: string[];
  photoUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Events ───────────────────────────────────────────────────────────────────

export type EventCategory =
  | "show"
  | "festival"
  | "theater"
  | "gastronomy"
  | "exhibition";

export interface Event {
  id: string;
  tenantId: string;
  title: string;
  description: string | null;
  category: EventCategory;
  location: string;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  startDate: Date;
  endDate: Date;
  isFeatured: boolean;
  price: number | null;
  ticketUrl: string | null;
  bannerUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Cinema ───────────────────────────────────────────────────────────────────

export interface Movie {
  id: string;
  tenantId: string;
  title: string;
  synopsis: string | null;
  genre: string | null;
  duration: number | null;
  rating: string | null;
  posterUrl: string | null;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieSession {
  id: string;
  movieId: string;
  showTime: Date;
  room: string;
  audioType: string;
  price: number | null;
  ticketUrl: string | null;
  createdAt: Date;
}

// ─── Utilities / Services ─────────────────────────────────────────────────────

export type UtilityCategory = "safety" | "health" | "pet" | "mobility";

export interface Utility {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  category: UtilityCategory;
  subCategory: string | null;
  phone: string | null;
  address: string | null;
  status: string | null;
  distanceMeters: number | null;
  operatingHours: string | null;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Mobility / Alerts ────────────────────────────────────────────────────────

export interface BusLine {
  id: string;
  code: string;
  name: string;
  status: "operando" | "desvio" | "atrasada";
  nextDeparture: string;
  routePoints: string[];
}

export interface SystemAlert {
  id: string;
  tenantId: string;
  type: "transit_alert" | "weather_alert" | "emergency";
  title: string;
  description: string;
  isActive: boolean;
  expiresAt: Date | null;
}

// ─── Ads ───────────────────────────────────────────────────────────────────────

export interface AdCampaign {
  id: string;
  tenantId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdCreative {
  id: string;
  campaignId: string;
  title: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  ctaUrl: string | null;
  durationSeconds: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Emergency ────────────────────────────────────────────────────────────────

export interface EmergencyContact {
  id: string;
  tenantId: string;
  label: string;
  phone: string;
  order: number;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface AnalyticsEvent {
  id: string;
  deviceId: string;
  tenantId: string;
  type: AnalyticsEventType;
  payload: Record<string, unknown>;
  occurredAt: Date;
}

// ─── API responses ────────────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: string;
  message: string;
  issues?: unknown[];
}
