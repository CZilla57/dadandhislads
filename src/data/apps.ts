import tradeReadyIcon from '../assets/apps/tradeready.avif'
import focusquestIcon from '../assets/apps/focusquest.avif'
import howdYouDoThatIcon from '../assets/apps/howd-you-do-that.avif'
import websiteBuildingImage from '../assets/apps/website-building.avif'

export type AppStatus = 'live' | 'building' | 'soon'

export type AppCategory = 'Business' | 'ADHD & Focus' | 'Health' | 'Family' | 'Fun'

export interface AppItem {
  slug: string
  name: string
  tagline: string
  /** One-to-two sentence summary — kept short so cards stay scannable. */
  description: string
  /** A few concise benefits shown as chips on the card. */
  highlights?: string[]
  category: AppCategory
  status: AppStatus
  emoji: string
  /** Optional real icon image (imported asset URL). Falls back to `emoji`. */
  icon?: string
  accent: 'ember' | 'volt' | 'aqua' | 'sun'
  url?: string
  /** Short platform label shown on the card, e.g. "iOS" or "Web · Mobile soon". */
  platform?: string
}

export interface ServiceItem {
  slug: string
  name: string
  tagline: string
  description: string
  /** What the customer gets. */
  benefits: string[]
  /** Who it's for. */
  audience: string
  /** Turnaround expectation. */
  turnaround: string
  emoji: string
  accent: 'ember' | 'volt' | 'aqua' | 'sun'
  /** Optional illustration (imported asset URL). */
  image?: string
  cta: { label: string; to: string }
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
      'Job management and invoicing for independent tradespeople — price jobs, send estimates and invoices, and take card payments, even when the signal drops.',
    highlights: ['Estimates & invoices in seconds', 'Card payments built in', 'Works fully offline'],
    category: 'Business',
    status: 'live',
    emoji: '🔧',
    icon: tradeReadyIcon,
    accent: 'ember',
    url: 'https://gettradereadyapp.com',
    platform: 'iOS',
  },
  {
    slug: 'focusquest',
    name: 'FocusQuest',
    tagline: 'Turn your to-do list into an adventure.',
    description:
      'Gamified tasks and habits built for ADHD brains. Complete quests, earn XP, and build streaks so the things you keep meaning to do finally get done.',
    highlights: ['Quests, XP & streaks', 'Made for ADHD focus', 'Play in your browser'],
    category: 'ADHD & Focus',
    status: 'live',
    emoji: '🎯',
    icon: focusquestIcon,
    accent: 'volt',
    url: 'https://getfocusquest.com',
    platform: 'Web · Mobile soon',
  },
  {
    slug: 'howd-you-do-that',
    name: "How'd You Do That",
    tagline: 'Upgrade the boring story of how you broke it.',
    description:
      'Spins the real, boring story of your broken bone into an epic tale worth retelling — the one you wish had actually happened.',
    highlights: ['Turn mishaps into legends', 'Share the better story'],
    category: 'Fun',
    status: 'building',
    emoji: '🤕',
    icon: howdYouDoThatIcon,
    accent: 'sun',
    platform: 'iOS · coming soon',
  },
]

export const services: ServiceItem[] = [
  {
    slug: 'website-building',
    name: 'Website Building',
    tagline: 'A clean, simple site — fast and affordable.',
    description:
      "Need to get online without the agency price tag? I'll build you a decent, no-nonsense website that looks great and does the job.",
    benefits: [
      'Clean, modern design',
      'Fast and mobile-friendly',
      'No agency price tag',
      'You own everything',
    ],
    audience:
      'Great for small businesses, side hustles, and anyone who just needs a solid site done right.',
    turnaround: 'Most simple sites are ready in about 1–2 weeks.',
    emoji: '🌐',
    accent: 'aqua',
    image: websiteBuildingImage,
    cta: { label: 'Get a quote', to: '/contact' },
  },
]
