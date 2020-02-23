'use strict';

const router = require(`express`).Router;
const appRouter = router();

appRouter.get(`/`, (req, res) => {
  res.render(`index`);
});

appRouter.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});

appRouter.get(`/login`, (req, res) => {
  res.render(`login`);
});

appRouter.get(`/my`, (req, res) => {
  res.render(`my-tickets`);
});

appRouter.get(`/my/comments`, (req, res) => {
  res.render(`comments`);
});

appRouter.get(`/search`, (req, res) => {
  res.render(`search-result`);
});

module.exports = appRouter;
