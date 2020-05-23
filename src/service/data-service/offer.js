'use strict';

// const fs = require(`fs`).promises;
const {Op} = require(`sequelize`);
const sequelize = require(`../db/sequelize`);

// const getOffers = async () => JSON.parse((await fs.readFile(`mock.json`)).toString());

class OfferService {
  async findAll() {
    const {Offer} = (await sequelize()).models;
    return await Offer.findAll();
  }

  async findOne(id) {
    const {Offer} = (await sequelize()).models;
    return await Offer.findByPk(+id);
  }

  async findComment(offerId, commentId) {
    const offer = await this.findOne(offerId);
    return offer ? offer.comments.find((it) => it.id === commentId) : null;
  }

  async create(data) {
    return data;
  }

  async update(id, data) {
    const offer = await this.findOne(id);
    if (!offer) {
      return false;
    }

    return true;
  }

  async drop(id) {
    const offer = await this.findOne(id);
    if (!offer) {
      return false;
    }

    return true;
  }

  async dropComment(offerId, commentId) {
    const comment = await this.findComment(offerId, commentId);
    if (!comment) {
      return false;
    }

    return true;
  }

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

module.exports = OfferService;
