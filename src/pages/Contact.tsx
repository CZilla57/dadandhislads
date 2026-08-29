import { useState } from 'react'

const CONTACT_EMAIL = 'hello@dadandhislads.com'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Hello from ${name || 'a friend'}`)
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ''}`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-cloud sm:text-5xl">
          Say hello 👋
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-mist">
          Idea, question, bug, or just a hi from another builder — we read every
          message.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-5 rounded-xl2 border border-line bg-ink-2 p-6 sm:p-8"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-cloud">
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-cloud placeholder-mist/50 outline-none transition-colors focus:border-volt"
            placeholder="Alex"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-cloud">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-line bg-ink px-4 py-3 text-cloud placeholder-mist/50 outline-none transition-colors focus:border-volt"
            placeholder="alex@example.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-cloud">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full resize-y rounded-lg border border-line bg-ink px-4 py-3 text-cloud placeholder-mist/50 outline-none transition-colors focus:border-volt"
            placeholder="Tell us what's on your mind…"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-ember px-6 py-3 font-semibold text-ink transition-transform hover:scale-[1.02]"
        >
          Send message
        </button>
        <p className="text-center text-sm text-mist">
          Or email us directly at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-ember-soft hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </form>
    </div>
  )
}
