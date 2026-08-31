/**
 * Single source of truth for per-route SEO metadata.
 *
 * This module is deliberately free of browser and Node APIs, and imports no
 * assets — so it can be consumed both by the client (`usePageMeta`) at runtime
 * and by the build-time prerenderer in `vite.config.ts`, which bakes the same
 * tags into a static HTML file per route. Keeping one definition here stops the
 * two from drifting apart.
 */

export const SITE_NAME = 'Dad & His Lads'
export const SITE_URL = 'https://dadandhislads.com'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`
export const OG_IMAGE_ALT = 'Dad & His Lads — a tiny app studio with a big family'
export const OG_LOCALE = 'en_US'

export interface RouteMeta {
  /** Full <title>. */
  title: string
  description: string
  /** Path (e.g. "/apps") used to build the canonical + og:url. */
  path: string
  /** Discourage indexing (used for the 404 route). */
  noindex?: boolean
  image?: string
}

/**
 * Meta for every real route, keyed for easy reuse. The `notFound` entry is not
 * prerendered as a discoverable URL — it only feeds the client hook on the 404
 * route — so it lives here for completeness but is excluded from the prerender
 * list below.
 */
export const routeMeta = {
  home: {
    title: 'Dad & His Lads — Apps built by a dad, alongside his lads',
    description:
      'A tiny app studio with a big family. We build business tools, ADHD & focus helpers, health trackers, and family games — plus affordable website building.',
    path: '/',
  },
  apps: {
    title: 'Apps & services — Dad & His Lads',
    description:
      'Everything Dad & His Lads builds and offers — business tools, ADHD & focus helpers, and family apps, plus affordable website building.',
    path: '/apps',
  },
  about: {
    title: 'Our story — Dad & His Lads',
    description:
      'A dad, his lads, and a workshop full of ideas. How Dad & His Lads builds apps with heart — business tools, ADHD helpers, health trackers, and family games.',
    path: '/about',
  },
  contact: {
    title: 'Say hello — Dad & His Lads',
    description:
      'Got an idea, a question, or a website to build? Get in touch with Dad & His Lads — we read every message.',
    path: '/contact',
  },
  notFound: {
    title: 'Page not found — Dad & His Lads',
    description: 'That page wandered off. Head back home to explore the apps.',
    path: '/404',
    noindex: true,
  },
} satisfies Record<string, RouteMeta>

/** Routes the build should emit as their own static, indexable HTML files. */
export const prerenderRoutes: RouteMeta[] = [
  routeMeta.home,
  routeMeta.apps,
  routeMeta.about,
  routeMeta.contact,
]

/**
 * Site-wide structured data (Organization + WebSite). Baked into the base
 * template so it appears on every prerendered page.
 */
export function siteStructuredData(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/favicon.svg`,
      image: DEFAULT_OG_IMAGE,
      description:
        'A tiny app studio with a big family, building business tools, ADHD & focus helpers, health trackers, and family games.',
      sameAs: [
        'https://gettradereadyapp.com',
        'https://getfocusquest.com',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  ]
}
