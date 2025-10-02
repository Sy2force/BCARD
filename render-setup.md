# 🔧 Configuration Render pour FaceWork Backend

Guide détaillé pour déployer le backend FaceWork sur Render.

## 📋 Configuration du service

### Paramètres de base
- **Service Type** : Web Service
- **Name** : `facework-backend`
- **Repository** : Votre repo GitHub
- **Branch** : `main`
- **Root Directory** : `backend`
- **Runtime** : Node
- **Region** : Oregon (ou plus proche de vos utilisateurs)

### Commandes de build et démarrage
```bash
# Build Command
npm install && npm run build

# Start Command  
npm start
```

## 🔐 Variables d'environnement

Ajoutez ces variables dans l'onglet **Environment** :

```bash
NODE_ENV=production
PORT=5001
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/facework?retryWrites=true&w=majority
JWT_SECRET=votre_cle_secrete_jwt_32_caracteres_minimum
FRONTEND_URL=https://facework.vercel.app
```

### Générer JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🗄️ Configuration MongoDB Atlas

1. **Cluster** : M0 Sandbox (gratuit)
2. **Network Access** : 0.0.0.0/0 (Allow access from anywhere)
3. **Database User** : Créer un utilisateur avec lecture/écriture
4. **Connection String** : Récupérer depuis "Connect your application"

## 🔍 Health Check

Render utilisera automatiquement `/api/health` pour vérifier l'état du service.

## 📊 Monitoring

### Logs
- Accès en temps réel dans l'onglet **Logs**
- Filtrage par niveau (info, error, warn)

### Métriques
- CPU et mémoire dans l'onglet **Metrics**
- Temps de réponse et requêtes/seconde

## 🚨 Dépannage

### Service ne démarre pas
1. Vérifiez les logs de build
2. Vérifiez que `package.json` contient le script `start`
3. Vérifiez que TypeScript compile sans erreurs

### Erreurs de connexion MongoDB
1. Vérifiez `MONGODB_URI_PROD` dans les variables
2. Vérifiez les whitelist IP dans MongoDB Atlas
3. Testez la connexion depuis les logs

### Erreurs CORS
1. Vérifiez `FRONTEND_URL` correspond à votre domaine Vercel
2. Redéployez après modification des variables

## 🔄 Redéploiement

### Automatique
- Push sur `main` → redéploiement automatique

### Manuel
- Onglet **Manual Deploy** → **Deploy latest commit**

## 📈 Optimisations

### Performance
- Render utilise des conteneurs avec 512MB RAM par défaut
- Upgrade possible vers des plans payants pour plus de ressources

### Sécurité
- HTTPS automatique avec certificats SSL
- Variables d'environnement chiffrées
- Isolation des conteneurs

---

✅ **Service configuré !** Votre backend sera accessible sur `https://facework-backend.onrender.com`
