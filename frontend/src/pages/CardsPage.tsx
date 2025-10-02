import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'
import CardItem from '../components/card/CardItem'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const CardsPage = () => {
  const { t } = useTranslation()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCards, setFilteredCards] = useState([])

  useEffect(() => {
    fetchCards()
  }, [])

  useEffect(() => {
    const filtered = cards.filter((card: any) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCards(filtered)
  }, [searchTerm, cards])

  const fetchCards = async () => {
    try {
      const response = await axiosInstance.get('/cards')
      setCards(response.data.cards)
      setFilteredCards(response.data.cards)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch cards:', error)
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
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">{t('cards.title')}</h1>
        <p className="text-black/70 dark:text-white/70 mb-8">
          Discover professional business cards from our community
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </motion.div>

      {/* Cards Grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card: any, index: number) => (
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
          className="text-center py-12"
        >
          <p className="text-gray-600 dark:text-gray-400">
            {t('cards.noCards')}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default CardsPage
