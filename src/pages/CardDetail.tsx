import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Building, 
  User,
  Share2,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import { cardsService } from '../services/cardsService';
import type { BusinessCard } from '../services/cardsService';
import { useAuth } from '../hooks/contextHooks';
import FavoriteButton from '../components/FavoriteButton';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadCard = useCallback(async (cardId: string) => {
    try {
      setLoading(true);
      const cardData = await cardsService.getCardById(cardId);
      setCard(cardData);
    } catch {
      toast.error('Carte non trouvée');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      loadCard(id);
    }
  }, [id, loadCard]);

  const handleEdit = () => {
    if (card) {
      navigate(`/edit/${card.id}`);
    }
  };

  const handleDelete = async () => {
    if (!card) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      try {
        await cardsService.deleteCard(card.id);
        toast.success('Carte supprimée avec succès');
        navigate('/my-cards');
      } catch {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleShare = async () => {
    if (!card) return;
    
    try {
      await navigator.share({
        title: card.title,
        text: `Découvrez la carte de ${card.name}`,
        url: window.location.href,
      });
    } catch {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  const handleDownload = () => {
    if (!card) return;
    
    // Create a simple vCard format
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
ORG:${card.company}
TITLE:${card.position}
EMAIL:${card.email}
TEL:${card.phone}
URL:${card.website || ''}
ADR:${card.address || ''}
NOTE:${card.description}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Carte téléchargée');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Chargement de la carte..." />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Carte non trouvée</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === card.userId;

  return (
    <div className="min-h-screen py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-10"
          style={{ backgroundColor: card.backgroundColor }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="flex items-center space-x-3">
            <FavoriteButton cardId={card.id} />
            <motion.button
              onClick={handleShare}
              className="p-3 glass rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-5 h-5 text-white/80" />
            </motion.button>
            <motion.button
              onClick={handleDownload}
              className="p-3 glass rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-5 h-5 text-white/80" />
            </motion.button>
            {isOwner && (
              <>
                <motion.button
                  onClick={handleEdit}
                  className="p-3 glass rounded-full hover:bg-blue-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-5 h-5 text-blue-400" />
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  className="p-3 glass rounded-full hover:bg-red-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </motion.button>
              </>
            )}
          </div>
        </motion.div>

        {/* Card Display */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Card Preview */}
          <div className="space-y-6">
            <motion.div
              className="relative p-8 rounded-3xl border border-white/20 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${card.backgroundColor}20, ${card.backgroundColor}10)`,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Content */}
              <div className="relative z-10">
                <div className="flex items-center space-x-6 mb-6">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                    />
                  ) : (
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white/20"
                      style={{ backgroundColor: card.backgroundColor }}
                    >
                      {card.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{card.name}</h2>
                    <p className="text-white/80 text-lg">{card.position}</p>
                    <p className="text-neon-blue font-medium">{card.company}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                    <p className="text-neon-blue font-medium mb-3">{card.subtitle}</p>
                    <p className="text-white/80 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white" />
                <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border border-white" />
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <motion.a
                href={`mailto:${card.email}`}
                className="flex items-center justify-center space-x-2 p-4 glass rounded-xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 text-neon-blue" />
                <span className="text-white font-medium">Email</span>
              </motion.a>
              <motion.a
                href={`tel:${card.phone}`}
                className="flex items-center justify-center space-x-2 p-4 glass rounded-xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 text-neon-purple" />
                <span className="text-white font-medium">Appeler</span>
              </motion.a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Informations de contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Nom</p>
                    <p className="text-white font-medium">{card.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-medium">{card.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Téléphone</p>
                    <p className="text-white font-medium">{card.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Entreprise</p>
                    <p className="text-white font-medium">{card.company}</p>
                  </div>
                </div>

                {card.website && (
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Site web</p>
                      <a 
                        href={card.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neon-blue hover:text-neon-purple transition-colors font-medium"
                      >
                        {card.website}
                      </a>
                    </div>
                  </div>
                )}

                {card.address && (
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Adresse</p>
                      <p className="text-white font-medium">{card.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Informations supplémentaires</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Créée le</span>
                  <span className="text-white">{new Date(card.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Mise à jour</span>
                  <span className="text-white">{new Date(card.updatedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Statut</span>
                  <span className="text-green-400">Publique</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{ 
              backgroundColor: card.backgroundColor,
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDetail;
