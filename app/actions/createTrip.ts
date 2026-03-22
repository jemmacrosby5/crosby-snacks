'use server'

import { redirect } from 'next/navigation'
import { createTrip } from '@/db/mutations'

export async function createTripAction(formData: FormData) {
    console.log(Object.fromEntries(formData))
    const countryId = Number(formData.get('countryId'))
    const date = formData.get('date') as string

    if (!countryId) {
    throw new Error('Country required')
    }

    if (!date) {
    throw new Error('Date required')
    }

    const result = await createTrip({
        countryId,
        description: formData.get('description') as string,
        date,
        selectedParticipants: formData.getAll('participants') as string[],
    })

    if (!result.success) {
        throw new Error(result.error)
    }

    redirect(`/trip/${result.tripId}`)
}