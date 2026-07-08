import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { tenants } from "./core";

export const adCampaigns = pgTable("ad_campaigns", {
  id: text("id").primaryKey(), // CUID
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adCreatives = pgTable("ad_creatives", {
  id: text("id").primaryKey(), // CUID
  campaignId: text("campaign_id")
    .notNull()
    .references(() => adCampaigns.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  mediaUrl: text("media_url").notNull(),
  mediaType: varchar("media_type", { length: 50 }).notNull(), // 'image', 'video'
  ctaUrl: text("cta_url"), // Link para QR Code de destino
  durationSeconds: integer("duration_seconds").default(15).notNull(), // rotação tempo
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adCampaignsRelations = relations(adCampaigns, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [adCampaigns.tenantId],
    references: [tenants.id],
  }),
  creatives: many(adCreatives),
}));

export const adCreativesRelations = relations(adCreatives, ({ one }) => ({
  campaign: one(adCampaigns, {
    fields: [adCreatives.campaignId],
    references: [adCampaigns.id],
  }),
}));
