import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Award, Star, Calendar } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.showcase' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ShowcasePage() {
  const t = useTranslations('aiCenter.showcase');

  const showcaseItems = ['item1', 'item2', 'item3'];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-purple-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-purple-500/30 bg-purple-500/20 text-purple-200">
            {t('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {showcaseItems.map((key) => (
              <Card key={key} padding="lg" hover>
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 md:w-64 md:shrink-0">
                    <Award size={48} className="text-blue-400/50" />
                  </div>
                  <div className="flex-1">
                    <div className="text-text-secondary-light dark:text-text-secondary-dark mb-2 flex items-center gap-2 text-xs">
                      <Calendar size={12} />
                      <span>{t(`items.${key}.date`)}</span>
                      <Star size={12} className="text-gold" />
                      <span>{t(`items.${key}.category`)}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{t(`items.${key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                      {t(`items.${key}.text`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['tech1', 'tech2', 'tech3'].map((tech) => (
                        <span
                          key={tech}
                          className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium"
                        >
                          {t(`items.${key}.${tech}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/ai-center/projects">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaProjects')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
