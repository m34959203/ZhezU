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
        kk: 'Сарсембаев Динмухамед Жакупович',
        ru: 'Сарсембаев Динмухамед Жакупович',
        en: 'Sarsembaev Dinmukhamed Zhakupovich',
      },
      title: {
        kk: 'Ғылым және стратегиялық даму жөніндегі проректор',
        ru: 'Проректор по науке и стратегическому развитию',
        en: 'Pro-Rector for Science and Strategic Development',
      },
    },
  ],
} as const;

export const DEPARTMENTS = [
  {
    id: 'pedagogy-philology',
    name: {
      kk: '«Педагогика, филология және шығармашылық» кафедрасы',
      ru: 'Кафедра «Педагогика, филология и творчество»',
      en: 'Department of Pedagogy, Philology and Creativity',
    },
    shortName: {
      kk: 'Педагогика, филология',
      ru: 'Педагогика, филология',
      en: 'Pedagogy & Philology',
    },
    color: '#E6B325',
    icon: 'BookOpen',
  },
  {
    id: 'mining-metallurgy-science',
    name: {
      kk: '«Тау-кен ісі, металлургия және жаратылыстану» кафедрасы',
      ru: 'Кафедра «Горное дело, металлургия и естествознание»',
      en: 'Department of Mining, Metallurgy and Natural Sciences',
    },
    shortName: {
      kk: 'Тау-кен, металлургия',
      ru: 'Горное дело, металлургия',
      en: 'Mining & Metallurgy',
    },
    color: '#3B82F6',
    icon: 'Pickaxe',
  },
  {
    id: 'history-economics-law',
    name: {
      kk: '«Қазақстан тарихы, экономика және құқық» кафедрасы',
      ru: 'Кафедра «История Казахстана, экономика и право»',
      en: 'Department of History, Economics and Law',
    },
    shortName: {
      kk: 'Тарих, экономика, құқық',
      ru: 'История, экономика, право',
      en: 'History, Economics & Law',
    },
    color: '#22C55E',
    icon: 'Scale',
  },
  {
    id: 'electrical-safety',
    name: {
      kk: '«Электроэнергетика және еңбекті қорғау» кафедрасы',
      ru: 'Кафедра «Электроэнергетика и охрана труда»',
      en: 'Department of Electrical Engineering and Occupational Safety',
    },
    shortName: {
      kk: 'Электроэнергетика',
      ru: 'Электроэнергетика',
      en: 'Electrical Engineering',
    },
    color: '#8B5CF6',
    icon: 'Zap',
  },
  {
    id: 'machines-construction',
    name: {
      kk: '«Технологиялық машиналар және құрылыс» кафедрасы',
      ru: 'Кафедра «Технологические машины и строительство»',
      en: 'Department of Technological Machines and Construction',
    },
    shortName: {
      kk: 'Машиналар, құрылыс',
      ru: 'Машины, строительство',
      en: 'Machines & Construction',
    },
    color: '#F59E0B',
    icon: 'Cog',
  },
] as const;

export const PROGRAMS = [
  // ═══ Кафедра «Педагогика, филология и творчество» ═══
  {
    id: 'primary-education',
    code: '6B01301',
    department: 'pedagogy-philology',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Бастауыш оқытудың педагогикасы мен әдістемесі',
      ru: 'Педагогика и методика начального образования',
      en: 'Pedagogy and Methods of Primary Education',
    },
    description: {
      kk: 'Бастауыш сынып мұғалімдерін даярлау, заманауи оқыту әдістемелері.',
      ru: 'Подготовка учителей начальных классов, современные методики обучения.',
      en: 'Primary school teacher training, modern teaching methodologies.',
    },
  },
  {
    id: 'physical-culture',
    code: '6B01422',
    department: 'pedagogy-philology',
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
    id: 'art-drawing',
    code: '6B01401',
    department: 'pedagogy-philology',
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
    id: 'kazakh-language',
    code: '6B01701',
    department: 'pedagogy-philology',
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
  {
    id: 'russian-language',
    code: '6B01704',
    department: 'pedagogy-philology',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['ru'],
    name: {
      kk: 'Орыс тілі мен әдебиеті',
      ru: 'Русский язык и литература',
      en: 'Russian Language and Literature',
    },
    description: {
      kk: 'Орыс тілі мен әдебиеті мұғалімдерін даярлау.',
      ru: 'Подготовка учителей русского языка и литературы, филология.',
      en: 'Russian language and literature teacher training, philology.',
    },
  },
  {
    id: 'foreign-languages',
    code: '6B01702',
    department: 'pedagogy-philology',
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
  // ═══ Кафедра «Горное дело, металлургия и естествознание» ═══
  {
    id: 'math',
    code: '6B01501',
    department: 'mining-metallurgy-science',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Математика',
      ru: 'Математика',
      en: 'Mathematics',
    },
    description: {
      kk: 'Математика пәні мұғалімдерін даярлау, қолданбалы математика.',
      ru: 'Подготовка учителей математики, прикладная математика.',
      en: 'Mathematics teacher training, applied mathematics.',
    },
  },
  {
    id: 'math-informatics',
    code: '6B01524',
    department: 'mining-metallurgy-science',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Математика және информатика',
      ru: 'Математика и информатика',
      en: 'Mathematics and Computer Science',
    },
    description: {
      kk: 'Математика мен информатика мұғалімдерін даярлау, бағдарламалау негіздері.',
      ru: 'Подготовка учителей математики и информатики, основы программирования.',
      en: 'Mathematics and computer science teacher training, programming basics.',
    },
  },
  {
    id: 'math-physics',
    code: '6B01505',
    department: 'mining-metallurgy-science',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Математика және физика',
      ru: 'Математика и физика',
      en: 'Mathematics and Physics',
    },
    description: {
      kk: 'Математика мен физика мұғалімдерін даярлау, эксперименттік зерттеулер.',
      ru: 'Подготовка учителей математики и физики, экспериментальные исследования.',
      en: 'Mathematics and physics teacher training, experimental research.',
    },
  },
  {
    id: 'biology',
    code: '6B01526',
    department: 'mining-metallurgy-science',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Биология',
      ru: 'Биология',
      en: 'Biology',
    },
    description: {
      kk: 'Биология пәні бойынша мұғалімдерді даярлау, зертханалық зерттеулер.',
      ru: 'Подготовка учителей биологии, лабораторные исследования.',
      en: 'Biology teacher training, laboratory research.',
    },
  },
  {
    id: 'biology-chemistry',
    code: '6B01527',
    department: 'mining-metallurgy-science',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Биология және химия',
      ru: 'Биология и химия',
      en: 'Biology and Chemistry',
    },
    description: {
      kk: 'Биология мен химия мұғалімдерін даярлау, зертханалық тәжірибе.',
      ru: 'Подготовка учителей биологии и химии, лабораторная практика.',
      en: 'Biology and chemistry teacher training, laboratory practice.',
    },
  },
  {
    id: 'geology',
    code: '6B07201',
    department: 'mining-metallurgy-science',
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
    code: '6B07203',
    department: 'mining-metallurgy-science',
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
    id: 'mineral-processing',
    code: '6B07205',
    department: 'mining-metallurgy-science',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Пайдалы қазбаларды байыту',
      ru: 'Обогащение полезных ископаемых',
      en: 'Mineral Processing',
    },
    description: {
      kk: 'Пайдалы қазбаларды байыту технологиялары, флотация, магниттік сепарация.',
      ru: 'Технологии обогащения полезных ископаемых, флотация, магнитная сепарация.',
      en: 'Mineral processing technologies, flotation, magnetic separation.',
    },
  },
  {
    id: 'metallurgy',
    code: '6B07206',
    department: 'mining-metallurgy-science',
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
  // ═══ Кафедра «История Казахстана, экономика и право» ═══
  {
    id: 'economics',
    code: '6B04901',
    department: 'history-economics-law',
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
  // ═══ Кафедра «Электроэнергетика и охрана труда» ═══
  {
    id: 'electrical-engineering',
    code: '6B07104',
    department: 'electrical-safety',
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
    id: 'automation',
    code: '6B07101',
    department: 'electrical-safety',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Автоматтандыру және басқару',
      ru: 'Автоматизация и управление',
      en: 'Automation and Control',
    },
    description: {
      kk: 'Автоматтандыру жүйелері, басқару теориясы, өнеркәсіптік контроллерлер.',
      ru: 'Системы автоматизации, теория управления, промышленные контроллеры.',
      en: 'Automation systems, control theory, industrial controllers.',
    },
  },
  {
    id: 'occupational-safety',
    code: '6B11201',
    department: 'electrical-safety',
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
  // ═══ Кафедра «Технологические машины и строительство» ═══
  {
    id: 'tech-machines',
    code: '6B07103',
    department: 'machines-construction',
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
    id: 'thermal-engineering',
    code: '6B07106',
    department: 'machines-construction',
    degree: 'bachelor' as const,
    credits: 240,
    duration: 4,
    languages: ['kk', 'ru'],
    name: {
      kk: 'Жылу, желдету техника және тоңазытқыштар',
      ru: 'Теплоэнергетика',
      en: 'Thermal Engineering',
    },
    description: {
      kk: 'Жылу энергетикасы, желдету жүйелері, тоңазытқыш техника.',
      ru: 'Теплоэнергетика, системы вентиляции, холодильная техника.',
      en: 'Thermal engineering, ventilation systems, refrigeration.',
    },
  },
  {
    id: 'construction',
    code: '6B07301',
    department: 'machines-construction',
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
] as const;

export const DEPARTMENT_HEADS: Record<
  string,
  { name: Record<string, string>; title: Record<string, string> }
> = {
  'mining-metallurgy-science': {
    name: {
      kk: 'Тақышов Абділмәлік Арғынұлы',
      ru: 'Такишов Абдилмалик Аргынович',
      en: 'Takishov Abdilmalik Argynovich',
    },
    title: {
      kk: 'т.ғ.д., профессор',
      ru: 'д.т.н., профессор',
      en: 'D.Sc., Professor',
    },
  },
  'electrical-safety': {
    name: {
      kk: 'Ахметбекова Ардақ Мажитовна',
      ru: 'Ахметбекова Ардак Мажитовна',
      en: 'Akhmetbekova Ardak Mazhitovna',
    },
    title: {
      kk: 'т.ғ.к., доцент',
      ru: 'к.т.н., доцент',
      en: 'Ph.D., Associate Professor',
    },
  },
  'machines-construction': {
    name: {
      kk: 'Кульшикова Сауле Тюякбайевна',
      ru: 'Кульшикова Сауле Тюякбайевна',
      en: 'Kulshikova Saule Tyuyakbayevna',
    },
    title: {
      kk: 'т.ғ.к.',
      ru: 'к.т.н.',
      en: 'Ph.D.',
    },
  },
  'history-economics-law': {
    name: {
      kk: 'Темірбаева Гүлнара Рапықовна',
      ru: 'Темирбаева Гульнара Рапыковна',
      en: 'Temirbayeva Gulnara Rapykovna',
    },
    title: {
      kk: 'э.ғ.д., профессор',
      ru: 'д.э.н., профессор',
      en: 'D.Sc. (Economics), Professor',
    },
  },
};

export const ADMIN_CENTERS = [
  {
    name: {
      kk: 'Оқу-әдістемелік орталық',
      ru: 'Учебно-методический центр',
      en: 'Academic and Methodological Center',
    },
    icon: 'BookOpen',
  },
  {
    name: {
      kk: 'Ғылым және инновациялар орталығы',
      ru: 'Центр науки и инноваций',
      en: 'Center for Science and Innovation',
    },
    icon: 'Lightbulb',
  },
  {
    name: {
      kk: 'Жоспарлау, аккредиттеу және сапаны бағалау орталығы',
      ru: 'Центр планирования, аккредитации и оценки качества',
      en: 'Center for Planning, Accreditation and Quality Assessment',
    },
    icon: 'ClipboardCheck',
  },
  {
    name: {
      kk: 'АТ дамыту және цифрлық университет орталығы',
      ru: 'Центр развития ИТ и цифрового университета',
      en: 'IT Development and Digital University Center',
    },
    icon: 'Monitor',
  },
  {
    name: {
      kk: 'Кадрларды қайта даярлау, маркетинг және ЖОО алды білім беру орталығы',
      ru: 'Центр переподготовки кадров, маркетинга и довузовского образования',
      en: 'Center for Retraining, Marketing and Pre-University Education',
    },
    icon: 'Users',
  },
  {
    name: {
      kk: 'Тәрбие және жастар саясаты орталығы',
      ru: 'Центр воспитания и молодёжной политики',
      en: 'Center for Education and Youth Policy',
    },
    icon: 'Heart',
  },
] as const;

export const SERVICE_UNITS = [
  {
    name: {
      kk: 'Кеңсе',
      ru: 'Канцелярия',
      en: 'Chancellery',
    },
  },
  {
    name: {
      kk: 'Тіркеуші офисі',
      ru: 'Офис регистратора',
      en: 'Registrar Office',
    },
  },
  {
    name: {
      kk: 'Қаржы-экономикалық қызмет',
      ru: 'Финансово-экономическая служба',
      en: 'Financial and Economic Service',
    },
  },
  {
    name: {
      kk: 'Персоналды басқару бөлімі',
      ru: 'Отдел управления персоналом',
      en: 'Human Resources Department',
    },
  },
  {
    name: {
      kk: 'ЖОО-дан кейінгі білім беру бөлімі',
      ru: 'Отдел послевузовского образования',
      en: 'Postgraduate Education Department',
    },
  },
  {
    name: {
      kk: '«Мансап» бөлімі',
      ru: 'Отдел «Карьера»',
      en: 'Career Department',
    },
  },
  {
    name: {
      kk: 'Сервистік қызмет көрсету бөлімі',
      ru: 'Отдел сервисного обслуживания',
      en: 'Service Department',
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

/**
 * NOTE: All data above serves as compile-time fallback.
 * At runtime, the same data is loaded from data/university.json
 * managed via the admin panel at /admin/university.
 *
 * Frontend components fetch from /api/public/university.
 * Server components can use getUniversityData() from lib/admin/public-data.
 */
