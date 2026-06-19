import { db } from '@/db';
import { users, trips, tripParticipants, scores, countries, clerkMapping } from '@/db/schema';
import { avg, sql, desc, eq, inArray } from 'drizzle-orm';

// Get Users
export async function getAllUsers() {
  try {
    return await db.select().from(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export async function getUserById(id: string) {
  return await db.select().from(users).where(eq(users.id, id));
}

// Get countries
export async function getAllCountries() {
  return await db.select().from(countries);
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
    .where(eq(tripParticipants.userId, userId));
}

// Get counts for homepage display

export async function getStatCounts() {
  const tripCount = await db.$count(trips);

  const [{ countriesCount }] = await db
    .select({
      countriesCount: sql<number>`count(distinct ${trips.countryId})`,
    })
    .from(trips);

  return {
    trips: tripCount,
    countries: countriesCount,
    users: 0,
    scores: 0,
  };
}

export async function getLeaderBoard(limit?: number) {
  try {
    const leaderboardQuery = db
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
      .orderBy(desc(sql`AVG(${scores.highScore}) - AVG(${scores.lowScore})`));

    const leaderboard = limit ? await leaderboardQuery.limit(limit) : await leaderboardQuery;

    const tripIds = leaderboard.map((trip) => trip.tripId);
    const participantRows = tripIds.length
      ? await db
          .select({
            tripId: tripParticipants.tripId,
            id: users.id,
            name: users.name,
            pictureUrl: users.pictureUrl,
          })
          .from(tripParticipants)
          .innerJoin(users, eq(tripParticipants.userId, users.id))
          .where(inArray(tripParticipants.tripId, tripIds))
      : [];

    const participantsByTrip = new Map<number, typeof participantRows>();

    for (const participant of participantRows) {
      const existingParticipants = participantsByTrip.get(participant.tripId) ?? [];
      existingParticipants.push(participant);
      participantsByTrip.set(participant.tripId, existingParticipants);
    }

    return leaderboard.map((trip) => {
      const participants = participantsByTrip.get(trip.tripId) ?? [];
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
      };
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export async function getAllTrips() {
  try {
    const tripRows = await db
      .select({
        id: trips.id,
        date: trips.date,
        description: trips.description,
        countryName: countries.name,
        countryCode: countries.code,
        countryTwoLetterCode: countries.twoLetterCode,
      })
      .from(trips)
      .innerJoin(countries, eq(trips.countryId, countries.id))
      .orderBy(desc(trips.date));

    return await Promise.all(
      tripRows.map(async (trip) => {
        const participants = await db
          .select({
            id: users.id,
            name: users.name,
            pictureUrl: users.pictureUrl,
          })
          .from(tripParticipants)
          .innerJoin(users, eq(tripParticipants.userId, users.id))
          .where(eq(tripParticipants.tripId, trip.id));

        return {
          id: trip.id,
          date: trip.date,
          description: trip.description,
          country: {
            name: trip.countryName,
            code: trip.countryCode,
            twoLetterCode: trip.countryTwoLetterCode,
          },
          participants,
        };
      })
    );
  } catch (error) {
    console.error('Failed to fetch trips:', error);
    return [];
  }
}

// Get a specified trip info
export async function getTripById(id: string) {
  try {
    const tripId = parseInt(id);

    // Get trip and country info
    const tripData = await db
      .select({
        id: trips.id,
        date: trips.date,
        description: trips.description,
        countryName: countries.name,
        countryCode: countries.code,
        countryTwoLetterCode: countries.twoLetterCode,
      })
      .from(trips)
      .innerJoin(countries, eq(trips.countryId, countries.id))
      .where(eq(trips.id, tripId));

    if (!tripData.length) {
      return null;
    }

    // Get all participants of the trip
    const participants = await db
      .select({
        id: users.id,
        name: users.name,
        pictureUrl: users.pictureUrl,
      })
      .from(tripParticipants)
      .innerJoin(users, eq(tripParticipants.userId, users.id))
      .where(eq(tripParticipants.tripId, tripId));

    // Get all scores for this trip with user info
    const tripScores = await db
      .select({
        id: scores.id,
        userId: scores.userId,
        highScore: scores.highScore,
        lowScore: scores.lowScore,
        userName: users.name,
        userPic: users.pictureUrl,
      })
      .from(scores)
      .innerJoin(users, eq(scores.userId, users.id))
      .where(eq(scores.tripId, tripId));

    const trip = tripData[0];
    const avgHigh =
      tripScores.length > 0
        ? tripScores.reduce((sum, s) => sum + s.highScore, 0) / tripScores.length
        : 0;
    const avgLow =
      tripScores.length > 0
        ? tripScores.reduce((sum, s) => sum + s.lowScore, 0) / tripScores.length
        : 0;

    return {
      tripId: trip.id,
      date: trip.date,
      description: trip.description,
      country: {
        name: trip.countryName,
        code: trip.countryCode,
        twoLetterCode: trip.countryTwoLetterCode,
      },
      avgHigh,
      avgLow,
      avgDiff: avgHigh - avgLow,
      participantCount: participants.length,
      participants,
      scoreCount: tripScores.length,
      scores: tripScores.map((score) => ({
        id: score.id,
        userId: score.userId,
        userName: score.userName,
        userPic: score.userPic,
        highScore: score.highScore,
        lowScore: score.lowScore,
      })),
    };
  } catch (error) {
    console.error('Failed to fetch trip:', error);
    return null;
  }
}

export async function getUserIdByClerkId(clerkId: string) {
  const [mapping] = await db
    .select({ userId: clerkMapping.userId })
    .from(clerkMapping)
    .where(eq(clerkMapping.clerkId, clerkId))
    .limit(1);

  return mapping ?? null;
}
