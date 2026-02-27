import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY, DEPARTMENTS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  Building2,
  TrendingUp,
} from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university' });
  return {
    title: t('about.pageTitle'),
    description: t('about.pageDescription'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const t = await getTranslations('university');
  const locale = (localeParam || 'ru') as Locale;

  const stats = [
    {
      icon: Users,
      value: `${UNIVERSITY.stats.students.toLocaleString()}+`,
      label: t('about.stats.students'),
      color: 'text-primary dark:text-primary-light',
    },
    {
      icon: BookOpen,
      value: `${UNIVERSITY.stats.programs}+`,
      label: t('about.stats.programs'),
      color: 'text-gold',
    },
    {
      icon: GraduationCap,
      value: `${UNIVERSITY.stats.faculty}`,
      label: t('about.stats.faculty'),
      color: 'text-primary dark:text-primary-light',
    },
    {
      icon: TrendingUp,
      value: `${UNIVERSITY.stats.employmentRate}%`,
      label: t('about.stats.employment'),
      color: 'text-success',
    },
    {
      icon: Award,
      value: `${UNIVERSITY.stats.doctorsOfScience + UNIVERSITY.stats.candidatesOfScience + UNIVERSITY.stats.phd}`,
      label: t('about.stats.scientists'),
      color: 'text-gold',
    },
    {
      icon: Calendar,
      value: `${UNIVERSITY.stats.yearsOfExperience}+`,
      label: t('about.stats.years'),
      color: 'text-primary dark:text-primary-light',
    },
  ];

  const DEPT_ICONS: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen size={24} />,
    Pickaxe: <Building2 size={24} />,
    Scale: <Award size={24} />,
    Zap: <TrendingUp size={24} />,
    Cog: <GraduationCap size={24} />,
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('about.badge')}</Badge>
            <h1 className="font-display mb-6 text-4xl font-bold sm:text-5xl">
              {UNIVERSITY.name[locale]}
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-lg leading-relaxed">
              {t('about.intro')}
            </p>
            <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2 text-sm">
              <MapPin size={16} />
              <span>{UNIVERSITY.address[locale]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={28} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="font-display text-2xl font-bold">{stat.value}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-3xl font-bold">{t('about.history.title')}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('about.history.p1')}
              </p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('about.history.p2')}
              </p>
            </div>
            <div className="space-y-4">
              {[
                { year: '1961', event: t('about.history.timeline.1961') },
                { year: '1996', event: t('about.history.timeline.1996') },
                { year: '2012', event: t('about.history.timeline.2012') },
                { year: '2024', event: t('about.history.timeline.2024') },
                { year: '2026', event: t('about.history.timeline.2026') },
              ].map((item) => (
                <div key={item.year} className="flex items-start gap-4">
                  <div className="w-16 shrink-0 text-right">
                    <span className="font-display text-primary dark:text-primary-light font-bold">
                      {item.year}
                    </span>
                  </div>
                  <div className="bg-border-light dark:bg-border-dark w-px shrink-0 self-stretch" />
                  <p className="text-text-secondary-light dark:text-text-secondary-dark pt-0.5 text-sm">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-3xl font-bold">{t('about.departments.title')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept) => (
              <Card key={dept.id} hover padding="lg">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${dept.color}15`, color: dept.color }}
                >
                  {DEPT_ICONS[dept.icon] || <Building2 size={24} />}
                </div>
                <h3 className="font-display mb-2 text-lg font-semibold">
                  {dept.shortName[locale]}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {dept.name[locale]}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card padding="lg" hover>
              <div className="bg-primary/10 dark:bg-primary-light/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <Award size={24} className="text-primary dark:text-primary-light" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold">{t('about.mission.title')}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('about.mission.text')}
              </p>
            </Card>
            <Card padding="lg" hover>
              <div className="bg-gold/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <TrendingUp size={24} className="text-gold" />
              </div>
              <h3 className="font-display mb-3 text-xl font-bold">{t('about.vision.title')}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('about.vision.text')}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
