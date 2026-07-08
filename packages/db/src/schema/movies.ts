import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  real,
  boolean,
} from "drizzle-orm/pg-core";
import { tenants } from "./core";

export const movies = pgTable("movies", {
  id: text("id").primaryKey(), // CUID
  tenantId: text("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  synopsis: text("synopsis"),
  genre: varchar("genre", { length: 100 }),
  duration: integer("duration"), // em minutos
  rating: varchar("rating", { length: 20 }), // Livre, 10, 12, 14, 16, 18
  posterUrl: text("poster_url"),
  isCurrent: boolean("is_current").default(true).notNull(), // se está em cartaz
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const movieSessions = pgTable("movie_sessions", {
  id: text("id").primaryKey(), // CUID
  movieId: text("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "cascade" }),
  showTime: timestamp("show_time").notNull(),
  room: varchar("room", { length: 50 }).notNull(), // ex: "Sala 3"
  audioType: varchar("audio_type", { length: 50 }).notNull(), // "Dublado", "Legendado"
  price: real("price"),
  ticketUrl: text("ticket_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const moviesRelations = relations(movies, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [movies.tenantId],
    references: [tenants.id],
  }),
  sessions: many(movieSessions),
}));

export const movieSessionsRelations = relations(movieSessions, ({ one }) => ({
  movie: one(movies, {
    fields: [movieSessions.movieId],
    references: [movies.id],
  }),
}));
