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
        <div className="bg-error/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <AlertTriangle className="text-error h-8 w-8" />
        </div>

        <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-3 text-2xl font-bold">
          {t('title')}
        </h2>

        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
          {t('description')}
        </p>

        <button
          onClick={reset}
          className="btn-premium bg-primary font-display hover:bg-primary-dark inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          {t('retry')}
        </button>
      </div>
    </div>
  );
}
