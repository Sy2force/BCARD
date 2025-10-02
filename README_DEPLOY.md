# 🚀 Guide de déploiement FaceWork

Ce guide vous explique comment déployer votre application FaceWork sur **Vercel** (frontend) et **Render** (backend).

## 📋 Prérequis

- Compte GitHub avec le projet pushé
- Compte [Vercel](https://vercel.com) (gratuit)
- Compte [Render](https://render.com) (gratuit)
- Compte [MongoDB Atlas](https://mongodb.com/cloud/atlas) (gratuit)

## 🗄️ Étape 1 : Configurer MongoDB Atlas

1. Créez un compte sur [MongoDB Atlas](https://mongodb.com/cloud/atlas)
2. Créez un nouveau cluster (M0 Sandbox - gratuit)
3. Configurez l'accès réseau : **Allow access from anywhere** (0.0.0.0/0)
4. Créez un utilisateur de base de données
5. Récupérez votre **Connection String** :
   ```
   mongodb+srv://username:password@cluster.mongodb.net/facework?retryWrites=true&w=majority
   ```

## 🖥️ Étape 2 : Déployer le Backend sur Render

### 2.1 Créer le service
1. Allez sur [Render](https://render.com)
2. Cliquez sur **New** → **Web Service**
3. Connectez votre repository GitHub
4. Configurez le service :
   - **Name** : `facework-backend`
   - **Root Directory** : `backend`
   - **Runtime** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm start`

### 2.2 Variables d'environnement
Ajoutez ces variables dans l'onglet **Environment** :

```bash
NODE_ENV=production
PORT=5001
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/facework?retryWrites=true&w=majority
JWT_SECRET=votre_cle_secrete_jwt_32_caracteres_minimum
FRONTEND_URL=https://facework.vercel.app
```

### 2.3 Générer la clé JWT
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.4 Déployer
1. Cliquez sur **Create Web Service**
2. Attendez le déploiement (5-10 minutes)
3. Votre backend sera disponible sur : `https://facework-backend.onrender.com`
4. Testez l'API : `https://facework-backend.onrender.com/api/health`

## 🎨 Étape 3 : Déployer le Frontend sur Vercel

### 3.1 Importer le projet
1. Allez sur [Vercel](https://vercel.com)
2. Cliquez sur **New Project**
3. Importez votre repository GitHub
4. Configurez le projet :
   - **Framework Preset** : `Vite`
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

### 3.2 Variables d'environnement
Dans l'onglet **Environment Variables**, ajoutez :

```bash
VITE_API_URL=https://facework-backend.onrender.com/api
VITE_APP_NAME=FaceWork
VITE_APP_VERSION=1.0.0
```

### 3.3 Déployer
1. Cliquez sur **Deploy**
2. Attendez le build (2-5 minutes)
3. Votre frontend sera disponible sur : `https://facework.vercel.app`

## 🔄 Étape 4 : Mettre à jour les URLs croisées

### 4.1 Mettre à jour le backend
Dans Render, mettez à jour la variable :
```bash
FRONTEND_URL=https://votre-app.vercel.app
```

### 4.2 Redéployer
Les deux services se redéploieront automatiquement.

## 🌱 Étape 5 : Initialiser les données

### 5.1 Seed via l'API (recommandé)
Créez un script temporaire ou utilisez Postman :

```bash
curl -X POST https://facework-backend.onrender.com/api/seed
```

### 5.2 Seed manuel
Connectez-vous à votre cluster MongoDB Atlas et importez les données depuis :
- `backend/src/seed/data/users.json`
- `backend/src/seed/data/cards.json`

## ✅ Étape 6 : Tester l'application

### URLs finales
- **Frontend** : https://facework.vercel.app
- **Backend** : https://facework-backend.onrender.com
- **API** : https://facework-backend.onrender.com/api
- **Documentation** : https://facework-backend.onrender.com/api-docs

### Comptes de test
- **Admin** : admin@example.com / Admin@1234
- **Business** : biz@example.com / Biz@1234
- **User** : user@example.com / User@1234

## 🔧 Dépannage

### Backend ne démarre pas
- Vérifiez les logs dans Render
- Vérifiez que `MONGODB_URI_PROD` est correct
- Vérifiez que `JWT_SECRET` fait au moins 32 caractères

### Frontend ne se connecte pas au backend
- Vérifiez que `VITE_API_URL` pointe vers votre backend Render
- Vérifiez les CORS dans les logs backend
- Testez l'API directement : `/api/health`

### Erreurs CORS
- Vérifiez que `FRONTEND_URL` dans le backend correspond à votre URL Vercel
- Redéployez le backend après modification

### Base de données vide
- Exécutez le seed via l'API ou importez manuellement
- Vérifiez la connexion MongoDB dans les logs

## 🔄 Redéploiement

### Automatique
- Push sur la branche `main` → redéploiement automatique sur Vercel et Render

### Manuel
- **Vercel** : Onglet Deployments → Redeploy
- **Render** : Onglet Manual Deploy → Deploy latest commit

## 📊 Monitoring

### Render
- Logs en temps réel dans l'onglet Logs
- Métriques dans l'onglet Metrics

### Vercel
- Analytics dans l'onglet Analytics
- Logs de build dans l'onglet Functions

---

🎉 **Félicitations !** Votre application FaceWork est maintenant déployée et accessible au monde entier !
