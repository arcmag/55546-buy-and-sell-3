'use strict';

const sequelize = require(`../db/sequelize`);

class CommentService {
  async findOne(id) {
    const {Comment} = (await sequelize()).models;
    return (await Comment.findByPk(+id));
  }

  async findAllByOfferId(offerId) {
    const {Comment} = (await sequelize()).models;
    return (await Comment.findAll({where: {offer_id: +offerId}}))
      .map((comment) => comment.toJSON());
  }

  async create(offerId, data) {
    const {Comment} = (await sequelize()).models;
    return await Comment.create({...data, offer_id: offerId});
  }

  async update(id, data) {
    const {Comment} = (await sequelize()).models;
    return await Comment.update(data, {where: {id}});
  }

  async delete(id) {
    const {Comment} = (await sequelize()).models;
    return await Comment.destroy({where: {id}});
  }
}

module.exports = CommentService;
