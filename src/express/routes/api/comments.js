'use strict';

const logger = require(`../../../logger`).getLogger();
const {Router} = require(`express`);
const validatorMiddleware = require(`../../middleware/validator-offer`);
const paramValidator = require(`../../middleware/validator-params`);
const commentSchemaValidator = require(`../../validators/comment`);

const route = new Router();

module.exports = async (app, ClassService) => {
  logger.info(`Подключение offers api`);

  const service = new ClassService();

  app.use(`/api/comments`, route);

  // GET / api / comments /: offerId / all — возвращает список комментариев конкретного предложения
  route.get(`/:offerId/all`, paramValidator(`offerId`, `number`), async (req, res) => {
    res.status(200).json(await service.findAllByOfferId(+req.params.offerId));
  });

  // GET / api / comments /: offerId — возвращает список комментариев конкретного предложения
  route.get(`/:commentId`, paramValidator(`commentId`, `number`), async (req, res) => {
    res.status(200).json(await service.findOne(+req.params.commentId));
  });

  // POST / api / comments /: offerId — создаёт новый комментарий к предложению
  route.post(`/:offerId`, [
    paramValidator(`offerId`, `number`),
    validatorMiddleware(commentSchemaValidator)
  ], async (req, res) => {
    res.status(200).json(await service.create(+req.params.offerId, req.body));
  });

  // PUT / api / comments /: commentId — обновляет указанный комментарий
  route.put(`/:commentId`, [
    paramValidator(`commentId`, `number`),
    validatorMiddleware(commentSchemaValidator)
  ], async (req, res) => {
    res.status(200).json(await service.update(+req.params.commentId, req.body));
  });

  // DELETE / api / comments /: commentId — удаляет указанный комментарий
  route.delete(`/:commentId`, paramValidator(`commentId`, `number`), async (req, res) => {
    res.status(200).json(await service.delete(+req.params.commentId));
  });
};
