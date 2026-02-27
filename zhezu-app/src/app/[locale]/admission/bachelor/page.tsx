import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY, PROGRAMS, DEPARTMENTS } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  GraduationCap,
  Clock,
  Globe,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Award,
} from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.bachelor' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function BachelorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const t = await getTranslations('admission.bachelor');
  const locale = (localeParam || 'ru') as Locale;

  const bachelorPrograms = PROGRAMS.filter((p) => p.degree === 'bachelor');
  const grouped = DEPARTMENTS.map((dept) => ({
    department: dept,
    programs: bachelorPrograms.filter((p) => p.department === dept.id),
  })).filter((g) => g.programs.length > 0);

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
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              <span className="font-semibold">
                {bachelorPrograms.length} {t('programsCount')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <span className="font-semibold">{t('duration')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <span className="font-semibold">240 {t('credits')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admission requirements summary */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            {t('requirementsTitle')}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <Card padding="lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold">{t('entTitle')}</h3>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                {t('entText')}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('entPedagogy')}</span>
                  <span className="text-primary font-bold">75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('entTechnical')}</span>
                  <span className="text-primary font-bold">50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('entMax')}</span>
                  <span className="font-bold">140</span>
                </div>
              </div>
            </Card>
            <Card padding="lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-gold/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <CheckCircle size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold">{t('docsTitle')}</h3>
              </div>
              <ul className="text-text-secondary-light dark:text-text-secondary-dark space-y-2 text-sm">
                {['doc1', 'doc2', 'doc3', 'doc4', 'doc5'].map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <CheckCircle size={14} className="mt-0.5 shrink-0 text-green-500" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs by department */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('programsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('programsSubtitle')}
          </p>

          <div className="space-y-10">
            {grouped.map(({ department, programs }) => (
              <div key={department.id}>
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="h-1 w-8 rounded-full"
                    style={{ backgroundColor: department.color }}
                  />
                  <h3 className="text-xl font-bold">{department.name[locale]}</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {programs.map((prog) => (
                    <Card key={prog.id} padding="md" hover>
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="default" className="text-xs">
                          {prog.code}
                        </Badge>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                          {prog.duration} {t('years')}
                        </span>
                      </div>
                      <h4 className="mb-2 font-semibold">{prog.name[locale]}</h4>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-sm">
                        {prog.description[locale]}
                      </p>
                      <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 text-xs">
                        <Globe size={12} />
                        {prog.languages.map((l) => l.toUpperCase()).join(' / ')}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: `${bachelorPrograms.length}`, label: t('statPrograms') },
              { value: '5', label: t('statDepartments') },
              { value: `${UNIVERSITY.stats.employmentRate}%`, label: t('statEmployment') },
              { value: `${UNIVERSITY.stats.students}+`, label: t('statStudents') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-primary text-3xl font-bold">{stat.value}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/documents">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaDocs')}
              </Button>
            </Link>
            <Link href="/admission/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
