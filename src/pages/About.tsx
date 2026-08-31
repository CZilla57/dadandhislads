import { usePageMeta } from '../lib/usePageMeta'
import { routeMeta } from '../lib/routeMeta'

const values = [
  {
    emoji: '🔍',
    title: 'Curiosity first',
    body: 'The kids ask “why can’t the app just do that?” more than anyone. A lot of our best ideas start as their questions.',
  },
  {
    emoji: '🤝',
    title: 'Real problems only',
    body: 'We build for people we actually know — parents, patients, small-business owners, and restless minds. No filler.',
  },
  {
    emoji: '✨',
    title: 'Little details, big care',
    body: 'The polish is the point. Fast, friendly, and thoughtful, down to the last tap.',
  },
]

export function About() {
  usePageMeta(routeMeta.about)

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-1.5 text-sm text-mist">
        <span aria-hidden>👋</span> Our story
      </span>

      <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-cloud sm:text-5xl">
        A dad, his lads, and a
        <span className="bg-gradient-to-r from-ember to-volt bg-clip-text text-transparent">
          {' '}
          workshop full of ideas.
        </span>
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-mist">
        <p>
          Dad &amp; His Lads started the way most good things around here do — at
          the kitchen table, with a problem nobody had solved the way we wanted.
          Sometimes it&apos;s a spreadsheet a small business is drowning in.
          Sometimes it&apos;s a focus tool for a brain that works a little
          differently. And once, it was figuring out how to keep track of a
          healing broken bone without losing our minds.
        </p>
        <p>
          So we build. The apps span all kinds of worlds —{' '}
          <span className="text-cloud">business tools</span>,{' '}
          <span className="text-cloud">ADHD and focus helpers</span>,{' '}
          <span className="text-cloud">health trackers</span>, and{' '}
          <span className="text-cloud">games for the whole family</span> — but
          they share a name and a spirit: made with heart, tested by the
          toughest critics in the house.
        </p>
        <p>
          The “lads” are more than a mascot. They&apos;re the reason for the
          whole thing — the ideas, the honest feedback, and the reminder that
          software should feel human. This is what we make together.
        </p>
      </div>

      <h2 className="sr-only">What we value</h2>
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-xl2 border border-line bg-ink-2 p-6"
          >
            <span aria-hidden className="text-3xl">
              {v.emoji}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-cloud">
              {v.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
