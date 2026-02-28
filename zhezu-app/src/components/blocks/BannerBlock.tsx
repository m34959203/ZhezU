'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/types';
import type { BannerBlockConfig, BlockSize } from '@/lib/admin/types';
import { BLOCK_SIZE_CLS } from '@/lib/admin/types';

interface BannerBlockProps {
  config: BannerBlockConfig;
  size: BlockSize;
}

export default function BannerBlock({ config, size }: BannerBlockProps) {
  const locale = useLocale() as Locale;
  const title = config.title[locale] || config.title.ru || '';
  const description = config.description
    ? config.description[locale] || config.description.ru || ''
    : '';
  const buttonText = config.buttonText
    ? config.buttonText[locale] || config.buttonText.ru || ''
    : '';

  const bgStyle: React.CSSProperties = {};
  if (config.backgroundImage) {
    bgStyle.backgroundImage = `url(${config.backgroundImage})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }
  if (config.backgroundColor) {
    bgStyle.backgroundColor = config.backgroundColor;
  }

  return (
    <section className="py-8">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${BLOCK_SIZE_CLS[size]}`}>
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16"
          style={bgStyle}
        >
          {config.overlay && config.backgroundImage && (
            <div className="absolute inset-0 bg-black/50" />
          )}
          <div className={`relative ${config.backgroundImage ? 'text-white' : 'text-text-primary-light dark:text-text-primary-dark'}`}>
            <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">{title}</h2>
            {description && (
              <p className={`mx-auto mb-8 max-w-xl leading-relaxed ${config.backgroundImage ? 'text-white/80' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                {description}
              </p>
            )}
            {buttonText && config.buttonLink && (
              <Link href={config.buttonLink}>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  {buttonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
