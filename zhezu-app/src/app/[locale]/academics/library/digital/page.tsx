import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Globe, Database, FileText, Search } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.digitalLibrary' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function DigitalLibraryPage() {
  const t = useTranslations('academics.digitalLibrary');

  const resources = [
    { key: 'scopus', icon: <Database size={24} /> },
    { key: 'webOfScience', icon: <Globe size={24} /> },
    { key: 'elibrary', icon: <FileText size={24} /> },
    { key: 'kazpatent', icon: <Search size={24} /> },
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
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            {t('resourcesTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((res) => (
              <Card key={res.key} padding="lg" hover>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-primary">{res.icon}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{t(`resources.${res.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {t(`resources.${res.key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/academics/library">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaLibrary')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
