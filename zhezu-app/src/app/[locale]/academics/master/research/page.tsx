import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Microscope, FileText, Users } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.masterResearch' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function MasterResearchPage() {
  const t = useTranslations('academics.masterResearch');

  const directions = ['mining', 'geology', 'pedagogy'];

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
            {t('directionsTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {directions.map((key) => (
              <Card key={key} padding="lg">
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Microscope size={24} className="text-primary" />
                </div>
                <h3 className="mb-2 font-bold">{t(`directions.${key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {t(`directions.${key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-center text-2xl font-bold">{t('thesisTitle')}</h2>
          <Card padding="lg">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FileText size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">{t('thesis.format')}</p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    {t('thesis.formatText')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">{t('thesis.defense')}</p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    {t('thesis.defenseText')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/academics/master">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaPrograms')}
              </Button>
            </Link>
            <Link href="/research">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaResearch')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
