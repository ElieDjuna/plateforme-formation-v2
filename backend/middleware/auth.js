const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Utilisateur introuvable' });
    req.user = { id: user.id, role: user.role, isActive: user.isActive };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

function requireRole(...allowed) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Non authentifié' });
    if (!allowed.includes(req.user.role)) return res.status(403).json({ message: 'Accès refusé' });
    next();
  };
}

module.exports = { verifyToken, requireRole };