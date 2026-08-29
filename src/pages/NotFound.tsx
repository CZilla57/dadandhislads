import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-28 text-center">
      <span className="text-6xl">🧭</span>
      <h1 className="mt-6 font-display text-5xl font-bold text-cloud">
        Lost the trail
      </h1>
      <p className="mt-4 text-lg text-mist">
        This page wandered off. Let&apos;s get you back home.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-ember px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
      >
        Back home
      </Link>
    </div>
  )
}
