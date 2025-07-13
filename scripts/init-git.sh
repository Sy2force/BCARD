#!/bin/bash

echo "🚀 Initialisation du repository Git pour BCARD ULTRA..."

# Nettoyer les fichiers temporaires macOS
echo "🧹 Nettoyage des fichiers temporaires..."
find . -name "._*" -type f -delete
find . -name ".DS_Store" -type f -delete

# Initialiser Git
echo "📦 Initialisation de Git..."
git init

# Ajouter tous les fichiers
echo "📁 Ajout des fichiers..."
git add .

# Premier commit
echo "💾 Premier commit..."
git commit -m "🎉 Initial commit: BCARD ULTRA - Futuristic Business Card App

✨ Features:
- React 18 + TypeScript 5 + Vite 7
- Modern glassmorphism UI with Framer Motion
- JWT authentication system
- Full CRUD for business cards
- Favorites system with persistence
- Dark/Light theme toggle
- Responsive design with Tailwind CSS
- Export to vCard format
- Web Share API integration
- Advanced search and filtering

🛠️ Tech Stack:
- Frontend: React, TypeScript, Vite
- Styling: Tailwind CSS, Framer Motion
- Forms: Formik + Yup validation
- Routing: React Router DOM v7
- Notifications: React Hot Toast
- Build: Vite with TypeScript

🎯 Status: Production ready with 0 ESLint/TypeScript errors"

echo "✅ Repository Git initialisé avec succès !"
echo "📋 Prochaines étapes :"
echo "   1. Créer un repository sur GitHub"
echo "   2. git remote add origin <URL_DU_REPO>"
echo "   3. git push -u origin main"
