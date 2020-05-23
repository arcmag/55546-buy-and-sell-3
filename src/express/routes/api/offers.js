'use strict';

const logger = require(`../../../logger`).getLogger();
const {Router} = require(`express`);

const route = new Router();

let service;

const reqiredFields = [`type`, `title`, `description`, `sum`, `category`];

const validateExistValue = (data) =>
  reqiredFields.reduce((list, key) => [...list, ...(data[key] ? [`Пустое поле: ${key}`] : [])], []);

const getOffer = async (res, offerId) => {
  const offer = await service.findOne(offerId);
  if (!offer) {
    res.sendStatus(400);
    logger.error(`Предложение: (${offerId}) не найдено`);
  }

  return offer;
};

module.exports = async (app, ClassService) => {
  logger.info(`Подключение offers api`);

  service = new ClassService();

  app.use(`/api/offers`, route);

  route.get(`/`, async (req, res) => {
    logger.info(`Получение списка предложений`);
    res.status(200).json(await service.findAll());
  });

  // GET / api / offers /: offerId — возвращает полную информацию определённого объявления;
  route.get(`/:offerId`, async (req, res) => {
    const offer = await getOffer(res, req.params.offerId);
    if (!offer) {
      return;
    }

    res.json(offer);
  });

  // POST / api / offers — создаёт новое объявление;
  route.post(`/`, async (req, res) => {
    const data = req.body;
    const errors = validateExistValue(data);
    if (errors.length > 0) {
      res.json({response: `Не удалось создать новое объявление:\n ${errors}`});
      return;
    }

    try {
      await service.create(data);
      res.json({response: `Создано новое объявление`});
      logger.info(`Создано новое объявление`);
    } catch (err) {
      res.status(400).json(`Ошибка при создании нового объявления: ${err}`);
    }
  });

  // PUT / api / offers /: offerId — редактирует определённое объявление;
  route.put(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const data = req.body;
    const errors = validateExistValue(data);
    if (errors.length > 0) {
      res.json({response: `Не удалось создать новое объявление:\n ${errors}`});
      return;
    }

    try {
      await service.update(offerId, data);
      res.json({response: `Редактирование объявления ${offerId} завершено успешно.`});
      logger.info(`Редактирование объявления завершено`);
    } catch (err) {
      res.status(400).json(`Ошибка при редактирование объявления: ${err}`);
      logger.error(`Ошибка при редактирование объявления: ${err}`);
    }
  });

  // DELETE / api / offers /: offerId — удаляет определённое объявление;
  route.delete(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    try {
      await service.drop(offerId);
      res.json({response: `Delete offer by id: ${offerId}!`});
      logger.info(`Объявления удалено`);
    } catch (err) {
      res.json({response: `Ошибка при удалении объявления: ${err}`});
      logger.info(`Ошибка при удалении объявления: ${err}`);
    }
  });

  // GET / api / offers /: offerId / comments — возвращает список комментариев определённого объявления;
  route.get(`/:offerId/comments`, async (req, res) => {
    const offer = await getOffer(res, req.params.offerId);
    if (!offer) {
      return;
    }

    res.json(offer.comments);
    logger.info(`Получение комментариев к предложению - ${offer.id}`);
  });

  // DELETE / api / offers /: offerId / comments /: commentId — удаляет из определённой публикации комментарий с идентификатором;
  route.delete(`/:offerId/comments/:commentId`, async (req, res) => {
    const {offerId, commentId} = req.params;
    const comment = await service.findComment(offerId, commentId);
    if (!comment) {
      logger.error(`Ошибка при получени в предложении ${offerId} комментария ${commentId}`);
      return;
    }

    res.json({response: `Delete comment by id ${commentId}!`});
    logger.info(`Комментарий ${commentId} был удалён`);
  });

  // PUT / api / offers /: offerId / comments — создаёт новый комментарий;
  route.post(`/:offerId/comments`, async (req, res) => {
    const offer = await getOffer(res, req.params.offerId);
    if (!offer) {
      return;
    }

    const {id, text} = req.body;
    if (!id || !text) {
      res.sendStatus(400);
      logger.info(`Status code ${res.statusCode}`);
      return;
    }

    res.json({response: `Create comment!`, data: req.body});
    logger.info(`Status code ${res.statusCode}`);
  });
};
