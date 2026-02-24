import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  GraduationCap,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Award,
  FileText,
  Globe,
} from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.master' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

const MASTER_PROGRAMS = [
  {
    id: 'mining-master',
    code: '7M07203',
    name: { kk: 'Тау-кен ісі', ru: 'Горное дело', en: 'Mining Engineering' },
    description: {
      kk: 'Кен орындарын зерттеу мен игерудің заманауи технологиялары.',
      ru: 'Современные технологии исследования и разработки месторождений.',
      en: 'Modern technologies for research and development of mineral deposits.',
    },
    duration: 2,
    credits: 120,
    type: 'scientific',
  },
  {
    id: 'metallurgy-master',
    code: '7M07206',
    name: { kk: 'Металлургия', ru: 'Металлургия', en: 'Metallurgy' },
    description: {
      kk: 'Металдарды өндіру мен өңдеудің инновациялық әдістері.',
      ru: 'Инновационные методы производства и обработки металлов.',
      en: 'Innovative methods of metal production and processing.',
    },
    duration: 2,
    credits: 120,
    type: 'scientific',
  },
  {
    id: 'pedagogy-master',
    code: '7M01301',
    name: {
      kk: 'Педагогика және психология',
      ru: 'Педагогика и психология',
      en: 'Pedagogy and Psychology',
    },
    description: {
      kk: 'Жоғары білім беру педагогикасы, зерттеу әдістемелері.',
      ru: 'Педагогика высшей школы, методология исследований.',
      en: 'Higher education pedagogy, research methodology.',
    },
    duration: 2,
    credits: 120,
    type: 'scientific',
  },
];

export default function MasterPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('admission.master');
  const locale = (params.locale || 'ru') as Locale;

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
                {UNIVERSITY.stats.masterPrograms} {t('programsCount')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <span className="font-semibold">{t('duration')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <span className="font-semibold">120 {t('credits')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* KT Exam Info */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('examTitle')}</h2>
          <div className="mx-auto max-w-4xl">
            <Card padding="lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <FileText size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('ktTitle')}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {t('ktSubtitle')}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border-border-light dark:border-border-dark flex items-center justify-between border-b pb-3">
                  <span className="text-sm">{t('ktTotal')}</span>
                  <span className="font-bold">150</span>
                </div>
                <div className="border-border-light dark:border-border-dark flex items-center justify-between border-b pb-3">
                  <span className="text-sm">{t('ktMin')}</span>
                  <span className="text-primary font-bold">75</span>
                </div>
                <div className="border-border-light dark:border-border-dark flex items-center justify-between border-b pb-3">
                  <span className="text-sm">{t('ktForeign')}</span>
                  <span className="font-bold">≥ 25</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('ktProfile')}</span>
                  <span className="font-bold">≥ 7</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('programsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('programsSubtitle')}
          </p>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {MASTER_PROGRAMS.map((prog) => (
              <Card key={prog.id} padding="lg" hover>
                <Badge variant="default" className="mb-3 text-xs">
                  {prog.code}
                </Badge>
                <h3 className="mb-2 text-lg font-bold">{prog.name[locale]}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {prog.description[locale]}
                </p>
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {prog.duration} {t('yearsShort')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={12} /> {prog.credits} {t('credits')}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Required documents */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('docsTitle')}</h2>
          <div className="mx-auto max-w-2xl space-y-3">
            {['doc1', 'doc2', 'doc3', 'doc4', 'doc5'].map((key) => (
              <div
                key={key}
                className="border-border-light dark:border-border-dark flex items-start gap-3 rounded-lg border p-4"
              >
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-green-500" />
                <span className="text-sm">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/exams">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaExams')}
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
