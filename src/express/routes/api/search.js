'use strict';

const fs = require(`fs`).promises;
const router = require(`express`).Router;
const route = router();

const getOffers = async () => JSON.parse((await fs.readFile(`mock.json`)).toString());

const logger = require(`../../../logger`).getLogger();

// GET / api / search ? query = — возвращает результаты поиска.
// Поиск объявлений выполняется по наименованию.Объявление соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.
route.get(`/`, async (req, res) => {
  res.json((await getOffers()).filter((it) => it.title.toLowerCase().includes(req.query.query.toLowerCase())));
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = route;
