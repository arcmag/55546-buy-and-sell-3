'use strict';

const config = require(`../../config`);

const {Sequelize} = require(`sequelize`);
const sequelize = new Sequelize(
    config.DB_PGDATABASE,
    config.DB_PGUSER,
    config.DB_PGPASSWORD, {
      dialect: `postgres`,
      host: config.DB_PGHOST,
      port: config.DB_PGPORT,
    });

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully.`);
  } catch (err) {
    console.error(`Unable to connect to the database:`, err);
  }

  sequelize.import(`../../express/models/category.js`);
  sequelize.import(`../../express/models/comment.js`);
  sequelize.import(`../../express/models/offer-category.js`);
  sequelize.import(`../../express/models/offer.js`);

  const {Offer, Category, Comment, OfferCategory} = sequelize.models;

  Category.belongsToMany(Offer, {
    through: OfferCategory,
    as: `offers`,
    foreignKey: `category_id`,
  });

  Offer.belongsToMany(Category, {
    through: OfferCategory,
    as: `categories`,
    foreignKey: `offer_id`,
  });

  Offer.hasMany(Comment, {
    as: `comments`,
    foreignKey: `offer_id`,
  });

  return sequelize;
};
