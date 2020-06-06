'use strict';

const POPULAR_LIMIT = 4;

const {literal} = require(`sequelize`);
const sequelize = require(`../db/sequelize`);

const {CATEGORY_LIMIT} = require(`../../const`);

class OfferService {
  async findAll() {
    const {Offer} = (await sequelize()).models;
    return (await Offer.findAll({
      include: [`comments`, `categories`]
    })).map((offer) => offer.toJSON());
  }

  async findLast() {
    const {Offer} = (await sequelize()).models;
    console.log(`findLast`);
    return (await Offer.findAll({
      include: [`comments`, `categories`],
      order: [[`date_create`]]
    })).map((offer) => offer.toJSON());
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
      where: {'author_id': userId}
    })).map((offer) => offer.toJSON());
  }

  async getCountByCategory(categoryId) {
    const {Offer, OfferCategory} = (await sequelize()).models;
    return await Offer.count({
      where: {
        id: await OfferCategory.findAll({
          where: {'category_id': categoryId},
          attributes: [`offer_id`],
          raw: true
        }).map((offer) => +offer[`offer_id`])
      }
    });
  }

  async findAllByCategory(id, page) {
    const {Offer, OfferCategory} = (await sequelize()).models;
    return (await Offer.findAll({
      include: [`categories`],
      where: {
        id: await OfferCategory.findAll({
          where: {'category_id': id},
          attributes: [`offer_id`],
          raw: true
        }).map((offer) => +offer[`offer_id`]),
      },
      limit: CATEGORY_LIMIT,
      offset: ((page - 1) * CATEGORY_LIMIT),
    })).map((offer) => offer.toJSON());
  }

  async findByPopular() {
    const {Offer} = (await sequelize()).models;
    return (await Offer.findAll({
      attributes: {
        include: [
          [literal(`(SELECT COUNT(*) FROM comments WHERE comments.offer_id = "Offer"."id")`), `countComments`],
        ],
      },
      include: [`categories`, `comments`],
      limit: POPULAR_LIMIT,
      order: [literal(`"countComments" DESC`)]
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
