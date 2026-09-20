import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../lib/contact'
import { usePageMeta } from '../lib/usePageMeta'
import { routeMeta } from '../lib/routeMeta'

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: 'What is WifeLoveNotes?',
    answer: (
      <p>
        WifeLoveNotes is an iOS and macOS app for writing, organizing, and
        sending love notes — with a library of ready-made notes by category,
        your own custom notes, favorites, and optional on-device AI help when
        you're stuck for words.
      </p>
    ),
  },
  {
    question: 'How do I send a note?',
    answer: (
      <p>
        Pick a note and choose Send. WifeLoveNotes hands it off to your own
        Mail or Messages app with the note pre-filled — it doesn't send
        anything itself. If Mail or Messages can't open, the note is copied to
        your clipboard instead so you can paste it anywhere.
      </p>
    ),
  },
  {
    question: 'Does WifeLoveNotes sync my notes between devices?',
    answer: (
      <p>
        No. Everything is stored only on the device you're using — there's no
        account and no automatic sync between an iPhone and a Mac, for
        example.
      </p>
    ),
  },
  {
    question: 'How do I move my notes to a new device?',
    answer: (
      <p>
        Open the gear icon (Sending Settings) and look for the Backup
        section. Export… saves everything — your notes, favorites, and
        settings — to a single file you can AirDrop, email, or save to Files.
        Import… on the new device loads that file right back in.
      </p>
    ),
  },
  {
    question: 'What do the AI writing and photo features do?',
    answer: (
      <p>
        They help draft a note or generate an image to go with one. Both run
        entirely on-device using Apple's built-in Apple Intelligence
        frameworks — nothing you type or any photo you use is sent to
        WifeLoveNotes or anyone else to produce these results.
      </p>
    ),
  },
  {
    question: 'Is my data private?',
    answer: (
      <p>
        Yes — WifeLoveNotes collects nothing and makes no network calls at
        all. See the full{' '}
        <Link to="/wifelovenotes/privacy" className="text-volt hover:underline">
          privacy policy
        </Link>{' '}
        for details.
      </p>
    ),
  },
]

export function WifeLoveNotesSupport() {
  usePageMeta(routeMeta.wifeLoveNotesSupport)

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-1.5 text-sm text-mist">
        <span aria-hidden>🛟</span> Support
      </span>

      <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-cloud sm:text-5xl">
        Need a hand with
        <span className="bg-gradient-to-r from-ember to-volt bg-clip-text text-transparent">
          {' '}
          WifeLoveNotes?
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
