const BASE_URL = 'https://zhezu.edu.kz';
const locales = ['kk', 'ru', 'en'] as const;

/**
 * Generate hreflang alternate link descriptors for a given path.
 * Returns an array of objects suitable for rendering <link rel="alternate"> tags.
 */
export function generateHreflangLinks(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return locales.map((locale) => ({
    rel: 'alternate' as const,
    hrefLang: locale,
    href: `${BASE_URL}/${locale}${normalizedPath === '/' ? '' : normalizedPath}`,
  }));
}

/**
 * Returns a JSON-LD Organization schema object for ZhezU university.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Жезказганский университет имени О.А. Байконурова',
    alternateName: 'ZhezU',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    foundingDate: '1961',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Алашахана 1Б',
      addressLocality: 'Жезказган',
      addressCountry: 'KZ',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'admissions',
      availableLanguage: ['Kazakh', 'Russian', 'English'],
    },
  };
}

/**
 * Returns a JSON-LD BreadcrumbList schema object.
 */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
