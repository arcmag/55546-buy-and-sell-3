'use strict';

const router = require(`express`).Router;
const appRouter = router();
const logger = require(`../../logger`).getLogger();
const axios = require(`axios`);
const {getUrlRequest} = require(`../../utils`);

appRouter.get(`/`, async (req, res) => {
  let offers = [];

  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка объявлений`);
    return;
  }

  res.render(`index`, {offers});
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/register`, async (req, res) => {
  res.render(`sign-up`);
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/login`, (req, res) => {
  res.render(`login`);
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/my`, async (req, res) => {
  let offers = [];

  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка предложений`);
  }

  res.render(`my-tickets`, {offers});
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/my/comments`, async (req, res) => {
  let offers = [];

  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers`))).data.splice(0, 3);
  } catch (err) {
    logger.error(`Ошибка при получении списка предложений`);
  }

  res.render(`comments`, {offers});
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/search`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/search/?query=${encodeURIComponent(req.query.search)}`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка предложений`);
  }

  res.render(`search-result`, {offers});
  logger.info(`Status code ${res.statusCode}`);
});

module.exports = appRouter;
