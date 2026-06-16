import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};

const client =
  globalForDb.client ??
  postgres(process.env.DATABASE_URL!, {
    ssl: 'require',
    max: 1,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.client = client;
}

export const db = drizzle(client);
