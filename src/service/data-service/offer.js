'use strict';

const sequelize = require(`../db/sequelize`);

class OfferService {
  async findAll() {
    const {Offer} = (await sequelize()).models;
    return (await Offer.findAll({include: [`comments`, `categories`]}))
      .map((offer) => offer.toJSON());
  }

  async findAllByUser(userId) {
    const {Offer, Comment} = (await sequelize()).models;
    return (await Offer.findAll({
      include: [
        {
          model: Comment,
          as: `comments`,
          include: [`author`]
        },
        `categories`
      ],
      where: {author_id: userId}
    })).map((offer) => offer.toJSON());
  }

  async findAllByCategory(id) {
    const {Offer, OfferCategory} = (await sequelize()).models;
    return (await Offer.findAll({
      include: [`categories`],
      where: {
        id: await OfferCategory.findAll({
          where: {category_id: id},
          attributes: [`offer_id`],
          raw: true
        }).map(({ offer_id }) => +offer_id)
      }
    })).map((offer) => offer.toJSON());
  }

  async findOne(id) {
    const {Offer, Comment} = (await sequelize()).models;
    return await Offer.findByPk(+id, {
      include: [
        {
          model: Comment,
          as: `comments`,
          include: [`author`]
        },
        `categories`,
        `author`
      ]
    });
  }

  async create(data) {
    const {Offer} = (await sequelize()).models;
    return await Offer.create(data);
  }

  async update(id, data) {
    const {Offer} = (await sequelize()).models;
    return await Offer.update(data, {where: {id}});
  }

  async delete(id) {
    const {Offer} = (await sequelize()).models;
    return await Offer.destroy({where: {id}});
  }
}

module.exports = OfferService;
