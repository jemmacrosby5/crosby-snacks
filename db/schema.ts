import { text, integer, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text().primaryKey(),
  name: text().notNull().unique(),
  pictureUrl: text('picture_url'),
});

export const countries = pgTable('countries', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  code: text().notNull().unique(),
  twoLetterCode: text('code_two_letter').notNull().unique(),
});

export const trips = pgTable('trips', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at').notNull(),
  countryId: integer('country_id')
    .notNull()
    .references(() => countries.id),
  date: timestamp().notNull(),
  description: text(),
});

export const tripParticipants = pgTable('trip_participants', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tripId: integer('trip_id')
    .notNull()
    .references(() => trips.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
});

export const scores = pgTable('scores', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tripId: integer('trip_id')
    .notNull()
    .references(() => trips.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  highScore: integer('high_score').notNull(),
  lowScore: integer('low_score').notNull(),
});
