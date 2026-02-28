'use client';

import type { DividerBlockConfig } from '@/lib/admin/types';

const SPACING: Record<string, string> = {
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-12',
};

interface DividerBlockProps {
  config: DividerBlockConfig;
}

export default function DividerBlock({ config }: DividerBlockProps) {
  const spacing = SPACING[config.spacing || 'md'];
  const style = config.style || 'line';

  return (
    <div className={spacing}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {style === 'line' && (
          <hr className="border-border-light dark:border-border-dark" />
        )}
        {style === 'dots' && (
          <div className="flex items-center justify-center gap-2">
            <span className="bg-border-light dark:bg-border-dark h-1.5 w-1.5 rounded-full" />
            <span className="bg-border-light dark:bg-border-dark h-1.5 w-1.5 rounded-full" />
            <span className="bg-border-light dark:bg-border-dark h-1.5 w-1.5 rounded-full" />
          </div>
        )}
        {/* 'space' style renders nothing — just spacing */}
      </div>
    </div>
  );
}
