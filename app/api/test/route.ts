// app/api/db-test/route.ts

import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  console.log('starting db test');

  const result = await db.execute(sql`select 1`);

  console.log('db test complete');

  return Response.json(result);
}
