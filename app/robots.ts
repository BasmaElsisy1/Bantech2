import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: "/",
      disallow: ['/api/', '/public/', '/_next/'],
    },
    sitemap: `https://bantech.ae/sitemap.xml`
  }
}