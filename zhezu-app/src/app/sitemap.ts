import type { MetadataRoute } from 'next';

const BASE_URL = 'https://zhezu.edu.kz';
const locales = ['kk', 'ru', 'en'] as const;

const staticPages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/admission', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/academics', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/career', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.6 },
  { path: '/skill-map', changeFrequency: 'weekly' as const, priority: 0.7 },
  { path: '/talent-pool', changeFrequency: 'daily' as const, priority: 0.7 },
  { path: '/university/about', changeFrequency: 'monthly' as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${page.path}`;

      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        alternates[altLocale] = `${BASE_URL}/${altLocale}${page.path}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
