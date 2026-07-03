import { supabaseAdmin } from '@/db/supabaseAdmin';
import { db } from '@/db/index';
import { auth } from '@clerk/nextjs/server';
import { getUserIdByClerkId } from '@db/queries';
import { photos } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ tripId: string }> }) {
  const { tripId: tripIdParam } = await params;
  const tripId = parseInt(tripIdParam);

  const formData = await req.formData();
  const file = formData.get('file') as File;

  const filePath = `${tripId}/${crypto.randomUUID()}.webp`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const authResult = await auth();
  const userId = authResult.userId;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dbUser = await getUserIdByClerkId(userId);

  if (!dbUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error: uploadError } = await supabaseAdmin.storage
    .from('trip_photos')
    .upload(filePath, buffer, { contentType: 'image/webp' });

  if (uploadError) {
    return Response.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage.from('trip_photos').getPublicUrl(filePath);

  try {
    const [photo] = await db
      .insert(photos)
      .values({ tripId, userId: dbUser.userId, photoUrl: urlData.publicUrl })
      .returning();

    return Response.json(photo);
  } catch (dbError) {
    // roll back the orphaned file
    await supabaseAdmin.storage.from('trip-photos').remove([filePath]);
    return Response.json({ error: 'Failed to save photo record' }, { status: 500 });
  }
}
