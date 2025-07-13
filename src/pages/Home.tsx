import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Users } from 'lucide-react';
import { cardsService } from '../services/cardsService';
import type { BusinessCard } from '../services/cardsService';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../hooks/contextHooks';

const Home: React.FC = () => {
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const data = await cardsService.getAllCards();
      setCards(data);
      setFilteredCards(data);
    } catch (error) {
      console.error('Erreur lors du chargement des cartes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredCards(cards);
      return;
    }

    try {
      const results = await cardsService.searchCards(query);
      setFilteredCards(results);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Design Futuriste',
      description: 'Interface ultra-moderne avec des effets glassmorphism et des animations fluides',
    },
    {
      icon: Zap,
      title: 'Performance Optimale',
      description: 'Application rapide et réactive avec des transitions seamless',
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Authentification JWT et protection des données utilisateur',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Partagez et gérez vos cartes de visite en équipe',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">BCARD ULTRA</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Créez des cartes de visite numériques époustouflantes avec une expérience utilisateur futuriste
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              {isAuthenticated ? (
                <Link to="/create">
                  <motion.button
                    className="btn-primary flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Créer ma carte</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              ) : (
                <Link to="/register">
                  <motion.button
                    className="btn-primary flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Commencer gratuitement</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              )}
              
              <Link to="/about">
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  En savoir plus
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-neon-blue/20 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pourquoi choisir BCARD ULTRA ?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Une expérience révolutionnaire pour créer et gérer vos cartes de visite numériques
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass rounded-2xl p-6 text-center card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Showcase Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Découvrez les cartes de la communauté
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Explorez les créations inspirantes de notre communauté
            </p>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Rechercher par nom, entreprise, titre..."
              />
            </div>
          </motion.div>

          <CardList
            cards={filteredCards}
            loading={loading}
            emptyMessage="Aucune carte trouvée. Soyez le premier à créer une carte !"
          />

          {!loading && filteredCards.length > 0 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isAuthenticated ? (
                <Link to="/create">
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Créer ma carte maintenant
                  </motion.button>
                </Link>
              ) : (
                <Link to="/register">
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Rejoindre la communauté
                  </motion.button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
