'use strict';

const fs = require(`fs`).promises;
const router = require(`express`).Router;
const route = router();
const logger = require(`../../logger`).getLogger();

route.get(`/category/:id`, (req, res) => {
  res.render(`category`);
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/add`, (req, res) => {
  res.render(`new-ticket`);
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/edit/:id`, (req, res) => {
  res.render(`ticket-edit`);
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
