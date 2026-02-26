import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { UNIVERSITY } from '@/lib/constants';
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Handshake,
  FileText,
  GraduationCap,
  Building2,
  Globe,
  ScrollText,
  ShieldCheck,
  Trophy,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.hub' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function UniversityPage() {
  const t = useTranslations('university.hub');

  const sections = [
    {
      key: 'about',
      icon: <BookOpen size={24} />,
      links: [
        { key: 'history', href: '/university/about' },
        { key: 'mission', href: '/university/mission' },
      ],
    },
    {
      key: 'leadership',
      icon: <Users size={24} />,
      links: [
        { key: 'rector', href: '/university/rector' },
        { key: 'administration', href: '/university/administration' },
        { key: 'senate', href: '/university/senate' },
      ],
    },
    {
      key: 'accreditation',
      icon: <Award size={24} />,
      links: [
        { key: 'national', href: '/university/accreditation' },
        { key: 'international', href: '/university/accreditation/international' },
        { key: 'rankings', href: '/university/rankings' },
      ],
    },
    {
      key: 'partners',
      icon: <Handshake size={24} />,
      links: [{ key: 'corporate', href: '/university/partners' }],
    },
    {
      key: 'documents',
      icon: <FileText size={24} />,
      links: [
        { key: 'charter', href: '/university/documents/charter' },
        { key: 'licenses', href: '/university/documents/licenses' },
        { key: 'reports', href: '/university/documents/reports' },
      ],
    },
  ];

  const stats = [
    {
      key: 'students',
      value: UNIVERSITY.stats.students.toLocaleString(),
      icon: <GraduationCap size={20} />,
    },
    { key: 'programs', value: UNIVERSITY.stats.programs, icon: <BookOpen size={20} /> },
    { key: 'faculty', value: UNIVERSITY.stats.faculty, icon: <Users size={20} /> },
    {
      key: 'years',
      value: UNIVERSITY.stats.yearsOfExperience + '+',
      icon: <Building2 size={20} />,
    },
  ];

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

      {/* Stats bar */}
      <section className="bg-primary dark:bg-primary/90 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.key} className="flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-blue-100">{t(`stats.${stat.key}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('sectionsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('sectionsSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Card key={section.key} padding="lg" hover>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                    <span className="text-primary">{section.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold">{t(`sections.${section.key}.title`)}</h3>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t(`sections.${section.key}.text`)}
                </p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="text-primary dark:text-primary-light group flex items-center gap-2 text-sm font-medium hover:underline"
                      >
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                        {t(`sections.${section.key}.links.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-2xl font-bold">{t('ctaTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-6 max-w-xl text-sm">
            {t('ctaText')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
            <Link href="/admission/consultation">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaConsult')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
