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
  },
]
