import React from 'react';
import { motion } from 'framer-motion';
import type { BusinessCard } from '../services/cardsService';
import Card from './Card';
import Loader from './Loader';

interface CardListProps {
  cards: BusinessCard[];
  loading?: boolean;
  onEdit?: (card: BusinessCard) => void;
  onDelete?: (cardId: string) => void;
  onCardClick?: (card: BusinessCard) => void;
  emptyMessage?: string;
}

const CardList: React.FC<CardListProps> = ({
  cards,
  loading = false,
  onEdit,
  onDelete,
  onCardClick,
  emptyMessage = 'Aucune carte trouvée',
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" text="Chargement des cartes..." />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass rounded-2xl p-8 max-w-md mx-auto">
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple opacity-50" />
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-2">Aucune carte</h3>
          <p className="text-white/70">{emptyMessage}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card
            card={card}
            onEdit={onEdit}
            onDelete={onDelete}
            onClick={onCardClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardList;
