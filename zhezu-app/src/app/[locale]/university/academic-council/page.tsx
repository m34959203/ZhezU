import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  User,
  Scale,
  GraduationCap,
  Award,
  FileText,
  ShieldCheck,
  Microscope,
  ArrowRight,
} from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.academicCouncil' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function AcademicCouncilPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('university.academicCouncil');
  const locale = (params.locale || 'ru') as Locale;

  const functions = [
    { key: 'strategy', icon: <Scale size={20} /> },
    { key: 'academic', icon: <GraduationCap size={20} /> },
    { key: 'science', icon: <Microscope size={20} /> },
    { key: 'degrees', icon: <Award size={20} /> },
    { key: 'quality', icon: <ShieldCheck size={20} /> },
    { key: 'docs', icon: <FileText size={20} /> },
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

      {/* About the Council */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">{t('aboutTitle')}</h2>
            <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-4 leading-relaxed">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('chairmanTitle')}</h2>
          <div className="mx-auto max-w-2xl">
            <Card padding="lg">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="h-36 w-28 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/rector1-682x1024.jpg"
                    alt={UNIVERSITY.rector.name[locale]}
                    width={112}
                    height={144}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <Badge variant="primary" className="mb-2">
                    {t('chairmanRole')}
                  </Badge>
                  <h3 className="font-display mb-1 text-xl font-bold">
                    {UNIVERSITY.rector.name[locale]}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {UNIVERSITY.rector.title[locale]}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Functions */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('functionsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('functionsSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {functions.map((fn) => (
              <Card key={fn.key} padding="lg" hover>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 dark:bg-primary-light/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <span className="text-primary dark:text-primary-light">{fn.icon}</span>
                  </div>
                  <h3 className="font-display text-sm font-semibold">
                    {t(`functions.${fn.key}.title`)}
                  </h3>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {t(`functions.${fn.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">{t('compositionTitle')}</h2>
            <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-4 leading-relaxed">
              <p>{t('compositionP1')}</p>
              <p>{t('compositionP2')}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {(['doctors', 'candidates', 'total'] as const).map((key) => (
                <div
                  key={key}
                  className="border-border-light dark:border-border-dark rounded-xl border p-5 text-center"
                >
                  <p className="text-primary dark:text-primary-light font-display text-2xl font-bold">
                    {t(`composition.${key}.value`)}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                    {t(`composition.${key}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/university/administration">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAdmin')}
              </Button>
            </Link>
            <Link href="/university/rector">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaRector')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
