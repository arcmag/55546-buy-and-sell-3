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

appRouter.get(`/offers/category/:id`, (req, res) => {
  res.render(`category`);
});

appRouter.get(`/offers/add`, (req, res) => {
  res.render(`new-ticket`);
});

appRouter.get(`/search`, (req, res) => {
  res.render(`search-result`);
});

appRouter.get(`/offers/edit/:id`, (req, res) => {
  res.render(`ticket-edit`);
});

appRouter.get(`/offers/:id`, (req, res) => {
  res.render(`ticket`);
});

module.exports = appRouter;
