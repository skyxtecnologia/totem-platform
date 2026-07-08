import { relations } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { tenants } from "./core";

export const events = pgTable("events", {
  id: text("id").primaryKey(), // CUID
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // 'show', 'festival', 'theater', 'gastronomy', 'exhibition'
  location: varchar("location", { length: 255 }).notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  googlePlaceId: varchar("google_place_id", { length: 255 }),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  price: real("price"), // null ou 0 significa gratuito
  ticketUrl: text("ticket_url"),
  bannerUrl: text("banner_url"),
  metadata: jsonb("metadata").$defaultFn(() => ({})), // lineup, programacao detalhada, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const eventsRelations = relations(events, ({ one }) => ({
  tenant: one(tenants, {
    fields: [events.tenantId],
    references: [tenants.id],
  }),
}));
