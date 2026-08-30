import { Link } from 'react-router-dom'
import type { ServiceItem } from '../data/apps'
import { trackQuoteClick } from '../lib/analytics'

/**
 * A service (not a product) presented distinctly from the app portfolio, so
 * the studio's app positioning stays clear. Shows benefits, who it's for,
 * turnaround, and an internal "Get a quote" call-to-action.
 */
export function ServiceSection({ service }: { service: ServiceItem }) {
  return (
    <div className="relative overflow-hidden rounded-xl2 border border-aqua/25 bg-ink-2">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-aqua/15 blur-3xl"
      />
      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua/40 bg-aqua/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-aqua">
            <span aria-hidden>{service.emoji}</span> Service
          </span>

          <h3 className="mt-4 font-display text-2xl font-bold text-cloud sm:text-3xl">
            {service.name}
          </h3>
          <p className="mt-1 text-base font-medium text-aqua">{service.tagline}</p>
          <p className="mt-3 leading-relaxed text-mist">{service.description}</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-cloud/90">
                <span aria-hidden className="mt-0.5 text-aqua">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>

          <dl className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-sm sm:flex-row sm:gap-8">
            <div>
              <dt className="font-semibold text-cloud">Who it's for</dt>
              <dd className="mt-0.5 text-mist">{service.audience}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cloud">Turnaround</dt>
              <dd className="mt-0.5 text-mist">{service.turnaround}</dd>
            </div>
          </dl>

          <Link
            to={service.cta.to}
            onClick={() => trackQuoteClick(service.slug)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 font-semibold text-ink transition-transform hover:scale-105"
          >
            {service.cta.label}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {service.image && (
          <div className="order-first overflow-hidden rounded-xl2 border border-line lg:order-none">
            <img
              src={service.image}
              alt={`${service.name} preview`}
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}
