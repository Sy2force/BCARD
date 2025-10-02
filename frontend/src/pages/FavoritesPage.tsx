import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'
import CardItem from '../components/card/CardItem'
import { useAuth } from '../context/AuthContext'
import { HeartIcon } from '@heroicons/react/24/outline'

const FavoritesPage = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get('/cards')
      const favoriteCards = response.data.cards.filter((card: any) =>
        card.likes?.includes(user?._id)
      )
      setCards(favoriteCards)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch favorites:', error)
      }
    } finally {
      setLoading(false)
    }
  }

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
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">{t('favorites.title')}</h1>
        <p className="text-black/70 dark:text-white/70">
          Your collection of favorite business cards
        </p>
      </motion.div>

      {/* Cards Grid */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card: any, index: number) => (
            <motion.div
              key={card._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CardItem card={card} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 glass dark:glass-dark rounded-3xl"
        >
          <HeartIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You haven't liked any cards yet
          </p>
          <p className="text-sm text-gray-500">
            Browse cards and click the heart icon to add them to your favorites
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default FavoritesPage
