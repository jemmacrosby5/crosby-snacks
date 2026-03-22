import { db } from '@/db'
import { avg, sql, desc, eq, count } from 'drizzle-orm'
import { users, trips, tripParticipants, scores, countries } from '@/db/schema'

// Create new trip
export async function createTrip(data: {
  countryId: number
  description?: string
  date: string
  selectedParticipants: string[] | string
}) {
  try {
    // Insert trip
    const [newTrip] = await db
      .insert(trips)
      .values({
        countryId: data.countryId,
        description: data.description || null,
        date: new Date(data.date),
        createdAt: new Date(),
      })
      .returning({ id: trips.id })

    // Handle participants - ensure it's an array
    const participants = Array.isArray(data.selectedParticipants) 
      ? data.selectedParticipants 
      : [data.selectedParticipants];

    // Insert trip participants
    if (participants.length > 0) {
      for (const userId of participants) {
        await db.insert(tripParticipants).values({
          tripId: newTrip.id,
          userId,
        })
      }
    }

    return { success: true, tripId: newTrip.id }
  } catch (error) {
    console.error('Error creating trip:', error)
    return { success: false, error: 'Failed to create trip' }
  }
}