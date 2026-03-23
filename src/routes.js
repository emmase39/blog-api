const express = require('express');
const router = express.Router();
const db = require('./database');

// POST /api/articles - Créer un article
router.post('/articles', (req, res) => {
  const { titre, contenu, auteur, categorie, tags } = req.body;

  if (!titre || !contenu || !auteur || !categorie) {
    return res.status(400).json({ erreur: 'titre, contenu, auteur et categorie sont obligatoires' });
  }

  const date = new Date().toISOString().split('T')[0];
  const stmt = db.prepare('INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)');
  const result = stmt.run(titre, contenu, auteur, date, categorie, tags || '');

  res.status(201).json({ message: 'Article créé avec succès', id: result.lastInsertRowid });
});

// GET /api/articles - Lire tous les articles
router.get('/articles', (req, res) => {
  const { categorie, auteur, date } = req.query;
  let query = 'SELECT * FROM articles WHERE 1=1';
  const params = [];

  if (categorie) { query += ' AND categorie = ?'; params.push(categorie); }
  if (auteur) { query += ' AND auteur = ?'; params.push(auteur); }
  if (date) { query += ' AND date = ?'; params.push(date); }

  const articles = db.prepare(query).all(...params);
  res.status(200).json({ articles });
});

// GET /api/articles/search - Rechercher un article
router.get('/articles/search', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ erreur: 'Le paramètre query est obligatoire' });
  }

  const articles = db.prepare('SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?').all(`%${query}%`, `%${query}%`);
  res.status(200).json({ articles });
});

// GET /api/articles/:id - Lire un article
router.get('/articles/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);

  if (!article) {
    return res.status(404).json({ erreur: 'Article non trouvé' });
  }

  res.status(200).json(article);
});

// PUT /api/articles/:id - Modifier un article
router.put('/articles/:id', (req, res) => {
  const { titre, contenu, categorie, tags } = req.body;
  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);

  if (!article) {
    return res.status(404).json({ erreur: 'Article non trouvé' });
  }

  db.prepare('UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?')
    .run(titre || article.titre, contenu || article.contenu, categorie || article.categorie, tags || article.tags, req.params.id);

  res.status(200).json({ message: 'Article modifié avec succès' });
});

// DELETE /api/articles/:id - Supprimer un article
router.delete('/articles/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);

  if (!article) {
    return res.status(404).json({ erreur: 'Article non trouvé' });
  }

  db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  res.status(200).json({ message: 'Article supprimé avec succès' });
});

module.exports = router;