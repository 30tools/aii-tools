import { MetadataRoute } from 'next';
import toolsData from '@/lib/tools.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-tools.30tools.com';
  
  // Static pages
  const staticPages = [
    '',
    '/tools',
    '/categories',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  // Tool pages
  const toolPages = toolsData.tools.map(tool => tool.url);

  // Category pages
  const categoryPages = toolsData.categories.map(category => `/categories/${category.id}`);

  const allPages = [...staticPages, ...toolPages, ...categoryPages];

  return allPages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1 : page.startsWith('/tools/') ? 0.8 : 0.6,
  }));
}