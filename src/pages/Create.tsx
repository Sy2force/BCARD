import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import CardForm from '../components/CardForm';
import { cardsService } from '../services/cardsService';
import type { CreateCardData } from '../services/cardsService';
import toast from 'react-hot-toast';

const Create: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateCardData) => {
    try {
      await cardsService.createCard(data);
      toast.success('Carte créée avec succès !');
      navigate('/my-cards');
    } catch (error) {
      toast.error('Erreur lors de la création de la carte');
      throw error;
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Créer une nouvelle carte
            </h1>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Donnez vie à votre identité professionnelle avec une carte de visite numérique unique
          </p>
        </motion.div>

        {/* Form */}
        <CardForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* Tips Section */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              💡 Conseils pour une carte réussie
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Design cohérent</h4>
                <p className="text-white/70 text-sm">
                  Choisissez des couleurs qui reflètent votre personnalité ou votre marque
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Informations claires</h4>
                <p className="text-white/70 text-sm">
                  Soyez précis et concis dans vos descriptions et informations de contact
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                  <span className="text-2xl">📸</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Photo professionnelle</h4>
                <p className="text-white/70 text-sm">
                  Ajoutez une photo de profil de qualité pour personnaliser votre carte
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neon-blue/20 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Create;
