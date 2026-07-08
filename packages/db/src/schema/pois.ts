import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  jsonb,
  real,
} from "drizzle-orm/pg-core";
import { tenants } from "./core";

export const pois = pgTable("points_of_interest", {
  id: text("id").primaryKey(), // CUID
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // 'beach', 'nature', 'historical', 'gastronomy'
  latitude: real("latitude"),
  longitude: real("longitude"),
  googlePlaceId: varchar("google_place_id", { length: 255 }),
  address: text("address"),
  bannerUrl: text("banner_url"),
  photos: jsonb("photos").$defaultFn(() => []), // Array de strings (URLs)
  accessibility: jsonb("accessibility").$defaultFn(() => []), // Array de strings (ex: 'rampa', 'pcd')
  metadata: jsonb("metadata").$defaultFn(() => ({})), // Dados específicos de categoria
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const poisRelations = relations(pois, ({ one }) => ({
  tenant: one(tenants, {
    fields: [pois.tenantId],
    references: [tenants.id],
  }),
}));
