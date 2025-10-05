module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
    isDraft: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'articles' });

  return Article;
};