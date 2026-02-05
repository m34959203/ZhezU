export type Locale = 'kk' | 'ru' | 'en';

export interface LocalizedString {
  kk: string;
  ru: string;
  en: string;
}

export interface Program {
  id: string;
  faculty: string;
  degree: 'bachelor' | 'master' | 'doctorate';
  credits: number;
  duration: number;
  languages: readonly string[];
  name: LocalizedString;
  description: LocalizedString;
}

export interface NewsItem {
  id: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  date: string;
  image: string;
  category: string;
}

export interface JobListing {
  id: string;
  title: LocalizedString;
  company: string;
  location: string;
  type: 'fullTime' | 'partTime' | 'internship' | 'remote';
  salary?: string;
  postedDate: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: LocalizedString;
  company: string;
  expertise: string[];
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
