/**
 * Seed script — imports data from JSON files into MariaDB.
 * Run once after creating tables:
 *
 *   npx drizzle-kit push
 *   npx tsx scripts/seed.ts
 */
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { news, settings } from '../src/lib/db/schema';

const DATA_DIR = path.join(process.cwd(), 'data');

function readJson<T>(filename: string): T | null {
  const filePath = path.join(DATA_DIR, filename);
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8')) as T;
}

async function main() {
  const url =
    process.env.DATABASE_URL ||
    `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '3306'}/${process.env.DB_NAME || 'zhezu'}`;

  const pool = mysql.createPool({ uri: url });
  const db = drizzle(pool, { mode: 'default' });

  console.log('Seeding database...');

  // 1. Import news
  const articles = readJson<Record<string, unknown>[]>('news.json');
  if (articles && articles.length > 0) {
    console.log(`  Importing ${articles.length} news articles...`);
    for (const a of articles) {
      await db
        .insert(news)
        .values({
          id: a.id as string,
          slug: (a.slug as string) || '',
          title: a.title as { kk: string; ru: string; en: string },
          excerpt: a.excerpt as { kk: string; ru: string; en: string },
          body: a.body as { kk: string; ru: string; en: string },
          category: (a.category as string) || 'news',
          image: (a.image as string) || '',
          published: (a.published as boolean) ?? false,
          pinned: (a.pinned as boolean) ?? false,
          author: (a.author as string) || '',
          socialPublished: a.socialPublished as
            | { telegram?: boolean; instagram?: boolean }
            | undefined,
        })
        .onDuplicateKeyUpdate({ set: { slug: (a.slug as string) || '' } });
    }
    console.log('  Done.');
  }

  // 2. Import settings files
  const settingsFiles = ['settings', 'contact', 'homepage', 'university', 'menu'];
  for (const key of settingsFiles) {
    const data = readJson<unknown>(`${key}.json`);
    if (data) {
      console.log(`  Importing ${key}...`);
      await db
        .insert(settings)
        .values({ key, value: data as Record<string, unknown> })
        .onDuplicateKeyUpdate({ set: { value: data as Record<string, unknown> } });
    }
  }

  console.log('\nSeed complete!');
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
