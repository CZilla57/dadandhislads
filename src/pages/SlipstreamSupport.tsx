import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../lib/contact'
import { usePageMeta } from '../lib/usePageMeta'
import { routeMeta } from '../lib/routeMeta'

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: 'What is Slipstream GP?',
    answer: (
      <p>
        Slipstream GP is an arcade open-wheel racing game for iPhone and iPad.
        Race 15 circuits in Quick Race, Time Trial, a full Championship, or a
        four-tier Career, with rain, tyres and pit stops, plus a Daily
        Challenge and Weekly Series that everyone races on the same day.
      </p>
    ),
  },
  {
    question: 'What controls can I use?',
    answer: (
      <p>
        On-screen buttons are the default. You can switch to tilt steering in
        Settings → Controls, where you can also resize the buttons and set the
        haptics strength. Xbox, PlayStation, and MFi game controllers work too
        — pair one in your device's Bluetooth settings and it's picked up
        automatically.
      </p>
    ),
  },
  {
    question: 'Tilt steering pulls to one side. How do I fix it?',
    answer: (
      <p>
        Hold your device the way you like to play, then go to Settings →
        Controls and tap Set Centre next to Calibrate Tilt. The Tilt
        Sensitivity slider just above it changes how far you need to turn.
      </p>
    ),
  },
  {
    question: 'The racing is too hard (or too easy).',
    answer: (
      <p>
        Open Settings → Assists. Auto-accelerate, braking assist, and steering
        assist are on by default to help new drivers; turn them off one at a
        time as you get faster. AI Difficulty sets how quick the other cars
        are, and the Rewind assist lets you run a race back a few seconds
        after a mistake.
      </p>
    ),
  },
  {
    question: 'How do the Daily Challenge and Weekly Series work?',
    answer: (
      <p>
        Every player gets the same events, generated from the date. A new
        Daily Challenge starts at midnight UTC each day, and a new Weekly
        Series every Monday at midnight UTC. Each event has three stars to
        earn and a score for the Game Center leaderboards.
      </p>
    ),
  },
  {
    question: "My scores or achievements aren't showing in Game Center.",
    answer: (
      <p>
        Make sure you're signed in to Game Center in your device's Settings,
        then reopen Slipstream GP. You can check the connection under Settings
        → Game Center in the game.
      </p>
    ),
  },
  {
    question: 'How do I move my progress to a new device?',
    answer: (
      <p>
        Your progress is stored on your device and isn't synced between
        devices. It moves to a new iPhone or iPad when you set it up from an
        iCloud or computer backup of the old one. Game Center scores and
        achievements follow your Apple Account automatically.
      </p>
    ),
  },
  {
    question: "Photo mode won't save my picture.",
    answer: (
      <p>
        Slipstream GP needs permission to add photos to your library. Tap Open
        Settings on the photo preview, or go to your device's Settings →
        Privacy & Security → Photos → Slipstream GP and choose Add Photos
        Only.
      </p>
    ),
  },
  {
    question: 'Is my data private?',
    answer: (
      <p>
        Yes — Slipstream GP collects nothing, and your progress stays on your
        device. See the full{' '}
        <Link to="/slipstreamgp/privacy" className="text-volt hover:underline">
          privacy policy
        </Link>{' '}
        for details.
      </p>
    ),
  },
]

export function SlipstreamSupport() {
  usePageMeta(routeMeta.slipstreamSupport)

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-1.5 text-sm text-mist">
        <span aria-hidden>🛟</span> Support
      </span>

      <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-cloud sm:text-5xl">
        Need a hand with
        <span className="bg-gradient-to-r from-ember to-volt bg-clip-text text-transparent">
          {' '}
          Slipstream GP?
        </span>
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-mist">
        Answers to the most common questions are below. Can't find what you're
        looking for? Reach out and we'll help directly.
      </p>

      <div className="mt-10 space-y-10">
        {faqs.map((faq) => (
          <section key={faq.question}>
            <h2 className="font-display text-xl font-semibold text-cloud">
              {faq.question}
            </h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-mist">
              {faq.answer}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-xl2 border border-line bg-ink-2 p-6">
        <h2 className="font-display text-lg font-semibold text-cloud">
          Still need help?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-volt hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          and we'll get back to you.
        </p>
      </div>
    </div>
  )
}
