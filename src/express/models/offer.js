'use strict';

module.exports = (sequelize, DataTypes) => {
  class Offer extends sequelize.Sequelize.Model { }
  Offer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    date_create: DataTypes.DATE,
  }, {
    sequelize,
    tableName: `offers`,
    timestamps: false
  });

  return Offer;
};
