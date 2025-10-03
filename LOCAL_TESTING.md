# 🧪 Guide de Test Local - FaceWork

## 📋 Prérequis

- Node.js 18+ installé
- MongoDB installé localement OU Docker
- Git configuré

## 🚀 Installation et Configuration

### 1. Cloner le projet
```bash
git clone https://github.com/Sy2force/BCARD.git
cd PROCARDS
```

### 2. Configuration Backend
```bash
cd backend
cp .env.example .env
```

Éditer le fichier `.env` :
```env
# Serveur
PORT=5001
NODE_ENV=development

# Base de données
MONGODB_URI=mongodb://localhost:27017/facework
MONGODB_URI_PROD=mongodb+srv://...  # Pour production

# JWT
JWT_SECRET=votre_cle_secrete_ultra_longue_et_securisee_32_caracteres_minimum

# CORS
FRONTEND_URL=http://localhost:5173

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=votre_mot_de_passe
```

### 3. Configuration Frontend
```bash
cd ../frontend
cp .env.example .env.local
```

Éditer le fichier `.env.local` :
```env
# API Backend
VITE_API_URL=http://localhost:5001/api

# Métadonnées
VITE_APP_NAME=FaceWork
VITE_APP_VERSION=1.0.0
```

## 🔧 Installation des Dépendances

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## 🗄️ Base de Données

### Option 1: MongoDB Local
```bash
# Installer MongoDB
brew install mongodb/brew/mongodb-community

# Démarrer MongoDB
brew services start mongodb/brew/mongodb-community

# Vérifier que MongoDB fonctionne
mongosh --eval "db.adminCommand('ismaster')"
```

### Option 2: Docker MongoDB
```bash
# Démarrer MongoDB avec Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Vérifier
docker ps
```

### Option 3: Docker Compose (Recommandé)
```bash
# Démarrer tous les services
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

## 🧪 Tests et Validation

### 1. Tests Backend
```bash
cd backend

# Tests unitaires
npm test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch

# Linting
npm run lint

# Build TypeScript
npm run build
```

### 2. Tests Frontend
```bash
cd frontend

# Tests unitaires
npm test

# Tests avec UI
npm run test:ui

# Tests avec couverture
npm run test:coverage

# Vérification TypeScript
npm run type-check

# Linting
npm run lint

# Build production
npm run build
```

## 🚀 Démarrage des Services

### Méthode 1: Séparément
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Méthode 2: Docker Compose
```bash
# Démarrer tous les services
docker-compose up

# En arrière-plan
docker-compose up -d

# Arrêter
docker-compose down
```

## 🌱 Initialisation des Données

### Seed de la base de données
```bash
cd backend

# Développement (avec ts-node)
npm run seed

# Production (après build)
npm run seed:prod
```

Cela créera :
- 1 utilisateur admin (admin@facework.com / Admin123!)
- 1 utilisateur business (business@facework.com / Business123!)
- 1 utilisateur normal (user@facework.com / User123!)
- 3 cartes de visite d'exemple

## 🔍 Vérification du Fonctionnement

### Backend (http://localhost:5001)
- Health check: `GET /api/health`
- API docs: `GET /api-docs`
- Users: `GET /api/users`
- Cards: `GET /api/cards`

### Frontend (http://localhost:5173)
- Page d'accueil
- Inscription/Connexion
- Dashboard utilisateur
- Gestion des cartes

### Tests d'intégration
```bash
# Test de l'API
curl http://localhost:5001/api/health

# Test du frontend
curl http://localhost:5173
```

## 🐛 Dépannage

### Problèmes courants

**Port déjà utilisé :**
```bash
# Tuer le processus sur le port 5001
lsof -ti:5001 | xargs kill -9

# Tuer le processus sur le port 5173
lsof -ti:5173 | xargs kill -9
```

**MongoDB ne démarre pas :**
```bash
# Vérifier le statut
brew services list | grep mongodb

# Redémarrer
brew services restart mongodb/brew/mongodb-community
```

**Erreurs de dépendances :**
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

**Erreurs TypeScript :**
```bash
# Vérifier la configuration
npm run type-check

# Rebuild
npm run build
```

## 📊 Monitoring Local

### Logs Backend
```bash
# Logs en temps réel
tail -f backend/logs/app.log

# Logs d'erreur
tail -f backend/logs/error.log
```

### Performance
- Backend: Swagger UI sur `/api-docs`
- Frontend: React DevTools
- Base de données: MongoDB Compass

## 🔄 Workflow de Développement

1. **Démarrer les services** : `docker-compose up -d`
2. **Faire les modifications** dans `src/`
3. **Tester** : `npm test`
4. **Vérifier le linting** : `npm run lint`
5. **Build** : `npm run build`
6. **Commit** : `git add . && git commit -m "..."`
7. **Push** : `git push origin main`

## 🚀 Prêt pour Production

Avant de déployer :
```bash
# Backend
cd backend
npm run build
npm run test
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

Si tout fonctionne localement, le déploiement sur Render + Vercel devrait réussir !
