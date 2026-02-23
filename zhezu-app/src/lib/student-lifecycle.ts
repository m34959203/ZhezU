/**
 * ══════════════════════════════════════════════════════════════════════════════
 * ZHEZU STUDENT LIFECYCLE SYSTEM
 * Система полного жизненного цикла студента: от абитуриента до выпускника
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * АРХИТЕКТУРНОЕ ВИДЕНИЕ (Product Manager)
 * ────────────────────────────────────────
 * Единый профиль, который эволюционирует через 4 этапа:
 *
 * ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
 * │  ТАЛАПКЕР   │───▶│  СТУДЕНТ    │───▶│  ВЫПУСКНИК  │───▶│   АЛУМНИ    │
 * │ (Applicant) │    │  (Student)  │    │  (Graduate) │    │  (Alumni)   │
 * └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
 *    Квесты           Курсы/GPA         Дипломный проект    Карьера
 *    Достижения       Стажировки        Трудоустройство     Менторство
 *    Баллы ЕНТ        Проекты           Компетенции         Донорство
 *
 * UX КОНЦЕПЦИЯ (UX Designer)
 * ────────────────────────────
 * Профиль визуально "взрослеет":
 * - Талапкер: яркий, игровой, с прогресс-барами квестов
 * - Студент: академичный, с оценками и проектами
 * - Выпускник: профессиональный, как LinkedIn (см. скриншот)
 * - Алумни: менторский, с достижениями в карьере
 *
 * ИНТЕГРАЦИИ (Backend Architect)
 * ─────────────────────────────────
 * - Platonus API: оценки, курсы, GPA
 * - ЕНТ база: баллы абитуриентов
 * - HR системы партнёров: стажировки
 * - Портфолио: GitHub, ResearchGate
 *
 * ГЕЙМИФИКАЦИЯ (Gamification Specialist)
 * ──────────────────────────────────────────
 * Квесты и достижения на КАЖДОМ этапе:
 * - Талапкер: подготовка документов, ЕНТ, экскурсии
 * - 1 курс: адаптация, первая сессия, научный кружок
 * - 2-3 курс: стажировки, публикации, лидерство
 * - 4 курс: дипломный проект, трудоустройство
 */

import type { LocalizedString } from '@/types';

// ════════════════════════════════════════════════════════════════════════════
// ТИПЫ ЖИЗНЕННОГО ЦИКЛА
// ════════════════════════════════════════════════════════════════════════════

/** Этап жизненного цикла студента */
export type LifecycleStage = 'applicant' | 'student' | 'graduate' | 'alumni';

/** Академический год (курс) */
export type AcademicYear = 1 | 2 | 3 | 4;

/** Уровень компетенции */
export type CompetencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'certified';

/** Тип верификации достижения */
export type VerificationType = 'university' | 'partner' | 'external' | 'self';

// ════════════════════════════════════════════════════════════════════════════
// КОМПЕТЕНЦИИ И НАВЫКИ
// ════════════════════════════════════════════════════════════════════════════

/** Категория навыка */
export interface SkillCategory {
  id: string;
  name: LocalizedString;
  icon: string;
  color: string;
}

/** Навык с уровнем */
export interface Skill {
  id: string;
  name: LocalizedString;
  categoryId: string;
  level: CompetencyLevel;
  percentage: number; // 0-100
  verifiedBy?: string;
  acquiredAt?: string; // ISO date
  source: 'quest' | 'course' | 'internship' | 'certificate' | 'project';
}

/** Профиль навыков для радарной диаграммы */
export interface SkillRadarData {
  technical: number; // Технические навыки (0-100)
  tools: number; // Инструменты и ПО
  softSkills: number; // Коммуникация, работа в команде
  leadership: number; // Лидерство и управление
  language: number; // Языковые компетенции
  safety: number; // Промышленная безопасность
}

// ════════════════════════════════════════════════════════════════════════════
// ДОСТИЖЕНИЯ
// ════════════════════════════════════════════════════════════════════════════

/** Верифицированное достижение */
export interface Achievement {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  color: string;
  type: 'academic' | 'professional' | 'research' | 'leadership' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  verification: VerificationType;
  verifiedBy?: string; // "Kazakhmys Corporation", "Engineering Dept."
  awardedAt: string; // ISO date
  linkedStage: LifecycleStage;
  linkedYear?: AcademicYear;
  xpReward: number;
}

// ════════════════════════════════════════════════════════════════════════════
// ПОРТФОЛИО
// ════════════════════════════════════════════════════════════════════════════

/** Элемент портфолио */
export interface PortfolioItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  type: 'research' | 'project' | 'publication' | 'presentation' | 'competition';
  thumbnail?: string;
  year: number;
  links: {
    type: 'paper' | 'github' | 'demo' | 'presentation' | 'video';
    url: string;
    label: LocalizedString;
  }[];
  collaborators?: string[];
  tags: string[];
  featured: boolean;
}

// ════════════════════════════════════════════════════════════════════════════
// ОПЫТ РАБОТЫ И СТАЖИРОВКИ
// ════════════════════════════════════════════════════════════════════════════

/** Стажировка или работа */
export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  position: LocalizedString;
  type: 'internship' | 'part-time' | 'full-time' | 'research';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: LocalizedString;
  skills: string[]; // Skill IDs
  achievements?: string[]; // Achievement IDs earned during
  location: string;
}

// ════════════════════════════════════════════════════════════════════════════
// КВЕСТЫ ЖИЗНЕННОГО ЦИКЛА
// ════════════════════════════════════════════════════════════════════════════

/** Расширенный квест с привязкой к этапу */
export interface LifecycleQuest {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  longDescription?: LocalizedString;

  // Классификация
  stage: LifecycleStage;
  year?: AcademicYear; // Для студентов: 1-4 курс
  category: string; // documents, academic, career, research, social

  // Награды
  xpReward: number;
  skillRewards?: { skillId: string; percentage: number }[];
  achievementReward?: string; // Achievement ID to unlock

  // Сложность и требования
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  required: boolean; // Обязательный для перехода на следующий этап
  prerequisites?: string[]; // Quest IDs

  // Визуал
  icon: string;
  color: string;

  // Интеграция
  autoComplete?: {
    type: 'gpa_threshold' | 'course_completion' | 'unt_score' | 'internship' | 'external';
    condition: string;
  };
}

// ════════════════════════════════════════════════════════════════════════════
// ЕДИНЫЙ ПРОФИЛЬ СТУДЕНТА
// ════════════════════════════════════════════════════════════════════════════

/** Полный профиль студента на всех этапах */
export interface StudentProfile {
  // ─── Идентификация ───
  id: string;
  name: string;
  photo: string;
  email: string;
  phone?: string;

  // ─── Текущий статус ───
  stage: LifecycleStage;
  year?: AcademicYear;

  // ─── Образование ───
  education: {
    program: string; // Program code (e.g., "6B07201")
    department: string; // Department ID
    enrollmentYear?: number; // Год поступления
    expectedGraduation?: number;
    gpa?: number; // Cumulative GPA
    classRank?: string; // "Top 5%", "Top 10%"
    credits?: number; // Earned credits
  };

  // ─── Довузовские данные (Талапкер) ───
  preUniversity: {
    school: string;
    city: string;
    graduationYear: number;
    untScore?: number;
    olympiads?: { name: string; place: number; year: number }[];
  };

  // ─── Прогресс геймификации ───
  gamification: {
    level: number;
    xp: number;
    completedQuests: string[];
    earnedAchievements: string[];
    currentStreak: number; // Days active
    longestStreak: number;
  };

  // ─── Навыки ───
  skills: Skill[];
  skillRadar: SkillRadarData;

  // ─── Опыт ───
  experiences: Experience[];

  // ─── Портфолио ───
  portfolio: PortfolioItem[];

  // ─── Языки ───
  languages: {
    language: 'kazakh' | 'russian' | 'english' | 'other';
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native';
    certificate?: string;
  }[];

  // ─── Профессиональное резюме (AI-generated) ───
  professionalSummary?: LocalizedString;

  // ─── Доступность ───
  availability: {
    forInternship: boolean;
    forFullTime: boolean;
    forMentoring: boolean;
    relocationReady: boolean;
  };

  // ─── Мета ───
  registrationDate: string;
  lastActive: string;
  profileCompleteness: number; // 0-100%
  isVerified: boolean;
  isTopTalent: boolean;
}

// ════════════════════════════════════════════════════════════════════════════
// ЭТАПЫ И ПЕРЕХОДЫ
// ════════════════════════════════════════════════════════════════════════════

/** Требования для перехода между этапами */
export interface StageTransition {
  from: LifecycleStage;
  to: LifecycleStage;
  requirements: {
    type: 'quest' | 'gpa' | 'credits' | 'document' | 'external';
    id?: string;
    description: LocalizedString;
    completed: boolean;
  }[];
  unlocks: string[]; // What features/quests become available
}

/** Прогресс по этапу */
export interface StageProgress {
  stage: LifecycleStage;
  year?: AcademicYear;
  totalQuests: number;
  completedQuests: number;
  requiredQuests: number;
  completedRequired: number;
  xpEarned: number;
  xpTotal: number;
  percentage: number;
}

// ════════════════════════════════════════════════════════════════════════════
// КАТЕГОРИИ КВЕСТОВ ПО ЭТАПАМ
// ════════════════════════════════════════════════════════════════════════════

export const QUEST_CATEGORIES: Record<
  LifecycleStage,
  { id: string; name: LocalizedString; icon: string; color: string }[]
> = {
  applicant: [
    {
      id: 'documents',
      name: { kk: 'Құжаттар', ru: 'Документы', en: 'Documents' },
      icon: 'FileCheck',
      color: '#3B82F6',
    },
    {
      id: 'tests',
      name: { kk: 'Тесттер', ru: 'Тесты', en: 'Tests' },
      icon: 'ClipboardList',
      color: '#F59E0B',
    },
    {
      id: 'explore',
      name: { kk: 'Зерттеу', ru: 'Исследование', en: 'Explore' },
      icon: 'BookOpen',
      color: '#22C55E',
    },
    {
      id: 'social',
      name: { kk: 'Әлеуметтік', ru: 'Социальные', en: 'Social' },
      icon: 'MessageCircle',
      color: '#8B5CF6',
    },
  ],
  student: [
    {
      id: 'academic',
      name: { kk: 'Академиялық', ru: 'Академические', en: 'Academic' },
      icon: 'GraduationCap',
      color: '#3B82F6',
    },
    {
      id: 'career',
      name: { kk: 'Мансап', ru: 'Карьера', en: 'Career' },
      icon: 'Briefcase',
      color: '#F59E0B',
    },
    {
      id: 'research',
      name: { kk: 'Ғылым', ru: 'Наука', en: 'Research' },
      icon: 'FlaskConical',
      color: '#22C55E',
    },
    {
      id: 'leadership',
      name: { kk: 'Көшбасшылық', ru: 'Лидерство', en: 'Leadership' },
      icon: 'Crown',
      color: '#8B5CF6',
    },
    {
      id: 'skills',
      name: { kk: 'Дағдылар', ru: 'Навыки', en: 'Skills' },
      icon: 'Target',
      color: '#E6B325',
    },
  ],
  graduate: [
    {
      id: 'thesis',
      name: { kk: 'Диплом', ru: 'Диплом', en: 'Thesis' },
      icon: 'FileText',
      color: '#3B82F6',
    },
    {
      id: 'employment',
      name: { kk: 'Жұмысқа орналасу', ru: 'Трудоустройство', en: 'Employment' },
      icon: 'Building2',
      color: '#22C55E',
    },
    {
      id: 'portfolio',
      name: { kk: 'Портфолио', ru: 'Портфолио', en: 'Portfolio' },
      icon: 'FolderOpen',
      color: '#8B5CF6',
    },
  ],
  alumni: [
    {
      id: 'mentoring',
      name: { kk: 'Менторлық', ru: 'Менторство', en: 'Mentoring' },
      icon: 'Users',
      color: '#3B82F6',
    },
    {
      id: 'giving',
      name: { kk: 'Қайырымдылық', ru: 'Благотворительность', en: 'Giving Back' },
      icon: 'Heart',
      color: '#E6B325',
    },
    {
      id: 'career',
      name: { kk: 'Мансап', ru: 'Карьерный рост', en: 'Career Growth' },
      icon: 'TrendingUp',
      color: '#22C55E',
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// УРОВНИ СИСТЕМЫ (РАСШИРЕННЫЕ)
// ════════════════════════════════════════════════════════════════════════════

export interface LifecycleLevel {
  level: number;
  title: LocalizedString;
  stage: LifecycleStage;
  minXp: number;
  maxXp: number;
  color: string;
  icon: string;
  perks: LocalizedString[]; // Что открывается на этом уровне
}

export const LIFECYCLE_LEVELS: LifecycleLevel[] = [
  // ─── Талапкер (Applicant) Levels 1-10 ───
  {
    level: 1,
    title: { kk: 'Жаңадан келген', ru: 'Новичок', en: 'Newcomer' },
    stage: 'applicant',
    minXp: 0,
    maxXp: 100,
    color: '#94A3B8',
    icon: '🌱',
    perks: [{ kk: 'Бастапқы квесттер', ru: 'Начальные квесты', en: 'Starter quests' }],
  },
  {
    level: 2,
    title: { kk: 'Зерттеуші', ru: 'Исследователь', en: 'Explorer' },
    stage: 'applicant',
    minXp: 100,
    maxXp: 250,
    color: '#22C55E',
    icon: '🔍',
    perks: [
      { kk: 'Кампус турына қол жеткізу', ru: 'Доступ к туру кампуса', en: 'Campus tour access' },
    ],
  },
  {
    level: 3,
    title: { kk: 'Құжаттарды жинаушы', ru: 'Документовед', en: 'Document Collector' },
    stage: 'applicant',
    minXp: 250,
    maxXp: 500,
    color: '#3B82F6',
    icon: '📋',
    perks: [{ kk: 'Құжаттар тексерушісі', ru: 'Проверка документов', en: 'Document checker' }],
  },
  {
    level: 4,
    title: { kk: 'ЕНТ дайындығы', ru: 'К ЕНТ готов', en: 'UNT Ready' },
    stage: 'applicant',
    minXp: 500,
    maxXp: 850,
    color: '#F59E0B',
    icon: '📚',
    perks: [
      { kk: 'Тегін ЕНТ материалдары', ru: 'Бесплатные материалы ЕНТ', en: 'Free UNT materials' },
    ],
  },
  {
    level: 5,
    title: { kk: 'Белсенді талапкер', ru: 'Активный абитуриент', en: 'Active Applicant' },
    stage: 'applicant',
    minXp: 850,
    maxXp: 1300,
    color: '#8B5CF6',
    icon: '⚡',
    perks: [{ kk: 'Студенттермен чат', ru: 'Чат со студентами', en: 'Student chat access' }],
  },
  {
    level: 6,
    title: { kk: 'Мақсатқа жетуші', ru: 'Целеустремлённый', en: 'Goal Oriented' },
    stage: 'applicant',
    minXp: 1300,
    maxXp: 1850,
    color: '#EC4899',
    icon: '🎯',
    perks: [{ kk: 'Бағдарлама кеңесшісі', ru: 'Консультант программы', en: 'Program advisor' }],
  },
  {
    level: 7,
    title: { kk: 'Жетілген талапкер', ru: 'Продвинутый', en: 'Advanced Applicant' },
    stage: 'applicant',
    minXp: 1850,
    maxXp: 2500,
    color: '#06B6D4',
    icon: '🚀',
    perks: [{ kk: 'Приоритетті қарау', ru: 'Приоритетное рассмотрение', en: 'Priority review' }],
  },
  {
    level: 8,
    title: { kk: 'Элита', ru: 'Элита', en: 'Elite' },
    stage: 'applicant',
    minXp: 2500,
    maxXp: 3300,
    color: '#10B981',
    icon: '👑',
    perks: [{ kk: 'VIP экскурсия', ru: 'VIP экскурсия', en: 'VIP campus tour' }],
  },
  {
    level: 9,
    title: { kk: 'Үміткер чемпион', ru: 'Чемпион', en: 'Champion' },
    stage: 'applicant',
    minXp: 3300,
    maxXp: 4200,
    color: '#EF4444',
    icon: '🏆',
    perks: [
      {
        kk: 'Стипендия ұсынысы',
        ru: 'Рекомендация на стипендию',
        en: 'Scholarship recommendation',
      },
    ],
  },
  {
    level: 10,
    title: { kk: 'Болашақ көшбасшы', ru: 'Будущий лидер', en: 'Future Leader' },
    stage: 'applicant',
    minXp: 4200,
    maxXp: 9999,
    color: '#E6B325',
    icon: '⭐',
    perks: [{ kk: 'Менторлық бағдарлама', ru: 'Программа менторства', en: 'Mentorship program' }],
  },

  // ─── Студент (Student) Levels 11-30 ───
  {
    level: 11,
    title: { kk: '1-курс студенті', ru: 'Первокурсник', en: 'Freshman' },
    stage: 'student',
    minXp: 0,
    maxXp: 500,
    color: '#3B82F6',
    icon: '🎓',
    perks: [{ kk: 'Студенттік билет', ru: 'Студенческий билет', en: 'Student ID' }],
  },
  {
    level: 12,
    title: { kk: 'Бейімделген', ru: 'Адаптировался', en: 'Adapted' },
    stage: 'student',
    minXp: 500,
    maxXp: 1200,
    color: '#22C55E',
    icon: '🌿',
    perks: [{ kk: 'Ғылыми үйірме', ru: 'Научный кружок', en: 'Science club' }],
  },
  {
    level: 13,
    title: { kk: 'Үздік студент', ru: 'Отличник', en: 'Honor Student' },
    stage: 'student',
    minXp: 1200,
    maxXp: 2000,
    color: '#F59E0B',
    icon: '📖',
    perks: [{ kk: 'Кітапхана VIP', ru: 'VIP библиотека', en: 'Library VIP' }],
  },
  {
    level: 14,
    title: { kk: 'Зерттеуші', ru: 'Исследователь', en: 'Researcher' },
    stage: 'student',
    minXp: 2000,
    maxXp: 3000,
    color: '#8B5CF6',
    icon: '🔬',
    perks: [{ kk: 'Зертхана қол жеткізу', ru: 'Доступ к лаборатории', en: 'Lab access' }],
  },
  {
    level: 15,
    title: { kk: 'Стажер', ru: 'Стажёр', en: 'Intern' },
    stage: 'student',
    minXp: 3000,
    maxXp: 4500,
    color: '#EC4899',
    icon: '💼',
    perks: [{ kk: 'Стажировка базасы', ru: 'База стажировок', en: 'Internship database' }],
  },
  {
    level: 16,
    title: { kk: 'Көшбасшы', ru: 'Лидер', en: 'Leader' },
    stage: 'student',
    minXp: 4500,
    maxXp: 6000,
    color: '#06B6D4',
    icon: '👥',
    perks: [{ kk: 'Студенттік кеңес', ru: 'Студсовет', en: 'Student council' }],
  },
  {
    level: 17,
    title: { kk: 'Маман', ru: 'Специалист', en: 'Specialist' },
    stage: 'student',
    minXp: 6000,
    maxXp: 8000,
    color: '#10B981',
    icon: '⚙️',
    perks: [{ kk: 'Сертификаттау', ru: 'Сертификация', en: 'Certification' }],
  },
  {
    level: 18,
    title: { kk: 'Сарапшы', ru: 'Эксперт', en: 'Expert' },
    stage: 'student',
    minXp: 8000,
    maxXp: 10000,
    color: '#EF4444',
    icon: '🎖️',
    perks: [{ kk: 'Менторлық', ru: 'Менторство младших', en: 'Junior mentoring' }],
  },
  {
    level: 19,
    title: { kk: 'Үздік түлек', ru: 'Лучший выпускник', en: 'Top Graduate' },
    stage: 'student',
    minXp: 10000,
    maxXp: 12000,
    color: '#E6B325',
    icon: '🌟',
    perks: [{ kk: 'Жұмыс берушілер базасы', ru: 'База работодателей', en: 'Employer database' }],
  },
  {
    level: 20,
    title: { kk: 'Алтын түлек', ru: 'Золотой выпускник', en: 'Golden Graduate' },
    stage: 'student',
    minXp: 12000,
    maxXp: 99999,
    color: '#E6B325',
    icon: '👑',
    perks: [{ kk: 'Алумни клубы', ru: 'Клуб выпускников', en: 'Alumni club' }],
  },
];

// ════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════

/** Получить уровень по XP и этапу */
export function getLifecycleLevel(xp: number, stage: LifecycleStage): LifecycleLevel {
  const stageLevels = LIFECYCLE_LEVELS.filter((l) => l.stage === stage);
  return (
    stageLevels.find((l) => xp >= l.minXp && xp < l.maxXp) || stageLevels[stageLevels.length - 1]
  );
}

/** Рассчитать процент заполненности профиля */
export function calculateProfileCompleteness(profile: StudentProfile): number {
  let score = 0;
  const weights = {
    photo: 5,
    email: 5,
    phone: 3,
    education: 10,
    preUniversity: 10,
    skills: 15,
    experiences: 15,
    portfolio: 15,
    languages: 7,
    professionalSummary: 10,
    gamification: 5,
  };

  if (profile.photo) score += weights.photo;
  if (profile.email) score += weights.email;
  if (profile.phone) score += weights.phone;
  if (profile.education.program) score += weights.education;
  if (profile.preUniversity.school) score += weights.preUniversity;
  if (profile.skills.length >= 3) score += weights.skills;
  if (profile.experiences.length >= 1) score += weights.experiences;
  if (profile.portfolio.length >= 1) score += weights.portfolio;
  if (profile.languages.length >= 1) score += weights.languages;
  if (profile.professionalSummary) score += weights.professionalSummary;
  if (profile.gamification.completedQuests.length >= 5) score += weights.gamification;

  return score;
}

/** Получить прогресс по этапу */
export function getStageProgress(profile: StudentProfile, quests: LifecycleQuest[]): StageProgress {
  const stageQuests = quests.filter((q) => q.stage === profile.stage);
  const requiredQuests = stageQuests.filter((q) => q.required);

  const completedQuests = stageQuests.filter((q) =>
    profile.gamification.completedQuests.includes(q.id),
  );
  const completedRequired = requiredQuests.filter((q) =>
    profile.gamification.completedQuests.includes(q.id),
  );

  const xpTotal = stageQuests.reduce((sum, q) => sum + q.xpReward, 0);
  const xpEarned = completedQuests.reduce((sum, q) => sum + q.xpReward, 0);

  return {
    stage: profile.stage,
    year: profile.year,
    totalQuests: stageQuests.length,
    completedQuests: completedQuests.length,
    requiredQuests: requiredQuests.length,
    completedRequired: completedRequired.length,
    xpEarned,
    xpTotal,
    percentage:
      stageQuests.length > 0 ? Math.round((completedQuests.length / stageQuests.length) * 100) : 0,
  };
}

/** Проверить готовность к переходу на следующий этап */
export function canTransitionToNextStage(
  profile: StudentProfile,
  quests: LifecycleQuest[],
): boolean {
  const progress = getStageProgress(profile, quests);
  return progress.completedRequired === progress.requiredQuests;
}

/** Получить AI-сгенерированное резюме на основе профиля */
export function generateProfessionalSummary(profile: StudentProfile): LocalizedString {
  // В реальном приложении здесь был бы вызов AI API
  const skills = profile.skills
    .slice(0, 3)
    .map((s) => s.name.en)
    .join(', ');
  const topSkill = profile.skills[0]?.name || { kk: '', ru: '', en: '' };

  return {
    kk: `${profile.name} — ${topSkill.kk} саласында ерекше қабілеті бар студент.`,
    ru: `${profile.name} демонстрирует исключительные способности в области ${topSkill.ru}.`,
    en: `${profile.name} demonstrates exceptional aptitude in ${topSkill.en} and ${skills}.`,
  };
}
