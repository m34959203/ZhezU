'use client';

import { useAdmissionOpen } from '@/hooks/useAdmissionOpen';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, XCircle } from 'lucide-react';

/**
 * Shows a prominent banner when admission is closed.
 * Intended for the /admission/apply page to block form access.
 */
export function AdmissionClosedBanner() {
  const admissionOpen = useAdmissionOpen();
  const t = useTranslations('admission');

  if (admissionOpen) return null;

  return (
    <div className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 mx-auto my-8 max-w-3xl rounded-2xl border p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <XCircle size={28} className="text-red-500" />
      </div>
      <h2 className="mb-2 text-xl font-bold">{t('heroBadgeClosed')}</h2>
      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm">
        {t('closedDescription')}
      </p>
      <Link href="/admission">
        <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
          {t('backToAdmission')}
        </Button>
      </Link>
    </div>
  );
}
