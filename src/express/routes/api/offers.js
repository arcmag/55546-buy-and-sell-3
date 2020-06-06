'use strict';

const logger = require(`../../../logger`).getLogger();
const {Router} = require(`express`);

const route = new Router();

let service;

const validateExistValue = (data, fields) =>
  fields.reduce((list, key) => [...list, ...(!data[key] ? [`Пустое поле: ${key} `] : [])], []);

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

  route.get(`/last`, async (req, res) => {
    logger.info(`Получение списка последних предложений`);
    res.status(200).json(await service.findLast());
  });

  route.get(`/popular`, async (req, res) => {
    logger.info(`Получение наиболее популярных предложений`);
    res.status(200).json(await service.findByPopular());
  });

  // GET / api / offers /: offerId — возвращает полную информацию определённого объявления;
  route.get(`/:offerId`, async (req, res) => {
    const offer = await getOffer(res, req.params.offerId);
    if (!offer) {
      return;
    }

    res.json(offer);
  });

  // GET / api / offers / user /: userId — возвращает список объявлений созданных указанным пользователем
  route.get(`/user/:userId`, async (req, res) => {
    res.json(await service.findAllByUser(req.params.userId));
  });

  // GET / api / offers / category /: categoryId — возвращает список объявлений относящихся к указанной категории
  route.get(`/category/:categoryId/:page`, async (req, res) => {
    const {categoryId, page} = req.params;
    res.json({
      offers: (await service.findAllByCategory(categoryId, (page || 1))),
      offersCount: (await service.getCountByCategory(categoryId))
    });
  });

  // POST / api / offers — создаёт новое объявление;
  route.post(`/`, async (req, res) => {
    const data = req.body;
    const errors = validateExistValue(data, [`type`, `title`, `description`, `price`, `categories`]);
    if (errors.length > 0) {
      logger.info(`Не удалось создать новое объявление:\n ${errors}`);
      res.json({response: `Не удалось создать новое объявление:\n ${errors}`});
      return;
    }

    try {
      const offer = await service.create(data);
      res.json(offer.dataValues);
      logger.info(`Создано новое объявление`);
    } catch (err) {
      res.status(400).json(`Ошибка при создании нового объявления: ${err}`);
    }
  });

  // PUT / api / offers /: offerId — редактирует определённое объявление;
  route.put(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const data = req.body;
    const errors = validateExistValue(data, [`type`, `title`, `description`, `price`]);
    if (errors.length > 0) {
      logger.info(`Не удалось создать новое объявление:\n ${errors}`);
      res.json({response: `Не удалось создать новое объявление:\n ${errors}`});
      return;
    }

    try {
      const offer = await service.update(offerId, data);
      res.json(offer.dataValues);
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
      await service.delete(offerId);
      res.json({response: `Delete offer by id: ${offerId}!`});
      logger.info(`Объявления удалено`);
    } catch (err) {
      res.json({response: `Ошибка при удалении объявления: ${err}`});
      logger.info(`Ошибка при удалении объявления: ${err}`);
    }
  });
};
