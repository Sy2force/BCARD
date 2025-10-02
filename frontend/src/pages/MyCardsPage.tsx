import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import CardItem from '../components/card/CardItem'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const MyCardsPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyCards()
  }, [])

  const fetchMyCards = async () => {
    try {
      const response = await axiosInstance.get('/cards/my-cards')
      setCards(response.data.cards)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch cards:', error)
      }
      toast.error('Failed to load your cards')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cardId: string) => {
    navigate(`/edit-card/${cardId}`)
  }

  const handleDelete = async (cardId: string) => {
    if (!window.confirm(t('cards.deleteConfirm'))) return

    try {
      await axiosInstance.delete(`/cards/${cardId}`)
      setCards(cards.filter((card: any) => card._id !== cardId))
      toast.success('Card deleted successfully')
    } catch (error) {
      toast.error('Failed to delete card')
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">{t('myCards.title')}</h1>
          <p className="text-black/70 dark:text-white/70">
            Manage your business cards
          </p>
        </div>
        {user?.isBusiness && (
          <button
            onClick={() => navigate('/create-card')}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>{t('cards.createCard')}</span>
          </button>
        )}
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
              <CardItem 
                card={card}
                showActions
                onEdit={() => handleEdit(card._id)}
                onDelete={() => handleDelete(card._id)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 glass dark:glass-dark rounded-3xl"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('cards.noCards')}
          </p>
          {user?.isBusiness && (
            <button
              onClick={() => navigate('/create-card')}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>{t('cards.createCard')}</span>
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default MyCardsPage
