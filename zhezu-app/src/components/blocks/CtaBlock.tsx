'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/types';
import type { CtaBlockConfig, LocalizedString, BlockSize } from '@/lib/admin/types';
import { BLOCK_SIZE_CLS } from '@/lib/admin/types';

function ls(val: LocalizedString | undefined, locale: Locale, fallback: string): string {
  if (!val) return fallback;
  return val[locale] || val.ru || fallback;
}

interface CtaBlockProps {
  config?: CtaBlockConfig;
  size?: BlockSize;
}

export default function CtaBlock({ config, size = 'full' }: CtaBlockProps) {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;

  const title = config?.title ? ls(config.title, locale, t('cta.title')) : t('cta.title');
  const description = config?.description
    ? ls(config.description, locale, t('cta.description'))
    : t('cta.description');
  const buttonText = config?.buttonText
    ? ls(config.buttonText, locale, t('cta.button'))
    : t('cta.button');
  const buttonLink = config?.buttonLink || '/admission';

  return (
    <section className="bg-surface-light dark:bg-surface-dark py-16 lg:py-24">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${BLOCK_SIZE_CLS[size]}`}>
        <div className="from-primary via-primary relative overflow-hidden rounded-2xl bg-gradient-to-br to-blue-900 p-8 text-center text-white sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="relative">
            <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">{title}</h2>
            <p className="mx-auto mb-8 max-w-xl leading-relaxed text-white/70">{description}</p>
            <Link href={buttonLink}>
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
