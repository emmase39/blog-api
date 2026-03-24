# Blog API

API backend pour gérer un blog simple, développée avec Node.js et Express.

## Technologies utilisées
- Node.js + Express
- Better-SQLite3 (base de données)
- Swagger UI (documentation)

## Installation

1. Cloner le dépôt :
git clone https://github.com/emmase39/blog-api.git
cd blog-api

2. Installer les dépendances :
npm install

3. Démarrer le serveur :
node server.js

4. Accéder à la documentation :
http://localhost:3000/api-docs

## Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/articles | Récupérer tous les articles |
| POST | /api/articles | Créer un article |
| GET | /api/articles/:id | Récupérer un article par ID |
| PUT | /api/articles/:id | Modifier un article |
| DELETE | /api/articles/:id | Supprimer un article |
| GET | /api/articles/search?query=texte | Rechercher des articles |

## Exemple d'utilisation

### Créer un article
POST /api/articles
{
  "titre": "Mon premier article",
  "contenu": "Contenu de l'article",
  "auteur": "Emmanuel",
  "categorie": "Technologie",
  "tags": "nodejs, api"
}

### Réponse
{
  "message": "Article créé avec succès",
  "id": 1
}