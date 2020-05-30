'use strict';

const logger = require(`../../../logger`).getLogger();
const {Router} = require(`express`);

const route = new Router();

module.exports = async (app, ClassService) => {
  logger.info(`Подключение offers api`);

  const service = new ClassService();

  app.use(`/api/comments`, route);

  // GET / api / comments /: offerId / all — возвращает список комментариев конкретного предложения
  route.get(`/:offerId/all`, async (req, res) => {
    res.status(200).json(await service.findAllByOfferId(+req.params.offerId));
  });

  // GET / api / comments /: offerId — возвращает список комментариев конкретного предложения
  route.get(`/:commentId`, async (req, res) => {
    res.status(200).json(await service.findOne(+req.params.commentId));
  });

  // POST / api / comments /: offerId — создаёт новый комментарий к предложению
  route.post(`/:offerId`, async (req, res) => {
    res.status(200).json(await service.create(+req.params.commentId, req.body));
  });

  // PUT / api / comments /: commentId — обновляет указанный комментарий
  route.put(`/:commentId`, async (req, res) => {
    res.status(200).json(await service.update(+req.params.commentId, req.body));
  });

  // DELETE / api / comments /: commentId — удаляет указанный комментарий
  route.delete(`/:commentId`, async (req, res) => {
    res.status(200).json(await service.delete(+req.params.commentId));
  });
};
