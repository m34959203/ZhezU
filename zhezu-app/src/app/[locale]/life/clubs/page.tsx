import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Music, Palette, Globe, BookOpen, Users } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life.clubs' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ClubsPage() {
  const t = useTranslations('life.clubs');

  const clubs = [
    { key: 'debate', icon: <Users size={24} /> },
    { key: 'art', icon: <Palette size={24} /> },
    { key: 'music', icon: <Music size={24} /> },
    { key: 'languages', icon: <Globe size={24} /> },
    { key: 'science', icon: <BookOpen size={24} /> },
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <Card key={club.key} padding="lg" hover>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <span className="text-primary">{club.icon}</span>
                </div>
                <h3 className="mb-2 font-bold">{t(`clubs.${club.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {t(`clubs.${club.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/life/student-government">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaGov')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
