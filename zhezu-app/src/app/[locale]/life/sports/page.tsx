import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Trophy, Users } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life.sports' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function SportsPage() {
  const t = useTranslations('life.sports');

  const teams = ['football', 'volleyball', 'basketball', 'tableTennis'];

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
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('teamsTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teams.map((key) => (
              <Card key={key} padding="lg" className="text-center">
                <div className="bg-gold/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <Trophy size={24} className="text-gold" />
                </div>
                <h3 className="mb-1 font-bold">{t(`teams.${key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {t(`teams.${key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/life/sports/facilities">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaFacilities')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
