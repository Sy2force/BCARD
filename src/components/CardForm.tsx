import React from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Save, X, Palette } from 'lucide-react';
import type { CreateCardData, BusinessCard } from '../services/cardsService';

interface CardFormProps {
  initialData?: BusinessCard;
  onSubmit: (data: CreateCardData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitText?: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Le titre est requis').min(2, 'Minimum 2 caractères'),
  subtitle: Yup.string().required('Le sous-titre est requis').min(2, 'Minimum 2 caractères'),
  description: Yup.string().required('La description est requise').min(10, 'Minimum 10 caractères'),
  name: Yup.string().required('Le nom est requis').min(2, 'Minimum 2 caractères'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  phone: Yup.string().required('Le téléphone est requis').min(10, 'Minimum 10 caractères'),
  company: Yup.string().required('L\'entreprise est requise').min(2, 'Minimum 2 caractères'),
  position: Yup.string().required('Le poste est requis').min(2, 'Minimum 2 caractères'),
  website: Yup.string().url('URL invalide'),
  address: Yup.string(),
  image: Yup.string().url('URL invalide'),
  backgroundColor: Yup.string().required('La couleur de fond est requise'),
  textColor: Yup.string().required('La couleur du texte est requise'),
});

const colorPresets = [
  { bg: '#667eea', text: '#ffffff', name: 'Bleu Dégradé' },
  { bg: '#764ba2', text: '#ffffff', name: 'Violet Dégradé' },
  { bg: '#f093fb', text: '#ffffff', name: 'Rose Dégradé' },
  { bg: '#4facfe', text: '#ffffff', name: 'Bleu Ciel' },
  { bg: '#43e97b', text: '#ffffff', name: 'Vert Menthe' },
  { bg: '#fa709a', text: '#ffffff', name: 'Rose Corail' },
  { bg: '#ffecd2', text: '#333333', name: 'Crème' },
  { bg: '#a8edea', text: '#333333', name: 'Turquoise' },
];

const CardForm: React.FC<CardFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitText = 'Créer la carte',
}) => {
  const initialValues: CreateCardData = {
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || '',
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    company: initialData?.company || '',
    position: initialData?.position || '',
    address: initialData?.address || '',
    image: initialData?.image || '',
    backgroundColor: initialData?.backgroundColor || '#667eea',
    textColor: initialData?.textColor || '#ffffff',
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            {initialData ? 'Modifier la carte' : 'Créer une nouvelle carte'}
          </h2>
          <motion.button
            onClick={onCancel}
            className="p-2 rounded-full glass hover:bg-red-500/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-white/80 hover:text-red-400" />
          </motion.button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form Fields */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <span>Informations de base</span>
                    </h3>
                    
                    <div>
                      <Field
                        name="title"
                        type="text"
                        placeholder="Titre de la carte"
                        className="form-input"
                      />
                      <ErrorMessage name="title" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        name="subtitle"
                        type="text"
                        placeholder="Sous-titre"
                        className="form-input"
                      />
                      <ErrorMessage name="subtitle" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Description"
                        rows={3}
                        className="form-input resize-none"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Informations personnelles</h3>
                    
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
                        placeholder="Email"
                        className="form-input"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        name="phone"
                        type="tel"
                        placeholder="Téléphone"
                        className="form-input"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Informations professionnelles</h3>
                    
                    <div>
                      <Field
                        name="company"
                        type="text"
                        placeholder="Entreprise"
                        className="form-input"
                      />
                      <ErrorMessage name="company" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        name="position"
                        type="text"
                        placeholder="Poste"
                        className="form-input"
                      />
                      <ErrorMessage name="position" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        name="website"
                        type="url"
                        placeholder="Site web (optionnel)"
                        className="form-input"
                      />
                      <ErrorMessage name="website" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        name="address"
                        type="text"
                        placeholder="Adresse (optionnel)"
                        className="form-input"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-400 text-sm mt-1" />
                    </div>

                    <div>
                      <Field
                        name="image"
                        type="url"
                        placeholder="URL de l'image de profil (optionnel)"
                        className="form-input"
                      />
                      <ErrorMessage name="image" component="div" className="text-red-400 text-sm mt-1" />
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview & Colors */}
                <div className="space-y-6">
                  {/* Color Picker */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <Palette className="w-5 h-5" />
                      <span>Couleurs</span>
                    </h3>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {colorPresets.map((preset, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => {
                            setFieldValue('backgroundColor', preset.bg);
                            setFieldValue('textColor', preset.text);
                          }}
                          className={`aspect-square rounded-xl border-2 transition-all duration-300 ${
                            values.backgroundColor === preset.bg
                              ? 'border-neon-blue shadow-lg shadow-neon-blue/30'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                          style={{ backgroundColor: preset.bg }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Couleur de fond
                        </label>
                        <Field
                          name="backgroundColor"
                          type="color"
                          className="w-full h-12 rounded-xl border border-white/20 bg-transparent cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Couleur du texte
                        </label>
                        <Field
                          name="textColor"
                          type="color"
                          className="w-full h-12 rounded-xl border border-white/20 bg-transparent cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Aperçu</h3>
                    <motion.div
                      className="p-6 rounded-2xl border border-white/20 min-h-[300px]"
                      style={{
                        background: `linear-gradient(135deg, ${values.backgroundColor}20, ${values.backgroundColor}10)`,
                      }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          {values.image ? (
                            <img
                              src={values.image}
                              alt="Preview"
                              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-xl">
                              {values.name.charAt(0).toUpperCase() || '?'}
                            </div>
                          )}
                          <div>
                            <h4 className="text-lg font-bold text-white">
                              {values.name || 'Nom'}
                            </h4>
                            <p className="text-white/80 text-sm">
                              {values.position || 'Poste'}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-md font-semibold text-white">
                            {values.title || 'Titre'}
                          </h5>
                          <p className="text-neon-blue font-medium text-sm">
                            {values.subtitle || 'Sous-titre'}
                          </p>
                        </div>

                        <p className="text-white/80 text-sm">
                          {values.description || 'Description'}
                        </p>

                        <div className="text-white/70 text-sm">
                          {values.company || 'Entreprise'}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
                <motion.button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3 glass rounded-xl text-white/80 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting || isLoading ? 'Enregistrement...' : submitText}</span>
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default CardForm;
