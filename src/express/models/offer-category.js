'use strict';

module.exports = (sequelize, DataTypes) => {
  class OfferCategory extends sequelize.Sequelize.Model { }
  OfferCategory.init({
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    'offer_id': DataTypes.INTEGER,
    'category_id': DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: `offers_category`,
    timestamps: false
  });

  return OfferCategory;
};
