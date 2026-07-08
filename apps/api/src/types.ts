/**
 * Cloudflare Workers environment bindings.
 * All values are injected by Cloudflare at runtime via .dev.vars (local)
 * or dashboard secrets (production).
 */
export type Env = {
  // Database
  DATABASE_URL: string;

  // Authentication
  JWT_DEVICE_SECRET: string;
  BETTER_AUTH_SECRET?: string;
  BETTER_AUTH_URL?: string;

  // Redis / BullMQ
  REDIS_URL?: string;

  // Storage (S3 / MinIO)
  S3_ENDPOINT?: string;
  S3_ACCESS_KEY?: string;
  S3_SECRET_KEY?: string;
  S3_BUCKET?: string;

  // Runtime config
  API_URL?: string;
};
