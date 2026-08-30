import { useEffect } from 'react'

/**
 * Client-side document metadata for each route.
 *
 * This is a single-page app rendered in the browser — there is no SSR or
 * prerendering — so titles and meta tags are set on navigation via this hook.
 * Crawlers that execute JavaScript (Google, etc.) will see the updated tags;
 * the static tags in index.html are the no-JS fallback.
 */

const SITE_NAME = 'Dad & His Lads'
const SITE_URL = 'https://dadandhislads.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`

export interface PageMeta {
  /** Full <title>. If omitted, falls back to the site name alone. */
  title: string
  description: string
  /** Path (e.g. "/apps") used to build the canonical + og:url. */
  path: string
  /** Discourage indexing (used for the 404 route). */
  noindex?: boolean
  image?: string
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

export function usePageMeta({ title, description, path, noindex, image }: PageMeta) {
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

    // Twitter
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)
  }, [title, description, path, noindex, image])
}
