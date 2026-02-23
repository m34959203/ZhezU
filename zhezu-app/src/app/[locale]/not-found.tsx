import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="premium-card mx-auto max-w-md p-8">
        <div className="bg-primary/10 dark:bg-primary-light/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <FileQuestion className="text-primary dark:text-primary-light h-10 w-10" />
        </div>

        <h1 className="font-display text-gradient mb-2 text-6xl font-extrabold">404</h1>

        <h2 className="font-display text-text-primary-light dark:text-text-primary-dark mb-3 text-xl font-bold">
          {t('title')}
        </h2>

        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
          {t('description')}
        </p>

        <Link
          href="/"
          className="btn-premium bg-primary font-display hover:bg-primary-dark inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
