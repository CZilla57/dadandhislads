export type AppStatus = 'live' | 'building' | 'soon'

export type AppCategory = 'Business' | 'ADHD & Focus' | 'Health' | 'Family' | 'Fun'

export interface AppItem {
  slug: string
  name: string
  tagline: string
  description: string
  category: AppCategory
  status: AppStatus
  emoji: string
  accent: 'ember' | 'volt' | 'aqua' | 'sun'
  url?: string
  /** Short platform label shown on the card, e.g. "iOS" or "Web · Mobile soon". */
  platform?: string
  /** 'app' (default) or 'service' — services show an "Available now" badge and an internal CTA. */
  kind?: 'app' | 'service'
  /** Internal call-to-action link (e.g. to the contact page) for service cards. */
  cta?: { label: string; to: string }
}

export const categories: AppCategory[] = [
  'Business',
  'ADHD & Focus',
  'Health',
  'Family',
  'Fun',
]

export const statusLabels: Record<AppStatus, string> = {
  live: 'Live',
  building: 'In the workshop',
  soon: 'Coming soon',
}

export const apps: AppItem[] = [
  {
    slug: 'tradeready',
    name: 'TradeReady',
    tagline: 'Run your trade business from your pocket.',
    description:
      'Job management and invoicing for independent tradespeople. Price jobs with confidence, send estimates and invoices in seconds, take card payments, and let an AI coach keep an eye on your numbers — fully offline when the signal drops. Free to download with a 2-week trial.',
    category: 'Business',
    status: 'live',
    emoji: '🔧',
    accent: 'ember',
    url: 'https://gettradereadyapp.com',
    platform: 'iOS',
  },
  {
    slug: 'focusquest',
    name: 'FocusQuest',
    tagline: 'Turn your to-do list into an adventure.',
    description:
      'Gamified tasks and habits built for ADHD brains. Complete quests, earn XP, and build streaks — so the things you keep meaning to do finally feel worth doing. Play in your browser today, with a mobile app on the way.',
    category: 'ADHD & Focus',
    status: 'live',
    emoji: '🎯',
    accent: 'volt',
    url: 'https://getfocusquest.com',
    platform: 'Web · Mobile soon',
  },
  {
    slug: 'howd-you-do-that',
    name: "How'd You Do That",
    tagline: 'Upgrade the boring story of how you broke it.',
    description:
      'Nobody wants to hear you tripped on the stairs. How\'d You Do That spins the real, boring story of your broken bone into an epic tale worth retelling — the one you wish had actually happened.',
    category: 'Fun',
    status: 'building',
    emoji: '🤕',
    accent: 'sun',
    platform: 'iOS · coming soon',
  },
  {
    slug: 'website-building',
    name: 'Website Building',
    tagline: 'A clean, simple site — fast and affordable.',
    description:
      'Need to get online without the agency price tag? I\'ll build you a decent, no-nonsense website at a low price with a quick turnaround. Great for small businesses, side hustles, and anyone who just needs a solid site done right.',
    category: 'Business',
    status: 'live',
    emoji: '🌐',
    accent: 'aqua',
    kind: 'service',
    platform: 'Service',
    cta: { label: 'Get a quote', to: '/contact' },
  },
]
