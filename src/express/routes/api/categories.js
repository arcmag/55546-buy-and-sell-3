'use strict';

const logger = require(`../../../logger`).getLogger();
const {Router} = require(`express`);

const route = new Router();

const paramValidator = require(`../../middleware/validator-params`);

module.exports = (app, ClassService) => {
  logger.info(`Подключение service api`);
  const service = new ClassService();

  app.use(`/api/categories`, route);

  route.get(`/`, async (_req, res) => {
    logger.info(`Получение списка категорий`);
    res.status(200).json(await service.findAll());
  });

  route.get(`/:id`, paramValidator(`id`, `number`), async (req, res) => {
    const {id} = req.params;
    logger.info(`Получение категории: ${id}`);
    res.status(200).json(await service.findOne(id));
  });

  route.post(`/set-offer-categories`, async (req, res) => {
    logger.info(`Добавления списка категорий к предложению`);
    const {offerId, categories} = req.body;
    res.status(200).json(await service.setOfferCategory(offerId, categories));
  });
};
