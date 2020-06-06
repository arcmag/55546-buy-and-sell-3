'use strict';

const router = require(`express`).Router;
const appRouter = router();
const logger = require(`../../logger`).getLogger();
const axios = require(`axios`);
const {getUrlRequest} = require(`../../utils`);

appRouter.get(`/`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers/last`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка объявлений`);
    return;
  }

  let categories = [];
  try {
    categories = (await axios.get(getUrlRequest(req, `/api/categories`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка категорий`);
    return;
  }

  let popularOffers = [];
  try {
    popularOffers = (await axios.get(getUrlRequest(req, `/api/offers/popular`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка популярных объявлений`);
    return;
  }

  res.render(`index`, {offers, categories, popularOffers});
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/register`, async (req, res) => {
  res.render(`sign-up`);
});

appRouter.get(`/login`, (req, res) => {
  res.render(`login`);
});

appRouter.get(`/my`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers/user/1`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка предложений`);
  }

  res.render(`my-offers`, {offers});
});

appRouter.get(`/my/comments`, async (req, res) => {
  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers/user/1`))).data.splice(0, 3);
  } catch (err) {
    logger.error(`Ошибка при получении списка предложений`);
  }

  res.render(`comments`, {offers});
});

appRouter.get(`/search`, async (req, res) => {
  const {search} = req.query;

  let lastOffers = [];
  try {
    lastOffers = (await axios.get(getUrlRequest(req, `/api/offers/last`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка последних предложений`);
  }

  let offers = [];
  if (search) {
    try {
      offers = (await axios.get(getUrlRequest(req, `/api/search/?query=${encodeURIComponent(search)}`))).data;
    } catch (err) {
      logger.error(`Ошибка при поиске предложений по заголовку - ${search}: ${err}`);
    }
  }

  res.render(`search-result`, {offers, lastOffers});
  logger.info(`Поиск завершён: ${res.statusCode}`);
});

module.exports = appRouter;
