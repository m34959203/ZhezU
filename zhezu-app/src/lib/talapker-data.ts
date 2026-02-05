import type { TalapkerLevel, TalapkerQuest, TalapkerBadge, Applicant } from '@/types';

// ==========================================
// Levels System (1-10)
// ==========================================
export const LEVELS: TalapkerLevel[] = [
  { level: 1, title: { kk: 'Жаңадан бастаушы', ru: 'Новичок', en: 'Newcomer' }, minXp: 0, maxXp: 100, color: '#94A3B8', icon: 'Sprout' },
  { level: 2, title: { kk: 'Зерттеуші', ru: 'Исследователь', en: 'Explorer' }, minXp: 100, maxXp: 250, color: '#22C55E', icon: 'Compass' },
  { level: 3, title: { kk: 'Белсенді', ru: 'Активист', en: 'Activist' }, minXp: 250, maxXp: 500, color: '#3B82F6', icon: 'Zap' },
  { level: 4, title: { kk: 'Табанды', ru: 'Целеустремлённый', en: 'Determined' }, minXp: 500, maxXp: 850, color: '#8B5CF6', icon: 'Target' },
  { level: 5, title: { kk: 'Жетістікке жеткен', ru: 'Достигатель', en: 'Achiever' }, minXp: 850, maxXp: 1300, color: '#F59E0B', icon: 'Award' },
  { level: 6, title: { kk: 'Болашақ студент', ru: 'Будущий студент', en: 'Future Student' }, minXp: 1300, maxXp: 1850, color: '#EC4899', icon: 'GraduationCap' },
  { level: 7, title: { kk: 'Үміткер', ru: 'Претендент', en: 'Contender' }, minXp: 1850, maxXp: 2500, color: '#06B6D4', icon: 'Star' },
  { level: 8, title: { kk: 'Үздік үміткер', ru: 'Топ-претендент', en: 'Top Contender' }, minXp: 2500, maxXp: 3300, color: '#F43F5E', icon: 'Crown' },
  { level: 9, title: { kk: 'ZhezU таланты', ru: 'Талант ZhezU', en: 'ZhezU Talent' }, minXp: 3300, maxXp: 4200, color: '#E6B325', icon: 'Gem' },
  { level: 10, title: { kk: 'Болашақ көшбасшы', ru: 'Будущий лидер', en: 'Future Leader' }, minXp: 4200, maxXp: 9999, color: '#E6B325', icon: 'Trophy' },
];

// ==========================================
// Quests / Missions
// ==========================================
export const QUESTS: TalapkerQuest[] = [
  // Documents category
  {
    id: 'register',
    title: { kk: 'Порталға тіркелу', ru: 'Регистрация на портале', en: 'Register on Portal' },
    description: { kk: 'ZhezU порталына тіркеліп, профиліңізді толтырыңыз', ru: 'Зарегистрируйтесь на портале ZhezU и заполните профиль', en: 'Register on ZhezU portal and complete your profile' },
    category: 'documents',
    xpReward: 50,
    icon: 'UserPlus',
    difficulty: 'easy',
    required: true,
  },
  {
    id: 'upload-photo',
    title: { kk: 'Фото жүктеу', ru: 'Загрузить фото', en: 'Upload Photo' },
    description: { kk: 'Профильге сапалы фотосурет жүктеңіз', ru: 'Загрузите качественную фотографию в профиль', en: 'Upload a quality photo to your profile' },
    category: 'documents',
    xpReward: 30,
    icon: 'Camera',
    difficulty: 'easy',
  },
  {
    id: 'submit-docs',
    title: { kk: 'Құжаттарды тапсыру', ru: 'Подать документы', en: 'Submit Documents' },
    description: { kk: 'Қажетті құжаттардың толық пакетін жүктеңіз', ru: 'Загрузите полный пакет необходимых документов', en: 'Upload the complete package of required documents' },
    category: 'documents',
    xpReward: 200,
    icon: 'FileCheck',
    difficulty: 'hard',
    required: true,
  },
  {
    id: 'choose-program',
    title: { kk: 'Бағдарламаны таңдау', ru: 'Выбрать программу', en: 'Choose Program' },
    description: { kk: 'Оқу бағдарламасын таңдаңыз', ru: 'Выберите образовательную программу', en: 'Select an educational program' },
    category: 'documents',
    xpReward: 100,
    icon: 'BookOpen',
    difficulty: 'medium',
    required: true,
  },

  // Tests category
  {
    id: 'unt-practice-1',
    title: { kk: 'ҰБТ жаттығуы #1', ru: 'Практика ЕНТ #1', en: 'UNT Practice #1' },
    description: { kk: 'Бірінші пробное ҰБТ тестін өтіңіз', ru: 'Пройдите первый пробный тест ЕНТ', en: 'Complete first practice UNT test' },
    category: 'tests',
    xpReward: 100,
    icon: 'ClipboardList',
    difficulty: 'medium',
  },
  {
    id: 'unt-practice-2',
    title: { kk: 'ҰБТ жаттығуы #2', ru: 'Практика ЕНТ #2', en: 'UNT Practice #2' },
    description: { kk: 'Екінші пробное ҰБТ тестін өтіңіз', ru: 'Пройдите второй пробный тест ЕНТ', en: 'Complete second practice UNT test' },
    category: 'tests',
    xpReward: 100,
    icon: 'ClipboardCheck',
    difficulty: 'medium',
  },
  {
    id: 'unt-practice-3',
    title: { kk: 'ҰБТ жаттығуы #3', ru: 'Практика ЕНТ #3', en: 'UNT Practice #3' },
    description: { kk: 'Үшінші пробное ҰБТ тестін өтіңіз', ru: 'Пройдите третий пробный тест ЕНТ', en: 'Complete third practice UNT test' },
    category: 'tests',
    xpReward: 100,
    icon: 'FileText',
    difficulty: 'medium',
  },
  {
    id: 'program-quiz',
    title: { kk: 'Мамандық викторинасы', ru: 'Викторина по специальности', en: 'Program Quiz' },
    description: { kk: 'Таңдаған мамандығыңыз бойынша тест өтіңіз', ru: 'Пройдите тест по выбранной специальности', en: 'Take a quiz about your chosen program' },
    category: 'tests',
    xpReward: 150,
    icon: 'Brain',
    difficulty: 'hard',
  },

  // Explore category
  {
    id: 'virtual-tour',
    title: { kk: 'Виртуалды тур', ru: 'Виртуальный тур', en: 'Virtual Tour' },
    description: { kk: 'Университеттің виртуалды турына қатысыңыз', ru: 'Пройдите виртуальный тур по университету', en: 'Take a virtual tour of the university' },
    category: 'explore',
    xpReward: 75,
    icon: 'Eye',
    difficulty: 'easy',
  },
  {
    id: 'explore-programs',
    title: { kk: 'Бағдарламаларды зерттеу', ru: 'Изучить программы', en: 'Explore Programs' },
    description: { kk: 'Барлық оқу бағдарламаларын қараңыз', ru: 'Просмотрите все образовательные программы', en: 'Browse all educational programs' },
    category: 'explore',
    xpReward: 50,
    icon: 'Search',
    difficulty: 'easy',
  },
  {
    id: 'skill-map',
    title: { kk: 'Дағды картасын зерттеу', ru: 'Изучить карту навыков', en: 'Explore Skill Map' },
    description: { kk: 'Дағды картасын қарап, мансап жолдарын біліңіз', ru: 'Изучите карту навыков и узнайте о карьерных путях', en: 'Study skill map and learn about career paths' },
    category: 'explore',
    xpReward: 75,
    icon: 'Map',
    difficulty: 'easy',
  },
  {
    id: 'open-day',
    title: { kk: 'Ашық есік күніне қатысу', ru: 'Посетить день открытых дверей', en: 'Attend Open Day' },
    description: { kk: 'Университеттің ашық есік күніне тіркеліңіз', ru: 'Запишитесь на день открытых дверей', en: 'Register for university open day' },
    category: 'explore',
    xpReward: 150,
    icon: 'Calendar',
    difficulty: 'medium',
  },

  // Social category
  {
    id: 'join-telegram',
    title: { kk: 'Telegram-ға қосылу', ru: 'Вступить в Telegram', en: 'Join Telegram' },
    description: { kk: 'Абитуриенттер үшін Telegram-чатқа қосылыңыз', ru: 'Вступите в Telegram-чат для абитуриентов', en: 'Join Telegram chat for applicants' },
    category: 'social',
    xpReward: 50,
    icon: 'MessageCircle',
    difficulty: 'easy',
  },
  {
    id: 'invite-friend',
    title: { kk: 'Досыңызды шақыру', ru: 'Пригласить друга', en: 'Invite Friend' },
    description: { kk: 'Досыңызды ZhezU порталына шақырыңыз', ru: 'Пригласите друга на портал ZhezU', en: 'Invite a friend to ZhezU portal' },
    category: 'social',
    xpReward: 100,
    icon: 'UserPlus2',
    difficulty: 'medium',
  },
  {
    id: 'ask-question',
    title: { kk: 'Сұрақ қою', ru: 'Задать вопрос', en: 'Ask Question' },
    description: { kk: 'Қабылдау комиссиясына сұрақ қойыңыз', ru: 'Задайте вопрос приёмной комиссии', en: 'Ask a question to admissions office' },
    category: 'social',
    xpReward: 50,
    icon: 'HelpCircle',
    difficulty: 'easy',
  },

  // Special category
  {
    id: 'early-bird',
    title: { kk: 'Ерте құс', ru: 'Ранняя пташка', en: 'Early Bird' },
    description: { kk: 'Қабылдау ашылғаннан кейін алғашқы 100 талапкердің бірі болыңыз', ru: 'Станьте одним из первых 100 абитуриентов после открытия приёма', en: 'Be among first 100 applicants after admission opens' },
    category: 'special',
    xpReward: 300,
    icon: 'Sunrise',
    difficulty: 'hard',
  },
  {
    id: 'perfect-profile',
    title: { kk: 'Мінсіз профиль', ru: 'Идеальный профиль', en: 'Perfect Profile' },
    description: { kk: 'Профильдің барлық өрістерін толтырыңыз', ru: 'Заполните все поля профиля', en: 'Fill in all profile fields' },
    category: 'special',
    xpReward: 200,
    icon: 'CheckCircle2',
    difficulty: 'medium',
  },
];

// ==========================================
// Badges / Achievements
// ==========================================
export const BADGES: TalapkerBadge[] = [
  // Common badges
  {
    id: 'first-steps',
    title: { kk: 'Алғашқы қадамдар', ru: 'Первые шаги', en: 'First Steps' },
    description: { kk: 'Алғашқы квестті орындадыңыз', ru: 'Выполнили первый квест', en: 'Completed your first quest' },
    icon: 'Footprints',
    color: '#22C55E',
    rarity: 'common',
  },
  {
    id: 'explorer',
    title: { kk: 'Зерттеуші', ru: 'Исследователь', en: 'Explorer' },
    description: { kk: 'Барлық бөлімдерді қарадыңыз', ru: 'Просмотрели все разделы', en: 'Viewed all sections' },
    icon: 'Compass',
    color: '#3B82F6',
    rarity: 'common',
  },
  {
    id: 'social-butterfly',
    title: { kk: 'Қоғамдық көбелек', ru: 'Социальная бабочка', en: 'Social Butterfly' },
    description: { kk: 'Telegram чатқа қосылдыңыз', ru: 'Присоединились к Telegram чату', en: 'Joined Telegram chat' },
    icon: 'MessageCircle',
    color: '#06B6D4',
    rarity: 'common',
  },

  // Rare badges
  {
    id: 'document-master',
    title: { kk: 'Құжат шебері', ru: 'Мастер документов', en: 'Document Master' },
    description: { kk: 'Барлық құжаттарды жүктедіңіз', ru: 'Загрузили все документы', en: 'Uploaded all documents' },
    icon: 'FileStack',
    color: '#8B5CF6',
    rarity: 'rare',
  },
  {
    id: 'test-ace',
    title: { kk: 'Тест шебері', ru: 'Ас тестов', en: 'Test Ace' },
    description: { kk: 'Барлық пробный тесттерді өттіңіз', ru: 'Прошли все пробные тесты', en: 'Completed all practice tests' },
    icon: 'Award',
    color: '#F59E0B',
    rarity: 'rare',
  },
  {
    id: 'quick-learner',
    title: { kk: 'Жылдам үйренуші', ru: 'Быстрый ученик', en: 'Quick Learner' },
    description: { kk: '5-деңгейге 7 күн ішінде жеттіңіз', ru: 'Достигли 5 уровня за 7 дней', en: 'Reached level 5 within 7 days' },
    icon: 'Rocket',
    color: '#EC4899',
    rarity: 'rare',
  },

  // Epic badges
  {
    id: 'high-scorer',
    title: { kk: 'Жоғары балл', ru: 'Высокий балл', en: 'High Scorer' },
    description: { kk: 'Пробный ҰБТ-да 100+ балл жинадыңыз', ru: 'Набрали 100+ баллов на пробном ЕНТ', en: 'Scored 100+ on practice UNT' },
    icon: 'Flame',
    color: '#F43F5E',
    rarity: 'epic',
  },
  {
    id: 'completionist',
    title: { kk: 'Толық орындаушы', ru: 'Выполнивший всё', en: 'Completionist' },
    description: { kk: '15+ квест орындадыңыз', ru: 'Выполнили 15+ квестов', en: 'Completed 15+ quests' },
    icon: 'CheckCheck',
    color: '#E6B325',
    rarity: 'epic',
  },
  {
    id: 'influencer',
    title: { kk: 'Ықпал етуші', ru: 'Инфлюенсер', en: 'Influencer' },
    description: { kk: '5 досты шақырдыңыз', ru: 'Пригласили 5 друзей', en: 'Invited 5 friends' },
    icon: 'Users',
    color: '#8B5CF6',
    rarity: 'epic',
  },

  // Legendary badges
  {
    id: 'early-bird',
    title: { kk: 'Ерте құс', ru: 'Ранняя пташка', en: 'Early Bird' },
    description: { kk: 'Алғашқы 100 абитуриенттің бірі', ru: 'Один из первых 100 абитуриентов', en: 'One of the first 100 applicants' },
    icon: 'Sunrise',
    color: '#E6B325',
    rarity: 'legendary',
  },
  {
    id: 'future-leader',
    title: { kk: 'Болашақ көшбасшы', ru: 'Будущий лидер', en: 'Future Leader' },
    description: { kk: '10-деңгейге жеттіңіз', ru: 'Достигли 10 уровня', en: 'Reached level 10' },
    icon: 'Crown',
    color: '#E6B325',
    rarity: 'legendary',
  },
  {
    id: 'zhezu-champion',
    title: { kk: 'ZhezU чемпионы', ru: 'Чемпион ZhezU', en: 'ZhezU Champion' },
    description: { kk: 'Барлық квестті орындадыңыз және барлық бейдж алдыңыз', ru: 'Выполнили все квесты и получили все значки', en: 'Completed all quests and earned all badges' },
    icon: 'Trophy',
    color: '#E6B325',
    rarity: 'legendary',
  },
];

// ==========================================
// Mock Applicants Data
// ==========================================
export const APPLICANTS: Applicant[] = [
  {
    id: 'aizhan-01',
    name: 'Айжан Сериккызы',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    email: 'aizhan.s@mail.kz',
    targetProgram: '6B07101',
    targetDepartment: 'mining-metallurgy-science',
    level: 7,
    xp: 2150,
    untScore: 118,
    completedQuests: ['register', 'upload-photo', 'submit-docs', 'choose-program', 'unt-practice-1', 'unt-practice-2', 'unt-practice-3', 'virtual-tour', 'explore-programs', 'skill-map', 'join-telegram', 'perfect-profile'],
    earnedBadges: ['first-steps', 'explorer', 'social-butterfly', 'document-master', 'test-ace', 'high-scorer'],
    registrationDate: '2025-12-01',
    lastActive: '2026-02-05',
    city: 'Жезқазған',
    school: 'НИШ',
    graduationYear: 2026,
  },
  {
    id: 'nursultan-02',
    name: 'Нұрсұлтан Әлібеков',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    email: 'nursultan.a@mail.kz',
    targetProgram: '6B07201',
    targetDepartment: 'mining-metallurgy-science',
    level: 5,
    xp: 1100,
    untScore: 105,
    completedQuests: ['register', 'upload-photo', 'choose-program', 'unt-practice-1', 'virtual-tour', 'explore-programs', 'join-telegram'],
    earnedBadges: ['first-steps', 'explorer', 'social-butterfly'],
    registrationDate: '2025-12-15',
    lastActive: '2026-02-04',
    city: 'Сатпаев',
    school: 'СШ №5',
    graduationYear: 2026,
  },
  {
    id: 'dana-03',
    name: 'Дана Қасымова',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    email: 'dana.k@mail.kz',
    targetProgram: '6B01301',
    targetDepartment: 'pedagogy-philology',
    level: 8,
    xp: 2800,
    untScore: 125,
    completedQuests: ['register', 'upload-photo', 'submit-docs', 'choose-program', 'unt-practice-1', 'unt-practice-2', 'unt-practice-3', 'program-quiz', 'virtual-tour', 'explore-programs', 'skill-map', 'open-day', 'join-telegram', 'invite-friend', 'ask-question', 'early-bird', 'perfect-profile'],
    earnedBadges: ['first-steps', 'explorer', 'social-butterfly', 'document-master', 'test-ace', 'quick-learner', 'high-scorer', 'completionist', 'early-bird'],
    registrationDate: '2025-11-20',
    lastActive: '2026-02-05',
    city: 'Қарағанды',
    school: 'БИЛ',
    graduationYear: 2026,
  },
  {
    id: 'arman-04',
    name: 'Арман Тұрсынов',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    email: 'arman.t@mail.kz',
    targetProgram: '6B07301',
    targetDepartment: 'electrical-safety',
    level: 3,
    xp: 380,
    completedQuests: ['register', 'upload-photo', 'choose-program', 'explore-programs', 'join-telegram'],
    earnedBadges: ['first-steps', 'social-butterfly'],
    registrationDate: '2026-01-10',
    lastActive: '2026-02-03',
    city: 'Жезқазған',
    school: 'СШ №12',
    graduationYear: 2026,
  },
  {
    id: 'madina-05',
    name: 'Мадина Ержанова',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    email: 'madina.e@mail.kz',
    targetProgram: '6B04101',
    targetDepartment: 'history-economics-law',
    level: 6,
    xp: 1500,
    untScore: 112,
    completedQuests: ['register', 'upload-photo', 'submit-docs', 'choose-program', 'unt-practice-1', 'unt-practice-2', 'virtual-tour', 'explore-programs', 'skill-map', 'open-day', 'join-telegram', 'perfect-profile'],
    earnedBadges: ['first-steps', 'explorer', 'social-butterfly', 'document-master'],
    registrationDate: '2025-12-20',
    lastActive: '2026-02-05',
    city: 'Нұр-Сұлтан',
    school: 'НИШ ФМН',
    graduationYear: 2026,
  },
];

// ==========================================
// Helper Functions
// ==========================================

export function getLevelInfo(xp: number): TalapkerLevel {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getXpProgress(xp: number): { current: number; max: number; percentage: number } {
  const level = getLevelInfo(xp);
  const current = xp - level.minXp;
  const max = level.maxXp - level.minXp;
  const percentage = Math.min((current / max) * 100, 100);
  return { current, max, percentage };
}

export function getQuestsByCategory(category: TalapkerQuest['category']): TalapkerQuest[] {
  return QUESTS.filter((q) => q.category === category);
}

export function getBadgesByRarity(rarity: TalapkerBadge['rarity']): TalapkerBadge[] {
  return BADGES.filter((b) => b.rarity === rarity);
}

export function getCompletedQuestsCount(applicant: Applicant): number {
  return applicant.completedQuests.length;
}

export function getTotalQuestsCount(): number {
  return QUESTS.length;
}

export function getRequiredQuestsCompleted(applicant: Applicant): { completed: number; total: number } {
  const requiredQuests = QUESTS.filter((q) => q.required);
  const completed = requiredQuests.filter((q) => applicant.completedQuests.includes(q.id)).length;
  return { completed, total: requiredQuests.length };
}
