import process from 'process';

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `https://${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
