import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ allowedRole }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="min-h-screen bg-[#0a0a0f] text-white">Loading...</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return <Outlet />
}
