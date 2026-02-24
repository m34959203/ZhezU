import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  FileCheck,
  ShieldCheck,
  Award,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.licenses' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function LicensesPage() {
  const t = useTranslations('university.licenses');

  const licenses = [
    { key: 'education', icon: <GraduationCap size={24} /> },
    { key: 'retraining', icon: <Award size={24} /> },
    { key: 'accreditation', icon: <FileCheck size={24} /> },
    { key: 'iso', icon: <ShieldCheck size={24} /> },
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

      {/* Licenses */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {licenses.map((lic) => (
              <Card key={lic.key} padding="lg" hover>
                <div className="mb-5 flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-primary-light/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <span className="text-primary dark:text-primary-light">{lic.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{t(`licenses.${lic.key}.title`)}</h3>
                    <p className="text-gold text-xs font-medium">{t(`licenses.${lic.key}.number`)}</p>
                  </div>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm leading-relaxed">
                  {t(`licenses.${lic.key}.text`)}
                </p>
                <div className="border-border-light dark:border-border-dark flex items-center justify-between border-t pt-3">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t(`licenses.${lic.key}.issued`)}
                  </span>
                  <span className="bg-success/10 text-success rounded-full px-3 py-0.5 text-xs font-medium">
                    {t(`licenses.${lic.key}.status`)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">{t('infoTitle')}</h2>
            <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-4 leading-relaxed">
              <p>{t('infoP1')}</p>
              <p>{t('infoP2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/university/documents/charter">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaCharter')}
              </Button>
            </Link>
            <Link href="/university/accreditation">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAccreditation')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
