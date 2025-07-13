import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, CreditCard } from 'lucide-react';
import { cardsService } from '../services/cardsService';
import type { BusinessCard, CreateCardData } from '../services/cardsService';
import { useAuth } from '../hooks/contextHooks';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import CardForm from '../components/CardForm';
import toast from 'react-hot-toast';

const MyCards: React.FC = () => {
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<BusinessCard | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const allCards = await cardsService.getAllCards();
      // Filter cards by current user (in a real app, this would be done server-side)
      const myCards = allCards.filter(card => card.userId === user?.id);
      setCards(myCards);
      setFilteredCards(myCards);
    } catch {
      toast.error('Erreur lors du chargement de vos cartes');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadMyCards();
  }, [loadMyCards]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredCards(cards);
      return;
    }

    try {
      const results = await cardsService.searchCards(query);
      // Filter results to show only user's cards
      const myResults = results.filter(card => card.userId === user?.id);
      setFilteredCards(myResults);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  const handleEdit = (card: BusinessCard) => {
    setEditingCard(card);
  };

  const handleDelete = async (cardId: string) => {
    try {
      await cardsService.deleteCard(cardId);
      toast.success('Carte supprimée avec succès');
      loadMyCards();
      setShowDeleteModal(null);
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleUpdateCard = async (data: CreateCardData) => {
    if (!editingCard) return;

    try {
      await cardsService.updateCard(editingCard.id, data);
      toast.success('Carte mise à jour avec succès');
      setEditingCard(null);
      loadMyCards();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
      throw error;
    }
  };

  const handleCardClick = (card: BusinessCard) => {
    navigate(`/card/${card.id}`);
  };

  if (editingCard) {
    return (
      <CardForm
        initialData={editingCard}
        onSubmit={handleUpdateCard}
        onCancel={() => setEditingCard(null)}
      />
    );
  }

  return (
    <div className="min-h-screen py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Mes Cartes
              </h1>
              <p className="text-white/70">
                Gérez vos cartes de visite numériques
              </p>
            </div>
          </div>

          <Link to="/create">
            <motion.button
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              <span>Nouvelle carte</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{cards.length}</div>
            <div className="text-white/70">Cartes créées</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-neon-blue mb-2">∞</div>
            <div className="text-white/70">Vues totales</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-neon-purple mb-2">★</div>
            <div className="text-white/70">Favoris reçus</div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchBar
            onSearch={handleSearch}
            placeholder="Rechercher dans vos cartes..."
          />
        </motion.div>

        {/* Cards List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CardList
            cards={filteredCards}
            loading={loading}
            onEdit={handleEdit}
            onDelete={(cardId) => setShowDeleteModal(cardId)}
            onCardClick={handleCardClick}
            emptyMessage="Vous n'avez pas encore créé de carte. Commencez dès maintenant !"
          />
        </motion.div>

        {/* Empty State */}
        {!loading && cards.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
                <CreditCard className="w-12 h-12 text-white/50" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Créez votre première carte
              </h3>
              <p className="text-white/70 mb-8">
                Commencez à construire votre présence numérique avec une carte de visite moderne et interactive.
              </p>
              <Link to="/create">
                <motion.button
                  className="btn-primary flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Créer ma première carte</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass rounded-2xl p-6 max-w-md w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Supprimer la carte
                </h3>
                <p className="text-white/70 mb-6">
                  Êtes-vous sûr de vouloir supprimer cette carte ? Cette action est irréversible.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(null)}
                    className="flex-1 px-4 py-2 glass rounded-xl text-white/80 hover:text-white transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleDelete(showDeleteModal)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-neon-purple/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCards;
