import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/#home' },
  { label: 'Notices', to: '/#notices' },
  { label: 'Events', to: '/#events' },
  { label: 'About', to: '/#about' },
  { label: 'Committee', to: '/#committee' },
  { label: 'Venue Booking', to: '/booking' },
  { label: 'Gallery', to: '/#gallery' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-navy-deep)]/95 backdrop-blur border-b border-cyan-400/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-brass)] border border-[var(--color-brass)]/50 rounded-sm px-1.5 py-0.5">
            EST. 1920
          </span>
          <span className="font-[var(--font-display)] text-lg md:text-xl tracking-wide text-white">
            IE(I) KOCHI
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm text-white/80 hover:text-[var(--color-cyan)] transition-colors focus-ring"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="/#membership"
            className="inline-block bg-[var(--color-cyan)] text-[var(--color-navy-deep)] font-semibold text-sm px-4 py-2 rounded-sm hover:bg-[var(--color-brass-light)] transition-colors focus-ring"
          >
            Membership
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2 focus-ring"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-cyan-400/20 px-5 py-4 flex flex-col gap-4 bg-[var(--color-navy-deep)]">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-white/85 text-sm"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/#membership"
            onClick={() => setOpen(false)}
            className="inline-block text-center bg-[var(--color-cyan)] text-[var(--color-navy-deep)] font-semibold text-sm px-4 py-2 rounded-sm"
          >
            Membership
          </a>
        </nav>
      )}
    </header>
  )
}
