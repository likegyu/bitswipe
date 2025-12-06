import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  const baseUrl = 'https://bitswipe.xyz';

  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/market', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/ranking', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/futures', priority: 0.9, changeFrequency: 'yearly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add root URL (redirects to default locale usually, but good to have)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Generate URLs for each locale and page
  for (const locale of routing.locales) {
    for (const page of pages) {
      const url = `${baseUrl}/${locale}${page.path}`;
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return sitemapEntries;
}