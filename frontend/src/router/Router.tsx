import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/layout/Layout'
import ProtectedRoute from '../components/auth/ProtectedRoute'

// Pages
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import CardsPage from '../pages/CardsPage'
import MyCardsPage from '../pages/MyCardsPage'
import CreateCardPage from '../pages/CreateCardPage'
import EditCardPage from '../pages/EditCardPage'
import FavoritesPage from '../pages/FavoritesPage'
import ProfilePage from '../pages/ProfilePage'
import AdminPage from '../pages/AdminPage'
import NotFoundPage from '../pages/NotFoundPage'

const Router = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="my-cards" element={<MyCardsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Business Routes */}
        <Route element={<ProtectedRoute requireBusiness />}>
          <Route path="create-card" element={<CreateCardPage />} />
          <Route path="edit-card/:id" element={<EditCardPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute requireAdmin />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default Router
