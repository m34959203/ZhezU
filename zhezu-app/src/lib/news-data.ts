import type { LocalizedString } from '@/types';

export interface NewsArticle {
  id: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  date: string;
  image: string;
  category: 'university' | 'science' | 'students' | 'sport' | 'events';
  author: string;
}

export const NEWS_CATEGORIES = [
  { id: 'all', labelKey: 'news.categories.all' },
  { id: 'university', labelKey: 'news.categories.university' },
  { id: 'science', labelKey: 'news.categories.science' },
  { id: 'students', labelKey: 'news.categories.students' },
  { id: 'sport', labelKey: 'news.categories.sport' },
  { id: 'events', labelKey: 'news.categories.events' },
] as const;

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'new-academic-year-2026',
    title: {
      kk: '2026-2027 оқу жылының салтанатты ашылуы',
      ru: 'Торжественное открытие 2026-2027 учебного года',
      en: 'Grand Opening of 2026-2027 Academic Year',
    },
    excerpt: {
      kk: 'Жезқазған университетінде жаңа оқу жылы ресми түрде басталды.',
      ru: 'В Жезказганском университете официально начался новый учебный год.',
      en: 'The new academic year has officially started at Zhezkazgan University.',
    },
    content: {
      kk: 'Жезқазған университетінде 2026-2027 оқу жылының салтанатты ашылуы өтті. Іс-шараға ректор, профессорлар мен жаңа студенттер қатысты.',
      ru: 'В Жезказганском университете прошло торжественное открытие 2026-2027 учебного года. В мероприятии приняли участие ректор, преподаватели и новые студенты.',
      en: 'The grand opening ceremony of the 2026-2027 academic year took place at Zhezkazgan University. The rector, faculty and new students attended the event.',
    },
    date: '2026-09-01',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80',
    category: 'university',
    author: 'Пресс-служба',
  },
  {
    id: 'mining-conference-2026',
    title: {
      kk: 'Тау-кен ісі бойынша халықаралық конференция',
      ru: 'Международная конференция по горному делу',
      en: 'International Mining Conference',
    },
    excerpt: {
      kk: 'Университет тау-кен саласындағы жаңа технологиялар бойынша конференция өткізді.',
      ru: 'Университет провёл конференцию по новым технологиям в горнодобывающей отрасли.',
      en: 'The university hosted a conference on new technologies in the mining industry.',
    },
    content: {
      kk: 'Жезқазған университетінде тау-кен саласындағы жаңа технологиялар мен инновациялар бойынша халықаралық конференция өтті.',
      ru: 'В Жезказганском университете прошла международная конференция по новым технологиям и инновациям в горнодобывающей отрасли.',
      en: 'An international conference on new technologies and innovations in the mining industry was held at Zhezkazgan University.',
    },
    date: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=800&q=80',
    category: 'science',
    author: 'Научный отдел',
  },
  {
    id: 'student-hackathon',
    title: {
      kk: 'AI Hackathon 2026: студенттер жасанды интеллект шешімдерін жасады',
      ru: 'AI Hackathon 2026: студенты создали решения на основе ИИ',
      en: 'AI Hackathon 2026: Students Created AI-Based Solutions',
    },
    excerpt: {
      kk: 'ZhezU студенттері AI хакатонында инновациялық жобалар ұсынды.',
      ru: 'Студенты ZhezU представили инновационные проекты на AI-хакатоне.',
      en: 'ZhezU students presented innovative projects at the AI hackathon.',
    },
    content: {
      kk: 'Университеттің AI Орталығы ұйымдастырған хакатонда 15 команда қатысып, жасанды интеллект негізіндегі шешімдерін ұсынды.',
      ru: 'В хакатоне, организованном AI-Центром университета, приняли участие 15 команд, представивших решения на основе искусственного интеллекта.',
      en: '15 teams participated in the hackathon organized by the university AI Center, presenting AI-based solutions.',
    },
    date: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    category: 'students',
    author: 'AI-Центр',
  },
  {
    id: 'volleyball-championship',
    title: {
      kk: 'Университет командасы волейбол чемпионатында жеңімпаз атанды',
      ru: 'Команда университета стала чемпионом по волейболу',
      en: 'University Team Wins Volleyball Championship',
    },
    excerpt: {
      kk: 'ZhezU волейбол командасы облыстық чемпионатта бірінші орынды иеленді.',
      ru: 'Волейбольная команда ZhezU заняла первое место в областном чемпионате.',
      en: 'ZhezU volleyball team took first place in the regional championship.',
    },
    content: {
      kk: 'Ұлытау облысының волейбол чемпионатында ZhezU командасы барлық қарсыластарын жеңіп, алтын медальге ие болды.',
      ru: 'На чемпионате Улытауской области по волейболу команда ZhezU одержала победу над всеми соперниками и завоевала золотую медаль.',
      en: 'At the Ulytau region volleyball championship, the ZhezU team defeated all opponents and won the gold medal.',
    },
    date: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
    category: 'sport',
    author: 'Спортивный клуб',
  },
  {
    id: 'open-doors-day',
    title: {
      kk: 'Ашық есік күні: болашақ студенттерді күтеміз!',
      ru: 'День открытых дверей: ждём будущих студентов!',
      en: 'Open Doors Day: We Await Future Students!',
    },
    excerpt: {
      kk: 'Мамыр айында дәстүрлі Ашық есік күні өтеді.',
      ru: 'В мае пройдёт традиционный День открытых дверей.',
      en: 'The traditional Open Doors Day will take place in May.',
    },
    content: {
      kk: 'Жезқазған университеті мамыр айының бірінші аптасында Ашық есік күнін өткізеді. Абитуриенттер мен ата-аналар университет туралы толық ақпарат ала алады.',
      ru: 'Жезказганский университет проводит День открытых дверей в первую неделю мая. Абитуриенты и родители смогут получить полную информацию об университете.',
      en: 'Zhezkazgan University holds an Open Doors Day in the first week of May. Applicants and parents can get full information about the university.',
    },
    date: '2026-04-15',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    category: 'events',
    author: 'Приёмная комиссия',
  },
  {
    id: 'scholarship-winners',
    title: {
      kk: 'Мемлекеттік грант иегерлері жарияланды',
      ru: 'Объявлены обладатели государственных грантов',
      en: 'State Grant Winners Announced',
    },
    excerpt: {
      kk: '2026 жылы 45 студент мемлекеттік грантқа ие болды.',
      ru: 'В 2026 году 45 студентов получили государственные гранты.',
      en: 'In 2026, 45 students received state grants.',
    },
    content: {
      kk: 'ҚР Білім және ғылым министрлігі 2026 жылғы мемлекеттік грант иегерлерін жариялады. ZhezU студенттерінен 45 адам грант алды.',
      ru: 'Министерство образования и науки РК объявило обладателей государственных грантов на 2026 год. 45 студентов ZhezU получили гранты.',
      en: 'The Ministry of Education and Science of Kazakhstan announced state grant winners for 2026. 45 ZhezU students received grants.',
    },
    date: '2026-01-25',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80',
    category: 'university',
    author: 'Пресс-служба',
  },
];
