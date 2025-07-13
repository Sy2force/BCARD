import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit } from 'lucide-react';
import CardForm from '../components/CardForm';
import { cardsService } from '../services/cardsService';
import type { BusinessCard, CreateCardData } from '../services/cardsService';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const EditCard: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) {
        navigate('/my-cards');
        return;
      }

      try {
        const cardData = await cardsService.getCard(id);
        setCard(cardData);
      } catch (error) {
        console.error('Error fetching card:', error);
        toast.error('Carte non trouvée');
        navigate('/my-cards');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id, navigate]);

  const handleSubmit = async (data: CreateCardData) => {
    if (!id) return;

    try {
      await cardsService.updateCard(id, data);
      toast.success('Carte mise à jour avec succès !');
      navigate('/my-cards');
    } catch (error) {
      console.error('Error updating card:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Carte non trouvée</h2>
          <button
            onClick={() => navigate('/my-cards')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Retour à mes cartes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"
            >
              <Edit className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Modifier la Carte
            </h1>
            <p className="text-gray-300 text-lg">
              Mettez à jour les informations de votre carte de visite
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8"
          >
            <CardForm
              initialData={card}
              onSubmit={handleSubmit}
              submitText="Mettre à jour"
              onCancel={() => navigate('/my-cards')}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditCard;
