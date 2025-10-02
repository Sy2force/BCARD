# FaceWork - Plateforme de cartes de visite professionnelles

FaceWork est une application web complète permettant de créer, gérer et partager des cartes de visite numériques. Elle a été développée avec des technologies modernes côté frontend et backend, dans le but de fournir une plateforme sécurisée, fluide et responsive. Ce projet s'adresse aux professionnels, entreprises et administrateurs souhaitant digitaliser leur réseau de contacts.

---

## Objectifs du projet

- Offrir une alternative moderne aux cartes de visite papier
- Permettre aux utilisateurs de gérer leur profil et cartes
- Créer une interface claire, multilingue et responsive
- Proposer une solution prête pour un déploiement professionnel

---

## Fonctionnalités principales

### Utilisateurs
- Inscription et connexion via JWT sécurisé (avec refresh tokens)
- Rôles utilisateurs : simple utilisateur, business et administrateur
- Récupération de mot de passe
- Gestion complète du profil

### Cartes de visite
- Création de cartes (pour les utilisateurs Business/Admin)
- Modification, suppression, ajout aux favoris
- Partage via QR code et lien unique
- Export en format PDF ou vCard

### Interface
- Multilingue (Français, Anglais, Hébreu)
- Mode sombre / clair
- Design moderne et responsive (Mobile First)
- Installation PWA possible

### Administration
- Dashboard administrateur
- Statistiques utilisateurs et cartes
- Gestion globale des données

---

## Structure du projet

```
PROCARDS/
├── backend/            # Serveur Node.js + Express + MongoDB
│   └── src/
│       ├── config/         # Connexion DB, Swagger, etc.
│       ├── controllers/    # Logique métier
│       ├── middleware/     # Authentification, erreurs, validation
│       ├── models/         # Schémas Mongoose (User, Card)
│       ├── routes/         # Routes API (users, cards, stats)
│       ├── utils/          # Fonctions utiles (JWT, export, etc.)
│       ├── validators/     # Schémas Joi
│       └── seed/           # Données de test
│   ├── tests/              # Tests backend (Jest)
│   └── Dockerfile
│
├── frontend/          # Interface React + TypeScript + Tailwind
│   └── src/
│       ├── pages/         # Pages principales
│       ├── components/    # Composants réutilisables
│       ├── context/       # Contexte global (auth, thème)
│       ├── api/           # Configuration axios
│       └── i18n/          # Traductions multilingues
│   ├── tests/              # Tests frontend (Vitest)
│   └── Dockerfile
│
├── docker-compose.yml     # Lancement des services (MongoDB, front, back)
└── README.md              # Ce fichier
```

---

## Installation rapide

### Prérequis

- Node.js 18+
- MongoDB (local ou Atlas)
- Git

### Étapes

1. Cloner le projet :
```bash
git clone https://github.com/Sy2force/BCARD.git
cd PROCARDS
```

2. Installer les dépendances :
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Configurer les variables d’environnement :

Backend `.env`
```
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/facework
JWT_SECRET=xxx
FRONTEND_URL=http://localhost:5173
```

Frontend `.env`
```
VITE_API_URL=http://localhost:5001/api
```

4. Initialiser les données :
```bash
cd backend && npm run seed
```

5. Lancer le projet :
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Accessible sur `http://localhost:5173`

---

## Lancement avec Docker

```bash
docker-compose up --build
```

Cela démarre automatiquement :
- Frontend : http://localhost:5173
- Backend : http://localhost:5001
- MongoDB : mongodb://localhost:27017/facework

Pour arrêter :
```bash
docker-compose down
```

---

## Endpoints principaux

- `/api/users` - CRUD utilisateurs
- `/api/cards` - CRUD cartes
- `/api/stats` - Statistiques (admin uniquement)
- `/api-docs` - Swagger UI (documentation API)

Toutes les routes sécurisées nécessitent :
```
Authorization: Bearer <token JWT>
```

---

## Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

---

## Comptes de test

Après exécution de la seed :

| Rôle       | Email                    | Mot de passe   |
|------------|--------------------------|----------------|
| Admin      | admin@facework.com       | Admin@1234     |
| Business   | business@facework.com    | Business@1234  |
| Utilisateur| user@facework.com        | User@1234      |

---

## Déploiement

### Backend (Render)
- Connecter le repo GitHub
- Variables nécessaires :
  - `MONGODB_URI_PROD`
  - `JWT_SECRET`
  - `FRONTEND_URL`
- Commandes :
  - Build : `npm install`
  - Start : `npm start`

### Frontend (Vercel)
- Répertoire racine : `frontend`
- Build : `npm run build`
- Variables :
  - `VITE_API_URL=https://<url-backend>/api`

---

## Sécurité

- JWT sécurisé
- Hachage des mots de passe (bcrypt)
- Validation des entrées (Joi)
- Rate limiting
- Helmet, CORS, .env
- Authentification par rôles

---

## Licence

Ce projet est sous licence MIT.
