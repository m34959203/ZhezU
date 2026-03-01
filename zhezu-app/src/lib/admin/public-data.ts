/**
 * Public data access layer — reads from MariaDB.
 * Used by server components and public API routes.
 */
import { eq, and, desc, lte, isNull, isNotNull, or } from 'drizzle-orm';
import { db } from '@/lib/db';
import { news, settings } from '@/lib/db/schema';
import { ensureSeeded } from '@/lib/db/auto-seed';
import type {
  NewsArticle,
  SiteSettings,
  UniversityData,
  ContactPageData,
  HomepageData,
  ResolvedHomepageStat,
  TuitionData,
} from './types';

/* ─── Helpers ─── */

/** MariaDB may return JSON columns as strings — parse if needed */
function parseJson<T>(val: T | string): T {
  if (typeof val === 'string') {
    try { return JSON.parse(val) as T; } catch { /* fall through */ }
  }
  return val as T;
}

function rowToArticle(row: typeof news.$inferSelect): NewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: parseJson(row.title),
    excerpt: parseJson(row.excerpt),
    body: parseJson(row.body),
    category: row.category as NewsArticle['category'],
    image: row.image || '',
    published: row.published,
    pinned: row.pinned,
    author: row.author,
    socialPublished: parseJson(row.socialPublished) ?? undefined,
    scheduledAt: row.scheduledAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function getSetting<T>(key: string, defaults: T): Promise<T> {
  try {
    await ensureSeeded();
    const [row] = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
    if (!row) return defaults;
    // MariaDB may return JSON columns as strings — parse if needed
    const val = row.value;
    if (typeof val === 'string') {
      try { return JSON.parse(val) as T; } catch { return defaults; }
    }
    return val as T;
  } catch {
    // DB unavailable (e.g. during build) — return defaults
    return defaults;
  }
}

/* ─── Lazy scheduled publish ─── */

/**
 * Auto-publishes articles whose scheduledAt has passed.
 * Called lazily on every public news fetch — no cron needed.
 */
async function publishScheduledArticles(): Promise<void> {
  try {
    const now = new Date();
    await db
      .update(news)
      .set({ published: true, scheduledAt: null })
      .where(
        and(
          eq(news.published, false),
          isNotNull(news.scheduledAt),
          lte(news.scheduledAt, now),
        ),
      );
  } catch {
    // Ignore — best-effort
  }
}

/* ─── News ─── */

export async function getPublishedNews(): Promise<NewsArticle[]> {
  try {
    await ensureSeeded();
    await publishScheduledArticles();
    const rows = await db
      .select()
      .from(news)
      .where(eq(news.published, true))
      .orderBy(desc(news.pinned), desc(news.createdAt));
    return rows.map(rowToArticle);
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const [row] = await db
      .select()
      .from(news)
      .where(and(eq(news.slug, slug), eq(news.published, true)))
      .limit(1);
    return row ? rowToArticle(row) : null;
  } catch {
    return null;
  }
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  try {
    const [row] = await db
      .select()
      .from(news)
      .where(and(eq(news.id, id), eq(news.published, true)))
      .limit(1);
    return row ? rowToArticle(row) : null;
  } catch {
    return null;
  }
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  try {
    const rows = await db
      .select()
      .from(news)
      .where(and(eq(news.published, true), eq(news.category, category)))
      .orderBy(desc(news.pinned), desc(news.createdAt));
    return rows.map(rowToArticle);
  } catch {
    return [];
  }
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
  return getSetting<SiteSettings>('settings', DEFAULT_SETTINGS);
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
  return getSetting<UniversityData>('university', DEFAULT_UNIVERSITY);
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
  return getSetting<ContactPageData>('contact', DEFAULT_CONTACT);
}

/* ─── Homepage Data ─── */

const DEFAULT_HOMEPAGE: HomepageData = {
  heroTitle: 'Жезказганский университет',
  stats: ['students', 'programs', 'employment', 'years'],
  programImages: {},
  categoryLabels: {},
};

export async function getHomepageData(): Promise<HomepageData> {
  return getSetting<HomepageData>('homepage', DEFAULT_HOMEPAGE);
}

/* ─── Tuition Data ─── */

const DEFAULT_TUITION: TuitionData = {
  programs: [],
  dormitoryCost: 180000,
  scholarships: { gpa35: 150000, gpa30: 90000, gpa25: 30000 },
};

export async function getTuitionData(): Promise<TuitionData> {
  return getSetting<TuitionData>('tuition', DEFAULT_TUITION);
}

/**
 * Maps homepage stat keys → display values from university data.
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

export async function getResolvedHomepageStats(): Promise<ResolvedHomepageStat[]> {
  const [homepage, university] = await Promise.all([getHomepageData(), getUniversityData()]);
  return homepage.stats
    .filter((key) => key in STAT_KEY_MAP)
    .map((key) => ({
      key,
      value: STAT_KEY_MAP[key](university.stats),
    }));
}
