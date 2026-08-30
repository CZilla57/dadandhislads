/**
 * Contact submission abstraction.
 *
 * The site has no backend of its own. Rather than pretend a message was sent,
 * this module submits to a form endpoint when one is configured, and otherwise
 * reports an honest `fallback` so the UI can point people at the direct email
 * address instead.
 *
 * To enable real submissions, set `VITE_CONTACT_ENDPOINT` at build time to a
 * URL that accepts a JSON POST (e.g. a Cloudflare Pages Function, Formspree,
 * Basin, or similar). No secrets are stored in the repo.
 */

export const CONTACT_EMAIL = 'hello@dadandhislads.com'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

/** Whether a real form endpoint is configured for this build. */
export const isContactConfigured = Boolean(ENDPOINT)

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export type ContactResult =
  | { ok: true; mode: 'sent' }
  | { ok: false; mode: 'fallback' }
  | { ok: false; mode: 'error'; error: string }

/** Build a mailto: link that pre-fills a drafted message (used by the fallback). */
export function buildMailto({ name, email, message }: ContactPayload): string {
  const subject = encodeURIComponent(`Hello from ${name || 'a friend'}`)
  const body = encodeURIComponent(
    `${message}\n\n— ${name}${email ? ` (${email})` : ''}`,
  )
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!ENDPOINT) {
    // No provider configured — be honest rather than faking success.
    return { ok: false, mode: 'fallback' }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return { ok: false, mode: 'error', error: `Server responded ${res.status}` }
    }
    return { ok: true, mode: 'sent' }
  } catch (err) {
    return {
      ok: false,
      mode: 'error',
      error: err instanceof Error ? err.message : 'Network error',
    }
  }
}
