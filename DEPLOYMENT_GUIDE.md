# 🚀 Guide de Déploiement Production - FaceWork

## 📋 Vue d'Ensemble

**Stack de Déploiement :**
- **Frontend** : Vercel (React + Vite + TypeScript)
- **Backend** : Render (Node.js + Express + TypeScript + Docker)
- **Base de Données** : MongoDB Atlas (Cloud)
- **Domaine** : GitHub (Source de vérité)

## 🎯 Prérequis

- [x] Compte GitHub avec le repository
- [x] Compte Vercel connecté à GitHub
- [x] Compte Render connecté à GitHub  
- [x] Compte MongoDB Atlas
- [x] Variables d'environnement configurées

## 🗄️ Étape 1: Configuration MongoDB Atlas

### 1.1 Créer un Cluster
```bash
1. Aller sur https://cloud.mongodb.com
2. Créer un nouveau projet "FaceWork"
3. Créer un cluster (M0 Sandbox gratuit)
4. Choisir une région proche (Europe/US)
5. Nommer le cluster "facework-cluster"
```

### 1.2 Configuration Sécurité
```bash
1. Database Access → Add New Database User
   - Username: facework-admin
   - Password: [générer un mot de passe fort]
   - Role: Atlas Admin

2. Network Access → Add IP Address
   - 0.0.0.0/0 (Allow access from anywhere)
   - Ou spécifier les IPs de Render
```

### 1.3 Récupérer l'URI de Connexion
```bash
1. Clusters → Connect → Connect your application
2. Driver: Node.js, Version: 4.1 or later
3. Copier l'URI: mongodb+srv://facework-admin:<password>@facework-cluster.xxxxx.mongodb.net/facework?retryWrites=true&w=majority
```

## 🖥️ Étape 2: Déploiement Backend sur Render

### 2.1 Créer le Service Web
```bash
1. Aller sur https://render.com
2. New → Web Service
3. Connect Repository: Sy2force/BCARD
4. Configuration:
   - Name: facework-backend
   - Root Directory: backend
   - Environment: Node
   - Build Command: npm install && npm run build
   - Start Command: npm start
```

### 2.2 Variables d'Environnement Render
```env
NODE_ENV=production
PORT=5001
MONGODB_URI_PROD=mongodb+srv://facework-admin:PASSWORD@facework-cluster.xxxxx.mongodb.net/facework?retryWrites=true&w=majority
JWT_SECRET=production_jwt_secret_key_ultra_secure_32_characters_minimum_2024
FRONTEND_URL=https://facework.vercel.app
```

### 2.3 Configuration Avancée
```bash
- Health Check Path: /api/health
- Auto-Deploy: Yes (sur push main)
- Region: Oregon (ou plus proche)
```

## 🌐 Étape 3: Déploiement Frontend sur Vercel

### 3.1 Importer le Projet
```bash
1. Aller sur https://vercel.com
2. New Project → Import Git Repository
3. Sélectionner: Sy2force/BCARD
4. Configuration:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
```

### 3.2 Variables d'Environnement Vercel
```env
VITE_API_URL=https://facework-backend.onrender.com/api
VITE_APP_NAME=FaceWork
VITE_APP_VERSION=1.0.0
```

### 3.3 Configuration Domaine
```bash
1. Project Settings → Domains
2. Ajouter un domaine personnalisé (optionnel)
3. Ou utiliser: https://facework.vercel.app
```

## 🔄 Étape 4: Configuration CI/CD

### 4.1 Workflow Automatique
```bash
1. Push sur main → Déploiement automatique
2. Render rebuild backend
3. Vercel rebuild frontend
4. Tests automatiques avant déploiement
```

### 4.2 Branches de Déploiement
```bash
- main → Production (Render + Vercel)
- develop → Preview (Vercel uniquement)
- feature/* → Preview deployments
```

## 🧪 Étape 5: Tests de Validation

### 5.1 Backend Health Check
```bash
curl https://facework-backend.onrender.com/api/health

# Réponse attendue:
{
  "status": "OK",
  "timestamp": "2024-10-03T06:34:03.000Z",
  "version": "1.0.0",
  "environment": "production"
}
```

### 5.2 Frontend Accessibility
```bash
curl https://facework.vercel.app

# Vérifier que la page se charge
# Tester la connexion/inscription
# Vérifier les appels API
```

### 5.3 Tests d'Intégration
```bash
# Test complet du workflow
1. Inscription nouvel utilisateur
2. Connexion
3. Création d'une carte
4. Modification de profil
5. Déconnexion
```

## 🌱 Étape 6: Initialisation des Données

### 6.1 Seed de Production
```bash
# Via l'API ou directement en base
POST https://facework-backend.onrender.com/api/seed
# Ou exécuter le script seed en production
```

### 6.2 Données Initiales
- Utilisateur admin par défaut
- Cartes d'exemple
- Configuration système

## 📊 Étape 7: Monitoring et Logs

### 7.1 Render Monitoring
```bash
1. Dashboard Render → facework-backend
2. Logs en temps réel
3. Métriques de performance
4. Alertes automatiques
```

### 7.2 Vercel Analytics
```bash
1. Dashboard Vercel → facework
2. Web Analytics
3. Performance insights
4. Error tracking
```

### 7.3 MongoDB Monitoring
```bash
1. Atlas Dashboard → Monitoring
2. Performance Advisor
3. Real-time metrics
4. Alertes personnalisées
```

## 🔧 Dépannage Production

### Problèmes Backend (Render)
```bash
# Build fails
- Vérifier les dépendances dans package.json
- TypeScript doit être en dependencies
- Vérifier les variables d'environnement

# Runtime errors
- Consulter les logs Render
- Vérifier la connexion MongoDB
- Valider JWT_SECRET

# Performance issues
- Optimiser les requêtes MongoDB
- Ajouter des index
- Monitoring des ressources
```

### Problèmes Frontend (Vercel)
```bash
# Build fails
- Vérifier tsconfig.node.json
- Dépendances TypeScript à jour
- Variables d'environnement VITE_*

# Runtime errors
- Vérifier VITE_API_URL
- CORS configuration backend
- Network tab du navigateur

# Performance issues
- Bundle analyzer
- Code splitting
- Image optimization
```

### Problèmes Base de Données
```bash
# Connection issues
- Vérifier l'URI MongoDB
- Whitelist IP addresses
- Credentials valides

# Performance issues
- Index sur les requêtes fréquentes
- Optimiser les aggregations
- Monitoring des slow queries
```

## 🚀 Mise à Jour Production

### Workflow de Déploiement
```bash
1. Développement local
2. Tests unitaires et d'intégration
3. Push sur branch feature
4. Review + merge vers main
5. Déploiement automatique
6. Tests de validation production
7. Monitoring post-déploiement
```

### Rollback en Cas de Problème
```bash
# Render
1. Dashboard → Deployments
2. Sélectionner version précédente
3. Redeploy

# Vercel
1. Dashboard → Deployments
2. Promote previous deployment
3. Instant rollback
```

## ✅ Checklist de Déploiement

### Avant le Déploiement
- [ ] Tests locaux passent
- [ ] Build production réussi
- [ ] Variables d'environnement configurées
- [ ] Base de données accessible
- [ ] Domaines configurés

### Après le Déploiement
- [ ] Health checks OK
- [ ] Frontend accessible
- [ ] API fonctionnelle
- [ ] Authentification fonctionne
- [ ] Base de données connectée
- [ ] Monitoring actif

## 🎯 URLs de Production

```bash
# Frontend
https://facework.vercel.app

# Backend API
https://facework-backend.onrender.com/api

# API Documentation
https://facework-backend.onrender.com/api-docs

# Health Check
https://facework-backend.onrender.com/api/health
```

## 📞 Support et Maintenance

### Contacts Techniques
- **Render Support** : https://render.com/docs
- **Vercel Support** : https://vercel.com/help
- **MongoDB Atlas** : https://docs.atlas.mongodb.com

### Maintenance Régulière
- Mise à jour des dépendances
- Monitoring des performances
- Backup de la base de données
- Renouvellement des certificats SSL
- Optimisation des coûts

Le déploiement est maintenant complet et production-ready ! 🎉
