import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.faqPage' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const t = await getTranslations('admission.faqPage');

  const generalFaq = Array.from({ length: 8 }, (_, i) => ({
    id: `faq-${i + 1}`,
    trigger: t(`general.q${i + 1}`),
    content: t(`general.a${i + 1}`),
  }));

  const docsFaq = Array.from({ length: 4 }, (_, i) => ({
    id: `docs-${i + 1}`,
    trigger: t(`docs.q${i + 1}`),
    content: t(`docs.a${i + 1}`),
  }));

  const finFaq = Array.from({ length: 4 }, (_, i) => ({
    id: `fin-${i + 1}`,
    trigger: t(`financial.q${i + 1}`),
    content: t(`financial.a${i + 1}`),
  }));

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

      {/* General FAQ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-2xl font-bold">{t('generalTitle')}</h2>
          <Accordion items={generalFaq} type="single" />
        </div>
      </section>

      {/* Documents FAQ */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-2xl font-bold">{t('docsTitle')}</h2>
          <Accordion items={docsFaq} type="single" />
        </div>
      </section>

      {/* Financial FAQ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-2xl font-bold">{t('financialTitle')}</h2>
          <Accordion items={finFaq} type="single" />
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display mb-4 text-2xl font-bold">{t('moreTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm">
            {t('moreText')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/contact">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaContact')}
              </Button>
            </Link>
            <Link href="/admission/consultation">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaConsultation')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
