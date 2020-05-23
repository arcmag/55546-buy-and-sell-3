'use strict';

const logger = require(`../../../logger`).getLogger();
const {Router} = require(`express`);

const route = new Router();

module.exports = (app, ClassService) => {
  logger.info(`Подключение service api`);
  const service = new ClassService();

  app.use(`/api/categories`, route);

  route.get(`/`, async (_req, res) => {
    logger.info(`Получение списка категорий`);
    res.status(200).json(await service.findAll());
  });
};
