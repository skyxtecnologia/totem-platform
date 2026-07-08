import { and, db, deviceStatusEnum, devices, eq } from "@totem/db";
import type { DeviceJWTPayload } from "@totem/types";
import { Hono } from "hono";
import { deviceAuthMiddleware } from "./middlewares/auth";
import adsRouter from "./routes/ads";
import eventsRouter from "./routes/events";
import hotelsRouter from "./routes/hotels";
import moviesRouter from "./routes/movies";
// Import sub-routers
import poisRouter from "./routes/pois";
import utilitiesRouter from "./routes/utilities";
import type { Env } from "./types";

const app = new Hono<{
  Bindings: Env;
  Variables: { jwtPayload: DeviceJWTPayload };
}>();

// Bridge Cloudflare Workers bindings → process.env so the pg Pool (lazy singleton) can read them
app.use("*", async (c, next) => {
  if (c.env?.DATABASE_URL && !process.env.DATABASE_URL) {
    process.env.DATABASE_URL = c.env.DATABASE_URL;
  }
  if (c.env?.JWT_DEVICE_SECRET && !process.env.JWT_DEVICE_SECRET) {
    process.env.JWT_DEVICE_SECRET = c.env.JWT_DEVICE_SECRET;
  }
  if (c.env?.REDIS_URL && !process.env.REDIS_URL) {
    process.env.REDIS_URL = c.env.REDIS_URL;
  }
  await next();
});

app.get("/", (c) => {
  return c.json({ message: "Totem Platform API v1" });
});

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ─── Register Routes ──────────────────────────────────────────────────────────
app.route("/api/v1/pois", poisRouter);
app.route("/api/v1/hotels", hotelsRouter);
app.route("/api/v1/events", eventsRouter);
app.route("/api/v1/movies", moviesRouter);
app.route("/api/v1/utilities", utilitiesRouter);
app.route("/api/v1/ads", adsRouter);

// ─── Device routes (authenticated) ───────────────────────────────────────────
const deviceApi = app.basePath("/api/v1/device");
deviceApi.use("/*", deviceAuthMiddleware());

deviceApi.post("/heartbeat", async (c) => {
  const { deviceId, tenantId } = c.get("jwtPayload");

  try {
    await db
      .update(devices)
      .set({
        lastHeartbeatAt: new Date(),
        status: deviceStatusEnum.enumValues[0], // 'online'
      })
      .where(and(eq(devices.id, deviceId), eq(devices.tenantId, tenantId)));

    return c.json({ status: "heartbeat received", deviceId, tenantId });
  } catch (error) {
    console.error("Failed to update heartbeat:", error);
    return c.json({ error: "Failed to update heartbeat" }, 500);
  }
});

export default app;
