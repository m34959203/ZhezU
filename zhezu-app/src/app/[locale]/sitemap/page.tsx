import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'siteMap' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

const SITEMAP_SECTIONS = [
  {
    titleKey: 'university',
    links: [
      { label: 'about', href: '/university/about' },
      { label: 'mission', href: '/university/mission' },
      { label: 'campus', href: '/university/campus' },
      { label: 'rector', href: '/university/rector' },
      { label: 'administration', href: '/university/administration' },
      { label: 'senate', href: '/university/senate' },
      { label: 'accreditation', href: '/university/accreditation' },
      { label: 'rankings', href: '/university/rankings' },
      { label: 'partners', href: '/university/partners' },
      { label: 'documents', href: '/university/documents/charter' },
    ],
  },
  {
    titleKey: 'admission',
    links: [
      { label: 'bachelor', href: '/admission/bachelor' },
      { label: 'master', href: '/admission/master' },
      { label: 'doctorate', href: '/admission/doctorate' },
      { label: 'documents', href: '/admission/documents' },
      { label: 'deadlines', href: '/admission/deadlines' },
      { label: 'apply', href: '/admission/apply' },
      { label: 'scholarships', href: '/admission/scholarships' },
      { label: 'faq', href: '/admission/faq' },
    ],
  },
  {
    titleKey: 'academics',
    links: [
      { label: 'departments', href: '/academics/departments' },
      { label: 'faculty', href: '/academics/faculty' },
      { label: 'schedule', href: '/academics/schedule' },
      { label: 'calendar', href: '/academics/calendar' },
      { label: 'library', href: '/academics/library' },
    ],
  },
  {
    titleKey: 'research',
    links: [
      { label: 'publications', href: '/research/publications' },
      { label: 'conferences', href: '/research/conferences' },
      { label: 'labs', href: '/research/labs' },
      { label: 'grants', href: '/research/grants' },
    ],
  },
  {
    titleKey: 'aiCenter',
    links: [
      { label: 'projects', href: '/ai-center/projects' },
      { label: 'agents', href: '/ai-center/agents/talapker' },
      { label: 'tools', href: '/ai-center/tools' },
      { label: 'lab', href: '/ai-center/lab' },
    ],
  },
  {
    titleKey: 'life',
    links: [
      { label: 'news', href: '/life/news' },
      { label: 'events', href: '/life/events' },
      { label: 'sports', href: '/life/sports' },
      { label: 'dormitories', href: '/life/dormitories' },
      { label: 'clubs', href: '/life/clubs' },
    ],
  },
  {
    titleKey: 'other',
    links: [
      { label: 'contact', href: '/contact' },
      { label: 'career', href: '/career' },
      { label: 'talentPool', href: '/talent-pool' },
      { label: 'privacy', href: '/privacy' },
    ],
  },
];

export default function SiteMapPage() {
  const t = useTranslations('siteMap');

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4">{t('badge')}</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {SITEMAP_SECTIONS.map((section) => (
              <div key={section.titleKey}>
                <h2 className="font-display border-primary/30 dark:border-primary-light/30 mb-4 border-b pb-2 text-lg font-bold">
                  {t(`sections.${section.titleKey}`)}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light text-sm transition-colors"
                      >
                        {t(`links.${link.label}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
