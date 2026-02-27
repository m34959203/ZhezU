/**
 * Public data access layer — reads from admin JSON stores.
 * Used by server components and API routes.
 */
import { readFile } from 'fs/promises';
import path from 'path';
import type {
  NewsArticle,
  SiteSettings,
  UniversityData,
  ContactPageData,
  HomepageData,
  ResolvedHomepageStat,
} from './types';

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
  contactEmail: 'univer@zhezu.edu.kz',
  contactPhone: '+7 (7102) 73-60-15',
  address: {
    kk: 'Ұлытау облысы, Жезқазған қ., Алашахан даңғылы, 1Б',
    ru: 'Ұлытау область, г. Жезказган, пр. Алашахана, 1Б',
    en: '1B Alashakhan Ave., Zhezkazgan, Ulytau Region',
  },
  socialLinks: {},
  admissionOpen: true,
  maintenanceMode: false,
};

export async function getSiteSettings(): Promise<SiteSettings> {
  return readJson<SiteSettings>('settings.json', DEFAULT_SETTINGS);
}

/* ─── University Data ─── */

const DEFAULT_UNIVERSITY: UniversityData = {
  name: { kk: '', ru: 'Жезказганский университет', en: 'Zhezkazgan University' },
  shortName: 'ZhezU',
  founded: 1961,
  type: 'private',
  website: 'https://zhezu.edu.kz',
  rector: { name: { kk: '', ru: '', en: '' }, title: { kk: '', ru: '', en: '' } },
  proRectors: [],
  stats: {
    students: 0,
    programs: 0,
    masterPrograms: 0,
    employmentRate: 0,
    yearsOfExperience: 0,
    faculty: 0,
    doctorsOfScience: 0,
    candidatesOfScience: 0,
    phd: 0,
  },
  departments: [],
  departmentHeads: {},
  programs: [],
  adminCenters: [],
  serviceUnits: [],
};

export async function getUniversityData(): Promise<UniversityData> {
  return readJson<UniversityData>('university.json', DEFAULT_UNIVERSITY);
}

/* ─── Contact Page Data ─── */

const DEFAULT_CONTACT: ContactPageData = {
  departments: [],
  subjectLabels: {},
  openingHours: [],
  workingHoursShort: 'Пн-Пт: 09:00 — 18:00',
  googleMapsQuery: 'Zhezkazgan+University',
};

export async function getContactPageData(): Promise<ContactPageData> {
  return readJson<ContactPageData>('contact.json', DEFAULT_CONTACT);
}

/* ─── Homepage Data ─── */

const DEFAULT_HOMEPAGE: HomepageData = {
  heroTitle: 'Жезказганский университет',
  stats: ['students', 'programs', 'employment', 'years'],
  programImages: {},
  categoryLabels: {},
};

export async function getHomepageData(): Promise<HomepageData> {
  return readJson<HomepageData>('homepage.json', DEFAULT_HOMEPAGE);
}

/**
 * Maps homepage stat keys → display values from university.json.
 * Single source of truth for all statistics.
 */
const STAT_KEY_MAP: Record<string, (s: UniversityData['stats']) => string> = {
  students: (s) => `${s.students}+`,
  programs: (s) => `${s.programs}+`,
  employment: (s) => `${s.employmentRate}%`,
  years: (s) => `${s.yearsOfExperience}+`,
  faculty: (s) => `${s.faculty}+`,
  masters: (s) => `${s.masterPrograms}`,
};

/**
 * Resolves homepage stat keys into display-ready {key, value} pairs
 * using university.json as the single source of truth.
 */
export async function getResolvedHomepageStats(): Promise<ResolvedHomepageStat[]> {
  const [homepage, university] = await Promise.all([getHomepageData(), getUniversityData()]);
  return homepage.stats
    .filter((key) => key in STAT_KEY_MAP)
    .map((key) => ({
      key,
      value: STAT_KEY_MAP[key](university.stats),
    }));
}
