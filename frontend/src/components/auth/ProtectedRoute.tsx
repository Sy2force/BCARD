import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface ProtectedRouteProps {
  requireBusiness?: boolean
  requireAdmin?: boolean
}

const ProtectedRoute = ({ requireBusiness = false, requireAdmin = false }: ProtectedRouteProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  if (requireBusiness && !user.isBusiness && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
