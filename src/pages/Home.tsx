import { Link } from 'react-router-dom'
import { AppCard } from '../components/AppCard'
import { ServiceSection } from '../components/ServiceSection'
import { apps, services } from '../data/apps'
import { usePageMeta } from '../lib/usePageMeta'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-volt/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[30%] h-[300px] w-[300px] rounded-full bg-ember/20 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #262a40 1px, transparent 1px), linear-gradient(to bottom, #262a40 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:py-32">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-1.5 text-sm text-mist">
          <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-aqua" />
          A tiny app studio with a big family
        </span>

        <h1 className="animate-fade-up mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-cloud sm:text-7xl">
          Apps built by a dad,
          <br />
          <span className="bg-gradient-to-r from-ember via-sun to-volt bg-clip-text text-transparent">
            alongside his lads.
          </span>
        </h1>

        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist">
          From business tools to ADHD helpers to the app we wished we had after a
          trip to the ER — we build software with heart, curiosity, and a house
          full of ideas.
        </p>

        <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/apps"
            className="rounded-full bg-ember px-7 py-3 text-base font-semibold text-ink transition-transform hover:scale-105"
          >
            Explore the apps
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-line bg-ink-2 px-7 py-3 text-base font-semibold text-cloud transition-colors hover:border-volt/60"
          >
            Get in touch
          </Link>
        </div>
        <p className="animate-fade-up mt-5 text-sm text-mist">
          <Link to="/about" className="font-medium text-cloud hover:underline">
            Read our story →
          </Link>
        </p>
      </div>
    </section>
  )
}

const pillars = [
  {
    emoji: '❤️',
    title: 'Built with heart',
    body: 'Every app starts as a real problem in a real family. If it does not help someone we love, we do not ship it.',
  },
  {
    emoji: '🧩',
    title: 'All kinds of apps',
    body: 'Business tools, focus helpers for ADHD brains, health trackers, family games — we follow the curiosity wherever it goes.',
  },
  {
    emoji: '🛠️',
    title: 'Made to last',
    body: 'Thoughtful, fast, and dependable. We would rather build one great thing than ten flimsy ones.',
  },
]

export function Home() {
  usePageMeta({
    title: 'Dad & His Lads — Apps built by a dad, alongside his lads',
    description:
      'A tiny app studio with a big family. We build business tools, ADHD & focus helpers, health trackers, and family games — plus affordable website building.',
    path: '/',
  })

  const featured = apps.slice(0, 3)

  return (
    <>
      <Hero />

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="sr-only">How we build</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl2 border border-line bg-ink-2 p-7"
            >
              <span aria-hidden className="grid h-12 w-12 place-items-center rounded-xl bg-ink-3 text-2xl">
                {p.emoji}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-cloud">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured apps */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-cloud sm:text-4xl">
              What we&apos;re building
            </h2>
            <p className="mt-2 text-mist">
              A peek at the workshop. More on the way.
            </p>
          </div>
          <Link
            to="/apps"
            className="hidden rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-cloud hover:border-volt/60 sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      {/* Website building service — kept visually separate from the app portfolio */}
      {services.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-cloud sm:text-4xl">
              Need a website?
            </h2>
            <p className="mt-2 text-mist">
              Apps are our main thing — but we also build simple, affordable
              sites for people who just need to get online.
            </p>
          </div>
          {services.map((service) => (
            <ServiceSection key={service.slug} service={service} />
          ))}
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-xl2 border border-line bg-gradient-to-br from-ink-3 to-ink-2 px-8 py-14 text-center">
          <div aria-hidden className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-volt/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-ember/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold text-cloud sm:text-4xl">
            Got an idea, or just want to say hi?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-mist">
            We love hearing from parents, builders, and anyone with a problem
            worth solving.
          </p>
          <Link
            to="/contact"
            className="relative mt-8 inline-block rounded-full bg-ember px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
          >
            Say hello
          </Link>
        </div>
      </section>
    </>
  )
}
