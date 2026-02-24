'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Search, GraduationCap, Phone, Mail, ChevronDown, ArrowRight, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { Button } from '@/components/ui/Button';
import { NAVIGATION_ITEMS, AUDIENCE_LINKS, UTILITY_CONTACTS, SOCIAL_LINKS } from '@/lib/navigation';

/* ------------------------------------------------------------------ */
/*  Social Icon SVGs (inline to avoid extra dependencies)              */
/* ------------------------------------------------------------------ */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

/* ------------------------------------------------------------------ */
/*  Utility Bar                                                        */
/* ------------------------------------------------------------------ */
function UtilityBar() {
  const t = useTranslations('megaNav');

  return (
    <div className="bg-primary text-xs text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between">
          {/* Left: phone + email */}
          <div className="hidden items-center gap-4 sm:flex">
            <a
              href={UTILITY_CONTACTS.phone.href}
              className="hover:text-gold flex items-center gap-1.5 transition-colors"
            >
              <Phone size={12} />
              <span>{UTILITY_CONTACTS.phone.label}</span>
            </a>
            <a
              href={UTILITY_CONTACTS.email.href}
              className="hover:text-gold flex items-center gap-1.5 transition-colors"
            >
              <Mail size={12} />
              <span>{UTILITY_CONTACTS.email.label}</span>
            </a>
          </div>

          {/* Right: socials + language */}
          <div className="ml-auto flex items-center gap-3">
            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const IconComp = SOCIAL_ICON_MAP[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="hover:text-gold transition-colors"
                  >
                    {IconComp && <IconComp className="h-3.5 w-3.5" />}
                  </a>
                );
              })}
            </div>

            <span className="h-4 w-px bg-white/20" aria-hidden="true" />

            {/* Search icon (utility) */}
            <button
              className="hover:text-gold cursor-pointer transition-colors"
              aria-label={t('searchPlaceholder')}
            >
              <Search size={14} />
            </button>

            <span className="h-4 w-px bg-white/20" aria-hidden="true" />

            {/* Language switcher in utility bar (compact) */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mega Menu Panel                                                    */
/* ------------------------------------------------------------------ */
function MegaMenuPanel({
  item,
  isOpen,
}: {
  item: (typeof NAVIGATION_ITEMS)[number];
  isOpen: boolean;
}) {
  const t = useTranslations('megaNav');

  return (
    <div
      className={cn(
        'absolute top-full right-0 left-0 z-50 transition-all duration-300 ease-out',
        isOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-2 opacity-0',
      )}
    >
      {/* shadow/backdrop */}
      <div className="border-border-light dark:border-border-dark dark:bg-surface-dark border-t border-b bg-white shadow-xl">
        <div className="mx-auto max-w-screen-xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
            {item.columns.map((column) => (
              <div key={column.titleKey} className="flex flex-col">
                <h3 className="font-display text-primary dark:text-primary-light mb-3 text-xs font-semibold tracking-widest uppercase">
                  {t(column.titleKey)}
                </h3>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light block py-1.5 text-sm font-normal transition-colors duration-200"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom action bar */}
          <div className="border-border-light/50 dark:border-border-dark/50 mt-8 flex items-center justify-between border-t pt-6">
            <div className="flex gap-4">
              <Link
                href="/university/about"
                prefetch={false}
                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:text-white">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-text-primary-light text-sm font-bold dark:text-white">
                    {t('whyZhezU')}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('whyZhezUDesc')}
                  </p>
                </div>
              </Link>
              <Link
                href="/university/campus"
                prefetch={false}
                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:text-white">
                  <Compass size={18} />
                </div>
                <div>
                  <p className="text-text-primary-light text-sm font-bold dark:text-white">
                    {t('virtualTour')}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t('virtualTourDesc')}
                  </p>
                </div>
              </Link>
            </div>
            <Link
              href={item.href}
              prefetch={false}
              className="group text-primary dark:text-primary-light flex items-center gap-1.5 text-sm font-bold decoration-2 underline-offset-4 hover:underline"
            >
              {t('seeAll')} {t(item.labelKey + '.title')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Audience Links Bar                                                 */
/* ------------------------------------------------------------------ */
function AudienceBar() {
  const t = useTranslations('megaNav');
  const pathname = usePathname();

  return (
    <div className="bg-surface-light/80 dark:bg-surface-dark/80 border-border-light/30 dark:border-border-dark/30 border-b backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hidden h-9 items-center gap-6 lg:flex">
          {AUDIENCE_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                prefetch={false}
                className={cn(
                  'text-xs font-medium transition-colors duration-200',
                  isActive
                    ? 'text-primary dark:text-primary-light'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light',
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN HEADER                                                        */
/* ================================================================== */
export function Header() {
  const t = useTranslations('megaNav');
  const pathname = usePathname();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- scroll listener: hide utility bar on scroll ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- close menu when route changes (state-during-render pattern) ---- */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
  }

  /* ---- hover handlers with a small grace period ---- */
  const handleMenuEnter = useCallback((id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(id);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const handlePanelEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handlePanelLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 w-full">
        {/* Layer 1: Utility Bar — hides on scroll */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
          )}
        >
          <UtilityBar />
        </div>

        {/* Layer 2: Primary Navigation */}
        <div className="bg-bg-light/80 dark:bg-bg-dark/80 border-border-light/50 dark:border-border-dark/50 border-b backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="group flex shrink-0 items-center gap-2.5">
                <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg shadow-sm transition-shadow duration-300 group-hover:shadow-[0_0_15px_rgba(29,86,201,0.3)]">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-primary dark:text-primary-light text-base leading-tight font-bold">
                    ZhezU
                  </span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark hidden text-[10px] leading-tight sm:block">
                    Жезказганский университет
                  </span>
                </div>
              </Link>

              {/* Desktop mega-menu triggers */}
              <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = activeMenu === item.id;
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => handleMenuEnter(item.id)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <Link
                        href={item.href}
                        prefetch={false}
                        className={cn(
                          'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'text-primary dark:text-primary-light bg-primary/8 dark:bg-primary-light/8'
                            : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark',
                        )}
                      >
                        {t(item.labelKey + '.title')}
                        <ChevronDown
                          size={14}
                          className={cn(
                            'transition-transform duration-200',
                            isActive && 'rotate-180',
                          )}
                        />
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Right side actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark hidden h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors md:flex"
                  aria-label={t('searchPlaceholder')}
                >
                  <Search size={18} />
                </button>
                <ThemeToggle />
                <Link href="/admission/apply">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="font-display hidden sm:inline-flex"
                  >
                    {t('apply')}
                  </Button>
                </Link>
                <MobileMenu />
              </div>
            </div>
          </div>

          {/* Mega-menu dropdown panels (anchored to primary nav) */}
          {NAVIGATION_ITEMS.map((item) => (
            <div key={item.id} onMouseEnter={handlePanelEnter} onMouseLeave={handlePanelLeave}>
              <MegaMenuPanel item={item} isOpen={activeMenu === item.id} />
            </div>
          ))}
        </div>

        {/* Layer 3: Audience Links */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
          )}
        >
          <AudienceBar />
        </div>
      </header>

      {/* Search overlay (portal-like, rendered outside header flow) */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Scrim behind mega-menu when open */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setActiveMenu(null)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
