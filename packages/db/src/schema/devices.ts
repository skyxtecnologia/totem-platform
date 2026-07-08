import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  pgEnum,
  jsonb,
  inet,
  real,
} from "drizzle-orm/pg-core";
import { tenants } from "./core";

export const deviceStatusEnum = pgEnum("device_status", [
  "online",
  "offline",
  "pairing",
  "error",
]);

export const devices = pgTable("devices", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  status: deviceStatusEnum("status").default("pairing").notNull(),
  appVersion: varchar("app_version", { length: 50 }),
  lastHeartbeatAt: timestamp("last_heartbeat_at"),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
});

export const devicesRelations = relations(devices, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [devices.tenantId],
    references: [tenants.id],
  }),
  heartbeats: many(heartbeats),
}));

export const heartbeats = pgTable("heartbeats", {
  id: text("id").primaryKey(),
  deviceId: text("device_id")
    .notNull()
    .references(() => devices.id, { onDelete: "cascade" }),
  status: deviceStatusEnum("status").notNull(),
  batteryLevel: real("battery_level"),
  ipAddress: inet("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const heartbeatsRelations = relations(heartbeats, ({ one }) => ({
  device: one(devices, {
    fields: [heartbeats.deviceId],
    references: [devices.id],
  }),
}));
