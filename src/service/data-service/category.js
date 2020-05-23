'use strict';

const fs = require(`fs`).promises;
const getDataByFile = async (path) => (await fs.readFile(path)).toString().trim().split(`\n`);

class CategoryService {
  async findAll() {
    return await getDataByFile(`data/categories.txt`);
  }
}

module.exports = CategoryService;
