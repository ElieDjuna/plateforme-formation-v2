const express = require('express');
const multer = require('multer');
const path = require('path');
const { Video } = require('../models');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload vidéo
router.post('/', verifyToken, upload.single('video'), async (req, res) => {
  const { title } = req.body;
  if (!title || !req.file) return res.status(400).json({ message: 'Champs manquants' });

  const video = await Video.create({ title, filename: req.file.filename, authorId: req.user.id });
  res.json({ message: 'Vidéo ajoutée', video });
});

// Lister vidéos publiées
router.get('/', async (req, res) => {
  const videos = await Video.findAll({ where: { isPublished: true } });
  res.json(videos);
});

module.exports = router;