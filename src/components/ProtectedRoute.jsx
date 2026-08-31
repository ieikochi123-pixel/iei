import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-cyan-200/70 font-mono text-sm">
        Checking credentials…
      </div>
    )
  }

  if (!session) return <Navigate to="/admin-login" replace />

  return children
}
