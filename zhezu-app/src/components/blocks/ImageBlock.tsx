'use client';

import { useLocale } from 'next-intl';
import type { Locale } from '@/types';
import type { ImageBlockConfig, BlockSize } from '@/lib/admin/types';
import { BLOCK_SIZE_CLS } from '@/lib/admin/types';

interface ImageBlockProps {
  config: ImageBlockConfig;
  size: BlockSize;
}

export default function ImageBlock({ config, size }: ImageBlockProps) {
  const locale = useLocale() as Locale;
  const caption = config.caption
    ? config.caption[locale] || config.caption.ru || ''
    : '';

  return (
    <section className="bg-bg-light dark:bg-bg-dark py-8">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${BLOCK_SIZE_CLS[size]}`}>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={config.src}
            alt={config.alt || ''}
            className={`w-full object-cover ${config.rounded ? 'rounded-2xl' : ''}`}
          />
          {caption && (
            <figcaption className="text-text-secondary-light dark:text-text-secondary-dark mt-3 text-center text-sm">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
