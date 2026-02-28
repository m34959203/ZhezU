import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { news, settings } from '@/lib/db/schema';
import { ensureSeeded } from '@/lib/db/auto-seed';

/* ─────────────────────────────────────────────────────────
 * News CRUD — uses the `news` MySQL table
 * Settings CRUD — uses the `settings` key-value MySQL table
 *
 * The API is backwards-compatible with the old JSON file
 * storage so that all existing API routes keep working.
 * ───────────────────────────────────────────────────────── */

const NEWS_FILE = 'news.json';

/* ─── Generic CRUD (array-based stores) ─── */

export async function getAll<T>(file: string): Promise<T[]> {
  await ensureSeeded();
  if (file === NEWS_FILE) {
    const rows = await db.select().from(news).orderBy(desc(news.createdAt));
    return rows.map(rowToArticle) as T[];
  }
  const data = await getSettings<T[]>(file, []);
  return data;
}

export async function getById<T extends { id: string }>(
  file: string,
  id: string,
): Promise<T | null> {
  if (file === NEWS_FILE) {
    const [row] = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return row ? (rowToArticle(row) as unknown as T) : null;
  }
  const items = await getAll<T>(file);
  return items.find((item) => item.id === id) ?? null;
}

export async function create<T extends { id: string }>(file: string, item: T): Promise<T> {
  if (file === NEWS_FILE) {
    const a = item as unknown as Record<string, unknown>;
    await db.insert(news).values({
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
      socialPublished: a.socialPublished as { telegram?: boolean; instagram?: boolean } | undefined,
    });
    return item;
  }
  const items = await getAll<T>(file);
  items.unshift(item);
  await saveSettings(file, items);
  return item;
}

export async function update<T extends { id: string }>(
  file: string,
  id: string,
  patch: Partial<T>,
): Promise<T | null> {
  if (file === NEWS_FILE) {
    const p = patch as Record<string, unknown>;
    const values: Record<string, unknown> = {};
    if (p.slug !== undefined) values.slug = p.slug;
    if (p.title !== undefined) values.title = p.title;
    if (p.excerpt !== undefined) values.excerpt = p.excerpt;
    if (p.body !== undefined) values.body = p.body;
    if (p.category !== undefined) values.category = p.category;
    if (p.image !== undefined) values.image = p.image;
    if (p.published !== undefined) values.published = p.published;
    if (p.pinned !== undefined) values.pinned = p.pinned;
    if (p.author !== undefined) values.author = p.author;
    if (p.socialPublished !== undefined) values.socialPublished = p.socialPublished;

    await db.update(news).set(values).where(eq(news.id, id));

    const [row] = await db.select().from(news).where(eq(news.id, id)).limit(1);
    return row ? (rowToArticle(row) as unknown as T) : null;
  }
  const items = await getAll<T>(file);
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch };
  await saveSettings(file, items);
  return items[idx];
}

export async function remove<T extends { id: string }>(file: string, id: string): Promise<boolean> {
  if (file === NEWS_FILE) {
    const result = await db.delete(news).where(eq(news.id, id));
    return (result[0]?.affectedRows ?? 0) > 0;
  }
  const items = await getAll<T>(file);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await saveSettings(file, filtered);
  return true;
}

/* ─── Settings (single object store) ─── */

function settingsKey(file: string): string {
  return file.replace(/\.json$/, '');
}

export async function getSettings<T>(file: string, defaults: T): Promise<T> {
  await ensureSeeded();
  const key = settingsKey(file);
  const [row] = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  if (!row) return defaults;
  // MariaDB may return JSON columns as strings — parse if needed
  const val = row.value;
  if (typeof val === 'string') {
    try { return JSON.parse(val) as T; } catch { return defaults; }
  }
  return val as T;
}

export async function saveSettings<T>(file: string, data: T): Promise<void> {
  const key = settingsKey(file);
  await db
    .insert(settings)
    .values({ key, value: data as unknown as Record<string, unknown> })
    .onDuplicateKeyUpdate({ set: { value: data as unknown as Record<string, unknown> } });
}

/* ─── i18n file access (stays file-based for next-intl) ─── */

const MESSAGES_DIR = path.join(process.cwd(), 'src', 'i18n', 'messages');

export async function readTranslations(locale: string): Promise<Record<string, unknown>> {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

export async function writeTranslations(
  locale: string,
  data: Record<string, unknown>,
): Promise<void> {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  await writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

/* ─── Helpers ─── */

/** MariaDB may return JSON columns as strings — parse if needed */
function parseJson<T>(val: T | string): T {
  if (typeof val === 'string') {
    try { return JSON.parse(val) as T; } catch { /* fall through */ }
  }
  return val as T;
}

function rowToArticle(row: typeof news.$inferSelect) {
  return {
    id: row.id,
    slug: row.slug,
    title: parseJson(row.title),
    excerpt: parseJson(row.excerpt),
    body: parseJson(row.body),
    category: row.category,
    image: row.image || '',
    published: row.published,
    pinned: row.pinned,
    author: row.author,
    socialPublished: parseJson(row.socialPublished) ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
