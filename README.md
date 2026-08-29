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
  components/   Layout, Nav, Footer, AppCard, Logo
  data/apps.ts  The app catalog — edit here to add/update apps
  pages/        Home, Apps, About, Contact, NotFound
```

To add a new app to the site, add an entry to `src/data/apps.ts`.
