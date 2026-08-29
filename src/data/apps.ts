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
]
