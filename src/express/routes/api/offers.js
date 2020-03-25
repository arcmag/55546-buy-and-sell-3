'use strict';

const fs = require(`fs`).promises;
const router = require(`express`).Router;
const route = router();

const getOffers = async () => JSON.parse((await fs.readFile(`mock.json`)).toString());

const logger = require(`../../../logger`).getLogger();

// GET / api / offers — ресурс возвращает список объявлений;
route.get(`/`, async (req, res) => {
  res.json(await getOffers());
  logger.info(`Status code ${res.statusCode}`);
  return;
});

// GET / api / offers /: offerId — возвращает полную информацию определённого объявления;
route.get(`/:offerId`, async (req, res) => {
  const offer = (await getOffers()).find((it) => it.id === req.params.offerId);
  if (!offer) {
    res.sendStatus(400);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }

  res.json(offer);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

// POST / api / offers — создаёт новое объявление;
route.post(`/`, async (req, res) => {
  const keys = [
    `id`,
    `type`,
    `title`,
    `description`,
    `sum`,
    `picture`,
    `category`,
    `comments`
  ];

  for (const key of keys) {
    if (!req.body[key]) {
      res.sendStatus(400);
      logger.info(`Status code ${res.statusCode}`);
      return;
    }
  }

  res.json({response: `New offer!`, data: req.body});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

// PUT / api / offers /: offerId — редактирует определённое объявление;
route.put(`/:offerId`, async (req, res) => {
  const offer = (await getOffers()).find((it) => it.id === req.params.offerId);
  if (!offer) {
    res.sendStatus(400);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }

  res.json({response: `Edit offer by id: ${offer.id}!`});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

// DELETE / api / offers /: offerId — удаляет определённое объявление;
route.delete(`/:offerId`, async (req, res) => {
  const offer = (await getOffers()).find((it) => it.id === req.params.offerId);
  if (!offer) {
    res.sendStatus(400);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }

  res.json({response: `Delete offer by id: ${offer.id}!`});
  logger.info(`Status code ${res.statusCode}`);
  return;
});

// GET / api / offers /: offerId / comments — возвращает список комментариев определённого объявления;
route.get(`/:offerId/comments`, async (req, res) => {
  const offer = (await getOffers()).find((it) => it.id === req.params.offerId);
  if (!offer) {
    res.sendStatus(400);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }

  res.json(offer.comments);
  logger.info(`Status code ${res.statusCode}`);
  return;
});

// DELETE / api / offers /: offerId / comments /: commentId — удаляет из определённой публикации комментарий с идентификатором;
route.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  const {offerId, commentId} = req.params;

  const offer = (await getOffers()).find((it) => it.id === offerId);
  if (!offer) {
    res.sendStatus(400);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }

  const comment = offer.comments.find((it) => it.id === commentId);
  if (!comment) {
    res.sendStatus(400);
    logger.info(`Status code ${res.statusCode}`);
    return;
  }

  res.json({
    response: `Delete comment by id ${comment.id}!`
  });
  logger.info(`Status code ${res.statusCode}`);
  return;
});

// PUT / api / offers /: offerId / comments — создаёт новый комментарий;
route.put(`/:offerId/comments`, async (req, res) => {
  const offer = (await getOffers()).find((it) => it.id === req.params.offerId);
  if (!offer) {
    res.sendStatus(400);
    logger.info(`Status code ${res.statusCode}`);
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
  return;
});

module.exports = route;