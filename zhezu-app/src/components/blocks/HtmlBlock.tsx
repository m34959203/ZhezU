'use client';

import type { HtmlBlockConfig, BlockSize } from '@/lib/admin/types';
import { BLOCK_SIZE_CLS } from '@/lib/admin/types';
import { sanitizeHtml } from '@/lib/sanitize-html';

interface HtmlBlockProps {
  config: HtmlBlockConfig;
  size: BlockSize;
}

export default function HtmlBlock({ config, size }: HtmlBlockProps) {
  return (
    <section className="bg-bg-light dark:bg-bg-dark py-8">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${BLOCK_SIZE_CLS[size]}`}>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(config.code) }} />
      </div>
    </section>
  );
}
