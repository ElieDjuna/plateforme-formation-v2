const express = require('express');
const { User } = require('../models');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Lister tous les utilisateurs (admin uniquement)
router.get('/', verifyToken, requireRole('formateur_pro'), async (req, res) => {
  const users = await User.findAll({ attributes: ['id','username','email','role','isActive'] });
  res.json(users);
});

// Activer un utilisateur
router.patch('/:id/activate', verifyToken, requireRole('formateur_pro'), async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  user.isActive = true;
  await user.save();
  res.json({ message: 'Utilisateur activé', user });
});

module.exports = router;