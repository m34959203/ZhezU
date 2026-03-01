'use client';

import { useLocale } from 'next-intl';
import type { Locale } from '@/types';
import type { TextBlockConfig, BlockSize } from '@/lib/admin/types';
import { BLOCK_SIZE_CLS } from '@/lib/admin/types';
import { sanitizeHtml } from '@/lib/sanitize-html';

const ALIGN_CLS: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

interface TextBlockProps {
  config: TextBlockConfig;
  size: BlockSize;
}

export default function TextBlock({ config, size }: TextBlockProps) {
  const locale = useLocale() as Locale;
  const content = config.content[locale] || config.content.ru || '';
  const align = config.align || 'left';

  return (
    <section className="bg-bg-light dark:bg-bg-dark py-12">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${BLOCK_SIZE_CLS[size]}`}>
        <div
          className={`prose prose-lg dark:prose-invert max-w-none ${ALIGN_CLS[align]}`}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      </div>
    </section>
  );
}
