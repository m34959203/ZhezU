import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Globe, Award, ShieldCheck, Handshake, BookOpen, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.internationalAccreditation' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function InternationalAccreditationPage() {
  const t = useTranslations('university.internationalAccreditation');

  const achievements = [
    { key: 'magna', icon: <Globe size={24} /> },
    { key: 'spi', icon: <Award size={24} /> },
    { key: 'gold', icon: <Award size={24} /> },
    { key: 'iso', icon: <ShieldCheck size={24} /> },
  ];

  const partnerships = [{ key: 'bologna' }, { key: 'mobility' }, { key: 'research' }];

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

      {/* About */}
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

      {/* International Achievements */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">
            {t('achievementsTitle')}
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('achievementsSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((a) => (
              <Card key={a.key} padding="lg" hover>
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-primary-light/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <span className="text-primary dark:text-primary-light">{a.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {t(`achievements.${a.key}.title`)}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`achievements.${a.key}.year`)}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t(`achievements.${a.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* International Cooperation */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">
            {t('cooperationTitle')}
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('cooperationSubtitle')}
          </p>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {partnerships.map((p) => (
              <Card key={p.key} padding="lg" hover>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gold/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                    {p.key === 'bologna' && <Globe size={24} className="text-gold" />}
                    {p.key === 'mobility' && <Handshake size={24} className="text-gold" />}
                    {p.key === 'research' && <BookOpen size={24} className="text-gold" />}
                  </div>
                  <h3 className="font-display mb-2 text-base font-semibold">
                    {t(`cooperation.${p.key}.title`)}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {t(`cooperation.${p.key}.text`)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/university/accreditation">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaNational')}
              </Button>
            </Link>
            <Link href="/university/about">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAbout')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
