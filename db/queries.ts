import { db } from '@/db'
import { users, trips, tripParticipants, scores, countries } from '@/db/schema'
import { avg, sql, desc, eq } from 'drizzle-orm'


// Get Users
export async function getAllUsers() {
  return await db.select().from(users)
}

export async function getUserById(id: string) {
  return await db.select().from(users).where(eq(users.id, id))
}

// Get countries
export async function getAllCountries() {
  return await db.select().from(countries)
}

// Get a users trip details
export async function getUserTrips(userId: string) {
  return await db
    .select({
      id: trips.id,
      countryId: trips.countryId,
    })
    .from(tripParticipants)
    .innerJoin(trips, eq(tripParticipants.tripId, trips.id))
    .where(eq(tripParticipants.userId, userId))
}

/**
 * Returns leaderboard data for trips:
 * - tripId: string;
 * - date: Date;
 * - description?: string;
 * - country: { name: string; code: string };
 * - avgHigh: number;
 * - avgLow: number;
 * - avgDiff: number;
 * - scoreCount: number;
 * - participants: { id: string; name: string; picUrl?: string }[];
 */
export async function getLeaderBoard() {
  try{

    const leaderboard = await db
      .select({
        tripId: trips.id,
        date: trips.date,
        description: trips.description,
  
        countryName: countries.name,
        countryCode: countries.code,
        countryTwoLetterCode: countries.twoLetterCode,
  
        avgHigh: avg(scores.highScore),
        avgLow: avg(scores.lowScore),
  
        scoreDiff: sql<number>`
          AVG(${scores.highScore}) - AVG(${scores.lowScore})
        `,
      })
      .from(trips)
      .innerJoin(countries, eq(trips.countryId, countries.id))
      .innerJoin(scores, eq(scores.tripId, trips.id))
      .groupBy(
        trips.id,
        trips.date,
        trips.description,
        countries.name,
        countries.code,
        countries.twoLetterCode
      )
      .orderBy(
        desc(sql`AVG(${scores.highScore}) - AVG(${scores.lowScore})`)
      )
  
    return await Promise.all(
      leaderboard.map(async (trip) => {
        const participants = await db
          .select({
            id: users.id,
            name: users.name,
            picUrl: users.pictureUrl,
          })
          .from(tripParticipants)
          .innerJoin(users, eq(tripParticipants.userId, users.id))
          .where(eq(tripParticipants.tripId, trip.tripId))
  
        const avgHigh = Number(trip.avgHigh);
        const avgLow = Number(trip.avgLow);
        const avgDiff = avgHigh - avgLow;
  
        return {
          tripId: trip.tripId,
          date: trip.date,
          description: trip.description,
          country: {
            name: trip.countryName,
            code: trip.countryCode,
            twoLetterCode: trip.countryTwoLetterCode,
          },
          avgHigh,
          avgLow,
          avgDiff,
          scoreCount: participants.length,
          participants,
        }
      })
    )
  }
  catch (error) {
    console.error('Failed to fetch users:', error)
    return []
  }


}