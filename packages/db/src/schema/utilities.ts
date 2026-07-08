import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { tenants } from "./core";

export const utilities = pgTable("utilities", {
  id: text("id").primaryKey(), // CUID
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // 'safety', 'health', 'pet', 'mobility'
  subCategory: varchar("sub_category", { length: 100 }), // 'police', 'hospital', 'veterinary', 'bus_stop'
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  status: varchar("status", { length: 50 }), // 'aberto_24h', 'aberto', 'fechado'
  distanceMeters: integer("distance_meters"), // distância aproximada calculada do totem
  operatingHours: varchar("operating_hours", { length: 100 }), // ex: "24h", "08:00 - 17:00"
  latitude: real("latitude"),
  longitude: real("longitude"),
  googlePlaceId: varchar("google_place_id", { length: 255 }),
  metadata: jsonb("metadata").$defaultFn(() => ({})), // ex: linhas atendidas se for parada de ônibus
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const utilitiesRelations = relations(utilities, ({ one }) => ({
  tenant: one(tenants, {
    fields: [utilities.tenantId],
    references: [tenants.id],
  }),
}));
