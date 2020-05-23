'use strict';

const fs = require(`fs`).promises;
const getDataByFile = async (path) => (await fs.readFile(path)).toString().trim().split(`\n`);

const getOffers = async () => JSON.parse((await fs.readFile(`mock.json`)).toString());

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  async findAll() {
    res.json((await getOffers()).filter((it) => it.title.toLowerCase().includes(req.query.query.toLowerCase())));
    return await getDataByFile(`data/categories.txt`);
  }
}

module.exports = CategoryService;
