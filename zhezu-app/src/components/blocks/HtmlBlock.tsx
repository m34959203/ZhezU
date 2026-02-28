'use client';

import type { HtmlBlockConfig, BlockSize } from '@/lib/admin/types';

const SIZE_CLS: Record<BlockSize, string> = {
  full: 'max-w-7xl',
  wide: 'max-w-5xl',
  medium: 'max-w-3xl',
  narrow: 'max-w-xl',
};

interface HtmlBlockProps {
  config: HtmlBlockConfig;
  size: BlockSize;
}

export default function HtmlBlock({ config, size }: HtmlBlockProps) {
  return (
    <section className="bg-bg-light dark:bg-bg-dark py-8">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${SIZE_CLS[size]}`}>
        <div dangerouslySetInnerHTML={{ __html: config.code }} />
      </div>
    </section>
  );
}
