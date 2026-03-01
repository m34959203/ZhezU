import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Newspaper, Calendar, Trophy, Home, Users } from 'lucide-react';
import { AdmissionOnly } from '@/components/admission/AdmissionOnly';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life.hub' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function LifePage() {
  const t = useTranslations('life.hub');

  const sections = [
    { key: 'news', icon: <Newspaper size={24} />, href: '/life/news' },
    { key: 'events', icon: <Calendar size={24} />, href: '/life/events' },
    { key: 'sports', icon: <Trophy size={24} />, href: '/life/sports' },
    { key: 'dormitories', icon: <Home size={24} />, href: '/life/dormitories' },
    { key: 'clubs', icon: <Users size={24} />, href: '/life/clubs' },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,23,0.85)] to-[rgba(10,14,23,0.75)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(230,179,37,0.1),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border border-white/20 bg-white/10 text-white backdrop-blur-sm">{t('badge')}</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold text-white sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <Link key={s.key} href={s.href} prefetch={false}>
                <Card padding="lg" hover className="h-full">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <span className="text-primary">{s.icon}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{t(`sections.${s.key}.title`)}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {t(`sections.${s.key}.text`)}
                  </p>
                  <div className="text-primary mt-4 flex items-center gap-1 text-sm font-semibold">
                    {t('viewMore')} <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AdmissionOnly>
            <Link href="/admission/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
          </AdmissionOnly>
        </div>
      </section>
    </div>
  );
}
