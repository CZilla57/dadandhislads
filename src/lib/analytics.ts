/**
 * Provider-neutral analytics.
 *
 * This is a thin, safe wrapper around whatever analytics provider (if any)
 * happens to be present on the page. It never collects personal information —
 * only anonymous interaction events with small, non-identifying properties.
 *
 * If no provider is configured it quietly no-ops (logging to the console in
 * dev only), so the site works exactly the same with or without analytics.
 *
 * To wire up a provider later, expose one of these on `window`:
 *   - Plausible:            window.plausible(event, { props })
 *   - GA/gtag / dataLayer:  window.dataLayer.push({ event, ...props })
 * No keys or secrets live in the codebase.
 */

type EventProps = Record<string, string | number | boolean | undefined>

interface PlausibleFn {
  (event: string, options?: { props?: EventProps }): void
}

declare global {
  interface Window {
    plausible?: PlausibleFn
    dataLayer?: Array<Record<string, unknown>>
  }
}

/** Low-level: send one named event with optional non-personal properties. */
export function track(event: string, props: EventProps = {}): void {
  // Strip undefined values so providers get clean payloads.
  const clean: EventProps = {}
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) clean[k] = v
  }

  if (typeof window === 'undefined') return

  try {
    if (typeof window.plausible === 'function') {
      window.plausible(event, { props: clean })
      return
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...clean })
      return
    }
  } catch {
    // Analytics must never break the app.
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, clean)
  }
}

/** A visitor followed a product link (internal or external). */
export function trackAppVisit(slug: string, destination: 'internal' | 'external') {
  track('app_visit', { slug, destination })
}

/** A contact message was submitted (records the outcome, never the content). */
export function trackContactSubmit(outcome: 'sent' | 'fallback' | 'error') {
  track('contact_submit', { outcome })
}

/** A visitor clicked a "Get a quote" call-to-action for a service. */
export function trackQuoteClick(service: string) {
  track('quote_click', { service })
}
