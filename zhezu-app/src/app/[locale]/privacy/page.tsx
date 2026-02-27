import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  const sections = [
    'collection',
    'usage',
    'storage',
    'sharing',
    'rights',
    'cookies',
    'changes',
  ] as const;

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
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((key, i) => (
              <div key={key}>
                <h2 className="font-display mb-3 text-xl font-bold">
                  {i + 1}. {t(`sections.${key}.title`)}
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {t(`sections.${key}.text`)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-border-light dark:border-border-dark mt-12 border-t pt-8">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
