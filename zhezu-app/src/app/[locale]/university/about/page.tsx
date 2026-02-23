import { useTranslations } from 'next-intl';
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

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = useTranslations('university');
  const locale = (params.locale || 'ru') as Locale;

  const stats = [
    { icon: Users, value: `${UNIVERSITY.stats.students.toLocaleString()}+`, label: t('about.stats.students'), color: 'text-primary dark:text-primary-light' },
    { icon: BookOpen, value: `${UNIVERSITY.stats.programs}+`, label: t('about.stats.programs'), color: 'text-gold' },
    { icon: GraduationCap, value: `${UNIVERSITY.stats.faculty}`, label: t('about.stats.faculty'), color: 'text-primary dark:text-primary-light' },
    { icon: TrendingUp, value: `${UNIVERSITY.stats.employmentRate}%`, label: t('about.stats.employment'), color: 'text-success' },
    { icon: Award, value: `${UNIVERSITY.stats.doctorsOfScience + UNIVERSITY.stats.candidatesOfScience + UNIVERSITY.stats.phd}`, label: t('about.stats.scientists'), color: 'text-gold' },
    { icon: Calendar, value: `${UNIVERSITY.stats.yearsOfExperience}+`, label: t('about.stats.years'), color: 'text-primary dark:text-primary-light' },
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
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('about.badge')}</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              {UNIVERSITY.name[locale]}
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
              {t('about.intro')}
            </p>
            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <MapPin size={16} />
              <span>{UNIVERSITY.address[locale]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={28} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
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
          <h2 className="text-3xl font-display font-bold mb-8">{t('about.history.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
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
                <div key={item.year} className="flex gap-4 items-start">
                  <div className="w-16 shrink-0 text-right">
                    <span className="font-display font-bold text-primary dark:text-primary-light">
                      {item.year}
                    </span>
                  </div>
                  <div className="w-px bg-border-light dark:bg-border-dark shrink-0 self-stretch" />
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark pt-0.5">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-8">{t('about.departments.title')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => (
              <Card key={dept.id} hover padding="lg">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${dept.color}15`, color: dept.color }}
                >
                  {DEPT_ICONS[dept.icon] || <Building2 size={24} />}
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">
                  {dept.shortName[locale]}
                </h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
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
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg" hover>
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary-light/10 rounded-xl flex items-center justify-center mb-4">
                <Award size={24} className="text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{t('about.mission.title')}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('about.mission.text')}
              </p>
            </Card>
            <Card padding="lg" hover>
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-gold" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{t('about.vision.title')}</h3>
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
