const express = require('express');
const { Article } = require('../models');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Créer un article (draft)
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Champs manquants' });

  const article = await Article.create({ title, content, authorId: req.user.id });
  res.json({ message: 'Article créé', article });
});

// Lister articles publiés
router.get('/', async (req, res) => {
  const articles = await Article.findAll({ where: { isPublished: true } });
  res.json(articles);
});

// Publier un article
router.patch('/:id/publish', verifyToken, async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article non trouvé' });
  if (article.authorId !== req.user.id) return res.status(403).json({ message: 'Non autorisé' });

  article.isPublished = true;
  article.isDraft = false;
  await article.save();
  res.json({ message: 'Article publié', article });
});

module.exports = router;