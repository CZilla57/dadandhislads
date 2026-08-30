import type { AppItem } from '../data/apps'
import { statusLabels } from '../data/apps'
import { trackAppVisit } from '../lib/analytics'

const accentRing: Record<AppItem['accent'], string> = {
  ember: 'hover:border-ember/60 hover:shadow-ember/10',
  volt: 'hover:border-volt/60 hover:shadow-volt/10',
  aqua: 'hover:border-aqua/60 hover:shadow-aqua/10',
  sun: 'hover:border-sun/60 hover:shadow-sun/10',
}

const accentBand: Record<AppItem['accent'], string> = {
  ember: 'from-ember/25 via-ember/5',
  volt: 'from-volt/25 via-volt/5',
  aqua: 'from-aqua/25 via-aqua/5',
  sun: 'from-sun/25 via-sun/5',
}

const statusStyle: Record<AppItem['status'], string> = {
  live: 'bg-aqua/15 text-aqua',
  building: 'bg-ember/15 text-ember-soft',
  soon: 'bg-volt/15 text-volt',
}

/** New-tab icon with a screen-reader-only label. */
function ExternalHint() {
  return (
    <>
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        ↗
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </>
  )
}

export function AppCard({ app }: { app: AppItem }) {
  const isExternal = Boolean(app.url)

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl2 border border-line bg-ink-2 shadow-xl shadow-black/20 transition-all duration-300 focus-within:-translate-y-1 hover:-translate-y-1 ${accentRing[app.accent]}`}
    >
      {/* Preview area — screenshot slot with a branded fallback so the card
          always looks intentional, image or not. */}
      <div
        className={`relative grid aspect-[16/9] place-items-center overflow-hidden border-b border-line bg-gradient-to-br ${accentBand[app.accent]} to-transparent`}
      >
        {app.icon ? (
          <img
            src={app.icon}
            alt=""
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 rounded-[1.25rem] object-cover shadow-lg shadow-black/40"
          />
        ) : (
          <span aria-hidden className="text-6xl drop-shadow-lg">
            {app.emoji}
          </span>
        )}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[app.status]}`}
        >
          {statusLabels[app.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-cloud">
          {isExternal ? (
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackAppVisit(app.slug, 'external')}
              className="rounded outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4"
            >
              {app.name}
            </a>
          ) : (
            app.name
          )}
        </h3>

        <p className="mt-1 text-sm font-medium text-ember-soft">{app.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-mist">{app.description}</p>

        {app.highlights && app.highlights.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {app.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full bg-ink-3 px-2.5 py-1 text-xs font-medium text-cloud/90"
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-mist">
              {app.category}
            </span>
            {app.platform && (
              <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-mist">
                {app.platform}
              </span>
            )}
          </div>
          {isExternal && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-cloud">
              Visit <ExternalHint />
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
