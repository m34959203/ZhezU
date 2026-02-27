export interface NavLink {
  labelKey: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  titleKey: string;
  links: NavLink[];
}

export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  visible?: boolean;
  order?: number;
  columns: NavColumn[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface MenuData {
  navigation: NavItem[];
  footerNav: FooterLink[];
  footerStudents: FooterLink[];
}

export interface AudienceLink {
  id: string;
  labelKey: string;
  href: string;
  icon?: string;
}

export interface UtilityLink {
  id: string;
  type: 'phone' | 'email' | 'social';
  label: string;
  href: string;
  icon?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'university',
    labelKey: 'university',
    href: '/university',
    columns: [
      {
        titleKey: 'university.about',
        links: [
          { labelKey: 'university.aboutHistory', href: '/university/about' },
          { labelKey: 'university.aboutMission', href: '/university/mission' },
          { labelKey: 'university.aboutCampus', href: '/university/campus' },
        ],
      },
      {
        titleKey: 'university.leadership',
        links: [
          { labelKey: 'university.leadershipRector', href: '/university/rector' },
          { labelKey: 'university.leadershipAdmin', href: '/university/administration' },
          { labelKey: 'university.leadershipSenate', href: '/university/senate' },
        ],
      },
      {
        titleKey: 'university.accreditation',
        links: [
          { labelKey: 'university.accreditationNational', href: '/university/accreditation' },
          {
            labelKey: 'university.accreditationInternational',
            href: '/university/accreditation/international',
          },
          { labelKey: 'university.accreditationRankings', href: '/university/rankings' },
        ],
      },
      {
        titleKey: 'university.partners',
        links: [
          { labelKey: 'university.partnersCorporate', href: '/university/partners' },
          {
            labelKey: 'university.partnersInternational',
            href: '/university/partners/international',
          },
        ],
      },
      {
        titleKey: 'university.documents',
        links: [
          { labelKey: 'university.documentsCharter', href: '/university/documents/charter' },
          { labelKey: 'university.documentsLicenses', href: '/university/documents/licenses' },
          { labelKey: 'university.documentsReports', href: '/university/documents/reports' },
        ],
      },
    ],
  },
  {
    id: 'admission',
    labelKey: 'admission',
    href: '/admission',
    columns: [
      {
        titleKey: 'admission.programs',
        links: [
          { labelKey: 'admission.programsBachelor', href: '/admission/bachelor' },
          { labelKey: 'admission.programsMaster', href: '/admission/master' },
          { labelKey: 'admission.programsDoctorate', href: '/admission/doctorate' },
        ],
      },
      {
        titleKey: 'admission.requirements',
        links: [
          { labelKey: 'admission.requirementsDocs', href: '/admission/documents' },
          { labelKey: 'admission.requirementsExams', href: '/admission/exams' },
          { labelKey: 'admission.requirementsDeadlines', href: '/admission/deadlines' },
        ],
      },
      {
        titleKey: 'admission.apply',
        links: [
          { labelKey: 'admission.applyOnline', href: '/admission/apply' },
          { labelKey: 'admission.applyStatus', href: '/admission/status' },
          { labelKey: 'admission.applyConsultation', href: '/admission/consultation' },
        ],
      },
      {
        titleKey: 'admission.scholarships',
        links: [
          { labelKey: 'admission.scholarshipsState', href: '/admission/scholarships' },
          {
            labelKey: 'admission.scholarshipsUniversity',
            href: '/admission/scholarships/university',
          },
        ],
      },
      {
        titleKey: 'admission.faq',
        links: [
          { labelKey: 'admission.faqGeneral', href: '/admission/faq' },
          { labelKey: 'admission.faqContact', href: '/admission/contact' },
        ],
      },
    ],
  },
  {
    id: 'education',
    labelKey: 'education',
    href: '/academics',
    columns: [
      {
        titleKey: 'education.bachelor',
        links: [
          { labelKey: 'education.bachelorPrograms', href: '/academics/bachelor' },
          { labelKey: 'education.bachelorCurriculum', href: '/academics/bachelor/curriculum' },
        ],
      },
      {
        titleKey: 'education.master',
        links: [
          { labelKey: 'education.masterPrograms', href: '/academics/master' },
          { labelKey: 'education.masterResearch', href: '/academics/master/research' },
        ],
      },
      {
        titleKey: 'education.departments',
        links: [
          { labelKey: 'education.departmentsList', href: '/academics/departments' },
          { labelKey: 'education.departmentsFaculty', href: '/academics/faculty' },
        ],
      },
      {
        titleKey: 'education.schedule',
        links: [
          { labelKey: 'education.scheduleClasses', href: '/academics/schedule' },
          { labelKey: 'education.scheduleExams', href: '/academics/schedule/exams' },
          { labelKey: 'education.scheduleCalendar', href: '/academics/calendar' },
        ],
      },
      {
        titleKey: 'education.library',
        links: [
          { labelKey: 'education.libraryCatalog', href: '/academics/library' },
          { labelKey: 'education.libraryDigital', href: '/academics/library/digital' },
        ],
      },
    ],
  },
  {
    id: 'research',
    labelKey: 'research',
    href: '/research',
    columns: [
      {
        titleKey: 'research.publications',
        links: [
          { labelKey: 'research.publicationsJournals', href: '/research/publications' },
          { labelKey: 'research.publicationsArticles', href: '/research/articles' },
        ],
      },
      {
        titleKey: 'research.conferences',
        links: [
          { labelKey: 'research.conferencesUpcoming', href: '/research/conferences' },
          { labelKey: 'research.conferencesArchive', href: '/research/conferences/archive' },
        ],
      },
      {
        titleKey: 'research.labs',
        links: [
          { labelKey: 'research.labsList', href: '/research/labs' },
          { labelKey: 'research.labsEquipment', href: '/research/equipment' },
        ],
      },
      {
        titleKey: 'research.grants',
        links: [
          { labelKey: 'research.grantsCurrent', href: '/research/grants' },
          { labelKey: 'research.grantsApply', href: '/research/grants/apply' },
          { labelKey: 'research.grantsResults', href: '/research/grants/results' },
        ],
      },
    ],
  },
  {
    id: 'ai-center',
    labelKey: 'aiCenter',
    href: '/ai-center',
    columns: [
      {
        titleKey: 'aiCenter.projects',
        links: [
          { labelKey: 'aiCenter.projectsCurrent', href: '/ai-center/projects' },
          { labelKey: 'aiCenter.projectsShowcase', href: '/ai-center/showcase' },
        ],
      },
      {
        titleKey: 'aiCenter.agents',
        links: [
          { labelKey: 'aiCenter.agentsTalapker', href: '/ai-center/agents/talapker' },
          { labelKey: 'aiCenter.agentsAssistant', href: '/ai-center/agents/assistant' },
        ],
      },
      {
        titleKey: 'aiCenter.apps',
        links: [
          { labelKey: 'aiCenter.appsTalentPool', href: '/talent-pool' },
          { labelKey: 'aiCenter.appsSkillMap', href: '/skill-map' },
        ],
      },
      {
        titleKey: 'aiCenter.tools',
        links: [
          { labelKey: 'aiCenter.toolsAI', href: '/ai-center/tools' },
          { labelKey: 'aiCenter.toolsAPI', href: '/ai-center/api' },
        ],
      },
      {
        titleKey: 'aiCenter.lab',
        links: [
          { labelKey: 'aiCenter.labResearch', href: '/ai-center/lab' },
          { labelKey: 'aiCenter.labJoin', href: '/ai-center/lab/join' },
        ],
      },
    ],
  },
  {
    id: 'life',
    labelKey: 'life',
    href: '/life',
    columns: [
      {
        titleKey: 'life.news',
        links: [
          { labelKey: 'life.newsLatest', href: '/life/news' },
          { labelKey: 'life.newsAnnouncements', href: '/life/announcements' },
        ],
      },
      {
        titleKey: 'life.events',
        links: [
          { labelKey: 'life.eventsUpcoming', href: '/life/events' },
          { labelKey: 'life.eventsCalendar', href: '/life/events/calendar' },
        ],
      },
      {
        titleKey: 'life.sports',
        links: [
          { labelKey: 'life.sportsTeams', href: '/life/sports' },
          { labelKey: 'life.sportsFacilities', href: '/life/sports/facilities' },
        ],
      },
      {
        titleKey: 'life.dormitories',
        links: [
          { labelKey: 'life.dormitoriesInfo', href: '/life/dormitories' },
          { labelKey: 'life.dormitoriesApply', href: '/life/dormitories/apply' },
        ],
      },
      {
        titleKey: 'life.organizations',
        links: [
          { labelKey: 'life.organizationsClubs', href: '/life/clubs' },
          { labelKey: 'life.organizationsStudentGov', href: '/life/student-government' },
        ],
      },
    ],
  },
];

export const AUDIENCE_LINKS: AudienceLink[] = [
  { id: 'applicants', labelKey: 'audience.applicants', href: '/admission' },
  { id: 'students', labelKey: 'audience.students', href: '/student-portal' },
  { id: 'faculty', labelKey: 'audience.faculty', href: '/faculty-portal' },
  { id: 'employers', labelKey: 'audience.employers', href: '/talent-pool' },
];

export const UTILITY_CONTACTS = {
  phone: { label: '+7 7102 123456', href: 'tel:+77102123456' },
  email: { label: 'info@zhezu.edu.kz', href: 'mailto:info@zhezu.edu.kz' },
};

export const SOCIAL_LINKS = [
  { id: 'instagram', href: 'https://instagram.com/zhezu_university', label: 'Instagram' },
  { id: 'facebook', href: 'https://facebook.com/zhezu.university', label: 'Facebook' },
  { id: 'youtube', href: 'https://youtube.com/@zhezu_university', label: 'YouTube' },
];

/* ─── Server-side loader: reads menu from data/menu.json ─── */
export async function getMenuData(): Promise<MenuData> {
  try {
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');
    const filePath = join(process.cwd(), 'data', 'menu.json');
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as MenuData;
    // Filter visible items and sort by order
    return {
      navigation: (data.navigation || [])
        .filter((n) => n.visible !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      footerNav: data.footerNav || [],
      footerStudents: data.footerStudents || [],
    };
  } catch {
    // Fallback to hardcoded navigation
    return {
      navigation: NAVIGATION_ITEMS,
      footerNav: [
        { label: 'О вузе', href: '/university/about' },
        { label: 'Руководство', href: '/university/rector' },
        { label: 'Поступление', href: '/admission' },
        { label: 'Наука', href: '/research' },
        { label: 'AI-Центр', href: '/ai-center' },
      ],
      footerStudents: [
        { label: 'Расписание', href: '/academics/schedule' },
        { label: 'Библиотека', href: '/academics/library' },
        { label: 'Общежития', href: '/life/dormitories' },
        { label: 'Клубы и кружки', href: '/life/clubs' },
        { label: 'Спорт', href: '/life/sports' },
      ],
    };
  }
}
