import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PROGRAMS, DEPARTMENTS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Globe,
  ArrowRight,
  ArrowLeft,
  Building2,
  CheckCircle,
} from 'lucide-react';
import type { Locale } from '@/types';

export async function generateStaticParams() {
  return PROGRAMS.map((program) => ({
    slug: program.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = PROGRAMS.find((p) => p.id === slug);
  if (!program) return { title: 'Program Not Found' };

  const l = locale as Locale;
  return {
    title: program.name[l],
    description: program.description[l],
  };
}

export default function ProgramDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const program = PROGRAMS.find((p) => p.id === params.slug);
  if (!program) notFound();

  const t = useTranslations('programs');
  const locale = (params.locale || 'ru') as Locale;
  const department = DEPARTMENTS.find((d) => d.id === program.department);

  const degreeLabel = {
    bachelor: t('degree.bachelor'),
    master: t('degree.master'),
    doctorate: t('degree.doctorate'),
  };

  // Sample curriculum structure
  const curriculum = [
    { year: 1, title: t('curriculum.year1'), subjects: [t('curriculum.generalEd'), t('curriculum.math'), t('curriculum.physics'), t('curriculum.kazLang')] },
    { year: 2, title: t('curriculum.year2'), subjects: [t('curriculum.coreSubjects'), t('curriculum.electives'), t('curriculum.practicum')] },
    { year: 3, title: t('curriculum.year3'), subjects: [t('curriculum.specialization'), t('curriculum.research'), t('curriculum.internship')] },
    { year: 4, title: t('curriculum.year4'), subjects: [t('curriculum.thesis'), t('curriculum.preDiploma'), t('curriculum.finalExam')] },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Link href="/academics" className="inline-flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light mb-6 transition-colors">
            <ArrowLeft size={16} />
            {t('backToCatalog')}
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary">{degreeLabel[program.degree]}</Badge>
            {department && (
              <Badge style={{ backgroundColor: `${department.color}15`, color: department.color }}>
                {department.shortName[locale]}
              </Badge>
            )}
            <Badge>{program.code}</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            {program.name[locale]}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mb-8">
            {program.description[locale]}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/admission">
              <Button variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                {t('applyNow')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Info Cards */}
      <section className="py-12 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card padding="md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 dark:bg-primary-light/10 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{t('info.duration')}</p>
                  <p className="font-display font-bold">{program.duration} {t('info.years')}</p>
                </div>
              </div>
            </Card>
            <Card padding="md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{t('info.credits')}</p>
                  <p className="font-display font-bold">{program.credits} ECTS</p>
                </div>
              </div>
            </Card>
            <Card padding="md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <GraduationCap size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{t('info.degree')}</p>
                  <p className="font-display font-bold">{degreeLabel[program.degree]}</p>
                </div>
              </div>
            </Card>
            <Card padding="md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 dark:bg-primary-light/10 rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{t('info.languages')}</p>
                  <p className="font-display font-bold">{program.languages.join(', ').toUpperCase()}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-8">{t('curriculum.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {curriculum.slice(0, program.duration).map((year) => (
              <Card key={year.year} padding="lg" hover>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                    <span className="font-display font-bold text-primary dark:text-primary-light">{year.year}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg">{year.title}</h3>
                </div>
                <ul className="space-y-2">
                  {year.subjects.map((subject, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      <CheckCircle size={14} className="text-success shrink-0" />
                      {subject}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Department Info */}
      {department && (
        <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${department.color}15`, color: department.color }}
                >
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{t('department.label')}</p>
                  <h3 className="font-display font-semibold text-lg">{department.name[locale]}</h3>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-[#0f3380] p-8 sm:p-12 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl font-display font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">{t('cta.description')}</p>
              <Link href="/admission">
                <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
