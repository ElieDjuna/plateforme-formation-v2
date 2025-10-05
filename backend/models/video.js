module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    filename: { type: DataTypes.STRING, allowNull: false },
    durationSeconds: { type: DataTypes.INTEGER, allowNull: true },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, { tableName: 'videos' });

  return Video;
};