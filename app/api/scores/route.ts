import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createScore } from '@/db/mutations';

export async function POST(request: Request) {
  const authResult = await auth();
  const userId = authResult.userId;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { tripId, highScore, lowScore } = body;

  if (typeof tripId !== 'number' || typeof highScore !== 'number' || typeof lowScore !== 'number') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = await createScore({ tripId, userId, highScore, lowScore });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
