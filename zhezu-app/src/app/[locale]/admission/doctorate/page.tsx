import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
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
  Briefcase,
} from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.doctorate' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function DoctoratePage({ params }: { params: { locale: string } }) {
  const t = useTranslations('admission.doctorate');
  const locale = (params.locale || 'ru') as Locale;

  const examStructure = [
    { key: 'interview', points: '30' },
    { key: 'profile', points: '50' },
    { key: 'essay', points: '20' },
  ];

  const langCerts = [
    { name: 'IELTS Academic', min: '5.0' },
    { name: 'TOEFL iBT', min: '35' },
    { name: 'TOEFL ITP', min: '417' },
    { name: 'Duolingo', min: '80' },
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
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              <span className="font-semibold">{t('duration')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-primary" />
              <span className="font-semibold">{t('experience')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            {t('requirementsTitle')}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <Card padding="lg">
              <h3 className="mb-4 font-semibold">{t('basicReqs')}</h3>
              <ul className="space-y-3">
                {['req1', 'req2', 'req3', 'req4'].map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-500" />
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card padding="lg">
              <h3 className="mb-4 font-semibold">{t('langTitle')}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-sm">
                {t('langText')}
              </p>
              <div className="space-y-2">
                {langCerts.map((cert) => (
                  <div key={cert.name} className="flex justify-between text-sm">
                    <span>{cert.name}</span>
                    <span className="font-semibold">≥ {cert.min}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Exam structure */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('examTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('examSubtitle')}
          </p>
          <div className="mx-auto max-w-2xl">
            <Card padding="lg">
              <div className="space-y-4">
                {examStructure.map((item) => (
                  <div
                    key={item.key}
                    className="border-border-light dark:border-border-dark flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-medium">{t(`exam.${item.key}`)}</span>
                    <span className="text-primary text-lg font-bold">{item.points}</span>
                  </div>
                ))}
                <div className="border-primary mt-4 flex items-center justify-between border-t-2 pt-4">
                  <span className="font-semibold">{t('examTotal')}</span>
                  <span className="text-2xl font-bold">100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('examMin')}</span>
                  <span className="font-bold text-green-600">75</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Required documents */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('docsTitle')}</h2>
          <div className="mx-auto max-w-2xl space-y-3">
            {['doc1', 'doc2', 'doc3', 'doc4', 'doc5', 'doc6', 'doc7', 'doc8'].map((key) => (
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

      {/* Note */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg" className="border-gold/30 bg-gold/5 border">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
              {t('note')}
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/scholarships">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaScholarships')}
              </Button>
            </Link>
            <Link href="/admission/contact">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaContact')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
