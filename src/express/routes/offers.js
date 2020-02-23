'use strict';

const fs = require(`fs`).promises;
const router = require(`express`).Router;
const route = router();

route.get(`/category/:id`, (req, res) => {
  res.render(`category`);
});

route.get(`/add`, (req, res) => {
  res.render(`new-ticket`);
});

route.get(`/edit/:id`, (req, res) => {
  res.render(`ticket-edit`);
});

route.get(`/:id`, (req, res) => {
  res.render(`ticket`);
});

route.get(`/`, async (req, res) => {
  let offers = JSON.stringify([]);

  try {
    offers = (await (fs.readFile(`mock.json`))).toString();
  } catch (err) {
    console.error(err);
  }

  res.json(JSON.parse(offers));
});

module.exports = route;
