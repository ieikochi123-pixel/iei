import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function AdminLogin() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error } = await signIn(email, password)
    setBusy(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate('/admin')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--color-paper)] px-5">
      <div className="bg-white w-full max-w-sm rounded-md border-t-4 border-[var(--color-brass)] shadow-sm p-8">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-navy)] text-center">
          IEI Admin Login
        </h2>
        <p className="text-center text-[var(--color-ink-soft)] text-xs font-mono mt-2">
          Authenticated via Supabase
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2.5 focus-ring"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2.5 focus-ring"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[var(--color-navy)] text-white font-semibold py-2.5 rounded hover:bg-[var(--color-navy-soft)] transition disabled:opacity-60"
          >
            {busy ? 'Signing in\u2026' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
