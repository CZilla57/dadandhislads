import type { ReactNode } from 'react'
import { CONTACT_EMAIL } from '../lib/contact'
import { usePageMeta } from '../lib/usePageMeta'
import { routeMeta } from '../lib/routeMeta'

const sections: { title: string; body: ReactNode }[] = [
  {
    title: 'Overview',
    body: (
      <p>
        Slipstream GP is an arcade open-wheel racing game for iPhone and iPad.
        It's built to collect nothing: no account, no analytics, no ads, and no
        servers of our own. This page explains exactly what that means.
      </p>
    ),
  },
  {
    title: 'Information We Collect',
    body: (
      <p>
        None. Slipstream GP does not collect, transmit, or have access to any
        of your personal data. The Daily Challenge and Weekly Series are
        generated on your device from the date, so even those don't need a
        server.
      </p>
    ),
  },
  {
    title: 'How Your Data Is Stored',
    body: (
      <p>
        Your progress — career, championship seasons, lap records, ghosts,
        credits, Garage cars, and settings — is stored only on your own device,
        using Apple's standard on-device storage. Like any app's data, it's
        included in your device backups if you have them turned on.
      </p>
    ),
  },
  {
    title: 'Game Center',
    body: (
      <p>
        If you're signed in to Game Center, your scores and achievements are
        sent to Apple's Game Center so they can appear on leaderboards and in
        your profile, where other players may see them according to your Game
        Center settings. This is handled by Apple under{' '}
        <a
          href="https://www.apple.com/legal/privacy/"
          className="text-volt hover:underline"
        >
          Apple's privacy policy
        </a>
        ; Slipstream GP doesn't receive or store that data anywhere. You can
        play without Game Center, or sign out of it in your device's Settings.
      </p>
    ),
  },
  {
    title: 'Photos, Motion, and Controllers',
    body: (
      <>
        <p>
          Photo mode asks for add-only access to your photo library so it can
          save the pictures you take. It can never see or read the photos
          already in your library.
        </p>
        <p>
          If you choose tilt steering, the motion sensors are read on-device to
          steer the car and nothing is recorded. Game controllers and keyboards
          are used only as controls.
        </p>
      </>
    ),
  },
  {
    title: 'Third-Party Services',
    body: (
      <p>
        Slipstream GP does not use any third-party analytics, advertising, or
        tracking services, and does not integrate with any third-party SDKs.
        The only outside service it talks to is Apple's Game Center, described
        above.
      </p>
    ),
  },
  {
    title: 'Data Sharing',
    body: (
      <p>
        Since Slipstream GP never collects your data, there is nothing to
        share. We do not sell, rent, or trade any information, because we never
        have any to begin with.
      </p>
    ),
  },
  {
    title: 'Your Rights and Choices',
    body: (
      <p>
        Because your progress lives only on your device, you're always in full
        control of it. Deleting the app removes it for good — there is no copy
        stored anywhere else to request or delete. Game Center scores and
        achievements are managed through your Apple Account.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    body: (
      <p>
        Slipstream GP does not knowingly or unknowingly collect personal
        information from anyone, including children, because it does not
        collect personal information from anyone at all.
      </p>
    ),
  },
  {
    title: 'Changes to This Policy',
    body: (
      <p>
        If Slipstream GP ever adds a feature that changes how data is
        handled — for example, online multiplayer or cloud saves — this page
        will be updated first, and the update will be reflected in the "Last
        updated" date below.
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

export function SlipstreamPrivacy() {
  usePageMeta(routeMeta.slipstreamPrivacy)

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-1.5 text-sm text-mist">
        <span aria-hidden>📄</span> Privacy Policy
      </span>

      <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-cloud sm:text-5xl">
        Slipstream GP
        <span className="bg-gradient-to-r from-ember to-volt bg-clip-text text-transparent">
          {' '}
          collects nothing.
        </span>
      </h1>

      <p className="mt-4 text-sm text-mist/70">Last updated October 15, 2026</p>

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
