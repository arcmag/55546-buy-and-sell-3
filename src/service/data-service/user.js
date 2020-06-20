'use strict';

const sequelize = require(`../db/sequelize`);

class SearchService {
  async findOne(id) {
    const {User} = (await sequelize()).models;
    return (await User.findByPk(+id));
  }

  async create(data) {
    const {User} = (await sequelize()).models;
    await User.create(data);
  }
}

module.exports = SearchService;
