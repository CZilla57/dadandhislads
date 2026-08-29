import { useMemo, useState } from 'react'
import { AppCard } from '../components/AppCard'
import { apps, categories } from '../data/apps'
import type { AppCategory } from '../data/apps'

type Filter = 'All' | AppCategory

export function Apps() {
  const [filter, setFilter] = useState<Filter>('All')

  // Only show category filters that actually have apps behind them,
  // in their canonical order. One filter alone isn't worth showing.
  const activeCategories = categories.filter((c) =>
    apps.some((a) => a.category === c),
  )
  const filters: Filter[] =
    activeCategories.length > 1 ? ['All', ...activeCategories] : []

  const visible = useMemo(
    () => (filter === 'All' ? apps : apps.filter((a) => a.category === filter)),
    [filter],
  )

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-cloud sm:text-5xl">
          Apps &amp; services
        </h1>
        <p className="mt-4 text-lg text-mist">
          Everything we build and offer, from ideas still on the whiteboard to
          apps out in the world. Different problems, one family behind them all.
        </p>
      </div>

      {filters.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-ember text-ink'
                  : 'border border-line bg-ink-2 text-mist hover:text-cloud'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-mist">
          Nothing here just yet — check back soon. 🛠️
        </p>
      )}
    </div>
  )
}
