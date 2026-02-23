'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="premium-card mx-auto max-w-md p-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
          <AlertTriangle className="h-8 w-8 text-error" />
        </div>

        <h2 className="font-display mb-3 text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {t('title')}
        </h2>

        <p className="mb-6 text-text-secondary-light dark:text-text-secondary-dark">
          {t('description')}
        </p>

        <button
          onClick={reset}
          className="btn-premium inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {t('retry')}
        </button>
      </div>
    </div>
  );
}
