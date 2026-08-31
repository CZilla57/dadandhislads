import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import {
  prerenderRoutes,
  routeMeta,
  siteStructuredData,
  SITE_NAME,
  SITE_URL,
  type RouteMeta,
} from './src/lib/routeMeta.ts'

/**
 * Strip macOS `.DS_Store` files that get copied out of `public/` into the
 * build so they never reach production. No dependency needed.
 */
function stripDsStore(): Plugin {
  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) walk(full)
      else if (entry === '.DS_Store') rmSync(full)
    }
  }
  return {
    name: 'strip-ds-store',
    apply: 'build',
    closeBundle() {
      try {
        walk('dist')
      } catch {
        // dist may not exist on a failed build — nothing to clean.
      }
    },
  }
}

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Replace the `content="…"` of a <meta> matched by an attribute like `name="x"`. */
function setMetaContent(html: string, attr: string, value: string): string {
  const re = new RegExp(`(<meta[^>]*\\b${attr}[^>]*\\bcontent=")[^"]*(")`)
  return html.replace(re, `$1${escapeAttr(value)}$2`)
}

/** Produce a route-specific copy of the base HTML with correct head tags. */
function applyRouteMeta(baseHtml: string, route: RouteMeta): string {
  const url = `${SITE_URL}${route.path}`
  let html = baseHtml

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(route.title)}</title>`)
  html = setMetaContent(html, 'name="description"', route.description)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeAttr(url)}$2`)

  html = setMetaContent(html, 'property="og:title"', route.title)
  html = setMetaContent(html, 'property="og:description"', route.description)
  html = setMetaContent(html, 'property="og:url"', url)
  html = setMetaContent(html, 'name="twitter:title"', route.title)
  html = setMetaContent(html, 'name="twitter:description"', route.description)

  if (route.image) {
    html = setMetaContent(html, 'property="og:image"', route.image)
    html = setMetaContent(html, 'name="twitter:image"', route.image)
  }

  // The base template omits a robots tag (indexable by default); add one only
  // where a route opts out, e.g. the 404 page.
  if (route.noindex) {
    html = html.replace(
      /<\/head>/,
      '  <meta name="robots" content="noindex, follow" />\n  </head>',
    )
  }

  return html
}

/**
 * SEO prerender.
 *
 * The app is a client-rendered SPA, so without this every route would ship the
 * homepage's static <head>, and non-JS crawlers and social scrapers (Facebook,
 * LinkedIn, Slack, Bing) would never see per-route titles, descriptions,
 * canonicals, or Open Graph tags. This plugin:
 *
 *  1. injects site-wide Organization + WebSite JSON-LD into the template (dev
 *     and build), and
 *  2. at build time, emits a static HTML file per route — dist/index.html,
 *     dist/apps/index.html, … — each carrying that route's real head tags, plus
 *     a dist/404.html served with a 404 status for unknown URLs.
 *
 * The client (`usePageMeta`) keeps these tags in sync during in-app navigation.
 */
function seoPrerender(): Plugin {
  let outDir = 'dist'

  const siteJsonLd = siteStructuredData()
    .map(
      (block: object) =>
        `    <script type="application/ld+json">${JSON.stringify(block)}</script>`,
    )
    .join('\n')

  return {
    name: 'seo-prerender',

    configResolved(config) {
      outDir = config.build.outDir
    },

    // Runs in both dev and build: bake the site-wide structured data into the
    // template so it is present everywhere, from a single source of truth.
    transformIndexHtml(html) {
      return html.replace(/<\/head>/, `${siteJsonLd}\n  </head>`)
    },

    // After the build, fan the built index.html out into per-route files.
    closeBundle() {
      let baseHtml: string
      try {
        baseHtml = readFileSync(join(outDir, 'index.html'), 'utf8')
      } catch {
        return // no build output — nothing to prerender.
      }

      const write = (relPath: string, route: RouteMeta) => {
        const full = join(outDir, relPath)
        mkdirSync(dirname(full), { recursive: true })
        writeFileSync(full, applyRouteMeta(baseHtml, route))
      }

      for (const route of prerenderRoutes) {
        // "/" is the root document; deeper paths become <path>/index.html so
        // Cloudflare Pages serves them for clean URLs.
        const rel = route.path === '/' ? 'index.html' : `${route.path.replace(/^\//, '')}/index.html`
        write(rel, route)
      }

      // A real 404 document. With every valid route prerendered above, there is
      // no SPA catch-all, so Cloudflare Pages serves this with a 404 status for
      // anything unmatched — no more soft-404s.
      write('404.html', routeMeta.notFound)

      // eslint-disable-next-line no-console
      console.log(
        `\n${SITE_NAME}: prerendered ${prerenderRoutes.length} routes + 404.html`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPrerender(), stripDsStore()],
})
