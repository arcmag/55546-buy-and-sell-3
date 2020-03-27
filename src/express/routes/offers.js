'use strict';

const fs = require(`fs`).promises;
const router = require(`express`).Router;
const route = router();
const logger = require(`../../logger`).getLogger();
const axios = require(`axios`);

const URL = `http://localhost:3000`;

route.get(`/category/:id`, (req, res) => {
  res.render(`category`);
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/add`, (req, res) => {
  res.render(`new-ticket`);
  logger.info(`Status code ${res.statusCode}`);
});

route.post(`/add`, async (req, res) => {
  const offer = req.body;

  try {
    await axios.post(`${URL}/api/offers/${req.params.id}`, JSON.stringify(offer));
    res.redirect(`/my`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  } catch (err) {
    logger.error(`Ошибка при создании нового объявления`);
  }

  res.render(`new-ticket`, {offer});
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/edit/:id`, async (req, res) => {
  let offer = {};
  let categpries = [];

  try {
    offer = (await axios.get(`${URL}/api/offers/${req.params.id}`)).data;
  } catch (err) {
    logger.error(`Ошибка при получении предложения`);
  }

  try {
    categpries = (await axios.get(`${URL}/api/categories`)).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка категорий`);
  }

  res.render(`ticket-edit`, {offer, categpries});
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/:id`, (req, res) => {
  res.render(`ticket`);
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/`, async (req, res) => {
  let offers = JSON.stringify([]);

  try {
    offers = (await (fs.readFile(`mock.json`))).toString();
  } catch (err) {
    logger.error(`Error: ${err}`);
  }

  res.json(JSON.parse(offers));
  logger.info(`Status code ${res.statusCode}`);
});

module.exports = route;
