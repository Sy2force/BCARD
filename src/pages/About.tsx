import React from 'react';
import { motion } from 'framer-motion';
import { 
  Info, 
  Zap, 
  Shield, 
  Users, 
  Sparkles, 
  Code, 
  Palette, 
  Rocket,
  Github,
  Heart
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Design Futuriste',
      description: 'Interface ultra-moderne avec des effets glassmorphism, neumorphism et des animations fluides powered by Framer Motion.',
    },
    {
      icon: Zap,
      title: 'Performance Optimale',
      description: 'Application construite avec React + TypeScript et Vite pour des performances exceptionnelles et un développement rapide.',
    },
    {
      icon: Shield,
      title: 'Sécurité Avancée',
      description: 'Authentification JWT sécurisée, protection des routes et gestion des données utilisateur avec les meilleures pratiques.',
    },
    {
      icon: Users,
      title: 'Expérience Utilisateur',
      description: 'Interface intuitive, responsive design, thème dark/light, notifications toast et interactions fluides.',
    },
    {
      icon: Code,
      title: 'Technologies Modernes',
      description: 'React 18, TypeScript, Tailwind CSS, Framer Motion, React Router, Formik, Yup et bien plus encore.',
    },
    {
      icon: Palette,
      title: 'Personnalisation',
      description: 'Créez des cartes uniques avec des couleurs personnalisées, des effets visuels et une identité visuelle forte.',
    },
  ];

  const technologies = [
    { name: 'React 18', color: 'from-blue-400 to-blue-600' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { name: 'Vite', color: 'from-purple-400 to-purple-600' },
    { name: 'Tailwind CSS', color: 'from-cyan-400 to-cyan-600' },
    { name: 'Framer Motion', color: 'from-pink-400 to-pink-600' },
    { name: 'React Router', color: 'from-red-400 to-red-600' },
    { name: 'Formik & Yup', color: 'from-green-400 to-green-600' },
    { name: 'React Hot Toast', color: 'from-orange-400 to-orange-600' },
  ];

  return (
    <div className="min-h-screen py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Info className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              À propos de BCARD ULTRA
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Une révolution dans la création de cartes de visite numériques, 
            alliant design futuriste, performance optimale et expérience utilisateur exceptionnelle.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Notre Mission</h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  BCARD ULTRA révolutionne la façon dont les professionnels créent et partagent 
                  leurs cartes de visite. Notre mission est de fournir une plateforme moderne, 
                  intuitive et puissante qui permet à chacun de créer une identité numérique 
                  unique et mémorable.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Nous croyons que chaque interaction professionnelle mérite d'être exceptionnelle, 
                  et c'est pourquoi nous avons créé une expérience utilisateur qui allie 
                  beauté visuelle et fonctionnalité avancée.
                </p>
              </div>
              <div className="relative">
                <motion.div
                  className="w-full h-64 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center"
                  animate={{ 
                    background: [
                      'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
                      'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))',
                      'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Rocket className="w-24 h-24 text-white/50" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fonctionnalités Avancées
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Découvrez les technologies et fonctionnalités qui font de BCARD ULTRA 
              une expérience unique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass rounded-2xl p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technologies */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stack Technologique
              </h2>
              <p className="text-white/70 text-lg">
                Construit avec les technologies les plus modernes et performantes
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`p-4 rounded-xl bg-gradient-to-br ${tech.color} text-white text-center font-semibold`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '100%', label: 'Open Source', icon: Github },
              { number: '∞', label: 'Cartes Créées', icon: Sparkles },
              { number: '24/7', label: 'Disponibilité', icon: Zap },
              { number: '💯', label: 'Satisfaction', icon: Heart },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-neon-blue" />
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à créer votre carte ?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez la révolution des cartes de visite numériques et créez 
              une identité professionnelle qui vous ressemble.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/register'}
              >
                <Rocket className="w-5 h-5" />
                <span>Commencer maintenant</span>
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
              >
                Voir les exemples
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-blue/20 rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
