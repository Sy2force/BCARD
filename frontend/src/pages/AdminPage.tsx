import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'
import { 
  UserGroupIcon, 
  CreditCardIcon, 
  ChartBarIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const AdminPage = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    businessUsers: 0,
    activeToday: 0
  })
  const [users, setUsers] = useState([])
  const [cards, setCards] = useState([])
  const [activeTab, setActiveTab] = useState('stats')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const [usersRes, cardsRes] = await Promise.all([
        axiosInstance.get('/users'),
        axiosInstance.get('/cards')
      ])

      const usersData = usersRes.data.users
      const cardsData = cardsRes.data.cards

      // Calculate stats
      const today = new Date().toDateString()
      const activeToday = usersData.filter((user: any) => 
        new Date(user.createdAt).toDateString() === today
      ).length

      setStats({
        totalUsers: usersData.length,
        totalCards: cardsData.length,
        businessUsers: usersData.filter((u: any) => u.isBusiness).length,
        activeToday
      })

      setUsers(usersData)
      setCards(cardsData)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch admin data:', error)
      }
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await axiosInstance.delete(`/users/${userId}`)
      setUsers(users.filter((u: any) => u._id !== userId))
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const handleDeleteCard = async (cardId: string) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return

    try {
      await axiosInstance.delete(`/cards/${cardId}`)
      setCards(cards.filter((c: any) => c._id !== cardId))
      toast.success('Card deleted successfully')
    } catch (error) {
      toast.error('Failed to delete card')
    }
  }

  const statCards = [
    {
      title: t('admin.totalUsers'),
      value: stats.totalUsers,
      icon: UserGroupIcon,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: t('admin.totalCards'),
      value: stats.totalCards,
      icon: CreditCardIcon,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: t('admin.businessUsers'),
      value: stats.businessUsers,
      icon: ChartBarIcon,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: t('admin.activeToday'),
      value: stats.activeToday,
      icon: CheckCircleIcon,
      color: 'from-orange-500 to-red-500'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">
          {t('admin.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage users, cards, and view platform statistics
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-black/70 dark:text-white/70 mb-1">
              {stat.title}
            </p>
            <p className="text-3xl font-bold text-black dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass dark:glass-dark rounded-3xl p-8">
        <div className="flex space-x-4 mb-6 border-b border-white/20">
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-2 px-4 transition ${
              activeTab === 'stats' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {t('admin.statistics')}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2 px-4 transition ${
              activeTab === 'users' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {t('admin.users')}
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`pb-2 px-4 transition ${
              activeTab === 'cards' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {t('admin.cards')}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Platform Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-600 dark:text-gray-400">Average cards per user</p>
                <p className="text-2xl font-bold">
                  {stats.totalUsers > 0 ? (stats.totalCards / stats.totalUsers).toFixed(1) : 0}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-600 dark:text-gray-400">Business account ratio</p>
                <p className="text-2xl font-bold">
                  {stats.totalUsers > 0 ? ((stats.businessUsers / stats.totalUsers) * 100).toFixed(0) : 0}%
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user._id} className="border-b border-white/10">
                    <td className="py-2">{user.name.first} {user.name.last}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isAdmin 
                          ? 'bg-red-500/20 text-red-500'
                          : user.isBusiness 
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {user.isAdmin ? 'Admin' : user.isBusiness ? 'Business' : 'Regular'}
                      </span>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-1 rounded hover:bg-red-500/10 text-red-500"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2">Title</th>
                  <th className="text-left py-2">Owner</th>
                  <th className="text-left py-2">Likes</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card: any) => (
                  <tr key={card._id} className="border-b border-white/10">
                    <td className="py-2">{card.title}</td>
                    <td className="py-2">{card.user_id?.email || 'Unknown'}</td>
                    <td className="py-2">{card.likes?.length || 0}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDeleteCard(card._id)}
                        className="p-1 rounded hover:bg-red-500/10 text-red-500"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
