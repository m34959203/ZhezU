/**
 * Public data access layer — reads from admin JSON stores.
 * Used by server components and API routes.
 */
import { readFile } from 'fs/promises';
import path from 'path';
import type { NewsArticle, SiteSettings } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(DATA_DIR, filename), 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/* ─── News ─── */

export async function getPublishedNews(): Promise<NewsArticle[]> {
  const all = await readJson<NewsArticle[]>('news.json', []);
  return all
    .filter((a) => a.published)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const all = await readJson<NewsArticle[]>('news.json', []);
  return all.find((a) => a.slug === slug && a.published) ?? null;
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  const all = await readJson<NewsArticle[]>('news.json', []);
  return all.find((a) => a.id === id && a.published) ?? null;
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  const all = await getPublishedNews();
  return all.filter((a) => a.category === category);
}

/* ─── Settings ─── */

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Жезказганский университет им. О.А. Байконурова',
  contactEmail: 'info@zhezu.edu.kz',
  contactPhone: '+7 7102 123456',
  address: {
    kk: '100600, Қарағанды облысы, Жезқазған қ., Байқоңыров к-сі, 29',
    ru: '100600, Карагандинская область, г. Жезказган, ул. Байконурова, 29',
    en: '29 Baikonurov St., Zhezkazgan, Karaganda Region, 100600, Kazakhstan',
  },
  socialLinks: {},
  admissionOpen: true,
  maintenanceMode: false,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  return readJson<SiteSettings>('settings.json', DEFAULT_SETTINGS);
}
