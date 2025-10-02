# FaceWork - Plateforme de cartes de visite numériques

Bonjour ! FaceWork est une application web que j'ai développée pour moderniser l'échange de cartes de visite professionnelles. Plus besoin de cartes papier qui traînent dans les tiroirs - tout se passe maintenant en ligne, de manière sécurisée et pratique.

## Le projet en quelques mots

FaceWork permet aux professionnels de :
- Créer des cartes de visite numériques avec toutes leurs informations
- Les partager via un simple lien ou QR code
- Gérer plusieurs cartes pour différentes activités
- Exporter en PDF ou vCard pour l'ajout aux contacts

L'application est découpée en deux parties : un frontend React moderne et un backend Node.js robuste. Le tout est prêt à être déployé sur Vercel (frontend) et Render (backend).

---

## Ce que peut faire l'application

### Pour les utilisateurs standards
- Créer un compte et se connecter de manière sécurisée
- Consulter les cartes de visite publiques
- Ajouter des cartes en favoris pour les retrouver facilement
- Basculer entre mode clair et sombre selon les préférences

### Pour les comptes Business
- Tout ce que peut faire un utilisateur standard
- Créer ses propres cartes de visite professionnelles
- Modifier ou supprimer ses cartes à tout moment
- Générer un QR code automatiquement pour chaque carte
- Voir les statistiques de consultation

### Pour l'administrateur
- Accès complet à toutes les fonctionnalités
- Tableau de bord avec statistiques globales
- Gestion des utilisateurs et des cartes
- Monitoring de l'activité de la plateforme

### Petits plus sympathiques
- Interface disponible en 3 langues (Anglais, Français, Hébreu)
- Application installable sur mobile (PWA)
- Thème sombre pour les yeux sensibles
- Export des cartes en PDF ou format vCard

---

## Technologies utilisées

### Côté Frontend
- **React 18** avec TypeScript pour une application robuste
- **Vite** comme bundler, super rapide pour le développement
- **Tailwind CSS** pour le style (plus besoin d'écrire du CSS classique)
- **Framer Motion** pour des animations fluides
- **i18next** pour gérer les traductions
- **Axios** pour communiquer avec le backend
- **React Router** pour la navigation

### Côté Backend
- **Node.js** avec Express pour le serveur
- **MongoDB** avec Mongoose pour la base de données
- **TypeScript** partout pour éviter les bugs
- **JWT** pour l'authentification sécurisée
- **Joi** pour valider les données reçues
- **bcryptjs** pour hasher les mots de passe
- **Swagger** pour documenter l'API

### Tests et qualité
- **Jest** pour les tests backend
- **Vitest** pour les tests frontend
- **ESLint** pour un code propre
- **Prettier** pour le formatage

## Comment faire marcher tout ça

### Ce dont vous avez besoin

- Node.js version 18 ou plus (pour faire tourner le code)
- MongoDB installé localement ou un compte MongoDB Atlas (gratuit)
- Git pour récupérer le code

### Installation pas à pas

1. **Récupérer le projet**
```bash
git clone https://github.com/Sy2force/BCARD.git
cd PROCARDS
```

2. **Installer les dépendances**
```bash
# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd ../frontend
npm install
cp .env.example .env
```

3. **Configurer la base de données**

Si vous avez MongoDB en local, rien à faire. Sinon, créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) et récupérez votre URL de connexion.

4. **Modifier les fichiers .env**

Dans `backend/.env` :
- Remplacez `JWT_SECRET` par une vraie clé secrète (32 caractères minimum)
- Si vous utilisez MongoDB Atlas, remplacez `MONGODB_URI`

Dans `frontend/.env` :
- Normalement rien à changer pour le développement local

5. **Ajouter des données de test**
```bash
cd backend
npm run seed
```

Cela crée 3 utilisateurs de test :
- Admin : admin@example.com / Admin@1234
- Business : biz@example.com / Biz@1234
- User : user@example.com / User@1234

6. **Lancer l'application**

Ouvrez deux terminaux :

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Le serveur démarre sur http://localhost:5001

# Terminal 2 - Frontend
cd frontend
npm run dev
# L'application est sur http://localhost:5173
```

Et voilà ! Ouvrez votre navigateur sur http://localhost:5173 et connectez-vous avec un des comptes de test.

---

## Avec Docker (plus simple)

Si vous préférez, Docker s'occupe de tout installer pour vous :

```bash
# Démarrer tous les services
docker-compose up --build

# Arrêter proprement
docker-compose down
```

L'application se lance sur les mêmes ports (5173 pour le frontend, 5001 pour le backend).

## Documentation de l'API

Les routes principales de l'API :

### Utilisateurs (`/api/users`)
- `POST /` - Créer un compte
- `POST /login` - Se connecter
- `GET /profile` - Récupérer son profil
- `PUT /:id` - Modifier un profil
- `DELETE /:id` - Supprimer un compte

### Cartes (`/api/cards`)
- `GET /` - Liste des cartes publiques
- `POST /` - Créer une carte (Business/Admin)
- `GET /my-cards` - Mes cartes
- `PUT /:id` - Modifier une carte
- `PATCH /:id/like` - Liker/unliker
- `GET /:id/export?format=pdf` - Exporter en PDF
- `DELETE /:id` - Supprimer une carte

### Documentation interactive

Une fois le backend lancé, allez sur http://localhost:5001/api-docs pour voir la documentation Swagger interactive.

## Lancer les tests

Pour vérifier que tout fonctionne :

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend
npm test
```

## Déployer en production

### Backend sur Render

1. Créez un compte sur [Render](https://render.com)
2. Nouveau Web Service > Connecter votre repo GitHub
3. Configuration :
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Root Directory: `backend`
4. Variables d'environnement à ajouter :
   - `MONGODB_URI_PROD` : votre URL MongoDB Atlas
   - `JWT_SECRET` : une clé secrète forte
   - `FRONTEND_URL` : https://votre-app.vercel.app
   - `NODE_ENV` : production

### Frontend sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Import Git Repository > Sélectionnez votre repo
3. Configuration :
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
4. Variables d'environnement :
   - `VITE_API_URL` : https://votre-backend.onrender.com/api

### URLs de production

Une fois déployé, votre application sera accessible :
- Frontend : `https://facework.vercel.app` (ou votre nom personnalisé)
- Backend : `https://facework-backend.onrender.com`
- API : `https://facework-backend.onrender.com/api`

## Sécurité mise en place

J'ai pris soin de sécuriser l'application :
- Mots de passe hashés avec bcrypt (impossible de les récupérer en clair)
- Tokens JWT pour l'authentification (expire après 7 jours)
- Validation de toutes les données avec Joi
- Protection contre les attaques par force brute (rate limiting)
- Headers sécurisés avec Helmet
- CORS configuré pour accepter seulement les domaines autorisés

## Structure des fichiers

```
FaceWork/
├── backend/
│   ├── src/           # Code source TypeScript
│   ├── tests/         # Tests Jest
│   ├── .env.example   # Template variables d'environnement
│   └── package.json   # Dépendances et scripts
├── frontend/
│   ├── src/           # Code React/TypeScript
│   ├── public/        # Fichiers statiques
│   ├── .env.example   # Template variables
│   └── vercel.json    # Config Vercel
├── docker-compose.yml # Config Docker local
└── README.md         # Ce fichier
```

## Commandes utiles

```bash
# Backend
npm run dev         # Mode développement avec hot-reload
npm run build       # Compiler TypeScript
npm run start       # Démarrer en production
npm run seed        # Ajouter données de test
npm run test        # Lancer les tests
npm run lint        # Vérifier le code

# Frontend
npm run dev         # Mode développement
npm run build       # Build pour production
npm run preview     # Prévisualiser le build
npm run test        # Tests Vitest
npm run lint        # Vérifier le code
```

## Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez que MongoDB est bien lancé
2. Vérifiez les fichiers .env (surtout JWT_SECRET et MONGODB_URI)
3. Vérifiez que les ports 5001 et 5173 sont libres
4. Consultez les logs dans la console

## Licence

Projet sous licence MIT - vous pouvez l'utiliser librement pour vos projets personnels ou commerciaux.

---

Développé avec passion pour moderniser l'échange de cartes de visite professionnelles.
