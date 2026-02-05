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

// ==========================================
// Talent Pool / Talapker Guide Types
// ==========================================

export interface SkillScore {
  label: string;
  value: number; // 0-100
}

export interface CompetencyBar {
  name: LocalizedString;
  percentage: number;
  color: string;
}

export interface Achievement {
  id: string;
  title: LocalizedString;
  issuer: LocalizedString;
  date: string;
  icon: string; // lucide icon name
  verified: boolean;
}

export interface PortfolioItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  type: 'research' | 'project' | 'publication' | 'certification';
  link?: string;
  date: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  photo: string;
  major: LocalizedString;
  faculty: string; // references INSTITUTES id
  year: number;
  gpa: number;
  classRank: string;
  englishLevel: string;
  internships: number;
  summary: LocalizedString;
  skills: SkillScore[];
  competencies: CompetencyBar[];
  achievements: Achievement[];
  portfolio: PortfolioItem[];
  matchScore: number; // 0-100
  tags: string[];
  email: string;
  linkedin?: string;
}

export interface SkillMapNode {
  id: string;
  label: LocalizedString;
  x: number;
  y: number;
  type: 'major' | 'unt' | 'hard' | 'soft' | 'career';
  size: 'lg' | 'md' | 'sm';
  color: string;
  value?: string;
}

export interface SkillMapEdge {
  from: string;
  to: string;
}

// ==========================================
// Talapker Gamification Types
// ==========================================

export interface TalapkerLevel {
  level: number;
  title: LocalizedString;
  minXp: number;
  maxXp: number;
  color: string;
  icon: string;
}

export interface TalapkerQuest {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  category: 'documents' | 'tests' | 'explore' | 'social' | 'special';
  xpReward: number;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  required?: boolean; // Required for admission
}

export interface TalapkerBadge {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Applicant {
  id: string;
  name: string;
  photo: string;
  email: string;
  phone?: string;
  targetProgram: string; // references PROGRAMS id
  targetDepartment: string; // references DEPARTMENTS id
  level: number;
  xp: number;
  untScore?: number;
  completedQuests: string[]; // Quest IDs
  earnedBadges: string[]; // Badge IDs
  registrationDate: string;
  lastActive: string;
  city: string;
  school: string;
  graduationYear: number;
}
