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
    telegramBotToken?: string;
    telegramChatId?: string;
    instagramAccessToken?: string;
    instagramPageId?: string;
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
