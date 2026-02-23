/**
 * ══════════════════════════════════════════════════════════════════════════════
 * LIFECYCLE DATA - Квесты, достижения и профили для всех этапов
 * ══════════════════════════════════════════════════════════════════════════════
 */

import type {
  LifecycleQuest,
  Achievement,
  StudentProfile,
} from './student-lifecycle';

// ════════════════════════════════════════════════════════════════════════════
// КВЕСТЫ: ТАЛАПКЕР (APPLICANT)
// ════════════════════════════════════════════════════════════════════════════

export const APPLICANT_QUESTS: LifecycleQuest[] = [
  // ─── Документы ───
  {
    id: 'app-doc-1',
    title: { kk: 'Профиль құру', ru: 'Создать профиль', en: 'Create Profile' },
    description: { kk: 'Толық профиль құрыңыз', ru: 'Заполните профиль полностью', en: 'Complete your profile' },
    stage: 'applicant',
    category: 'documents',
    xpReward: 50,
    difficulty: 'easy',
    required: true,
    icon: 'UserPlus',
    color: '#3B82F6',
  },
  {
    id: 'app-doc-2',
    title: { kk: 'ЖСН жүктеу', ru: 'Загрузить ИИН', en: 'Upload IIN' },
    description: { kk: 'Жеке сәйкестендіру нөмірін жүктеңіз', ru: 'Загрузите индивидуальный идентификационный номер', en: 'Upload your individual identification number' },
    stage: 'applicant',
    category: 'documents',
    xpReward: 100,
    difficulty: 'easy',
    required: true,
    icon: 'FileCheck',
    color: '#3B82F6',
  },
  {
    id: 'app-doc-3',
    title: { kk: 'Аттестат жүктеу', ru: 'Загрузить аттестат', en: 'Upload Certificate' },
    description: { kk: 'Мектеп аттестатын жүктеңіз', ru: 'Загрузите школьный аттестат', en: 'Upload your school certificate' },
    stage: 'applicant',
    category: 'documents',
    xpReward: 150,
    difficulty: 'medium',
    required: true,
    icon: 'Award',
    color: '#3B82F6',
  },
  {
    id: 'app-doc-4',
    title: { kk: 'Медициналық анықтама', ru: 'Медицинская справка', en: 'Medical Certificate' },
    description: { kk: 'Денсаулық анықтамасын жүктеңіз (086-У)', ru: 'Загрузите справку о здоровье (086-У)', en: 'Upload health certificate (086-U)' },
    stage: 'applicant',
    category: 'documents',
    xpReward: 100,
    difficulty: 'medium',
    required: true,
    icon: 'Heart',
    color: '#3B82F6',
  },

  // ─── Тесты ───
  {
    id: 'app-test-1',
    title: { kk: 'ЕНТ тіркелу', ru: 'Регистрация на ЕНТ', en: 'UNT Registration' },
    description: { kk: 'Ұлттық тестілеуге тіркеліңіз', ru: 'Зарегистрируйтесь на Единое национальное тестирование', en: 'Register for the Unified National Test' },
    stage: 'applicant',
    category: 'tests',
    xpReward: 100,
    difficulty: 'easy',
    required: true,
    icon: 'ClipboardList',
    color: '#F59E0B',
  },
  {
    id: 'app-test-2',
    title: { kk: 'Пробный ЕНТ өту', ru: 'Пройти пробный ЕНТ', en: 'Take Practice UNT' },
    description: { kk: 'Онлайн пробный тест тапсырыңыз', ru: 'Пройдите онлайн пробный тест', en: 'Complete an online practice test' },
    stage: 'applicant',
    category: 'tests',
    xpReward: 200,
    difficulty: 'medium',
    required: false,
    icon: 'Target',
    color: '#F59E0B',
    skillRewards: [{ skillId: 'test-taking', percentage: 10 }],
  },
  {
    id: 'app-test-3',
    title: { kk: 'ЕНТ 80+ балл', ru: 'ЕНТ 80+ баллов', en: 'UNT 80+ Score' },
    description: { kk: 'ЕНТ-де 80+ балл жинаңыз', ru: 'Наберите 80+ баллов на ЕНТ', en: 'Score 80+ on UNT' },
    stage: 'applicant',
    category: 'tests',
    xpReward: 500,
    difficulty: 'hard',
    required: false,
    icon: 'Trophy',
    color: '#F59E0B',
    achievementReward: 'ach-unt-80',
    autoComplete: { type: 'unt_score', condition: '>=80' },
  },
  {
    id: 'app-test-4',
    title: { kk: 'ЕНТ 100+ балл', ru: 'ЕНТ 100+ баллов', en: 'UNT 100+ Score' },
    description: { kk: 'ЕНТ-де 100+ балл жинаңыз', ru: 'Наберите 100+ баллов на ЕНТ', en: 'Score 100+ on UNT' },
    stage: 'applicant',
    category: 'tests',
    xpReward: 1000,
    difficulty: 'epic',
    required: false,
    icon: 'Star',
    color: '#E6B325',
    achievementReward: 'ach-unt-100',
    autoComplete: { type: 'unt_score', condition: '>=100' },
  },

  // ─── Исследование ───
  {
    id: 'app-explore-1',
    title: { kk: 'Виртуалды тур', ru: 'Виртуальный тур', en: 'Virtual Tour' },
    description: { kk: 'Кампустың виртуалды турын қараңыз', ru: 'Просмотрите виртуальный тур кампуса', en: 'Watch the campus virtual tour' },
    stage: 'applicant',
    category: 'explore',
    xpReward: 75,
    difficulty: 'easy',
    required: false,
    icon: 'Video',
    color: '#22C55E',
  },
  {
    id: 'app-explore-2',
    title: { kk: 'Ашық есік күні', ru: 'День открытых дверей', en: 'Open House Day' },
    description: { kk: 'Ашық есік күніне қатысыңыз', ru: 'Посетите день открытых дверей', en: 'Attend the open house event' },
    stage: 'applicant',
    category: 'explore',
    xpReward: 200,
    difficulty: 'medium',
    required: false,
    icon: 'DoorOpen',
    color: '#22C55E',
  },
  {
    id: 'app-explore-3',
    title: { kk: 'Бағдарлама таңдау', ru: 'Выбрать программу', en: 'Choose Program' },
    description: { kk: 'Оқу бағдарламасын таңдаңыз', ru: 'Выберите образовательную программу', en: 'Select your educational program' },
    stage: 'applicant',
    category: 'explore',
    xpReward: 150,
    difficulty: 'medium',
    required: true,
    icon: 'GraduationCap',
    color: '#22C55E',
  },
  {
    id: 'app-explore-4',
    title: { kk: 'Кафедрамен кездесу', ru: 'Встреча с кафедрой', en: 'Meet the Department' },
    description: { kk: 'Кафедра оқытушысымен онлайн кездесіңіз', ru: 'Проведите онлайн-встречу с преподавателем кафедры', en: 'Have an online meeting with a department professor' },
    stage: 'applicant',
    category: 'explore',
    xpReward: 250,
    difficulty: 'medium',
    required: false,
    icon: 'Users',
    color: '#22C55E',
  },

  // ─── Социальные ───
  {
    id: 'app-social-1',
    title: { kk: 'Telegram қосылу', ru: 'Вступить в Telegram', en: 'Join Telegram' },
    description: { kk: 'ZhezU талапкерлер чатына қосылыңыз', ru: 'Вступите в чат абитуриентов ZhezU', en: 'Join the ZhezU applicants chat' },
    stage: 'applicant',
    category: 'social',
    xpReward: 50,
    difficulty: 'easy',
    required: false,
    icon: 'MessageCircle',
    color: '#8B5CF6',
  },
  {
    id: 'app-social-2',
    title: { kk: 'Студентпен сөйлесу', ru: 'Поговорить со студентом', en: 'Chat with Student' },
    description: { kk: 'Қазіргі студентпен кеңес алыңыз', ru: 'Получите совет от действующего студента', en: 'Get advice from a current student' },
    stage: 'applicant',
    category: 'social',
    xpReward: 150,
    difficulty: 'medium',
    required: false,
    icon: 'UserCheck',
    color: '#8B5CF6',
  },
  {
    id: 'app-social-3',
    title: { kk: 'Дос шақыру', ru: 'Пригласить друга', en: 'Invite a Friend' },
    description: { kk: 'Досыңызды ZhezU Talapker-ге шақырыңыз', ru: 'Пригласите друга в ZhezU Talapker', en: 'Invite a friend to ZhezU Talapker' },
    stage: 'applicant',
    category: 'social',
    xpReward: 200,
    difficulty: 'easy',
    required: false,
    icon: 'UserPlus',
    color: '#8B5CF6',
    achievementReward: 'ach-referral',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// КВЕСТЫ: СТУДЕНТ (STUDENT)
// ════════════════════════════════════════════════════════════════════════════

export const STUDENT_QUESTS: LifecycleQuest[] = [
  // ─── 1 курс: Академические ───
  {
    id: 'stu-1-acad-1',
    title: { kk: 'Бірінші сессия', ru: 'Первая сессия', en: 'First Session' },
    description: { kk: 'Бірінші сессияны сәтті тапсырыңыз', ru: 'Успешно сдайте первую сессию', en: 'Successfully pass your first session' },
    stage: 'student',
    year: 1,
    category: 'academic',
    xpReward: 500,
    difficulty: 'medium',
    required: true,
    icon: 'BookOpen',
    color: '#3B82F6',
    autoComplete: { type: 'gpa_threshold', condition: '>=2.0' },
  },
  {
    id: 'stu-1-acad-2',
    title: { kk: 'GPA 3.0+', ru: 'GPA 3.0+', en: 'GPA 3.0+' },
    description: { kk: 'Бірінші жылда GPA 3.0+ алыңыз', ru: 'Получите GPA 3.0+ в первый год', en: 'Achieve GPA 3.0+ in first year' },
    stage: 'student',
    year: 1,
    category: 'academic',
    xpReward: 750,
    difficulty: 'hard',
    required: false,
    icon: 'TrendingUp',
    color: '#3B82F6',
    achievementReward: 'ach-gpa-3',
    autoComplete: { type: 'gpa_threshold', condition: '>=3.0' },
  },

  // ─── 1 курс: Навыки ───
  {
    id: 'stu-1-skill-1',
    title: { kk: 'AutoCAD негіздері', ru: 'Основы AutoCAD', en: 'AutoCAD Basics' },
    description: { kk: 'AutoCAD бағдарламасының негіздерін үйреніңіз', ru: 'Изучите основы программы AutoCAD', en: 'Learn the basics of AutoCAD software' },
    stage: 'student',
    year: 1,
    category: 'skills',
    xpReward: 300,
    difficulty: 'medium',
    required: false,
    icon: 'PenTool',
    color: '#E6B325',
    skillRewards: [{ skillId: 'autocad', percentage: 30 }],
  },
  {
    id: 'stu-1-skill-2',
    title: { kk: 'Python негіздері', ru: 'Основы Python', en: 'Python Basics' },
    description: { kk: 'Python бағдарламалау тілін үйреніңіз', ru: 'Изучите язык программирования Python', en: 'Learn Python programming language' },
    stage: 'student',
    year: 1,
    category: 'skills',
    xpReward: 400,
    difficulty: 'medium',
    required: false,
    icon: 'Code',
    color: '#E6B325',
    skillRewards: [{ skillId: 'python', percentage: 25 }],
  },

  // ─── 2 курс: Карьера ───
  {
    id: 'stu-2-car-1',
    title: { kk: 'Бірінші стажировка', ru: 'Первая стажировка', en: 'First Internship' },
    description: { kk: 'Жазғы стажировкадан өтіңіз', ru: 'Пройдите летнюю стажировку', en: 'Complete a summer internship' },
    stage: 'student',
    year: 2,
    category: 'career',
    xpReward: 1000,
    difficulty: 'hard',
    required: false,
    icon: 'Briefcase',
    color: '#F59E0B',
    achievementReward: 'ach-first-intern',
    autoComplete: { type: 'internship', condition: 'any' },
  },
  {
    id: 'stu-2-car-2',
    title: { kk: 'CV құру', ru: 'Создать CV', en: 'Create CV' },
    description: { kk: 'Кәсіби түйіндеме жасаңыз', ru: 'Создайте профессиональное резюме', en: 'Create a professional resume' },
    stage: 'student',
    year: 2,
    category: 'career',
    xpReward: 200,
    difficulty: 'easy',
    required: true,
    icon: 'FileText',
    color: '#F59E0B',
  },

  // ─── 2-3 курс: Исследования ───
  {
    id: 'stu-2-res-1',
    title: { kk: 'Ғылыми мақала', ru: 'Научная статья', en: 'Research Paper' },
    description: { kk: 'Бірінші ғылыми мақаланы жариялаңыз', ru: 'Опубликуйте первую научную статью', en: 'Publish your first research paper' },
    stage: 'student',
    year: 2,
    category: 'research',
    xpReward: 1500,
    difficulty: 'epic',
    required: false,
    icon: 'FileText',
    color: '#22C55E',
    achievementReward: 'ach-first-paper',
  },
  {
    id: 'stu-3-res-1',
    title: { kk: 'Конференция баяндамасы', ru: 'Доклад на конференции', en: 'Conference Presentation' },
    description: { kk: 'Ғылыми конференцияда баяндама жасаңыз', ru: 'Выступите с докладом на научной конференции', en: 'Present at a scientific conference' },
    stage: 'student',
    year: 3,
    category: 'research',
    xpReward: 800,
    difficulty: 'hard',
    required: false,
    icon: 'Presentation',
    color: '#22C55E',
  },

  // ─── 3 курс: Лидерство ───
  {
    id: 'stu-3-lead-1',
    title: { kk: 'Студенттік кеңес', ru: 'Студсовет', en: 'Student Council' },
    description: { kk: 'Студенттік кеңеске мүше болыңыз', ru: 'Станьте членом студсовета', en: 'Become a student council member' },
    stage: 'student',
    year: 3,
    category: 'leadership',
    xpReward: 600,
    difficulty: 'medium',
    required: false,
    icon: 'Users',
    color: '#8B5CF6',
    skillRewards: [{ skillId: 'leadership', percentage: 20 }],
  },
  {
    id: 'stu-3-lead-2',
    title: { kk: 'Mentor болу', ru: 'Стать ментором', en: 'Become a Mentor' },
    description: { kk: '1-курс студенттеріне ментор болыңыз', ru: 'Станьте ментором для первокурсников', en: 'Become a mentor for freshmen' },
    stage: 'student',
    year: 3,
    category: 'leadership',
    xpReward: 500,
    difficulty: 'medium',
    required: false,
    icon: 'UserCheck',
    color: '#8B5CF6',
    achievementReward: 'ach-mentor',
  },

  // ─── 4 курс ───
  {
    id: 'stu-4-thesis-1',
    title: { kk: 'Дипломдық жұмыс тақырыбы', ru: 'Тема дипломной работы', en: 'Thesis Topic' },
    description: { kk: 'Дипломдық жұмыс тақырыбын бекітіңіз', ru: 'Утвердите тему дипломной работы', en: 'Approve your thesis topic' },
    stage: 'student',
    year: 4,
    category: 'academic',
    xpReward: 300,
    difficulty: 'medium',
    required: true,
    icon: 'FileEdit',
    color: '#3B82F6',
  },
  {
    id: 'stu-4-thesis-2',
    title: { kk: 'Дипломды қорғау', ru: 'Защита диплома', en: 'Thesis Defense' },
    description: { kk: 'Дипломдық жұмысты сәтті қорғаңыз', ru: 'Успешно защитите дипломную работу', en: 'Successfully defend your thesis' },
    stage: 'student',
    year: 4,
    category: 'academic',
    xpReward: 2000,
    difficulty: 'epic',
    required: true,
    icon: 'Award',
    color: '#E6B325',
    achievementReward: 'ach-thesis-defense',
  },
  {
    id: 'stu-4-job-1',
    title: { kk: 'Жұмысқа орналасу', ru: 'Трудоустройство', en: 'Get Employed' },
    description: { kk: 'Түлектер күніне дейін жұмысқа орналасыңыз', ru: 'Трудоустройтесь до дня выпуска', en: 'Get employed before graduation day' },
    stage: 'student',
    year: 4,
    category: 'career',
    xpReward: 1500,
    difficulty: 'hard',
    required: false,
    icon: 'Building2',
    color: '#22C55E',
    achievementReward: 'ach-employed',
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ВСЕ КВЕСТЫ
// ════════════════════════════════════════════════════════════════════════════

export const ALL_QUESTS: LifecycleQuest[] = [...APPLICANT_QUESTS, ...STUDENT_QUESTS];

// ════════════════════════════════════════════════════════════════════════════
// ДОСТИЖЕНИЯ
// ════════════════════════════════════════════════════════════════════════════

export const ACHIEVEMENTS: Achievement[] = [
  // ─── Талапкер ───
  {
    id: 'ach-unt-80',
    title: { kk: 'ЕНТ жұлдызы', ru: 'Звезда ЕНТ', en: 'UNT Star' },
    description: { kk: 'ЕНТ-де 80+ балл алдыңыз', ru: 'Набрали 80+ баллов на ЕНТ', en: 'Scored 80+ on UNT' },
    icon: 'Star',
    color: '#F59E0B',
    type: 'academic',
    rarity: 'rare',
    verification: 'external',
    awardedAt: '',
    linkedStage: 'applicant',
    xpReward: 500,
  },
  {
    id: 'ach-unt-100',
    title: { kk: 'ЕНТ чемпионы', ru: 'Чемпион ЕНТ', en: 'UNT Champion' },
    description: { kk: 'ЕНТ-де 100+ балл алдыңыз', ru: 'Набрали 100+ баллов на ЕНТ', en: 'Scored 100+ on UNT' },
    icon: 'Trophy',
    color: '#E6B325',
    type: 'academic',
    rarity: 'legendary',
    verification: 'external',
    awardedAt: '',
    linkedStage: 'applicant',
    xpReward: 1000,
  },
  {
    id: 'ach-referral',
    title: { kk: 'Елші', ru: 'Амбассадор', en: 'Ambassador' },
    description: { kk: 'Досыңызды ZhezU-ге шақырдыңыз', ru: 'Пригласили друга в ZhezU', en: 'Invited a friend to ZhezU' },
    icon: 'UserPlus',
    color: '#8B5CF6',
    type: 'social',
    rarity: 'common',
    verification: 'university',
    awardedAt: '',
    linkedStage: 'applicant',
    xpReward: 200,
  },

  // ─── Студент ───
  {
    id: 'ach-gpa-3',
    title: { kk: 'Үздік студент', ru: 'Отличник', en: 'Honor Student' },
    description: { kk: 'GPA 3.0+ алдыңыз', ru: 'Получили GPA 3.0+', en: 'Achieved GPA 3.0+' },
    icon: 'Award',
    color: '#3B82F6',
    type: 'academic',
    rarity: 'rare',
    verification: 'university',
    awardedAt: '',
    linkedStage: 'student',
    xpReward: 750,
  },
  {
    id: 'ach-first-intern',
    title: { kk: 'Бірінші тәжірибе', ru: 'Первый опыт', en: 'First Experience' },
    description: { kk: 'Бірінші стажировкадан өттіңіз', ru: 'Прошли первую стажировку', en: 'Completed first internship' },
    icon: 'Briefcase',
    color: '#F59E0B',
    type: 'professional',
    rarity: 'rare',
    verification: 'partner',
    verifiedBy: 'Career Center',
    awardedAt: '',
    linkedStage: 'student',
    linkedYear: 2,
    xpReward: 1000,
  },
  {
    id: 'ach-first-paper',
    title: { kk: 'Зерттеуші', ru: 'Исследователь', en: 'Researcher' },
    description: { kk: 'Бірінші ғылыми мақаланы жариялдыңыз', ru: 'Опубликовали первую научную статью', en: 'Published first research paper' },
    icon: 'FileText',
    color: '#22C55E',
    type: 'research',
    rarity: 'epic',
    verification: 'external',
    awardedAt: '',
    linkedStage: 'student',
    xpReward: 1500,
  },
  {
    id: 'ach-mentor',
    title: { kk: 'Жол көрсетуші', ru: 'Наставник', en: 'Guide' },
    description: { kk: 'Кіші курс студенттеріне ментор болдыңыз', ru: 'Стали ментором для младших курсов', en: 'Became a mentor for junior students' },
    icon: 'Users',
    color: '#8B5CF6',
    type: 'leadership',
    rarity: 'rare',
    verification: 'university',
    awardedAt: '',
    linkedStage: 'student',
    linkedYear: 3,
    xpReward: 500,
  },
  {
    id: 'ach-thesis-defense',
    title: { kk: 'Бакалавр', ru: 'Бакалавр', en: 'Bachelor' },
    description: { kk: 'Дипломдық жұмысты сәтті қорғадыңыз', ru: 'Успешно защитили дипломную работу', en: 'Successfully defended thesis' },
    icon: 'GraduationCap',
    color: '#E6B325',
    type: 'academic',
    rarity: 'epic',
    verification: 'university',
    awardedAt: '',
    linkedStage: 'student',
    linkedYear: 4,
    xpReward: 2000,
  },
  {
    id: 'ach-employed',
    title: { kk: 'Жұмыс тапқан', ru: 'Трудоустроен', en: 'Employed' },
    description: { kk: 'Түлектер күніне дейін жұмысқа орналастыңыз', ru: 'Трудоустроились до выпуска', en: 'Got employed before graduation' },
    icon: 'Building2',
    color: '#22C55E',
    type: 'professional',
    rarity: 'rare',
    verification: 'partner',
    awardedAt: '',
    linkedStage: 'student',
    linkedYear: 4,
    xpReward: 1500,
  },

  // ─── Professional Certificates ───
  {
    id: 'ach-safety-cert',
    title: { kk: 'Қауіпсіздік сертификаты', ru: 'Сертификат безопасности', en: 'Safety Certificate' },
    description: { kk: 'Өнеркәсіптік қауіпсіздік сертификатын алдыңыз', ru: 'Получили сертификат промышленной безопасности', en: 'Obtained industrial safety certificate' },
    icon: 'Shield',
    color: '#EF4444',
    type: 'professional',
    rarity: 'rare',
    verification: 'partner',
    verifiedBy: 'Kazakhmys Corporation',
    awardedAt: '',
    linkedStage: 'student',
    xpReward: 800,
  },
  {
    id: 'ach-python-cert',
    title: { kk: 'Python маманы', ru: 'Специалист Python', en: 'Python Specialist' },
    description: { kk: 'Python сертификатын алдыңыз', ru: 'Получили сертификат Python', en: 'Obtained Python certification' },
    icon: 'Code',
    color: '#3B82F6',
    type: 'professional',
    rarity: 'rare',
    verification: 'external',
    awardedAt: '',
    linkedStage: 'student',
    xpReward: 600,
  },
  {
    id: 'ach-best-capstone',
    title: { kk: 'Үздік дипломдық жоба', ru: 'Лучший капстоун проект', en: 'Best Capstone Project' },
    description: { kk: 'Жылдың үздік дипломдық жобасы', ru: 'Лучший дипломный проект года', en: 'Best capstone project of the year' },
    icon: 'Trophy',
    color: '#E6B325',
    type: 'academic',
    rarity: 'legendary',
    verification: 'university',
    verifiedBy: 'Engineering Dept.',
    awardedAt: '2023-06-15',
    linkedStage: 'student',
    linkedYear: 4,
    xpReward: 2500,
  },
];

// ════════════════════════════════════════════════════════════════════════════
// ПРИМЕРЫ ПРОФИЛЕЙ
// ════════════════════════════════════════════════════════════════════════════

/** Айжан Ахметова - 4 курс (как на скриншоте) */
export const AIZHAN_PROFILE: StudentProfile = {
  id: 'aizhan-001',
  name: 'Айжан Ахметова',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  email: 'aizhan.akhmetova@student.zhezu.edu.kz',
  phone: '+7 777 123 4567',

  stage: 'student',
  year: 4,

  education: {
    program: '6B07201',
    department: 'mining',
    enrollmentYear: 2022,
    expectedGraduation: 2026,
    gpa: 3.8,
    classRank: 'Top 5%',
    credits: 220,
  },

  preUniversity: {
    school: 'СШ №1 им. Абая',
    city: 'Жезказган',
    graduationYear: 2022,
    untScore: 98,
    olympiads: [
      { name: 'Областная олимпиада по физике', place: 2, year: 2021 },
    ],
  },

  gamification: {
    level: 19,
    xp: 11500,
    completedQuests: [
      'app-doc-1', 'app-doc-2', 'app-doc-3', 'app-doc-4',
      'app-test-1', 'app-test-2', 'app-test-3',
      'app-explore-1', 'app-explore-2', 'app-explore-3', 'app-explore-4',
      'app-social-1', 'app-social-2',
      'stu-1-acad-1', 'stu-1-acad-2', 'stu-1-skill-1', 'stu-1-skill-2',
      'stu-2-car-1', 'stu-2-car-2', 'stu-2-res-1',
      'stu-3-res-1', 'stu-3-lead-1', 'stu-3-lead-2',
      'stu-4-thesis-1',
    ],
    earnedAchievements: [
      'ach-unt-80', 'ach-gpa-3', 'ach-first-intern', 'ach-first-paper',
      'ach-mentor', 'ach-safety-cert', 'ach-python-cert', 'ach-best-capstone',
    ],
    currentStreak: 15,
    longestStreak: 45,
  },

  skills: [
    { id: 'geo-modeling', name: { kk: 'Геологиялық модельдеу', ru: 'Геологическое моделирование', en: 'Geological Modelling' }, categoryId: 'technical', level: 'expert', percentage: 95, verifiedBy: 'Micromine Certificate', source: 'certificate' },
    { id: 'data-analysis', name: { kk: 'Деректерді талдау', ru: 'Анализ данных', en: 'Data Analysis' }, categoryId: 'technical', level: 'advanced', percentage: 85, source: 'course' },
    { id: 'python', name: { kk: 'Python/Pandas', ru: 'Python/Pandas', en: 'Python/Pandas' }, categoryId: 'tools', level: 'advanced', percentage: 80, verifiedBy: 'Python Institute', source: 'certificate' },
    { id: 'project-mgmt', name: { kk: 'Жобаларды басқару', ru: 'Управление проектами', en: 'Project Management' }, categoryId: 'soft', level: 'intermediate', percentage: 65, source: 'internship' },
    { id: 'safety', name: { kk: 'Өнеркәсіптік қауіпсіздік', ru: 'Промышленная безопасность', en: 'Industrial Safety' }, categoryId: 'technical', level: 'certified', percentage: 100, verifiedBy: 'Kazakhmys Corporation', source: 'certificate' },
  ],

  skillRadar: {
    technical: 90,
    tools: 85,
    softSkills: 75,
    leadership: 80,
    language: 85,
    safety: 100,
  },

  experiences: [
    {
      id: 'exp-1',
      company: 'Kazakhmys Corporation',
      companyLogo: '/images/partners/kazakhmys.png',
      position: { kk: 'Геология тағылымдамасы', ru: 'Стажёр-геолог', en: 'Geology Intern' },
      type: 'internship',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      current: false,
      description: { kk: 'Геологиялық деректерді талдау', ru: 'Анализ геологических данных и моделирование', en: 'Geological data analysis and modeling' },
      skills: ['geo-modeling', 'data-analysis'],
      achievements: ['ach-first-intern', 'ach-safety-cert'],
      location: 'Жезказган',
    },
    {
      id: 'exp-2',
      company: 'ZhezU Research Lab',
      position: { kk: 'Зерттеуші', ru: 'Исследователь', en: 'Research Assistant' },
      type: 'research',
      startDate: '2024-01-01',
      current: true,
      description: { kk: 'ML қолдану арқылы кен өндіруді оңтайландыру', ru: 'Оптимизация добычи руды с использованием ML', en: 'Ore extraction optimization using ML' },
      skills: ['python', 'data-analysis'],
      location: 'Жезказган',
    },
  ],

  portfolio: [
    {
      id: 'port-1',
      title: { kk: 'ML арқылы кен өндіруді оңтайландыру', ru: 'Оптимизация добычи руды с помощью ML', en: 'Optimization of Ore Extraction using ML' },
      description: { kk: 'Python және Random Forest алгоритмдерін қолдана отырып болжамдық модель әзірледім', ru: 'Разработала предиктивную модель с использованием Python и алгоритмов Random Forest', en: 'Developed a predictive model using Python and Random Forest algorithms to optimize drilling patterns' },
      type: 'research',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      year: 2023,
      links: [
        { type: 'paper', url: '#', label: { kk: 'Мақаланы оқу', ru: 'Читать статью', en: 'Read Paper' } },
        { type: 'github', url: '#', label: { kk: 'Деректер', ru: 'Данные', en: 'View Data' } },
      ],
      tags: ['Machine Learning', 'Python', 'Mining'],
      featured: true,
    },
    {
      id: 'port-2',
      title: { kk: 'Терең шахталар үшін желдету жүйесін қайта жобалау', ru: 'Редизайн системы вентиляции для глубоких шахт', en: 'Ventilation System Redesign for Deep Mines' },
      description: { kk: 'Жезқазған кен орны үшін энергия үнемдейтін желдету жүйесі', ru: 'Энергоэффективная вентиляционная система для Жезказганского комплекса', en: 'Energy-efficient ventilation network for Zhezkazgan Complex underground operations' },
      type: 'project',
      thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      year: 2022,
      links: [
        { type: 'presentation', url: '#', label: { kk: 'Презентация', ru: 'Презентация', en: 'View Presentation' } },
      ],
      collaborators: ['Олжас Касымов', 'Дана Сериккызы'],
      tags: ['Ventilation', 'Engineering', 'Energy Efficiency'],
      featured: true,
    },
  ],

  languages: [
    { language: 'kazakh', level: 'native' },
    { language: 'russian', level: 'native' },
    { language: 'english', level: 'C1', certificate: 'IELTS 7.5' },
  ],

  professionalSummary: {
    kk: 'Айжан геологиялық деректерді талдау және Python сценарийлері бойынша ерекше қабілеті бар студент. 2023 жылғы Kazakhmys стажировкасында көшбасшылық қасиеттерін көрсетті.',
    ru: 'Айжан демонстрирует исключительные способности в анализе геологических данных и Python-скриптах, с подтверждённым лидерским потенциалом во время стажировки в Kazakhmys 2023.',
    en: 'Aizhan demonstrates exceptional aptitude in geological data analysis and Python scripting, with a proven track record in leadership during the 2023 Kazakhmys internship. Her capstone research indicates strong potential for roles in Process Optimization and Mining Automation.',
  },

  availability: {
    forInternship: true,
    forFullTime: true,
    forMentoring: true,
    relocationReady: false,
  },

  registrationDate: '2021-03-15',
  lastActive: '2024-01-20',
  profileCompleteness: 95,
  isVerified: true,
  isTopTalent: true,
};

/** Нурсултан - 1 курс (начинающий студент) */
export const NURSULTAN_PROFILE: StudentProfile = {
  id: 'nursultan-002',
  name: 'Нурсултан Омаров',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  email: 'nursultan.omarov@student.zhezu.edu.kz',

  stage: 'student',
  year: 1,

  education: {
    program: '6B07101',
    department: 'metallurgy',
    enrollmentYear: 2025,
    expectedGraduation: 2029,
    gpa: 3.2,
    credits: 60,
  },

  preUniversity: {
    school: 'Назарбаев Интеллектуальная школа',
    city: 'Караганда',
    graduationYear: 2025,
    untScore: 85,
  },

  gamification: {
    level: 12,
    xp: 1800,
    completedQuests: [
      'app-doc-1', 'app-doc-2', 'app-doc-3', 'app-doc-4',
      'app-test-1', 'app-test-2', 'app-test-3',
      'app-explore-1', 'app-explore-3',
      'app-social-1',
      'stu-1-acad-1',
    ],
    earnedAchievements: ['ach-unt-80', 'ach-gpa-3'],
    currentStreak: 7,
    longestStreak: 14,
  },

  skills: [
    { id: 'chemistry', name: { kk: 'Химия', ru: 'Химия', en: 'Chemistry' }, categoryId: 'technical', level: 'intermediate', percentage: 50, source: 'course' },
    { id: 'math', name: { kk: 'Математика', ru: 'Математика', en: 'Mathematics' }, categoryId: 'technical', level: 'intermediate', percentage: 55, source: 'course' },
  ],

  skillRadar: {
    technical: 45,
    tools: 30,
    softSkills: 40,
    leadership: 25,
    language: 60,
    safety: 20,
  },

  experiences: [],
  portfolio: [],

  languages: [
    { language: 'kazakh', level: 'native' },
    { language: 'russian', level: 'C1' },
    { language: 'english', level: 'B1' },
  ],

  availability: {
    forInternship: true,
    forFullTime: false,
    forMentoring: false,
    relocationReady: true,
  },

  registrationDate: '2024-04-10',
  lastActive: '2025-01-18',
  profileCompleteness: 45,
  isVerified: true,
  isTopTalent: false,
};

/** Мадина - Талапкер (абитуриент) */
export const MADINA_PROFILE: StudentProfile = {
  id: 'madina-003',
  name: 'Мадина Жумабекова',
  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  email: 'madina.zhumabekova@gmail.com',

  stage: 'applicant',

  education: {
    program: '6B07201',
    department: 'mining',
  },

  preUniversity: {
    school: 'СШ №5',
    city: 'Сатпаев',
    graduationYear: 2025,
  },

  gamification: {
    level: 5,
    xp: 950,
    completedQuests: [
      'app-doc-1', 'app-doc-2',
      'app-test-1', 'app-test-2',
      'app-explore-1', 'app-explore-3',
      'app-social-1', 'app-social-2',
    ],
    earnedAchievements: [],
    currentStreak: 3,
    longestStreak: 10,
  },

  skills: [],
  skillRadar: { technical: 0, tools: 0, softSkills: 30, leadership: 10, language: 40, safety: 0 },
  experiences: [],
  portfolio: [],

  languages: [
    { language: 'kazakh', level: 'native' },
    { language: 'russian', level: 'B2' },
    { language: 'english', level: 'A2' },
  ],

  availability: {
    forInternship: false,
    forFullTime: false,
    forMentoring: false,
    relocationReady: true,
  },

  registrationDate: '2024-12-01',
  lastActive: '2025-01-20',
  profileCompleteness: 35,
  isVerified: false,
  isTopTalent: false,
};

// ════════════════════════════════════════════════════════════════════════════
// ЭКСПОРТ ВСЕХ ПРОФИЛЕЙ
// ════════════════════════════════════════════════════════════════════════════

export const ALL_PROFILES: StudentProfile[] = [
  AIZHAN_PROFILE,
  NURSULTAN_PROFILE,
  MADINA_PROFILE,
];

// ════════════════════════════════════════════════════════════════════════════
// HELPER: Получить профиль по ID
// ════════════════════════════════════════════════════════════════════════════

export function getProfileById(id: string): StudentProfile | undefined {
  return ALL_PROFILES.find((p) => p.id === id);
}

export function getQuestsByStage(stage: 'applicant' | 'student', year?: number): LifecycleQuest[] {
  if (stage === 'applicant') return APPLICANT_QUESTS;
  return STUDENT_QUESTS.filter((q) => !year || q.year === year);
}
