import { useEffect } from 'react'
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_ALT,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  type RouteMeta,
} from './routeMeta'

/**
 * Client-side document metadata for each route.
 *
 * Routes are prerendered to static HTML at build time (see the prerender plugin
 * in `vite.config.ts`), so crawlers and social scrapers already see the correct
 * per-route tags without running JavaScript. This hook keeps those tags in sync
 * during in-app client navigation, where there is no full page load.
 */

export interface PageMeta extends RouteMeta {
  /** Optional JSON-LD structured data for this route (single object or list). */
  jsonLd?: object | object[]
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Replace any route-managed JSON-LD blocks with the current route's data. */
function setJsonLd(jsonLd?: object | object[]) {
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-route-jsonld]')
    .forEach((el) => el.remove())

  if (!jsonLd) return
  const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  for (const block of blocks) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-route-jsonld', '')
    script.textContent = JSON.stringify(block)
    document.head.appendChild(script)
  }
}

export function usePageMeta({ title, description, path, noindex, image, jsonLd }: PageMeta) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = image ?? DEFAULT_OG_IMAGE

    document.title = title

    setMeta('meta[name="description"]', 'name', 'description', description)
    setLink('canonical', url)
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow')

    // Open Graph
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', OG_IMAGE_ALT)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', OG_LOCALE)

    // Twitter
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', OG_IMAGE_ALT)

    setJsonLd(jsonLd)
  }, [title, description, path, noindex, image, jsonLd])
}
