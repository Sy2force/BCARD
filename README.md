# BCARD ULTRA - Futuristic Business Card App

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.15.0-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

## Description

**BCARD ULTRA** est une application web révolutionnaire pour créer et gérer des cartes de visite numériques avec un design futuriste ultra-moderne. L'application combine les dernières technologies web avec une interface utilisateur exceptionnelle utilisant des effets glassmorphism, des animations fluides et une expérience utilisateur optimale.

## Fonctionnalités Principales

### Authentification & Sécurité
- **Système d'authentification JWT** complet
- **Inscription et connexion** sécurisées
- **Protection des routes** privées
- **Gestion des sessions** utilisateur
- **Comptes de démonstration** pour les tests

### Gestion des Cartes
- **Création de cartes** avec formulaire avancé
- **Édition en temps réel** avec aperçu instantané
- **Suppression sécurisée** avec confirmation
- **Recherche et filtrage** intelligent
- **Système de favoris** intégré
- **Export en format vCard** (.vcf)

### Design & UX
- **Interface futuriste** avec effets glassmorphism
- **Animations fluides** powered by Framer Motion
- **Thème sombre/clair** avec transition douce
- **Design responsive** pour tous les appareils
- **Notifications toast** élégantes
- **Effets visuels avancés** et particules animées

### Fonctionnalités Avancées
- **Partage de cartes** via Web Share API
- **Téléchargement de contacts** en vCard
- **Statistiques utilisateur** en temps réel
- **Navigation intuitive** avec breadcrumbs
- **États de chargement** animés
- **Gestion d'erreurs** robuste

## Technologies Utilisées

### Frontend Core
- **React 18.3.1** - Bibliothèque UI moderne
- **TypeScript 5.6.2** - Typage statique avancé
- **Vite 7.0.4** - Build tool ultra-rapide
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
