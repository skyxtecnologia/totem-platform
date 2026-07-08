import { relations } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { tenants } from "./core";

export const hotels = pgTable("hotels", {
  id: text("id").primaryKey(), // CUID
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  rating: real("rating"),
  neighborhood: varchar("neighborhood", { length: 100 }),
  priceRange: varchar("price_range", { length: 50 }), // Ex: "R$ 300 - R$ 500"
  amenities: jsonb("amenities").$defaultFn(() => []), // Array de strings (ex: ['wifi', 'pool'])
  photoUrl: text("photo_url"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  googlePlaceId: varchar("google_place_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const hotelsRelations = relations(hotels, ({ one }) => ({
  tenant: one(tenants, {
    fields: [hotels.tenantId],
    references: [tenants.id],
  }),
}));
