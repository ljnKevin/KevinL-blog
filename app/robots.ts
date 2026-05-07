import { type MetadataRoute } from 'next'

import { url } from '~/lib'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/studio'],
    },
    sitemap: url('/sitemap.xml').href,
  }
}
