import type { StudentProfile, SkillMapNode, SkillMapEdge } from '@/types';

export const STUDENTS: StudentProfile[] = [
  {
    id: 'aibek-nurlan',
    name: 'Айбек Нурланов',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    major: {
      kk: 'Тау-кен ісі',
      ru: 'Горное дело',
      en: 'Mining Engineering',
    },
    faculty: 'mining-tech',
    year: 4,
    gpa: 3.87,
    classRank: 'Top 5%',
    englishLevel: 'IELTS 7.0',
    internships: 3,
    summary: {
      kk: 'Тау-кен инженериясы бойынша 4-курс студенті. Кен орындарын жобалау және қауіпсіздік жүйелерін оңтайландыруға маманданған. «Казахмыс» компаниясында тау-кен инженері болып тағылымдамадан өткен.',
      ru: 'Студент 4 курса по горному делу. Специализируется на проектировании рудников и оптимизации систем безопасности. Проходил стажировку в «Казахмыс» в качестве горного инженера.',
      en: 'Fourth-year Mining Engineering student specializing in mine design and safety system optimization. Completed internship at Kazakhmys as a mining engineer.',
    },
    skills: [
      { label: 'Technical', value: 92 },
      { label: 'Analytical', value: 88 },
      { label: 'Leadership', value: 75 },
      { label: 'Communication', value: 70 },
      { label: 'Innovation', value: 85 },
    ],
    competencies: [
      {
        name: { kk: 'Mine Planning & Design', ru: 'Проектирование шахт', en: 'Mine Planning & Design' },
        percentage: 95,
        color: '#3B82F6',
      },
      {
        name: { kk: 'Safety Systems', ru: 'Системы безопасности', en: 'Safety Systems' },
        percentage: 90,
        color: '#22C55E',
      },
      {
        name: { kk: 'AutoCAD / Mining Software', ru: 'AutoCAD / ПО для горного дела', en: 'AutoCAD / Mining Software' },
        percentage: 88,
        color: '#E6B325',
      },
      {
        name: { kk: 'Geological Analysis', ru: 'Геологический анализ', en: 'Geological Analysis' },
        percentage: 82,
        color: '#8B5CF6',
      },
    ],
    achievements: [
      {
        id: 'ach-1',
        title: {
          kk: 'Республикалық олимпиада — I орын',
          ru: 'Республиканская олимпиада — I место',
          en: 'National Olympiad — 1st Place',
        },
        issuer: {
          kk: 'ҚР Білім министрлігі',
          ru: 'Министерство образования РК',
          en: 'Ministry of Education RK',
        },
        date: '2025-03',
        icon: 'Trophy',
        verified: true,
      },
      {
        id: 'ach-2',
        title: {
          kk: 'Үздік ғылыми мақала',
          ru: 'Лучшая научная статья',
          en: 'Best Research Paper',
        },
        issuer: {
          kk: 'ZhezU ғылыми кеңесі',
          ru: 'Научный совет ZhezU',
          en: 'ZhezU Scientific Council',
        },
        date: '2025-05',
        icon: 'FileText',
        verified: true,
      },
      {
        id: 'ach-3',
        title: {
          kk: 'Kazakhmys тағылымдамасы',
          ru: 'Стажировка в Казахмыс',
          en: 'Kazakhmys Internship',
        },
        issuer: {
          kk: 'Kazakhmys Corporation',
          ru: 'Казахмыс Корпорейшн',
          en: 'Kazakhmys Corporation',
        },
        date: '2025-07',
        icon: 'Briefcase',
        verified: true,
      },
    ],
    portfolio: [
      {
        id: 'port-1',
        title: {
          kk: 'Терең кен орнын жобалаудың оңтайландырылуы',
          ru: 'Оптимизация проектирования глубоких рудников',
          en: 'Deep Mine Design Optimization',
        },
        description: {
          kk: 'Терең кен орындарында қауіпсіздікті арттыру және шығындарды азайту бойынша зерттеу.',
          ru: 'Исследование по повышению безопасности и снижению затрат в глубоких рудниках.',
          en: 'Research on improving safety and reducing costs in deep mine operations.',
        },
        type: 'research',
        date: '2025-04',
      },
      {
        id: 'port-2',
        title: {
          kk: 'Жасанды интеллект негізіндегі кен барлау жүйесі',
          ru: 'AI-система разведки месторождений',
          en: 'AI-Driven Mineral Exploration System',
        },
        description: {
          kk: 'Геологиялық деректерді талдайтын машиналық оқыту моделі.',
          ru: 'Модель машинного обучения для анализа геологических данных.',
          en: 'Machine learning model for analyzing geological survey data.',
        },
        type: 'project',
        date: '2025-06',
      },
    ],
    matchScore: 95,
    tags: ['Mining', 'Safety', 'AutoCAD', 'Geology', 'Leadership'],
    email: 'a.nurlan@zhezu.edu.kz',
    linkedin: 'https://linkedin.com/in/aibek-nurlan',
  },
  {
    id: 'dana-serik',
    name: 'Дана Серікова',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    major: {
      kk: 'Металлургия',
      ru: 'Металлургия',
      en: 'Metallurgy',
    },
    faculty: 'mining-tech',
    year: 3,
    gpa: 3.92,
    classRank: 'Top 3%',
    englishLevel: 'IELTS 7.5',
    internships: 2,
    summary: {
      kk: 'Металлургия бағытының 3-курс студенті. Қорытпалар технологиясы мен материалтану бойынша маманданады.',
      ru: 'Студентка 3 курса металлургии. Специализируется на технологии сплавов и материаловедении.',
      en: 'Third-year Metallurgy student specializing in alloy technology and materials science.',
    },
    skills: [
      { label: 'Technical', value: 90 },
      { label: 'Analytical', value: 95 },
      { label: 'Leadership', value: 72 },
      { label: 'Communication', value: 80 },
      { label: 'Innovation', value: 88 },
    ],
    competencies: [
      {
        name: { kk: 'Materials Science', ru: 'Материаловедение', en: 'Materials Science' },
        percentage: 94,
        color: '#3B82F6',
      },
      {
        name: { kk: 'Alloy Technology', ru: 'Технология сплавов', en: 'Alloy Technology' },
        percentage: 91,
        color: '#22C55E',
      },
      {
        name: { kk: 'Lab Research', ru: 'Лабораторные исследования', en: 'Lab Research' },
        percentage: 89,
        color: '#E6B325',
      },
      {
        name: { kk: 'Data Analysis', ru: 'Анализ данных', en: 'Data Analysis' },
        percentage: 85,
        color: '#8B5CF6',
      },
    ],
    achievements: [
      {
        id: 'ach-d1',
        title: {
          kk: 'Ғылыми грант иегері',
          ru: 'Обладатель научного гранта',
          en: 'Research Grant Recipient',
        },
        issuer: {
          kk: 'ҚР ҒЖБМ',
          ru: 'МНВО РК',
          en: 'MSHE RK',
        },
        date: '2025-01',
        icon: 'Award',
        verified: true,
      },
    ],
    portfolio: [
      {
        id: 'port-d1',
        title: {
          kk: 'Мыс қорытпаларының микроқұрылымдық талдауы',
          ru: 'Микроструктурный анализ медных сплавов',
          en: 'Microstructural Analysis of Copper Alloys',
        },
        description: {
          kk: 'Жезқазған кен орнынан алынған мыс қорытпаларын зерттеу.',
          ru: 'Исследование медных сплавов из месторождений Жезказгана.',
          en: 'Study of copper alloys from Zhezkazgan deposits.',
        },
        type: 'research',
        date: '2025-03',
      },
    ],
    matchScore: 91,
    tags: ['Metallurgy', 'Materials', 'Research', 'Chemistry', 'Analysis'],
    email: 'd.serik@zhezu.edu.kz',
  },
  {
    id: 'timur-kasym',
    name: 'Тимур Касымов',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    major: {
      kk: 'Электроэнергетика',
      ru: 'Электроэнергетика',
      en: 'Electrical Power Engineering',
    },
    faculty: 'mining-tech',
    year: 4,
    gpa: 3.75,
    classRank: 'Top 10%',
    englishLevel: 'IELTS 6.5',
    internships: 2,
    summary: {
      kk: 'Электроэнергетика бойынша 4-курс студенті. Энергия жүйелерін басқару мен жаңартылатын энергия көздеріне маманданған.',
      ru: 'Студент 4 курса электроэнергетики. Специализируется на управлении энергосистемами и возобновляемых источниках энергии.',
      en: 'Fourth-year Electrical Power Engineering student. Specializes in power systems management and renewable energy.',
    },
    skills: [
      { label: 'Technical', value: 85 },
      { label: 'Analytical', value: 82 },
      { label: 'Leadership', value: 78 },
      { label: 'Communication', value: 75 },
      { label: 'Innovation', value: 80 },
    ],
    competencies: [
      {
        name: { kk: 'Power Systems', ru: 'Энергосистемы', en: 'Power Systems' },
        percentage: 88,
        color: '#3B82F6',
      },
      {
        name: { kk: 'Renewable Energy', ru: 'Возобновляемая энергетика', en: 'Renewable Energy' },
        percentage: 85,
        color: '#22C55E',
      },
      {
        name: { kk: 'Circuit Design', ru: 'Проектирование схем', en: 'Circuit Design' },
        percentage: 82,
        color: '#E6B325',
      },
      {
        name: { kk: 'SCADA Systems', ru: 'SCADA системы', en: 'SCADA Systems' },
        percentage: 78,
        color: '#8B5CF6',
      },
    ],
    achievements: [
      {
        id: 'ach-t1',
        title: {
          kk: 'Энергетика бойынша хакатон жеңімпазы',
          ru: 'Победитель хакатона по энергетике',
          en: 'Energy Hackathon Winner',
        },
        issuer: {
          kk: 'KEGOC',
          ru: 'KEGOC',
          en: 'KEGOC',
        },
        date: '2025-04',
        icon: 'Zap',
        verified: true,
      },
    ],
    portfolio: [],
    matchScore: 87,
    tags: ['Energy', 'Electrical', 'Renewable', 'SCADA', 'Automation'],
    email: 't.kasym@zhezu.edu.kz',
  },
  {
    id: 'aliya-zhan',
    name: 'Алия Жанұзақова',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    major: {
      kk: 'Құқықтану',
      ru: 'Юриспруденция',
      en: 'Law',
    },
    faculty: 'mining-tech',
    year: 3,
    gpa: 3.95,
    classRank: 'Top 2%',
    englishLevel: 'IELTS 7.5',
    internships: 1,
    summary: {
      kk: 'Құқықтану бағытының 3-курс студенті. Тау-кен құқығы мен экологиялық заңнамаға маманданады.',
      ru: 'Студентка 3 курса юриспруденции. Специализируется на горном праве и экологическом законодательстве.',
      en: 'Third-year Law student specializing in mining law and environmental legislation.',
    },
    skills: [
      { label: 'Technical', value: 70 },
      { label: 'Analytical', value: 93 },
      { label: 'Leadership', value: 85 },
      { label: 'Communication', value: 95 },
      { label: 'Innovation', value: 72 },
    ],
    competencies: [
      {
        name: { kk: 'Legal Analysis', ru: 'Правовой анализ', en: 'Legal Analysis' },
        percentage: 96,
        color: '#3B82F6',
      },
      {
        name: { kk: 'Mining Law', ru: 'Горное право', en: 'Mining Law' },
        percentage: 88,
        color: '#22C55E',
      },
      {
        name: { kk: 'Environmental Law', ru: 'Экологическое право', en: 'Environmental Law' },
        percentage: 85,
        color: '#E6B325',
      },
      {
        name: { kk: 'Public Speaking', ru: 'Ораторское искусство', en: 'Public Speaking' },
        percentage: 92,
        color: '#8B5CF6',
      },
    ],
    achievements: [
      {
        id: 'ach-a1',
        title: {
          kk: 'Мут-корт жарысы — II орын',
          ru: 'Мут-корт — II место',
          en: 'Moot Court — 2nd Place',
        },
        issuer: {
          kk: 'ҚР Заңгерлер одағы',
          ru: 'Союз юристов РК',
          en: 'Union of Lawyers RK',
        },
        date: '2025-02',
        icon: 'Scale',
        verified: true,
      },
    ],
    portfolio: [],
    matchScore: 83,
    tags: ['Law', 'Mining Law', 'Environment', 'Legal', 'Public Speaking'],
    email: 'a.zhan@zhezu.edu.kz',
  },
];

// ═══ Skill Map Data per Department ═══

export type SkillMapDataSet = {
  nodes: SkillMapNode[];
  edges: SkillMapEdge[];
};

function makeMap(
  center: { label: { kk: string; ru: string; en: string }; color: string },
  unt: Array<{ id: string; label: { kk: string; ru: string; en: string }; value: string }>,
  hard: Array<{ id: string; label: { kk: string; ru: string; en: string } }>,
  soft: Array<{ id: string; label: { kk: string; ru: string; en: string } }>,
  career: Array<{ id: string; label: { kk: string; ru: string; en: string } }>,
  crossEdges: SkillMapEdge[] = [],
): SkillMapDataSet {
  const nodes: SkillMapNode[] = [];
  const edges: SkillMapEdge[] = [];

  // Center
  nodes.push({ id: 'major', label: center.label, x: 400, y: 300, type: 'major', size: 'lg', color: center.color });

  // UNT — top arc
  const untPositions = [
    { x: 220, y: 100 },
    { x: 400, y: 75 },
    { x: 580, y: 100 },
  ];
  unt.forEach((item, i) => {
    nodes.push({ ...item, x: untPositions[i]?.x ?? 400, y: untPositions[i]?.y ?? 80, type: 'unt', size: 'md', color: '#3B82F6' });
    edges.push({ from: 'major', to: item.id });
  });

  // Hard — left
  const hardPositions = [
    { x: 110, y: 200 },
    { x: 90, y: 310 },
    { x: 110, y: 420 },
    { x: 180, y: 510 },
  ];
  hard.forEach((item, i) => {
    nodes.push({ ...item, x: hardPositions[i]?.x ?? 120, y: hardPositions[i]?.y ?? 300, type: 'hard', size: 'sm', color: '#22C55E' });
    edges.push({ from: 'major', to: item.id });
  });

  // Soft — right
  const softPositions = [
    { x: 690, y: 200 },
    { x: 710, y: 310 },
    { x: 690, y: 420 },
  ];
  soft.forEach((item, i) => {
    nodes.push({ ...item, x: softPositions[i]?.x ?? 700, y: softPositions[i]?.y ?? 300, type: 'soft', size: 'sm', color: '#8B5CF6' });
    edges.push({ from: 'major', to: item.id });
  });

  // Career — bottom
  const careerPositions = [
    { x: 230, y: 530 },
    { x: 400, y: 560 },
    { x: 570, y: 530 },
  ];
  career.forEach((item, i) => {
    nodes.push({ ...item, x: careerPositions[i]?.x ?? 400, y: careerPositions[i]?.y ?? 540, type: 'career', size: 'md', color: '#F59E0B' });
    edges.push({ from: 'major', to: item.id });
  });

  edges.push(...crossEdges);
  return { nodes, edges };
}

export const SKILL_MAPS: Record<string, SkillMapDataSet> = {
  // ── 1. Педагогика, филология и творчество ──
  'pedagogy-philology': makeMap(
    { label: { kk: 'Педагогика', ru: 'Педагогика', en: 'Pedagogy' }, color: '#E6B325' },
    [
      { id: 'unt-literacy', label: { kk: 'Оқу сауат.', ru: 'Грамотность', en: 'Literacy' }, value: '30/35' },
      { id: 'unt-lang', label: { kk: 'Тіл', ru: 'Язык', en: 'Language' }, value: '32/35' },
      { id: 'unt-history', label: { kk: 'Тарих', ru: 'История', en: 'History' }, value: '28/35' },
    ],
    [
      { id: 'hard-methods', label: { kk: 'Әдістеме', ru: 'Методика', en: 'Methodology' } },
      { id: 'hard-didactics', label: { kk: 'Дидактика', ru: 'Дидактика', en: 'Didactics' } },
      { id: 'hard-ict', label: { kk: 'АКТ', ru: 'ИКТ', en: 'ICT' } },
      { id: 'hard-psychology', label: { kk: 'Психология', ru: 'Психология', en: 'Psychology' } },
    ],
    [
      { id: 'soft-comm', label: { kk: 'Коммуникация', ru: 'Коммуникация', en: 'Communication' } },
      { id: 'soft-patience', label: { kk: 'Шыдамдылық', ru: 'Терпение', en: 'Patience' } },
      { id: 'soft-creativity', label: { kk: 'Шығармашылық', ru: 'Творчество', en: 'Creativity' } },
    ],
    [
      { id: 'career-teacher', label: { kk: 'Мұғалім', ru: 'Учитель', en: 'Teacher' } },
      { id: 'career-translator', label: { kk: 'Аудармашы', ru: 'Переводчик', en: 'Translator' } },
      { id: 'career-methodist', label: { kk: 'Әдіскер', ru: 'Методист', en: 'Methodologist' } },
    ],
    [
      { from: 'hard-methods', to: 'career-teacher' },
      { from: 'hard-methods', to: 'career-methodist' },
      { from: 'unt-lang', to: 'hard-didactics' },
      { from: 'soft-creativity', to: 'career-teacher' },
    ],
  ),

  // ── 2. Горное дело, металлургия и естествознание ──
  'mining-metallurgy-science': makeMap(
    { label: { kk: 'Тау-кен ісі', ru: 'Горное дело', en: 'Mining' }, color: '#3B82F6' },
    [
      { id: 'unt-math', label: { kk: 'Математика', ru: 'Математика', en: 'Mathematics' }, value: '32/35' },
      { id: 'unt-physics', label: { kk: 'Физика', ru: 'Физика', en: 'Physics' }, value: '30/35' },
      { id: 'unt-chemistry', label: { kk: 'Химия', ru: 'Химия', en: 'Chemistry' }, value: '28/35' },
    ],
    [
      { id: 'hard-autocad', label: { kk: 'AutoCAD', ru: 'AutoCAD', en: 'AutoCAD' } },
      { id: 'hard-surpac', label: { kk: 'Surpac', ru: 'Surpac', en: 'Surpac' } },
      { id: 'hard-geostat', label: { kk: 'Геостатист.', ru: 'Геостатистика', en: 'Geostatistics' } },
      { id: 'hard-safety', label: { kk: 'Қауіпсіздік', ru: 'Безопасность', en: 'Safety' } },
    ],
    [
      { id: 'soft-leadership', label: { kk: 'Көшбасшылық', ru: 'Лидерство', en: 'Leadership' } },
      { id: 'soft-teamwork', label: { kk: 'Команда', ru: 'Командная работа', en: 'Teamwork' } },
      { id: 'soft-problem', label: { kk: 'Мәселе шешу', ru: 'Решение проблем', en: 'Problem Solving' } },
    ],
    [
      { id: 'career-engineer', label: { kk: 'Тау-кен инженер', ru: 'Горный инженер', en: 'Mining Engineer' } },
      { id: 'career-safety', label: { kk: 'Қауіпсіздік мен.', ru: 'Менеджер безоп.', en: 'Safety Manager' } },
      { id: 'career-geologist', label: { kk: 'Геолог', ru: 'Геолог', en: 'Geologist' } },
    ],
    [
      { from: 'hard-safety', to: 'career-safety' },
      { from: 'hard-autocad', to: 'career-engineer' },
      { from: 'hard-geostat', to: 'career-geologist' },
      { from: 'unt-math', to: 'hard-geostat' },
      { from: 'unt-physics', to: 'hard-safety' },
    ],
  ),

  // ── 3. История Казахстана, экономика и право ──
  'history-economics-law': makeMap(
    { label: { kk: 'Экономика', ru: 'Экономика', en: 'Economics' }, color: '#22C55E' },
    [
      { id: 'unt-math', label: { kk: 'Математика', ru: 'Математика', en: 'Mathematics' }, value: '30/35' },
      { id: 'unt-history', label: { kk: 'Тарих', ru: 'История', en: 'History' }, value: '32/35' },
      { id: 'unt-literacy', label: { kk: 'Оқу сауат.', ru: 'Грамотность', en: 'Literacy' }, value: '30/35' },
    ],
    [
      { id: 'hard-accounting', label: { kk: 'Бухгалтерия', ru: 'Бухгалтерия', en: 'Accounting' } },
      { id: 'hard-statistics', label: { kk: 'Статистика', ru: 'Статистика', en: 'Statistics' } },
      { id: 'hard-finance', label: { kk: 'Қаржы', ru: 'Финансы', en: 'Finance' } },
      { id: 'hard-1c', label: { kk: '1С', ru: '1С', en: '1C' } },
    ],
    [
      { id: 'soft-analytics', label: { kk: 'Аналитика', ru: 'Аналитика', en: 'Analytics' } },
      { id: 'soft-comm', label: { kk: 'Коммуникация', ru: 'Коммуникация', en: 'Communication' } },
      { id: 'soft-critical', label: { kk: 'Сыни ойлау', ru: 'Критич. мышл.', en: 'Critical Thinking' } },
    ],
    [
      { id: 'career-economist', label: { kk: 'Экономист', ru: 'Экономист', en: 'Economist' } },
      { id: 'career-auditor', label: { kk: 'Аудитор', ru: 'Аудитор', en: 'Auditor' } },
      { id: 'career-analyst', label: { kk: 'Аналитик', ru: 'Бизнес-аналитик', en: 'Business Analyst' } },
    ],
    [
      { from: 'hard-accounting', to: 'career-auditor' },
      { from: 'hard-finance', to: 'career-economist' },
      { from: 'soft-analytics', to: 'career-analyst' },
      { from: 'unt-math', to: 'hard-statistics' },
    ],
  ),

  // ── 4. Электроэнергетика и охрана труда ──
  'electrical-safety': makeMap(
    { label: { kk: 'Электроэнерг.', ru: 'Энергетика', en: 'Electrical Eng.' }, color: '#8B5CF6' },
    [
      { id: 'unt-math', label: { kk: 'Математика', ru: 'Математика', en: 'Mathematics' }, value: '32/35' },
      { id: 'unt-physics', label: { kk: 'Физика', ru: 'Физика', en: 'Physics' }, value: '33/35' },
      { id: 'unt-it', label: { kk: 'Информатика', ru: 'Информатика', en: 'Informatics' }, value: '28/35' },
    ],
    [
      { id: 'hard-scada', label: { kk: 'SCADA', ru: 'SCADA', en: 'SCADA' } },
      { id: 'hard-circuit', label: { kk: 'Схемотехника', ru: 'Схемотехника', en: 'Circuit Design' } },
      { id: 'hard-plc', label: { kk: 'ПЛК', ru: 'ПЛК', en: 'PLC' } },
      { id: 'hard-renewable', label: { kk: 'Жаңартыл. энер.', ru: 'ВИЭ', en: 'Renewables' } },
    ],
    [
      { id: 'soft-teamwork', label: { kk: 'Команда', ru: 'Командная работа', en: 'Teamwork' } },
      { id: 'soft-problem', label: { kk: 'Мәселе шешу', ru: 'Решение проблем', en: 'Problem Solving' } },
      { id: 'soft-attention', label: { kk: 'Назар аудару', ru: 'Внимательность', en: 'Attention to Detail' } },
    ],
    [
      { id: 'career-energo', label: { kk: 'Энергетик', ru: 'Энергетик', en: 'Power Engineer' } },
      { id: 'career-auto', label: { kk: 'Автоматика инж.', ru: 'Инженер АСУ', en: 'Automation Eng.' } },
      { id: 'career-safety', label: { kk: 'Еңбекті қорғау', ru: 'Охрана труда', en: 'Safety Officer' } },
    ],
    [
      { from: 'hard-scada', to: 'career-auto' },
      { from: 'hard-circuit', to: 'career-energo' },
      { from: 'hard-plc', to: 'career-auto' },
      { from: 'unt-physics', to: 'hard-circuit' },
      { from: 'soft-attention', to: 'career-safety' },
    ],
  ),

  // ── 5. Технологические машины и строительство ──
  'machines-construction': makeMap(
    { label: { kk: 'Машиналар', ru: 'Машины и стр-во', en: 'Machines & Constr.' }, color: '#F59E0B' },
    [
      { id: 'unt-math', label: { kk: 'Математика', ru: 'Математика', en: 'Mathematics' }, value: '30/35' },
      { id: 'unt-physics', label: { kk: 'Физика', ru: 'Физика', en: 'Physics' }, value: '32/35' },
      { id: 'unt-drawing', label: { kk: 'Сызу', ru: 'Черчение', en: 'Drawing' }, value: '28/35' },
    ],
    [
      { id: 'hard-solidworks', label: { kk: 'SolidWorks', ru: 'SolidWorks', en: 'SolidWorks' } },
      { id: 'hard-autocad', label: { kk: 'AutoCAD', ru: 'AutoCAD', en: 'AutoCAD' } },
      { id: 'hard-material', label: { kk: 'Материалтану', ru: 'Материаловед.', en: 'Materials' } },
      { id: 'hard-thermo', label: { kk: 'Термодинамика', ru: 'Термодинамика', en: 'Thermodynamics' } },
    ],
    [
      { id: 'soft-project', label: { kk: 'Жоба басқару', ru: 'Упр. проектами', en: 'Project Mgmt' } },
      { id: 'soft-teamwork', label: { kk: 'Команда', ru: 'Командная работа', en: 'Teamwork' } },
      { id: 'soft-spatial', label: { kk: 'Кеңістіктік ойлау', ru: 'Пространств. мышл.', en: 'Spatial Thinking' } },
    ],
    [
      { id: 'career-mecheng', label: { kk: 'Механик инженер', ru: 'Инженер-механик', en: 'Mech. Engineer' } },
      { id: 'career-builder', label: { kk: 'Құрылысшы', ru: 'Строитель', en: 'Builder' } },
      { id: 'career-therm', label: { kk: 'Жылу инженері', ru: 'Теплотехник', en: 'Thermal Eng.' } },
    ],
    [
      { from: 'hard-solidworks', to: 'career-mecheng' },
      { from: 'hard-autocad', to: 'career-builder' },
      { from: 'hard-thermo', to: 'career-therm' },
      { from: 'unt-physics', to: 'hard-thermo' },
      { from: 'soft-project', to: 'career-builder' },
    ],
  ),
};

// Default exports for backward compatibility
export const SKILL_MAP_NODES = SKILL_MAPS['mining-metallurgy-science'].nodes;
export const SKILL_MAP_EDGES = SKILL_MAPS['mining-metallurgy-science'].edges;
