import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ShareIcon, 
  PencilIcon, 
  TrashIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import axiosInstance from '../../api/axiosInstance'
import toast from 'react-hot-toast'

interface CardItemProps {
  card: any
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
}

const CardItem = ({ card, onEdit, onDelete, showActions = false }: CardItemProps) => {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(card.likes?.includes(user?._id))
  const [likesCount, setLikesCount] = useState(card.likes?.length || 0)

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like cards')
      return
    }

    try {
      await axiosInstance.patch(`/cards/${card._id}/like`)
      setIsLiked(!isLiked)
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    } catch (error) {
      toast.error('Failed to update like')
    }
  }

  const handleShare = () => {
    const url = `${window.location.origin}/cards/${card._id}`
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      {/* Card Image */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 relative">
        {card.image?.url && (
          <img 
            src={card.image.url} 
            alt={card.image.alt || card.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{card.title}</h3>
          <p className="text-sm opacity-90">{card.subtitle}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">{card.title}</h3>
        <p className="text-sm text-purple-600 dark:text-cyan-400 font-medium mb-3">{card.subtitle}</p>
        <p className="text-gray-600 dark:text-gray-200 line-clamp-3 mb-4">{card.description}</p>

        {/* Contact Info */}
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-200">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="w-4 h-4 text-purple-500 dark:text-cyan-400" />
            <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
              {card.address?.city}, {card.address?.country}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">📧</span>
            <span>{card.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">📱</span>
            <span>{card.phone}</span>
          </div>
          {card.web && (
            <div className="flex items-center space-x-2">
              <span className="font-medium">🌐</span>
              <a href={card.web} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                {card.web}
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                isLiked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              {isLiked ? (
                <HeartIcon className="w-5 h-5 text-red-500 fill-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm">{likesCount}</span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>

          {showActions && user && (user._id === card.user_id || user.isAdmin) && (
            <div className="flex items-center space-x-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default CardItem
