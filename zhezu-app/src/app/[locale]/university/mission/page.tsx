import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Target,
  Eye,
  Gem,
  Lightbulb,
  Handshake,
  GraduationCap,
  Pickaxe,
  Globe,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university' });
  return {
    title: t('mission.pageTitle'),
    description: t('mission.pageDescription'),
  };
}

export default function MissionPage() {
  const t = useTranslations('university.mission');

  const values = [
    {
      icon: GraduationCap,
      titleKey: 'values.quality.title',
      textKey: 'values.quality.text',
      color: 'text-primary dark:text-primary-light',
      bg: 'bg-primary/10 dark:bg-primary-light/10',
    },
    {
      icon: Lightbulb,
      titleKey: 'values.innovation.title',
      textKey: 'values.innovation.text',
      color: 'text-gold',
      bg: 'bg-gold/10',
    },
    {
      icon: Handshake,
      titleKey: 'values.partnership.title',
      textKey: 'values.partnership.text',
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      icon: Globe,
      titleKey: 'values.openness.title',
      textKey: 'values.openness.text',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-600/10 dark:bg-purple-400/10',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('badge')}</Badge>
            <h1 className="font-display mb-6 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Card padding="lg" hover>
              <div className="bg-primary/10 dark:bg-primary-light/10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Target size={28} className="text-primary dark:text-primary-light" />
              </div>
              <h2 className="font-display mb-4 text-2xl font-bold">{t('missionTitle')}</h2>
              <blockquote className="border-primary/30 dark:border-primary-light/30 mb-4 border-l-4 pl-4">
                <p className="text-text-primary-light dark:text-text-primary-dark text-lg leading-relaxed italic">
                  {t('missionQuote')}
                </p>
              </blockquote>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('missionText')}
              </p>
            </Card>

            <Card padding="lg" hover>
              <div className="bg-gold/10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Eye size={28} className="text-gold" />
              </div>
              <h2 className="font-display mb-4 text-2xl font-bold">{t('visionTitle')}</h2>
              <blockquote className="border-gold/30 mb-4 border-l-4 pl-4">
                <p className="text-text-primary-light dark:text-text-primary-dark text-lg leading-relaxed italic">
                  {t('visionQuote')}
                </p>
              </blockquote>
              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                {t('visionText')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategic Goal */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="bg-primary/10 dark:bg-primary-light/10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
              <Pickaxe size={28} className="text-primary dark:text-primary-light" />
            </div>
            <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
              {t('strategicTitle')}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
              {t('strategicText')}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold">{t('valuesTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val) => (
              <Card key={val.titleKey} padding="lg" hover>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${val.bg}`}
                >
                  <val.icon size={24} className={val.color} />
                </div>
                <h3 className="font-display mb-2 text-lg font-semibold">{t(val.titleKey)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t(val.textKey)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold">
            {t('achievementsTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card padding="lg" hover>
              <div className="bg-gold/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <Gem size={24} className="text-gold" />
              </div>
              <h3 className="font-display mb-2 font-semibold">{t('achievements.spi.title')}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                {t('achievements.spi.text')}
              </p>
            </Card>
            <Card padding="lg" hover>
              <div className="bg-gold/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <Gem size={24} className="text-gold" />
              </div>
              <h3 className="font-display mb-2 font-semibold">{t('achievements.gold.title')}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                {t('achievements.gold.text')}
              </p>
            </Card>
            <Card padding="lg" hover>
              <div className="bg-primary/10 dark:bg-primary-light/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                <Globe size={24} className="text-primary dark:text-primary-light" />
              </div>
              <h3 className="font-display mb-2 font-semibold">{t('achievements.bologna.title')}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                {t('achievements.bologna.text')}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
