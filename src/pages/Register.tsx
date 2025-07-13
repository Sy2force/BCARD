import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/contextHooks';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom est requis').min(2, 'Minimum 2 caractères'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  password: Yup.string().required('Le mot de passe est requis').min(6, 'Minimum 6 caractères'),
  confirmPassword: Yup.string()
    .required('Confirmez votre mot de passe')
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),
});

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: { 
    name: string; 
    email: string; 
    password: string; 
    confirmPassword: string;
  }) => {
    try {
      await register(values.name, values.email, values.password);
      toast.success('Inscription réussie ! Bienvenue !');
      navigate('/');
    } catch {
      toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        className="relative max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
                <span className="text-white font-bold text-lg">BC</span>
              </div>
              <span className="text-2xl font-bold gradient-text">BCARD ULTRA</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Inscription</h2>
            <p className="text-white/70">Créez votre compte gratuitement</p>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ 
              name: '', 
              email: '', 
              password: '', 
              confirmPassword: '' 
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Nom complet"
                    className="form-input"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Adresse email"
                    className="form-input"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    className="form-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div className="relative">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmer le mot de passe"
                    className="form-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{isSubmitting ? 'Inscription...' : 'S\'inscrire'}</span>
                </motion.button>
              </Form>
            )}
          </Formik>

          {/* Features */}
          <div className="mt-6 p-4 glass rounded-xl">
            <h3 className="text-sm font-medium text-white mb-3">En vous inscrivant, vous obtenez :</h3>
            <ul className="space-y-1 text-xs text-white/70">
              <li>• Création illimitée de cartes de visite</li>
              <li>• Gestion de vos favoris</li>
              <li>• Interface futuriste et moderne</li>
              <li>• Synchronisation en temps réel</li>
            </ul>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-4">
            <p className="text-white/70">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-neon-purple hover:text-neon-blue transition-colors font-medium">
                Se connecter
              </Link>
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-neon-purple/20 rounded-full"
              style={{
                left: `${15 + i * 18}%`,
                top: `${25 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
