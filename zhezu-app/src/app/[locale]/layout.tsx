import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { organizationJsonLd, generateHreflangLinks } from '@/lib/seo';
import { getSiteSettings, getContactPageData } from '@/lib/admin/public-data';
import { getMenuData } from '@/lib/navigation-server';
import '../globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  const siteSettings = await getSiteSettings();
  const menuData = await getMenuData();
  const contactData = await getContactPageData();
  const orgJsonLd = organizationJsonLd();
  const hreflangLinks = generateHreflangLinks('/');

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {hreflangLinks.map((link) => (
          <link key={link.hrefLang} rel={link.rel} hrefLang={link.hrefLang} href={link.href} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <a
              href="#main-content"
              className="focus:bg-primary sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:text-white"
            >
              Skip to main content
            </a>
            <Header navItems={menuData.navigation} admissionOpen={siteSettings.admissionOpen} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer
              settings={siteSettings}
              footerNav={menuData.footerNav}
              footerStudents={menuData.footerStudents}
              workingHoursShort={contactData.workingHoursShort}
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
