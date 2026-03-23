const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../blog.db'));

// Création de la table articles
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    auteur TEXT NOT NULL,
    date TEXT NOT NULL,
    categorie TEXT NOT NULL,
    tags TEXT
  )
`);

console.log('Base de données initialisée !');

module.exports = db;