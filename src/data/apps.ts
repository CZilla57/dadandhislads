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

// Placeholder catalog — swap names, taglines, and URLs as apps ship.
export const apps: AppItem[] = [
  {
    slug: 'broken-bone',
    name: 'The Broken Bone App',
    tagline: 'From the ER to all healed up.',
    description:
      'Track a fracture the whole way through — cast-off dates, follow-ups, range-of-motion exercises, and a healing timeline the whole family can follow. Born from a real trip to the ER.',
    category: 'Health',
    status: 'building',
    emoji: '🦴',
    accent: 'aqua',
  },
  {
    slug: 'focus-lads',
    name: 'Focus Lads',
    tagline: 'ADHD-friendly focus that actually sticks.',
    description:
      'Body-doubling timers, gentle nudges, and a dopamine-friendly reward loop built for brains that wander. Designed with real ADHD routines in mind — not against them.',
    category: 'ADHD & Focus',
    status: 'building',
    emoji: '🧠',
    accent: 'volt',
  },
  {
    slug: 'ledger-lad',
    name: 'LedgerLad',
    tagline: 'Small-business books without the headache.',
    description:
      'Invoicing, expenses, and a plain-English snapshot of how the business is really doing — for makers, freelancers, and side-hustlers who would rather build than bookkeep.',
    category: 'Business',
    status: 'soon',
    emoji: '📊',
    accent: 'ember',
  },
  {
    slug: 'chore-quest',
    name: 'Chore Quest',
    tagline: 'Turn the family to-do list into a game.',
    description:
      'Kids earn points, level up, and unlock rewards for helping out. Parents get a calmer house. Everybody wins the quest.',
    category: 'Family',
    status: 'soon',
    emoji: '⚔️',
    accent: 'sun',
  },
  {
    slug: 'brain-break',
    name: 'Brain Break',
    tagline: 'Tiny games for a big reset.',
    description:
      'Quick, delightful mini-games to reset an overloaded brain — for the kids, and honestly for dad too.',
    category: 'Fun',
    status: 'soon',
    emoji: '🎮',
    accent: 'volt',
  },
]
