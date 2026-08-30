import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Logo } from './Logo'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/apps', label: 'Apps' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="Dad & His Lads — home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-3 text-cloud'
                    : 'text-mist hover:text-cloud'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-2 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            Get in touch
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line text-cloud md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close main menu' : 'Open main menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span aria-hidden className="text-xl">
            {open ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line/60 px-5 py-3 md:hidden"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-base font-medium ${
                  isActive ? 'bg-ink-3 text-cloud' : 'text-mist'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line/60 bg-ink-2">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-sm text-mist">
            Apps built by a dad, alongside his lads.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <div className="flex gap-4 text-sm text-mist">
            <Link to="/apps" className="hover:text-cloud">
              Apps
            </Link>
            <Link to="/about" className="hover:text-cloud">
              About
            </Link>
            <Link to="/contact" className="hover:text-cloud">
              Contact
            </Link>
          </div>
          <p className="text-xs text-mist/70">
            © {new Date().getFullYear()} Dad &amp; His Lads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
