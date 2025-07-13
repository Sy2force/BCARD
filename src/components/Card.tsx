import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, MapPin, Edit, Trash2 } from 'lucide-react';
import type { BusinessCard } from '../services/cardsService';
import FavoriteButton from './FavoriteButton';
import { useAuth } from '../hooks/contextHooks';

interface CardProps {
  card: BusinessCard;
  onEdit?: (card: BusinessCard) => void;
  onDelete?: (cardId: string) => void;
  onClick?: (card: BusinessCard) => void;
}

const Card: React.FC<CardProps> = ({ card, onEdit, onDelete, onClick }) => {
  const { user } = useAuth();
  const canEdit = user?.id === card.userId || user?.role === 'admin';

  const handleCardClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(card);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      onDelete(card.id);
    }
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      <div
        className="relative p-6 rounded-2xl glass card-hover overflow-hidden min-h-[300px] flex flex-col"
        style={{
          background: `linear-gradient(135deg, ${card.backgroundColor}20, ${card.backgroundColor}10)`,
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        </div>

        {/* Header with Avatar and Actions */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {card.image ? (
              <motion.img
                src={card.image}
                alt={card.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-xl">
                {card.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{card.name}</h3>
              <p className="text-white/80 text-sm">{card.position}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FavoriteButton cardId={card.id} size="sm" />
            {canEdit && (
              <>
                <motion.button
                  onClick={handleEdit}
                  className="p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-4 h-4 text-white/80 hover:text-neon-blue" />
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  className="p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4 text-white/80 hover:text-red-400" />
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="relative flex-1 space-y-3">
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">{card.title}</h4>
            <p className="text-neon-blue font-medium">{card.subtitle}</p>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">{card.description}</p>

          <div className="text-white/70 text-sm font-medium">{card.company}</div>
        </div>

        {/* Contact Info */}
        <div className="relative mt-4 space-y-2">
          <motion.div
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: 4 }}
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">{card.email}</span>
          </motion.div>

          <motion.div
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: 4 }}
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">{card.phone}</span>
          </motion.div>

          {card.website && (
            <motion.div
              className="flex items-center space-x-2 text-white/80 hover:text-neon-blue transition-colors"
              whileHover={{ x: 4 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{card.website}</span>
            </motion.div>
          )}

          {card.address && (
            <motion.div
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              whileHover={{ x: 4 }}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{card.address}</span>
            </motion.div>
          )}
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />

        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-neon-blue/30 transition-colors duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  );
};

export default Card;
