'use strict';

const logger = require(`../../../logger`).getLogger();
const {Router} = require(`express`);

const route = new Router();

module.exports = (app, ClassService) => {
  logger.info(`Подключение search api`);
  const service = new ClassService();

  app.use(`/api/search`, route);

  route.get(`/`, async (req, res) => {
    const {query} = req.query;
    logger.info(`Получение списка предложений по заголовку ${query}`);
    res.status(200).json(await service.search(query));
  });
};
