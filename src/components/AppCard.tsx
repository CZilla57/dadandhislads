import type { AppItem } from '../data/apps'
import { statusLabels } from '../data/apps'

const accentRing: Record<AppItem['accent'], string> = {
  ember: 'hover:border-ember/60 hover:shadow-ember/10',
  volt: 'hover:border-volt/60 hover:shadow-volt/10',
  aqua: 'hover:border-aqua/60 hover:shadow-aqua/10',
  sun: 'hover:border-sun/60 hover:shadow-sun/10',
}

const accentGlow: Record<AppItem['accent'], string> = {
  ember: 'from-ember/25',
  volt: 'from-volt/25',
  aqua: 'from-aqua/25',
  sun: 'from-sun/25',
}

const statusStyle: Record<AppItem['status'], string> = {
  live: 'bg-aqua/15 text-aqua',
  building: 'bg-ember/15 text-ember-soft',
  soon: 'bg-volt/15 text-volt',
}

export function AppCard({ app }: { app: AppItem }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-xl2 border border-line bg-ink-2 p-6 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 ${accentRing[app.accent]}`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accentGlow[app.accent]} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-3 text-3xl">
          {app.emoji}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[app.status]}`}
        >
          {statusLabels[app.status]}
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-xl font-semibold text-cloud">
        {app.name}
      </h3>
      <p className="relative mt-1 text-sm font-medium text-ember-soft">
        {app.tagline}
      </p>
      <p className="relative mt-3 text-sm leading-relaxed text-mist">
        {app.description}
      </p>

      <div className="relative mt-5 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-mist/70">
            {app.category}
          </span>
          {app.platform && (
            <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-mist">
              {app.platform}
            </span>
          )}
        </div>
        {app.url && (
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-cloud underline-offset-4 hover:underline"
          >
            Visit →
          </a>
        )}
      </div>
    </article>
  )
}
