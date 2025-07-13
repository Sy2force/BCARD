import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { cardsService } from '../services/cardsService';
import type { BusinessCard } from '../services/cardsService';
import { useFavorites } from '../hooks/contextHooks';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const [favoriteCards, setFavoriteCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const loadFavoriteCards = useCallback(async () => {
    try {
      setLoading(true);
      if (favorites.length === 0) {
        setFavoriteCards([]);
        setFilteredCards([]);
        return;
      }

      const allCards = await cardsService.getAllCards();
      const favoriteCardsList = allCards.filter(card => favorites.includes(card.id));
      setFavoriteCards(favoriteCardsList);
      setFilteredCards(favoriteCardsList);
    } catch {
      // Silently handle error
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    loadFavoriteCards();
  }, [loadFavoriteCards]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredCards(favoriteCards);
      return;
    }

    try {
      const results = await cardsService.searchCards(query);
      // Filter results to show only favorite cards
      const favoriteResults = results.filter(card => favorites.includes(card.id));
      setFilteredCards(favoriteResults);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  const handleCardClick = (card: BusinessCard) => {
    navigate(`/card/${card.id}`);
  };

  return (
    <div className="min-h-screen py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-white fill-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Mes Favoris
            </h1>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Retrouvez toutes les cartes que vous avez ajoutées à vos favoris
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">{favorites.length}</div>
            <div className="text-white/70">Cartes favorites</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              <Star className="w-8 h-8 mx-auto fill-red-400" />
            </div>
            <div className="text-white/70">Collection personnelle</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-white/70">Accès rapide</div>
          </div>
        </motion.div>

        {/* Search */}
        {favoriteCards.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchBar
              onSearch={handleSearch}
              placeholder="Rechercher dans vos favoris..."
            />
          </motion.div>
        )}

        {/* Cards List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CardList
            cards={filteredCards}
            loading={loading}
            onCardClick={handleCardClick}
            emptyMessage="Aucune carte dans vos favoris. Explorez les cartes et ajoutez-les à vos favoris !"
          />
        </motion.div>

        {/* Empty State */}
        {!loading && favoriteCards.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 text-pink-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Aucun favori pour le moment
              </h3>
              <p className="text-white/70 mb-8">
                Explorez les cartes de la communauté et ajoutez celles qui vous inspirent à vos favoris en cliquant sur le cœur.
              </p>
              <motion.button
                onClick={() => navigate('/')}
                className="btn-primary mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorer les cartes
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Tips */}
        {favoriteCards.length > 0 && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                💡 Astuce
              </h3>
              <p className="text-white/70 text-center">
                Vos favoris sont synchronisés et accessibles à tout moment. 
                Utilisez-les comme source d'inspiration pour vos propres créations !
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <Heart className="w-4 h-4 text-pink-400/30 fill-pink-400/30" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
