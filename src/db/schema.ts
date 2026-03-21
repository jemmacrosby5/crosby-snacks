import { uuid, text, integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey(),
  name: text().notNull().unique(),
  pictureUrl: text('picture_url')
});

export const countries = pgTable("countries", {
  id: integer().primaryKey(),
  name: text().notNull().unique(),
  code: text().notNull().unique()
});

export const trips = pgTable("trips", {
  id: integer().primaryKey(),
  createdAt: timestamp('created_at').notNull(),
  countryId: integer('country_id').notNull().references(() => countries.id),
  date: timestamp().notNull(),
  description: text()
});

export const tripParticipants = pgTable("trip_participants", {
  id: integer().primaryKey(),
  tripId: integer('trip_id').notNull().references(() => trips.id),
  userId: uuid('user_id').notNull().references(() => users.id)
});

export const scores = pgTable("scores", {
  id: integer().primaryKey(),
  tripId: integer('trip_id').notNull().references(() => trips.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  highScore: integer('high_score').notNull(),
  lowScore: integer('low_score').notNull()
});