import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    await writeFile(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/* ─── Generic CRUD for array-based JSON stores ─── */

export async function getAll<T>(file: string): Promise<T[]> {
  return readJson<T[]>(file, []);
}

export async function getById<T extends { id: string }>(
  file: string,
  id: string,
): Promise<T | null> {
  const items = await getAll<T>(file);
  return items.find((item) => item.id === id) ?? null;
}

export async function create<T extends { id: string }>(file: string, item: T): Promise<T> {
  const items = await getAll<T>(file);
  items.unshift(item);
  await writeJson(file, items);
  return item;
}

export async function update<T extends { id: string }>(
  file: string,
  id: string,
  patch: Partial<T>,
): Promise<T | null> {
  const items = await getAll<T>(file);
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch };
  await writeJson(file, items);
  return items[idx];
}

export async function remove<T extends { id: string }>(file: string, id: string): Promise<boolean> {
  const items = await getAll<T>(file);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(file, filtered);
  return true;
}

/* ─── Settings (single object store) ─── */

export async function getSettings<T>(file: string, defaults: T): Promise<T> {
  return readJson<T>(file, defaults);
}

export async function saveSettings<T>(file: string, data: T): Promise<void> {
  await writeJson(file, data);
}

/* ─── i18n file access ─── */

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
