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
import {
  NAVIGATION_ITEMS,
  AUDIENCE_LINKS,
  UTILITY_CONTACTS,
} from '@/lib/navigation';

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
    <div className="border-b border-border-light/30 dark:border-border-dark/30">
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 px-1 text-left cursor-pointer group"
        aria-expanded={isExpanded}
      >
        <span
          className={cn(
            'font-display font-semibold text-base transition-colors',
            isExpanded
              ? 'text-primary dark:text-primary-light'
              : 'text-text-primary-light dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light'
          )}
        >
          {t(item.labelKey + '.title')}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'text-text-secondary-light dark:text-text-secondary-dark transition-transform duration-300',
            isExpanded && 'rotate-180 text-primary dark:text-primary-light'
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
            <div className="pb-4 px-1 space-y-4">
              {item.columns.map((column) => (
                <div key={column.titleKey}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary/70 dark:text-primary-light/70 mb-2">
                    {t(column.titleKey)}
                  </h4>
                  <ul className="space-y-1">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block py-1.5 pl-3 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light border-l-2 border-transparent hover:border-primary dark:hover:border-primary-light transition-all duration-200"
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
                className="inline-block text-sm font-medium text-primary dark:text-primary-light mt-2 hover:underline underline-offset-4"
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

  /* Close on route change */
  useEffect(() => {
    setOpen(false);
    setExpandedId(null);
  }, [pathname]);

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
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors cursor-pointer"
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
              className="absolute inset-0 bg-bg-light dark:bg-bg-dark flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-light/50 dark:border-border-dark/50">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <GraduationCap size={18} className="text-white" />
                  </div>
                  <span className="font-display font-bold text-lg text-primary dark:text-primary-light">
                    ZhezU
                  </span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-colors cursor-pointer"
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
                      className="w-full font-display text-base mb-6"
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
                  <div className="mt-6 pt-6 border-t border-border-light/50 dark:border-border-dark/50">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-3">
                      {/* Quick links label — no i18n key needed, uses audience links directly */}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {AUDIENCE_LINKS.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          className="flex items-center justify-center py-3 px-4 rounded-xl bg-surface-light dark:bg-surface-dark text-sm font-medium text-text-primary-light dark:text-text-primary-dark hover:bg-primary/10 dark:hover:bg-primary-light/10 hover:text-primary dark:hover:text-primary-light transition-colors border border-border-light/30 dark:border-border-dark/30"
                          onClick={() => setOpen(false)}
                        >
                          {t(link.labelKey)}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="mt-6 pt-6 border-t border-border-light/50 dark:border-border-dark/50 space-y-3">
                    <a
                      href={UTILITY_CONTACTS.phone.href}
                      className="flex items-center gap-2.5 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      <Phone size={16} />
                      <span>{UTILITY_CONTACTS.phone.label}</span>
                    </a>
                    <a
                      href={UTILITY_CONTACTS.email.href}
                      className="flex items-center gap-2.5 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      <Mail size={16} />
                      <span>{UTILITY_CONTACTS.email.label}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom bar: theme + language */}
              <div className="px-5 py-4 border-t border-border-light/50 dark:border-border-dark/50 flex items-center justify-between bg-surface-light/50 dark:bg-surface-dark/50">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <span className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/60">
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
