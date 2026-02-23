import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="premium-card mx-auto max-w-md p-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 dark:bg-primary-light/10">
          <FileQuestion className="h-10 w-10 text-primary dark:text-primary-light" />
        </div>

        <h1 className="font-display mb-2 text-6xl font-extrabold text-gradient">
          404
        </h1>

        <h2 className="font-display mb-3 text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {t('title')}
        </h2>

        <p className="mb-8 text-text-secondary-light dark:text-text-secondary-dark">
          {t('description')}
        </p>

        <Link
          href="/"
          className="btn-premium inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
