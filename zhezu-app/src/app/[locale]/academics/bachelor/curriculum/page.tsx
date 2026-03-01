import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { AdmissionOnly } from '@/components/admission/AdmissionOnly';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.curriculum' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function CurriculumPage() {
  const t = useTranslations('academics.curriculum');

  const cycles = ['general', 'base', 'major', 'practice', 'final'];

  return (
    <div className="flex flex-col">
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

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            {t('structureTitle')}
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {cycles.map((key) => (
              <Card key={key} padding="md">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <BookOpen size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{t(`cycles.${key}.title`)}</h3>
                      <span className="text-primary text-sm font-bold">
                        {t(`cycles.${key}.credits`)}
                      </span>
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                      {t(`cycles.${key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <h3 className="mb-4 font-semibold">{t('featuresTitle')}</h3>
            <ul className="space-y-2 text-sm">
              {['feat1', 'feat2', 'feat3', 'feat4'].map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-green-500" />
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/academics/bachelor">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaPrograms')}
              </Button>
            </Link>
            <AdmissionOnly>
              <Link href="/admission/apply">
                <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                  {t('ctaApply')}
                </Button>
              </Link>
            </AdmissionOnly>
          </div>
        </div>
      </section>
    </div>
  );
}
