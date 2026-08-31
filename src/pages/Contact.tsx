import { useId, useState } from 'react'
import {
  CONTACT_EMAIL,
  buildMailto,
  isContactConfigured,
  submitContact,
} from '../lib/contact'
import { trackContactSubmit } from '../lib/analytics'
import { usePageMeta } from '../lib/usePageMeta'
import { routeMeta } from '../lib/routeMeta'

type Status = 'idle' | 'submitting' | 'success' | 'fallback' | 'error'
type FieldErrors = { name?: string; email?: string; message?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {}
  if (!name.trim()) errors.name = 'Please tell us your name.'
  if (!email.trim()) errors.email = 'Please add an email so we can reply.'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'That email doesn’t look quite right.'
  if (message.trim().length < 10)
    errors.message = 'A little more detail helps — at least 10 characters.'
  return errors
}

export function Contact() {
  usePageMeta(routeMeta.contact)

  const ids = useId()
  const nameId = `${ids}-name`
  const emailId = `${ids}-email`
  const messageId = `${ids}-message`

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const submitting = status === 'submitting'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate(name, email, message)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('submitting')
    setErrorMessage('')
    const result = await submitContact({ name, email, message })

    if (result.ok) {
      setStatus('success')
      trackContactSubmit('sent')
    } else if (result.mode === 'fallback') {
      setStatus('fallback')
      trackContactSubmit('fallback')
    } else {
      setStatus('error')
      setErrorMessage(result.error)
      trackContactSubmit('error')
    }
  }

  function reset() {
    setName('')
    setEmail('')
    setMessage('')
    setErrors({})
    setStatus('idle')
    setErrorMessage('')
  }

  const directEmail = (
    <p className="text-center text-sm text-mist">
      Or email us directly at{' '}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="font-medium text-ember-soft hover:underline"
      >
        {CONTACT_EMAIL}
      </a>
    </p>
  )

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-cloud sm:text-5xl">
          Say hello <span aria-hidden>👋</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-mist">
          Idea, question, bug, or just a hi from another builder — we read every
          message.
        </p>
      </div>

      {status === 'success' ? (
        <div
          role="status"
          className="mt-12 rounded-xl2 border border-aqua/40 bg-ink-2 p-8 text-center"
        >
          <span aria-hidden className="text-4xl">
            🎉
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-cloud">
            Message sent!
          </h2>
          <p className="mx-auto mt-2 max-w-md text-mist">
            Thanks for reaching out — we’ll get back to you soon.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full border border-line bg-ink px-6 py-3 font-semibold text-cloud transition-colors hover:border-volt/60"
          >
            Send another message
          </button>
          <div className="mt-6">{directEmail}</div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 space-y-5 rounded-xl2 border border-line bg-ink-2 p-6 sm:p-8"
        >
          {/* Honest fallback: no form endpoint is configured for this build. */}
          {status === 'fallback' && (
            <div
              role="status"
              className="rounded-lg border border-sun/40 bg-sun/10 p-4 text-sm text-cloud"
            >
              <p className="font-semibold">This site doesn’t have a message form wired up yet.</p>
              <p className="mt-1 text-mist">
                No problem — your note is ready to send from your own email. Use
                the button below, or copy our address:{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-ember-soft hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <a
                href={buildMailto({ name, email, message })}
                className="mt-3 inline-block rounded-full bg-sun px-5 py-2.5 font-semibold text-ink transition-transform hover:scale-105"
              >
                Open in your email app
              </a>
            </div>
          )}

          {/* Network / server error */}
          {status === 'error' && (
            <div
              role="alert"
              className="rounded-lg border border-ember/50 bg-ember/10 p-4 text-sm text-cloud"
            >
              <p className="font-semibold">Something went wrong sending that.</p>
              <p className="mt-1 text-mist">
                {errorMessage || 'Please try again'} — or email us directly at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-ember-soft hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          )}

          <div>
            <label htmlFor={nameId} className="mb-1.5 block text-sm font-medium text-cloud">
              Your name
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-required="true"
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-cloud placeholder-mist/60 outline-none transition-colors focus:border-volt"
              placeholder="Alex"
            />
            {errors.name && (
              <p id={`${nameId}-error`} role="alert" className="mt-1.5 text-sm text-ember-soft">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={emailId} className="mb-1.5 block text-sm font-medium text-cloud">
              Email
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-cloud placeholder-mist/60 outline-none transition-colors focus:border-volt"
              placeholder="alex@example.com"
            />
            {errors.email && (
              <p id={`${emailId}-error`} role="alert" className="mt-1.5 text-sm text-ember-soft">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={messageId} className="mb-1.5 block text-sm font-medium text-cloud">
              Message
            </label>
            <textarea
              id={messageId}
              name="message"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              aria-required="true"
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? `${messageId}-error` : undefined}
              className="w-full resize-y rounded-lg border border-line bg-ink px-4 py-3 text-cloud placeholder-mist/60 outline-none transition-colors focus:border-volt"
              placeholder="Tell us what's on your mind…"
            />
            {errors.message && (
              <p id={`${messageId}-error`} role="alert" className="mt-1.5 text-sm text-ember-soft">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-ember px-6 py-3 font-semibold text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Sending…' : 'Send message'}
          </button>

          {!isContactConfigured && status === 'idle' && (
            <p className="text-center text-xs text-mist/80">
              Prefer email? You can always reach us directly below.
            </p>
          )}

          {directEmail}
        </form>
      )}
    </div>
  )
}
