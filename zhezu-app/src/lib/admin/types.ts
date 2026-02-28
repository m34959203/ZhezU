/* ─── Admin Panel Types ─── */

export interface AdminSession {
  role: 'admin';
  exp: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: { kk: string; ru: string; en: string };
  excerpt: { kk: string; ru: string; en: string };
  body: { kk: string; ru: string; en: string };
  category:
    | 'news'
    | 'announcement'
    | 'event'
    | 'achievement'
    | 'university'
    | 'science'
    | 'students'
    | 'sport'
    | 'culture';
  image: string;
  published: boolean;
  pinned: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
  socialPublished?: {
    telegram?: boolean;
    instagram?: boolean;
  };
}

export interface SiteEvent {
  id: string;
  title: { kk: string; ru: string; en: string };
  description: { kk: string; ru: string; en: string };
  date: string;
  endDate?: string;
  location: string;
  category: 'academic' | 'cultural' | 'sports' | 'conference' | 'other';
  published: boolean;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneAdmissions?: string;
  contactPhoneMobile?: string;
  emailAlt?: string;
  address: { kk: string; ru: string; en: string };
  socialLinks: {
    instagram?: string;
    telegram?: string;
    youtube?: string;
    facebook?: string;
  };
  admissionOpen: boolean;
  maintenanceMode: boolean;
  announcement?: { kk: string; ru: string; en: string };
  integrations?: {
    geminiApiKey?: string;
    geminiModel?: string;
    telegramBotToken?: string;
    telegramChatId?: string;
    telegramEnabled?: boolean;
    instagramAccessToken?: string;
    instagramPageId?: string;
    instagramEnabled?: boolean;
    autoPublishSocial?: boolean;
  };
}

export interface DashboardStats {
  totalNews: number;
  publishedNews: number;
  totalEvents: number;
  upcomingEvents: number;
  totalPages: number;
  translationKeys: number;
}

export type ContentLocale = 'kk' | 'ru' | 'en';

export interface PageContent {
  id: string;
  path: string;
  namespace: string;
  title: string;
  lastEdited: string;
  editedBy: string;
}

/* ─── Localized string helper ─── */
export interface LocalizedString {
  kk: string;
  ru: string;
  en: string;
}

/* ─── University Data ─── */
export interface UniversityData {
  name: LocalizedString;
  shortName: string;
  founded: number;
  type: string;
  website: string;
  rector: {
    name: LocalizedString;
    title: LocalizedString;
    photo?: string;
  };
  proRectors: Array<{
    name: LocalizedString;
    title: LocalizedString;
    photo?: string;
  }>;
  stats: {
    students: number;
    programs: number;
    masterPrograms: number;
    employmentRate: number;
    yearsOfExperience: number;
    faculty: number;
    doctorsOfScience: number;
    candidatesOfScience: number;
    phd: number;
  };
  departments: Array<{
    id: string;
    name: LocalizedString;
    shortName: LocalizedString;
    color: string;
    icon: string;
  }>;
  departmentHeads: Record<string, { name: LocalizedString; title: LocalizedString }>;
  programs: Array<{
    id: string;
    code: string;
    department: string;
    degree: 'bachelor' | 'master' | 'doctorate';
    credits: number;
    duration: number;
    languages: string[];
    name: LocalizedString;
    description: LocalizedString;
  }>;
  adminCenters: Array<{
    name: LocalizedString;
    icon: string;
  }>;
  serviceUnits: Array<{
    name: LocalizedString;
  }>;
}

/* ─── Contact Page Data ─── */
export interface ContactDepartment {
  icon: string;
  title: string;
  email: string;
  phone: string;
  color: string;
  bg: string;
}

export interface OpeningHoursEntry {
  day: string;
  hours: string;
  closed: boolean;
}

export interface ContactPageData {
  departments: ContactDepartment[];
  subjectLabels: Record<string, string>;
  openingHours: OpeningHoursEntry[];
  workingHoursShort: string;
  googleMapsQuery: string;
}

/* ─── Homepage Data ─── */
export interface HomepageData {
  heroTitle: string;
  /** Keys referencing UniversityData.stats (e.g. "students", "programs") */
  stats: string[];
  programImages: Record<string, string>;
  categoryLabels: Record<string, string>;
  /** Page-builder blocks — ordered array. If empty, legacy layout is used. */
  blocks?: PageBlock[];
}

/** Resolved stat ready for display on the public homepage */
export interface ResolvedHomepageStat {
  key: string;
  value: string;
}

/* ─── Page Builder Block Types ─── */

export type BlockType =
  | 'hero'
  | 'programs'
  | 'news'
  | 'departments'
  | 'cta'
  | 'text'
  | 'image'
  | 'banner'
  | 'html'
  | 'divider';

export type BlockSize = 'full' | 'wide' | 'medium' | 'narrow';

/** How much of the row a block occupies — 'full' = entire row (default) */
export type BlockSpan = 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';

/** CSS grid col-span class per span value (12-column grid) */
export const BLOCK_SPAN_CLS: Record<BlockSpan, string> = {
  full: 'col-span-12',
  '1/2': 'col-span-12 md:col-span-6',
  '1/3': 'col-span-12 md:col-span-4',
  '2/3': 'col-span-12 md:col-span-8',
  '1/4': 'col-span-12 md:col-span-3',
  '3/4': 'col-span-12 md:col-span-9',
};

/** Grid columns occupied per span (out of 12) */
export const BLOCK_SPAN_COLS: Record<BlockSpan, number> = {
  full: 12,
  '1/2': 6,
  '1/3': 4,
  '2/3': 8,
  '1/4': 3,
  '3/4': 9,
};

/** Tailwind max-width class per block size */
export const BLOCK_SIZE_CLS: Record<BlockSize, string> = {
  full: 'max-w-7xl',
  wide: 'max-w-5xl',
  medium: 'max-w-3xl',
  narrow: 'max-w-xl',
};

/** Allowed sizes per block type — admin UI hides dropdown when only 1 option */
export const BLOCK_SIZE_SUPPORT: Record<BlockType, BlockSize[]> = {
  hero: ['full'],
  programs: ['full', 'wide'],
  news: ['full', 'wide'],
  departments: ['full', 'wide'],
  cta: ['full', 'wide', 'medium'],
  banner: ['full', 'wide', 'medium'],
  text: ['full', 'wide', 'medium', 'narrow'],
  image: ['full', 'wide', 'medium', 'narrow'],
  html: ['full', 'wide', 'medium', 'narrow'],
  divider: ['full', 'wide', 'medium', 'narrow'],
};

export interface PageBlock {
  id: string;
  type: BlockType;
  order: number;
  visible: boolean;
  size: BlockSize;
  /** Row span — how wide the block is within a grid row. Default 'full'. */
  span?: BlockSpan;
  config: BlockConfig;
}

/** Union config — each block type has its own config shape */
export type BlockConfig =
  | HeroBlockConfig
  | ProgramsBlockConfig
  | NewsBlockConfig
  | DepartmentsBlockConfig
  | CtaBlockConfig
  | TextBlockConfig
  | ImageBlockConfig
  | BannerBlockConfig
  | HtmlBlockConfig
  | DividerBlockConfig;

export interface HeroBlockConfig {
  _type: 'hero';
}

export interface ProgramsBlockConfig {
  _type: 'programs';
  maxItems?: number;
}

export interface NewsBlockConfig {
  _type: 'news';
  maxItems?: number;
}

export interface DepartmentsBlockConfig {
  _type: 'departments';
  columns?: number;
}

export interface CtaBlockConfig {
  _type: 'cta';
  title?: LocalizedString;
  description?: LocalizedString;
  buttonText?: LocalizedString;
  buttonLink?: string;
}

export interface TextBlockConfig {
  _type: 'text';
  content: LocalizedString;
  align?: 'left' | 'center' | 'right';
}

export interface ImageBlockConfig {
  _type: 'image';
  src: string;
  alt?: string;
  caption?: LocalizedString;
  rounded?: boolean;
}

export interface BannerBlockConfig {
  _type: 'banner';
  backgroundImage?: string;
  backgroundColor?: string;
  title: LocalizedString;
  description?: LocalizedString;
  buttonText?: LocalizedString;
  buttonLink?: string;
  overlay?: boolean;
}

export interface HtmlBlockConfig {
  _type: 'html';
  code: string;
}

export interface DividerBlockConfig {
  _type: 'divider';
  style?: 'line' | 'space' | 'dots';
  spacing?: 'sm' | 'md' | 'lg';
}
