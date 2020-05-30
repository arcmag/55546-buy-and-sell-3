'use strict';

const {Op} = require(`sequelize`);
const sequelize = require(`../db/sequelize`);

class CategoryService {
  async search(title) {
    const {Offer} = (await sequelize()).models;
    return await Offer.findAll({
      raw: true,
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    });
  }
}

module.exports = CategoryService;
