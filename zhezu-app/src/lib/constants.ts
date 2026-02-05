export const UNIVERSITY = {
  name: {
    kk: 'Ө.А. Байқоңыров атындағы Жезқазған университеті',
    ru: 'Жезказганский университет имени О.А. Байконурова',
    en: 'O.A. Baikonurov Zhezkazgan University',
  },
  shortName: 'ZhezU',
  founded: 1961,
  type: 'private', // АО
  phone: '+7 (7102) 73-60-15',
  phoneAdmissions: '+7 (7102) 41-04-61',
  phoneMobile: '+7 777 218 93 25',
  email: 'univer@zhezu.edu.kz',
  emailAlt: 'univer_zhez@mail.ru',
  address: {
    kk: 'Ұлытау облысы, Жезқазған қ., Алашахан даңғылы, 1Б',
    ru: 'Ұлытау область, г. Жезказган, пр. Алашахана, 1Б',
    en: '1B Alashakhan Ave., Zhezkazgan, Ulytau Region',
  },
  website: 'https://zhezu.edu.kz',
  social: {
    instagram: 'https://instagram.com/zhezkazganuniversity',
    facebook: 'https://facebook.com/ZhezUniver',
    whatsapp: 'https://wa.me/77772189325',
  },
  stats: {
    students: 1370,
    programs: 21,
    masterPrograms: 3,
    employmentRate: 87,
    yearsOfExperience: 65, // since 1961
    faculty: 108,
    doctorsOfScience: 3,
    candidatesOfScience: 30,
    phd: 8,
  },
  rector: {
    name: {
      kk: 'Тақышов Абділмәлік Арғынұлы',
      ru: 'Такишов Абдилмалик Аргынович',
      en: 'Takishov Abdilmalik Argynovich',
    },
    title: {
      kk: 'Президент-Ректор, т.ғ.д., профессор',
      ru: 'Президент-Ректор, д.т.н., профессор',
      en: 'President-Rector, D.Sc., Professor',
    },
  },
  proRectors: [
    {
      name: {
        kk: 'Ичева Юлианна Борисовна',
        ru: 'Ичева Юлианна Борисовна',
        en: 'Icheva Yulianna Borisovna',
      },
      title: {
        kk: 'Академиялық мәселелер жөніндегі проректор, т.ғ.к., доцент',
        ru: 'Проректор по академическим вопросам, к.т.н., доцент',
        en: 'Pro-Rector for Academic Affairs, Ph.D., Associate Professor',
      },
    },
    {
      name: {
        kk: 'Свидерский Александр Константинович',
        ru: 'Свидерский Александр Константинович',
        en: 'Sviderskiy Alexander Konstantinovich',
      },
      title: {
        kk: 'Ғылым және стратегиялық даму жөніндегі проректор, х.ғ.д., профессор',
        ru: 'Проректор по науке и стратегическому развитию, д.х.н., профессор',
        en: 'Pro-Rector for Science and Strategic Development, D.Sc., Professor',
      },
    },
  ],
} as const;

export const INSTITUTES = [
  {
    id: 'mining-tech',
    name: {
      kk: 'Тау-кен технологиялық институты',
      ru: 'Горно-технологический институт',
      en: 'Mining-Technological Institute',
    },
    departments: [
      {
        id: 'mining-metallurgy',
        name: {
          kk: 'Тау-кен ісі және металлургия кафедрасы',
          ru: 'Кафедра горного дела и металлургии',
          en: 'Department of Mining and Metallurgy',
        },
      },
      {
        id: 'energy-safety',
        name: {
          kk: 'Электроэнергетика және еңбекті қорғау кафедрасы',
          ru: 'Кафедра электроэнергетики и охраны труда',
          en: 'Department of Electrical Engineering and Occupational Safety',
        },
      },
      {
        id: 'machines-construction',
        name: {
          kk: 'Технологиялық машиналар және құрылыс кафедрасы',
          ru: 'Кафедра технологических машин и строительства',
          en: 'Department of Technological Machines and Construction',
        },
      },
      {
        id: 'history-economics-law',
        name: {
          kk: 'Қазақстан тарихы, экономика және құқық кафедрасы',
          ru: 'Кафедра истории Казахстана, экономики и права',
          en: 'Department of Kazakhstan History, Economics and Law',
        },
      },
    ],
  },
  {
    id: 'humanitarian-pedagogical',
    name: {
      kk: 'Гуманитарлық-педагогикалық институт',
      ru: 'Гуманитарно-педагогический институт',
      en: 'Humanitarian-Pedagogical Institute',
    },
    departments: [
      {
        id: 'kazakh-lang',
        name: {
          kk: 'Қазақ тілі мен әдебиеті кафедрасы',
          ru: 'Кафедра казахского языка и литературы',
          en: 'Department of Kazakh Language and Literature',
        },
      },
      {
        id: 'pedagogy-psychology',
        name: {
          kk: 'Педагогика, психология және филология кафедрасы',
          ru: 'Кафедра педагогики, психологии и филологии',
          en: 'Department of Pedagogy, Psychology and Philology',
        },
      },
      {
        id: 'physics-it-math',
        name: {
          kk: 'Физика, информатика және математика кафедрасы',
          ru: 'Кафедра физики, информатики и математики',
          en: 'Department of Physics, Computer Science and Mathematics',
        },
      },
      {
        id: 'biology-sports',
        name: {
          kk: 'Биология және дене тәрбиесі кафедрасы',
          ru: 'Кафедра биологии и физического воспитания',
          en: 'Department of Biology and Physical Education',
        },
      },
    ],
  },
] as const;

export const PROGRAMS = [
  // === ПЕДАГОГИКА / EDUCATION (6В01x) ===
  {
    id: 'preschool-education',
    code: '6В012',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Мектепке дейінгі оқыту және тәрбиелеу',
      ru: 'Дошкольное обучение и воспитание',
      en: 'Preschool Education and Pedagogy',
    },
    description: {
      kk: 'Мектепке дейінгі балаларды оқыту мен тәрбиелеудің заманауи әдістемелері.',
      ru: 'Современные методики обучения и воспитания детей дошкольного возраста.',
      en: 'Modern methods of teaching and educating preschool children.',
    },
  },
  {
    id: 'art-drawing',
    code: '6В014',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Бейнелеу өнері және сызу',
      ru: 'Изобразительное искусство и черчение',
      en: 'Visual Arts and Technical Drawing',
    },
    description: {
      kk: 'Бейнелеу өнерін оқыту әдістемесі, сызу және компьютерлік графика.',
      ru: 'Методика преподавания изобразительного искусства, черчение и компьютерная графика.',
      en: 'Teaching methodology of visual arts, technical drawing and computer graphics.',
    },
  },
  {
    id: 'physical-culture',
    code: '6В014',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Дене шынықтыру және спорт',
      ru: 'Физическая культура и спорт',
      en: 'Physical Culture and Sports',
    },
    description: {
      kk: 'Дене тәрбиесін оқыту, спорт түрлері бойынша дайындық және салауатты өмір салты.',
      ru: 'Методика преподавания физкультуры, подготовка по видам спорта и здоровый образ жизни.',
      en: 'Physical education teaching, sports training and healthy lifestyle.',
    },
  },
  {
    id: 'biology-teacher',
    code: '6В015',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Биология',
      ru: 'Биология',
      en: 'Biology (Teacher Training)',
    },
    description: {
      kk: 'Биология пәні бойынша мұғалімдерді даярлау, зертханалық зерттеулер.',
      ru: 'Подготовка учителей биологии, лабораторные исследования.',
      en: 'Biology teacher training, laboratory research.',
    },
  },
  {
    id: 'informatics-teacher',
    code: '6В015',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Информатика',
      ru: 'Информатика',
      en: 'Computer Science (Teacher Training)',
    },
    description: {
      kk: 'Информатика пәні мұғалімдерін даярлау, бағдарламалау және АТ негіздері.',
      ru: 'Подготовка учителей информатики, программирование и основы ИТ.',
      en: 'Computer science teacher training, programming and IT fundamentals.',
    },
  },
  {
    id: 'math-teacher',
    code: '6В015',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Математика',
      ru: 'Математика',
      en: 'Mathematics (Teacher Training)',
    },
    description: {
      kk: 'Математика пәні мұғалімдерін даярлау, қолданбалы математика.',
      ru: 'Подготовка учителей математики, прикладная математика.',
      en: 'Mathematics teacher training, applied mathematics.',
    },
  },
  {
    id: 'physics-teacher',
    code: '6В015',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Физика',
      ru: 'Физика',
      en: 'Physics (Teacher Training)',
    },
    description: {
      kk: 'Физика пәні мұғалімдерін даярлау, эксперименттік зерттеулер.',
      ru: 'Подготовка учителей физики, экспериментальные исследования.',
      en: 'Physics teacher training, experimental research.',
    },
  },
  {
    id: 'foreign-languages',
    code: '6В017',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru', 'en'],
    name: {
      kk: 'Шет тілдері: екі шет тілі',
      ru: 'Иностранные языки: два иностранных языка',
      en: 'Foreign Languages: Two Foreign Languages',
    },
    description: {
      kk: 'Екі шет тілін оқыту әдістемесі, аударма және мәдениетаралық коммуникация.',
      ru: 'Методика преподавания двух иностранных языков, перевод и межкультурная коммуникация.',
      en: 'Teaching methodology of two foreign languages, translation and intercultural communication.',
    },
  },
  {
    id: 'kazakh-language',
    code: '6В017',
    faculty: 'humanitarian-pedagogical',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk'],
    name: {
      kk: 'Қазақ тілі мен әдебиеті',
      ru: 'Казахский язык и литература',
      en: 'Kazakh Language and Literature',
    },
    description: {
      kk: 'Қазақ тілі мен әдебиеті мұғалімдерін даярлау, тіл білімі.',
      ru: 'Подготовка учителей казахского языка и литературы, языкознание.',
      en: 'Kazakh language and literature teacher training, linguistics.',
    },
  },
  // === БИЗНЕС И ПРАВО / BUSINESS & LAW (6В04x) ===
  {
    id: 'economics',
    code: '6В041',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Экономика',
      ru: 'Экономика',
      en: 'Economics',
    },
    description: {
      kk: 'Микро және макроэкономика, қаржы, статистика және бизнес-жоспарлау.',
      ru: 'Микро- и макроэкономика, финансы, статистика и бизнес-планирование.',
      en: 'Micro and macroeconomics, finance, statistics and business planning.',
    },
  },
  {
    id: 'finance',
    code: '6В041',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Қаржы',
      ru: 'Финансы',
      en: 'Finance',
    },
    description: {
      kk: 'Қаржылық талдау, банк ісі, инвестициялар және бухгалтерлік есеп.',
      ru: 'Финансовый анализ, банковское дело, инвестиции и бухгалтерский учёт.',
      en: 'Financial analysis, banking, investments and accounting.',
    },
  },
  {
    id: 'law',
    code: '6В042',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Құқықтану',
      ru: 'Юриспруденция',
      en: 'Law',
    },
    description: {
      kk: 'Азаматтық, қылмыстық және әкімшілік құқық, сот жүйесі және заңнама.',
      ru: 'Гражданское, уголовное и административное право, судебная система и законодательство.',
      en: 'Civil, criminal and administrative law, judicial system and legislation.',
    },
  },
  // === ИНЖЕНЕРИЯ / ENGINEERING (6В07x) ===
  {
    id: 'tech-machines',
    code: '6В071',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Технологиялық машиналар мен жабдықтар',
      ru: 'Технологические машины и оборудование',
      en: 'Technological Machines and Equipment',
    },
    description: {
      kk: 'Өндірістік машиналарды жобалау, пайдалану және жөндеу.',
      ru: 'Проектирование, эксплуатация и ремонт промышленных машин.',
      en: 'Design, operation and maintenance of industrial machines.',
    },
  },
  {
    id: 'transport',
    code: '6В071',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Көлік, көлік техникасы және технологиялары',
      ru: 'Транспорт, транспортная техника и технологии',
      en: 'Transport, Transport Equipment and Technologies',
    },
    description: {
      kk: 'Көлік жүйелерін басқару, логистика және көлік техникасы.',
      ru: 'Управление транспортными системами, логистика и транспортная техника.',
      en: 'Transport systems management, logistics and transport equipment.',
    },
  },
  {
    id: 'electrical-engineering',
    code: '6В071',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Электроэнергетика',
      ru: 'Электроэнергетика',
      en: 'Electrical Power Engineering',
    },
    description: {
      kk: 'Электр станциялары, желілер, энергия жүйелерін басқару.',
      ru: 'Электростанции, сети, управление энергетическими системами.',
      en: 'Power plants, networks, energy systems management.',
    },
  },
  {
    id: 'geology',
    code: '6В072',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Геология және пайдалы қазба кен орындарын барлау',
      ru: 'Геология и разведка месторождений полезных ископаемых',
      en: 'Geology and Mineral Exploration',
    },
    description: {
      kk: 'Геологиялық барлау, кен орындарын бағалау және картографиялау.',
      ru: 'Геологическая разведка, оценка месторождений и картографирование.',
      en: 'Geological exploration, deposit evaluation and mapping.',
    },
  },
  {
    id: 'mining',
    code: '6В072',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Тау-кен ісі',
      ru: 'Горное дело',
      en: 'Mining Engineering',
    },
    description: {
      kk: 'Кен орындарын игеру, тау-кен машиналары және пайдалы қазбаларды өңдеу.',
      ru: 'Разработка месторождений, горные машины и переработка полезных ископаемых.',
      en: 'Deposit development, mining machinery and mineral processing.',
    },
  },
  {
    id: 'metallurgy',
    code: '6В072',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Металлургия',
      ru: 'Металлургия',
      en: 'Metallurgy',
    },
    description: {
      kk: 'Металдарды өндіру және өңдеу технологиялары, қорытпалар.',
      ru: 'Технологии производства и обработки металлов, сплавы.',
      en: 'Metal production and processing technologies, alloys.',
    },
  },
  {
    id: 'construction',
    code: '6В073',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Құрылыс',
      ru: 'Строительство',
      en: 'Construction',
    },
    description: {
      kk: 'Ғимараттар мен құрылыстарды жобалау, салу және пайдалану.',
      ru: 'Проектирование, возведение и эксплуатация зданий и сооружений.',
      en: 'Design, construction and operation of buildings and structures.',
    },
  },
  // === БЕЗОПАСНОСТЬ / SAFETY (6В11x) ===
  {
    id: 'occupational-safety',
    code: '6В112',
    faculty: 'mining-tech',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Тіршілік қауіпсіздігі және қоршаған ортаны қорғау',
      ru: 'Безопасность жизнедеятельности и защита окружающей среды',
      en: 'Occupational Safety and Environmental Protection',
    },
    description: {
      kk: 'Еңбекті қорғау, өнеркәсіптік қауіпсіздік және экология.',
      ru: 'Охрана труда, промышленная безопасность и экология.',
      en: 'Occupational safety, industrial security and ecology.',
    },
  },
] as const;

export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/admission', key: 'admission' },
  { href: '/academics', key: 'academics' },
  { href: '/talent-pool', key: 'talentPool' },
  { href: '/skill-map', key: 'skillMap' },
  { href: '/career', key: 'career' },
  { href: '/contact', key: 'contact' },
] as const;
