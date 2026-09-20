import type { ReactNode } from 'react'
import { CONTACT_EMAIL } from '../lib/contact'
import { usePageMeta } from '../lib/usePageMeta'
import { routeMeta } from '../lib/routeMeta'

const sections: { title: string; body: ReactNode }[] = [
  {
    title: 'Overview',
    body: (
      <p>
        WifeLoveNotes is an iOS and macOS app for writing and organizing love
        notes. It was built to be used privately, so it's built to collect
        nothing: no account, no analytics, no network calls of any kind. This
        page explains exactly what that means.
      </p>
    ),
  },
  {
    title: 'Information We Collect',
    body: (
      <p>
        None. WifeLoveNotes does not collect, transmit, or have access to any
        of your data. There is no sign-up, no account, and nothing you type or
        add in the app is ever sent anywhere.
      </p>
    ),
  },
  {
    title: 'How Your Data Is Stored',
    body: (
      <p>
        Everything you create — notes, favorites, photos, and your delivery
        settings — is stored only on your own device, using Apple's standard
        on-device storage. If you export a backup file, that file is created
        locally and only leaves your device if you choose to share it
        yourself; the app never uploads it anywhere.
      </p>
    ),
  },
  {
    title: 'On-Device AI Features',
    body: (
      <p>
        Optional AI-assisted note drafting and image features run entirely
        on-device using Apple's built-in Apple Intelligence frameworks. No
        note content, photo, or prompt is sent to WifeLoveNotes, Apple, or any
        other server to generate these results.
      </p>
    ),
  },
  {
    title: 'Third-Party Services',
    body: (
      <p>
        WifeLoveNotes does not use any third-party analytics, advertising, or
        tracking services, and does not integrate with any third-party SDKs.
      </p>
    ),
  },
  {
    title: 'Data Sharing',
    body: (
      <p>
        Since WifeLoveNotes never collects or transmits your data, there is
        nothing to share. We do not sell, rent, or trade any information,
        because we never have any to begin with.
      </p>
    ),
  },
  {
    title: 'Your Rights and Choices',
    body: (
      <p>
        Because all of your data lives only on your device, you're always in
        full control of it. Deleting a note, favorite, or the app itself
        removes that data for good — there is no copy stored anywhere else to
        request or delete.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    body: (
      <p>
        WifeLoveNotes does not knowingly or unknowingly collect personal
        information from anyone, including children, because it does not
        collect personal information from anyone at all.
      </p>
    ),
  },
  {
    title: 'Changes to This Policy',
    body: (
      <p>
        If WifeLoveNotes ever adds a feature that changes how data is
        handled — for example, an optional iCloud sync — this page will be
        updated first, and the update will be reflected in the "Last updated"
        date below.
      </p>
    ),
  },
  {
    title: 'Contact Us',
    body: (
      <p>
        Questions about this policy? Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-volt hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
]

export function WifeLoveNotesPrivacy() {
  usePageMeta(routeMeta.wifeLoveNotesPrivacy)

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-1.5 text-sm text-mist">
        <span aria-hidden>📄</span> Privacy Policy
      </span>

      <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-cloud sm:text-5xl">
        WifeLoveNotes
        <span className="bg-gradient-to-r from-ember to-volt bg-clip-text text-transparent">
          {' '}
          collects nothing.
        </span>
      </h1>

      <p className="mt-4 text-sm text-mist/70">Last updated September 19, 2026</p>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-semibold text-cloud">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-mist">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
