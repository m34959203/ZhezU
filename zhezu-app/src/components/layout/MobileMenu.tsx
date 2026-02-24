'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { NAVIGATION_ITEMS, AUDIENCE_LINKS, UTILITY_CONTACTS } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */
function AccordionNavItem({
  item,
  isExpanded,
  onToggle,
}: {
  item: (typeof NAVIGATION_ITEMS)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations('megaNav');

  return (
    <div className="border-border-light/30 dark:border-border-dark/30 border-b">
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-center justify-between px-1 py-4 text-left"
        aria-expanded={isExpanded}
      >
        <span
          className={cn(
            'font-display text-base font-semibold transition-colors',
            isExpanded
              ? 'text-primary dark:text-primary-light'
              : 'text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light',
          )}
        >
          {t(item.labelKey + '.title')}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'text-text-secondary-light dark:text-text-secondary-dark transition-transform duration-300',
            isExpanded && 'text-primary dark:text-primary-light rotate-180',
          )}
        />
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-1 pb-4">
              {item.columns.map((column) => (
                <div key={column.titleKey}>
                  <h4 className="text-primary/70 dark:text-primary-light/70 mb-2 text-xs font-semibold tracking-wider uppercase">
                    {t(column.titleKey)}
                  </h4>
                  <ul className="space-y-1">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light hover:border-primary dark:hover:border-primary-light block border-l-2 border-transparent py-1.5 pl-3 text-sm transition-all duration-200"
                        >
                          {t(link.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* View all link */}
              <Link
                href={item.href}
                className="text-primary dark:text-primary-light mt-2 inline-block text-sm font-medium underline-offset-4 hover:underline"
              >
                {t(item.labelKey + '.title')} &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  MOBILE MENU                                                        */
/* ================================================================== */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = useTranslations('megaNav');
  const pathname = usePathname();

  /* Close on route change (state-during-render pattern) */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setExpandedId(null);
  }

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(true)}
        className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors lg:hidden"
        aria-label="Menu"
      >
        <Menu size={20} />
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
              className="bg-bg-light dark:bg-bg-dark absolute inset-0 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Header row */}
              <div className="border-border-light/50 dark:border-border-dark/50 flex items-center justify-between border-b px-5 py-4">
                <Link
                  href="/"
                  className="group flex items-center gap-2.5"
                  onClick={() => setOpen(false)}
                >
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://zhezu.edu.kz/wp-content/uploads/2023/12/logo.png"
                      alt="ZhezU"
                      width={44}
                      height={44}
                      className="h-11 w-11 -translate-x-[2px] object-contain"
                    />
                  </div>
                  <span className="font-display text-primary dark:text-primary-light text-lg font-bold">
                    ZhezU
                  </span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} className="text-text-primary-light dark:text-text-primary-dark" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="px-5 py-4">
                  {/* CTA Button — prominent at top */}
                  <Link href="/admission/apply" onClick={() => setOpen(false)}>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="font-display mb-6 w-full text-base"
                    >
                      {t('apply')}
                    </Button>
                  </Link>

                  {/* Navigation accordion */}
                  <nav aria-label="Mobile navigation">
                    {NAVIGATION_ITEMS.map((item) => (
                      <AccordionNavItem
                        key={item.id}
                        item={item}
                        isExpanded={expandedId === item.id}
                        onToggle={() => toggleAccordion(item.id)}
                      />
                    ))}
                  </nav>

                  {/* Audience links */}
                  <div className="border-border-light/50 dark:border-border-dark/50 mt-6 border-t pt-6">
                    <h3 className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-xs font-semibold tracking-wider uppercase">
                      {/* Quick links label — no i18n key needed, uses audience links directly */}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {AUDIENCE_LINKS.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          className="bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:bg-primary/10 dark:hover:bg-primary-light/10 hover:text-primary dark:hover:text-primary-light border-border-light/30 dark:border-border-dark/30 flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {t(link.labelKey)}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="border-border-light/50 dark:border-border-dark/50 mt-6 space-y-3 border-t pt-6">
                    <a
                      href={UTILITY_CONTACTS.phone.href}
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light flex items-center gap-2.5 text-sm transition-colors"
                    >
                      <Phone size={16} />
                      <span>{UTILITY_CONTACTS.phone.label}</span>
                    </a>
                    <a
                      href={UTILITY_CONTACTS.email.href}
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light flex items-center gap-2.5 text-sm transition-colors"
                    >
                      <Mail size={16} />
                      <span>{UTILITY_CONTACTS.email.label}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom bar: theme + language */}
              <div className="border-border-light/50 dark:border-border-dark/50 bg-surface-light/50 dark:bg-surface-dark/50 flex items-center justify-between border-t px-5 py-4">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <span className="text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-xs">
                  &copy; 2026 ZhezU
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
