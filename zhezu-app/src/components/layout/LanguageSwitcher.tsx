'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <div className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark absolute top-full right-0 z-50 mt-1 w-40 overflow-hidden rounded-lg border shadow-lg">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition-colors ${
                l === locale
                  ? 'bg-primary/10 text-primary dark:text-primary-light font-medium'
                  : 'text-text-primary-light dark:text-text-primary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
