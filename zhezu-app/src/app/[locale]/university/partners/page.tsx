import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  Building2,
  Pickaxe,
  Zap,
  GraduationCap,
  Landmark,
  Factory,
  Briefcase,
  Users,
  Handshake,
  ArrowRight,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.partners' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function PartnersPage() {
  const t = useTranslations('university.partners');

  const industries = [
    { key: 'mining', icon: <Pickaxe size={24} /> },
    { key: 'energy', icon: <Zap size={24} /> },
    { key: 'construction', icon: <Building2 size={24} /> },
    { key: 'education', icon: <GraduationCap size={24} /> },
    { key: 'government', icon: <Landmark size={24} /> },
    { key: 'manufacturing', icon: <Factory size={24} /> },
  ];

  const cooperation = [
    { key: 'practice', icon: <Briefcase size={20} /> },
    { key: 'employment', icon: <Users size={20} /> },
    { key: 'dual', icon: <Handshake size={20} /> },
    { key: 'research', icon: <GraduationCap size={20} /> },
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

      {/* Industry Partners */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('industriesTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('industriesSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Card key={ind.key} padding="lg" hover>
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-primary-light/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <span className="text-primary dark:text-primary-light">{ind.icon}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold">
                    {t(`industries.${ind.key}.title`)}
                  </h3>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm leading-relaxed">
                  {t(`industries.${ind.key}.text`)}
                </p>
                <div className="border-border-light dark:border-border-dark border-t pt-3">
                  <p className="text-xs font-medium">{t(`industries.${ind.key}.partners`)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cooperation Forms */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold">{t('cooperationTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cooperation.map((c) => (
              <div
                key={c.key}
                className="border-border-light dark:border-border-dark rounded-xl border p-6 text-center"
              >
                <div className="bg-gold/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <span className="text-gold">{c.icon}</span>
                </div>
                <h3 className="font-display mb-2 text-sm font-semibold">
                  {t(`cooperation.${c.key}.title`)}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                  {t(`cooperation.${c.key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {(['employment', 'partners', 'regions'] as const).map((key) => (
              <div key={key} className="text-center">
                <p className="text-primary dark:text-primary-light font-display text-4xl font-bold">
                  {t(`stats.${key}.value`)}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                  {t(`stats.${key}.label`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/university/partners/international">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaInternational')}
              </Button>
            </Link>
            <Link href="/career">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaCareer')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
