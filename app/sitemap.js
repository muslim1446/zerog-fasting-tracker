import { SITE_URL } from '../lib/site';

/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/onboarding`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/legal`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
