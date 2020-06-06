'use strict';

const {Op} = require(`sequelize`);
const sequelize = require(`../db/sequelize`);

class SearchService {
  async search(title) {
    const {Offer} = (await sequelize()).models;
    return (await Offer.findAll({
      include: [`categories`],
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    })).map((category) => category.toJSON());
  }
}

module.exports = SearchService;
