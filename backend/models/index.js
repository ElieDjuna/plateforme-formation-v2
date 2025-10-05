const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'db', 'database.sqlite'),
  logging: false
});

const User = require('./user')(sequelize, DataTypes);
const Article = require('./article')(sequelize, DataTypes);
const Video = require('./video')(sequelize, DataTypes);

// relations
User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Video, { foreignKey: 'authorId' });
Video.belongsTo(User, { foreignKey: 'authorId' });

module.exports = { sequelize, User, Article, Video };