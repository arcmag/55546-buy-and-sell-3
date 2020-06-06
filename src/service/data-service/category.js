'use strict';

const {literal} = require(`sequelize`);
const sequelize = require(`../db/sequelize`);

class CategoryService {
  async findOne(id) {
    const {Category} = (await sequelize()).models;
    return (await Category.findByPk(+id, {
      attributes: {
        include: [[literal(`(SELECT COUNT(*) FROM offers_category WHERE "Category"."id" = offers_category.category_id)`), `offersCount`]]
      },
      raw: true,
    }));
  }

  async findAll() {
    const {Category} = (await sequelize()).models;

    return await Category.findAll({
      attributes: {
        include: [[literal(`(SELECT COUNT(*) FROM offers_category WHERE "Category"."id" = offers_category.category_id)`), `offersCount`]]
      },
      raw: true,
    });
  }

  async create(data) {
    const {Category} = (await sequelize()).models;
    return await Category.create(data);
  }

  async update(id, data) {
    const {Category} = (await sequelize()).models;
    return await Category.update(data, {where: {id}});
  }

  async delete(id) {
    const {Category} = (await sequelize()).models;
    return await Category.destroy({where: {id}});
  }

  async setOfferCategory(offerId, categories) {
    const {OfferCategory} = (await sequelize()).models;
    await OfferCategory.destroy({where: {'offer_id': +offerId}});
    await OfferCategory.bulkCreate(categories.map(
        (categoryId) => ({'offer_id': +offerId, 'category_id': +categoryId})));
  }
}

module.exports = CategoryService;
