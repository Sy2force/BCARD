# 🔧 Configuration des Variables d'Environnement - FaceWork

## 📋 Variables Backend (.env)

### 🖥️ Configuration Serveur
```env
# Port d'écoute du serveur Express
PORT=5001

# Environnement d'exécution
NODE_ENV=development  # development | production | test
```

### 🗄️ Base de Données MongoDB
```env
# MongoDB Local (Développement)
MONGODB_URI=mongodb://localhost:27017/facework

# MongoDB Atlas (Production)
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/facework?retryWrites=true&w=majority
```

### 🔐 Authentification JWT
```env
# Clé secrète pour signer les tokens JWT (minimum 32 caractères)
JWT_SECRET=votre_cle_secrete_ultra_longue_et_securisee_32_caracteres_minimum

# Durée de vie des tokens
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
```

### 🌐 CORS et Frontend
```env
# URL du frontend pour CORS
FRONTEND_URL=http://localhost:5173  # Local
# FRONTEND_URL=https://facework.vercel.app  # Production
```

### 📧 Configuration Email (Optionnel)
```env
# Configuration SMTP pour l'envoi d'emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=votre_mot_de_passe_app

# Expéditeur par défaut
FROM_EMAIL=noreply@facework.com
FROM_NAME=FaceWork Team
```

## 📋 Variables Frontend (.env.local)

### 🔗 API Backend
```env
# URL de l'API backend
VITE_API_URL=http://localhost:5001/api  # Local
# VITE_API_URL=https://facework-backend.onrender.com/api  # Production
```

### 📱 Métadonnées Application
```env
# Informations de l'application
VITE_APP_NAME=FaceWork
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Professional Network Cards Platform
```

### 🎨 Configuration UI (Optionnel)
```env
# Thème par défaut
VITE_DEFAULT_THEME=light  # light | dark | system

# Langue par défaut
VITE_DEFAULT_LANGUAGE=en  # en | fr | he
```

## 🚀 Configuration pour Render (Backend)

### Variables à configurer dans le Dashboard Render :

```env
NODE_ENV=production
PORT=5001
MONGODB_URI_PROD=mongodb+srv://...
JWT_SECRET=cle_secrete_production_32_caracteres_minimum
FRONTEND_URL=https://facework.vercel.app
```

### Variables optionnelles :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=mot_de_passe_app
FROM_EMAIL=noreply@facework.com
FROM_NAME=FaceWork
```

## 🚀 Configuration pour Vercel (Frontend)

### Variables à configurer dans le Dashboard Vercel :

```env
VITE_API_URL=https://facework-backend.onrender.com/api
VITE_APP_NAME=FaceWork
VITE_APP_VERSION=1.0.0
```

## 🔒 Sécurité des Variables

### ❌ Ne JAMAIS commiter :
- `.env` (backend)
- `.env.local` (frontend)
- `.env.production`
- Fichiers contenant des secrets

### ✅ Toujours commiter :
- `.env.example` (backend)
- `.env.example` (frontend)
- Fichiers de configuration sans secrets

### 🛡️ Bonnes Pratiques :

1. **JWT_SECRET** : Minimum 32 caractères, aléatoire
2. **Mots de passe** : Jamais en plain text
3. **URLs** : Toujours avec protocole (http/https)
4. **Ports** : Cohérents entre services
5. **Environnements** : Séparés (dev/prod)

## 🧪 Variables pour Tests

### Backend Tests (.env.test)
```env
NODE_ENV=test
JWT_SECRET=test_jwt_secret_key_for_testing_only_32_chars
MONGODB_URI=mongodb://localhost:27017/facework_test
```

### Frontend Tests
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=FaceWork Test
```

## 🔄 Validation des Variables

### Script de validation backend :
```javascript
// src/config/validateEnv.ts
const requiredVars = [
  'PORT',
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'FRONTEND_URL'
];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

### Script de validation frontend :
```javascript
// src/config/validateEnv.ts
const requiredVars = [
  'VITE_API_URL',
  'VITE_APP_NAME'
];

requiredVars.forEach(varName => {
  if (!import.meta.env[varName]) {
    console.warn(`Missing environment variable: ${varName}`);
  }
});
```

## 🐛 Dépannage Variables

### Problèmes courants :

**Variables non chargées :**
```bash
# Vérifier le fichier .env
cat .env

# Redémarrer le serveur
npm run dev
```

**CORS errors :**
```bash
# Vérifier FRONTEND_URL dans backend/.env
echo $FRONTEND_URL
```

**JWT errors :**
```bash
# Vérifier JWT_SECRET (doit être défini)
node -e "console.log(process.env.JWT_SECRET ? 'OK' : 'MISSING')"
```

**MongoDB connection :**
```bash
# Tester la connexion
mongosh "mongodb://localhost:27017/facework"
```

## 📝 Templates Prêts à l'Emploi

### Backend .env (Développement)
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/facework
JWT_SECRET=dev_secret_key_32_characters_minimum_for_development_only
FRONTEND_URL=http://localhost:5173
```

### Frontend .env.local (Développement)
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=FaceWork
VITE_APP_VERSION=1.0.0
```

### Production (Render + Vercel)
Utiliser les dashboards respectifs pour configurer les variables avec les valeurs de production sécurisées.
