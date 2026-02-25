import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Microscope, Cpu, Beaker, Zap } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research.labs' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function LabsPage() {
  const t = useTranslations('research.labs');

  const labs = [
    { key: 'mining', icon: <Microscope size={24} /> },
    { key: 'metallurgy', icon: <Beaker size={24} /> },
    { key: 'electrical', icon: <Zap size={24} /> },
    { key: 'it', icon: <Cpu size={24} /> },
  ];

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
          <div className="grid gap-6 md:grid-cols-2">
            {labs.map((lab) => (
              <Card key={lab.key} padding="lg" hover>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                    <span className="text-primary">{lab.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold">{t(`labs.${lab.key}.title`)}</h3>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-sm">
                  {t(`labs.${lab.key}.text`)}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                  <span className="font-semibold">{t('equipment')}:</span>{' '}
                  {t(`labs.${lab.key}.equipment`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/research/equipment">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaEquipment')}
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
