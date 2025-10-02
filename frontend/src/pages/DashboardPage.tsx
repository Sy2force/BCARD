import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { 
  CreditCardIcon, 
  HeartIcon, 
  UserGroupIcon,
  PlusIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const DashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalCards: 0,
    myCards: 0,
    favorites: 0,
    totalLikes: 0
  })
  const [recentCards, setRecentCards] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch user's cards
      const myCardsRes = await axiosInstance.get('/cards/my-cards')
      const allCardsRes = await axiosInstance.get('/cards')
      
      const myCards = myCardsRes.data.cards
      const allCards = allCardsRes.data.cards
      
      // Calculate stats
      const favorites = allCards.filter((card: any) => 
        card.likes?.includes(user?._id)
      )
      
      const totalLikes = myCards.reduce((sum: number, card: any) => 
        sum + (card.likes?.length || 0), 0
      )
      
      setStats({
        totalCards: allCards.length,
        myCards: myCards.length,
        favorites: favorites.length,
        totalLikes
      })
      
      setRecentCards(allCards.slice(0, 3))
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }
  }

  const statCards = [
    {
      title: 'Total Cards',
      value: stats.totalCards,
      icon: CreditCardIcon,
      color: 'from-blue-500 to-cyan-500',
      link: '/cards'
    },
    {
      title: 'My Cards',
      value: stats.myCards,
      icon: CreditCardIcon,
      color: 'from-purple-500 to-pink-500',
      link: '/my-cards'
    },
    {
      title: 'Favorites',
      value: stats.favorites,
      icon: HeartIcon,
      color: 'from-red-500 to-orange-500',
      link: '/favorites'
    },
    {
      title: 'Total Likes',
      value: stats.totalLikes,
      icon: ChartBarIcon,
      color: 'from-green-500 to-teal-500',
      link: null
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass dark:glass-dark rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name.first}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {user?.isBusiness 
            ? "Manage your business cards and track engagement"
            : "Discover and save professional business cards"}
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
            <p className="text-2xl font-bold text-black dark:text-white">
              {stat.value}
            </p>
            {stat.link && (
              <Link 
                to={stat.link} 
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                View all →
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      {user?.isBusiness && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass dark:glass-dark rounded-3xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/create-card"
              className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg transition"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create New Card</span>
            </Link>
            <Link 
              to="/my-cards"
              className="flex items-center justify-center space-x-2 p-4 rounded-xl glass border border-white/20 hover:bg-white/10 transition"
            >
              <CreditCardIcon className="w-5 h-5" />
              <span>Manage Cards</span>
            </Link>
            <Link 
              to="/profile"
              className="flex items-center justify-center space-x-2 p-4 rounded-xl glass border border-white/20 hover:bg-white/10 transition"
            >
              <UserGroupIcon className="w-5 h-5" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Recent Cards */}
      {recentCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass dark:glass-dark rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Cards</h2>
            <Link to="/cards" className="text-blue-500 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCards.map((card: any) => (
              <div key={card._id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {card.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {card.likes?.length || 0} likes
                  </span>
                  <Link 
                    to={`/cards/${card._id}`}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default DashboardPage
