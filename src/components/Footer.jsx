import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-deep)] border-t border-cyan-400/15 text-center py-8 px-5">
      <p className="text-white/50 text-sm font-mono">
        © {new Date().getFullYear()} IE(I) Kochi Local Centre
      </p>
      <Link
        to="/admin-login"
        className="inline-block mt-2 text-white/15 text-xs hover:text-white/40 transition-colors"
      >
        Admin Login
      </Link>
    </footer>
  )
}
