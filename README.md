# Dad & His Lads

The brand site for **Dad & His Lads** — a tiny app studio with a big family.
Business tools, ADHD & focus helpers, health trackers, and family games, all
built by a dad alongside his lads.

🌐 [dadandhislads.com](https://dadandhislads.com)

## Tech

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router 7](https://reactrouter.com/)
- Hosted on **Cloudflare Pages**

## Develop

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

## Deploy (Cloudflare Pages)

Connect this repo in the Cloudflare dashboard, or deploy with Wrangler:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **SPA routing:** handled by [`public/_redirects`](public/_redirects)

```bash
npx wrangler pages deploy dist --project-name dadandhislads
```

## Project structure

```
src/
  assets/apps/  Optimized app/service images (AVIF) + their source PNGs
  components/   Layout, Nav, Footer, AppCard, ServiceSection, Logo
  data/apps.ts  The catalog — `apps` (products) and `services` (e.g. website building)
  lib/          analytics, contact, usePageMeta (per-route SEO/meta)
  pages/        Home, Apps, About, Contact, NotFound
```

To add a new **app**, add an entry to the `apps` array in `src/data/apps.ts`.
Add a **service** to the `services` array. App/service images are imported from
`src/assets/apps/` so Vite optimizes and cache-busts them; keep icons small
(AVIF, ~256px) and export new ones the same way.

## Contact form

The form posts to `VITE_CONTACT_ENDPOINT` (a URL that accepts a JSON `POST` of
`{ name, email, message }` — e.g. a Cloudflare Pages Function, Formspree, or
Basin). See [`.env.example`](.env.example). **When the variable is unset, the
form does not fake a send** — it falls back to an honest "email us directly"
flow. No secrets live in the repo.

## Analytics

`src/lib/analytics.ts` is a provider-neutral event helper (product visits,
contact submissions, quote clicks). It no-ops safely when no provider is present
and collects no personal information. To enable, expose `window.plausible` or
`window.dataLayer` on the page.

## SEO

The app is a client-rendered SPA, but each route is **prerendered to its own
static HTML file at build time** by the `seo-prerender` plugin in
[`vite.config.ts`](vite.config.ts) — `dist/index.html`, `dist/apps/index.html`,
etc. Every file ships that route's real `<title>`, description, canonical, and
Open Graph / Twitter tags, so non-JS crawlers and social scrapers (Facebook,
LinkedIn, Slack, Bing) get correct per-route metadata. The build also emits a
`dist/404.html` that Cloudflare Pages serves with a real 404 status for unknown
URLs (no SPA catch-all in [`public/_redirects`](public/_redirects), so there are
no soft-404s).

Per-route metadata lives in one place — [`src/lib/routeMeta.ts`](src/lib/routeMeta.ts)
— shared by the prerenderer and by `src/lib/usePageMeta.ts`, which keeps the
tags in sync during in-app client navigation.

**Structured data (JSON-LD):** site-wide `Organization` + `WebSite` schema is
baked into every page from `routeMeta.ts`; per-app `SoftwareApplication` and the
`Service` schema are injected on the Home and Apps routes from
[`src/lib/structuredData.ts`](src/lib/structuredData.ts).
