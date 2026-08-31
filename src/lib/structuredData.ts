/**
 * JSON-LD builders for the app catalog and services.
 *
 * Unlike `routeMeta.ts`, this may import the catalog (and therefore its image
 * assets), so it is client-only — consumed by `usePageMeta` on the Apps and
 * Home routes. Google renders JavaScript before reading structured data, so
 * injecting these at runtime is enough for rich-result eligibility; the static
 * Organization + WebSite schema lives in the base template for everyone else.
 */
import { SITE_URL } from './routeMeta'
import type { AppItem, ServiceItem } from '../data/apps'
import { apps, services } from '../data/apps'

/** Map our short platform labels to schema.org operatingSystem hints. */
function operatingSystem(app: AppItem): string | undefined {
  if (!app.platform) return undefined
  const p = app.platform.toLowerCase()
  const systems: string[] = []
  if (p.includes('ios')) systems.push('iOS')
  if (p.includes('android')) systems.push('Android')
  if (p.includes('web')) systems.push('Web')
  return systems.length > 0 ? systems.join(', ') : undefined
}

export function softwareApplicationLd(app: AppItem): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: operatingSystem(app),
    ...(app.url ? { url: app.url } : {}),
  }
}

export function serviceLd(service: ServiceItem): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: 'Website development',
    areaServed: 'GB',
    provider: {
      '@type': 'Organization',
      name: 'Dad & His Lads',
      url: `${SITE_URL}/`,
    },
  }
}

/** Structured data for the Apps page: every app plus each service. */
export const appsPageJsonLd: object[] = [
  ...apps.map(softwareApplicationLd),
  ...services.map(serviceLd),
]
