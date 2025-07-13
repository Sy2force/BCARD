import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/contextHooks';

interface FavoriteButtonProps {
  cardId: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ cardId, size = 'md' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(cardId);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(cardId);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`${buttonSizeClasses[size]} rounded-full glass transition-all duration-300 hover:scale-110 group relative overflow-hidden`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{
          scale: favorite ? [1, 1.3, 1] : 1,
          rotate: favorite ? [0, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`${sizeClasses[size]} transition-all duration-300 ${
            favorite
              ? 'text-red-500 fill-red-500'
              : 'text-white/60 group-hover:text-red-400'
          }`}
        />
      </motion.div>

      {/* Particle effect when favorited */}
      {favorite && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.6 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, (Math.cos((i * Math.PI) / 3) * 20)],
                y: [0, (Math.sin((i * Math.PI) / 3) * 20)],
                opacity: [1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-500/20"
        animate={{
          scale: favorite ? [1, 1.5, 1] : 0,
          opacity: favorite ? [0.5, 0, 0.5] : 0,
        }}
        transition={{ duration: 0.8, repeat: favorite ? Infinity : 0 }}
      />
    </motion.button>
  );
};

export default FavoriteButton;
