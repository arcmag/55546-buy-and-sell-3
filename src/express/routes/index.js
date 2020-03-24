'use strict';

const router = require(`express`).Router;
const appRouter = router();
const logger = require(`../../logger`).getLogger();

appRouter.get(`/`, (req, res) => {
  res.render(`index`);
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/register`, (req, res) => {
  res.render(`sign-up`);
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/login`, (req, res) => {
  res.render(`login`);
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/my`, (req, res) => {
  res.render(`my-tickets`);
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/my/comments`, (req, res) => {
  res.render(`comments`);
  logger.info(`Status code ${res.statusCode}`);
});

appRouter.get(`/search`, (req, res) => {
  res.render(`search-result`);
  logger.info(`Status code ${res.statusCode}`);
});

module.exports = appRouter;
