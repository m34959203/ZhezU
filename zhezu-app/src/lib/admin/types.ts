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
  stats: Array<{
    key: string;
    value: string;
  }>;
  programImages: Record<string, string>;
  categoryLabels: Record<string, string>;
}
