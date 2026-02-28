/**
 * Auto-seed — ensures the database has data on first request.
 *
 * On production (Plesk), `drizzle-kit push` creates tables but `db:seed`
 * may not have been run.  This module checks whether the `settings` table
 * is empty and, if so, imports every JSON file from `data/` automatically.
 *
 * The check runs at most once per process lifetime.
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import path from 'path';
import { sql } from 'drizzle-orm';
import { db } from './index';
import { news, settings } from './schema';

let seeded: Promise<void> | null = null;

/** Call from any server-side entry point; runs seed at most once. */
export function ensureSeeded(): Promise<void> {
  if (!seeded) {
    seeded = runSeedIfNeeded().catch((err) => {
      // Allow retry on next request if seed fails
      console.error('[auto-seed] Error:', err);
      seeded = null;
    });
  }
  return seeded;
}

async function runSeedIfNeeded() {
  // Ensure tables exist (idempotent — safe to run every time)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(100) PRIMARY KEY,
      value JSON NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS news (
      id VARCHAR(36) PRIMARY KEY,
      slug VARCHAR(255) NOT NULL DEFAULT '',
      title JSON NOT NULL,
      excerpt JSON NOT NULL,
      body JSON NOT NULL,
      category VARCHAR(50) NOT NULL DEFAULT 'news',
      image TEXT,
      published BOOLEAN NOT NULL DEFAULT FALSE,
      pinned BOOLEAN NOT NULL DEFAULT FALSE,
      author VARCHAR(255) NOT NULL DEFAULT '',
      social_published JSON,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Quick check: if settings table already has rows, skip
  const [row] = await db
    .select({ cnt: sql<number>`count(*)` })
    .from(settings);
  if (row && Number(row.cnt) > 0) return;

  console.log('[auto-seed] Empty database detected — importing data/ files…');

  const dataDir = resolveDataDir();
  if (!dataDir) {
    console.warn('[auto-seed] data/ directory not found, skipping seed.');
    return;
  }

  // 1. Import settings JSON files
  const settingsFiles = ['settings', 'contact', 'homepage', 'university', 'menu'];
  for (const key of settingsFiles) {
    const data = readJson(dataDir, `${key}.json`);
    if (data) {
      await db
        .insert(settings)
        .values({ key, value: data as Record<string, unknown> })
        .onDuplicateKeyUpdate({ set: { value: data as Record<string, unknown> } });
      console.log(`[auto-seed]   ✓ ${key}`);
    }
  }

  // 2. Import news
  const articles = readJson<Record<string, unknown>[]>(dataDir, 'news.json');
  if (articles && articles.length > 0) {
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
    console.log(`[auto-seed]   ✓ news (${articles.length} articles)`);
  }

  console.log('[auto-seed] Seed complete.');
}

/** Resolve the data/ directory — works in both dev and standalone deploy. */
function resolveDataDir(): string | null {
  const candidates = [
    path.join(process.cwd(), 'data'),
    path.join(process.cwd(), '..', 'data'),
    path.resolve(__dirname, '..', '..', '..', '..', 'data'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir) && readdirSync(dir).length > 0) return dir;
  }
  return null;
}

function readJson<T = unknown>(dir: string, filename: string): T | null {
  const filePath = path.join(dir, filename);
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8')) as T;
  } catch {
    return null;
  }
}
