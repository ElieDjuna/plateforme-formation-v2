module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('student','formateur_pro','member'), defaultValue: 'member' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationReason: { type: DataTypes.STRING, allowNull: true }
  }, { tableName: 'users' });

  return User;
};