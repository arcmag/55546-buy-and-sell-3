'use strict';

const path = require(`path`);
const express = require(`express`);
const appRoutes = require(`./routes`);
const app = express();

const logger = require(`../logger`).getLogger();
const STATIC_DIR = path.join(__dirname, `public`);

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `templates`));

app.use(express.static(STATIC_DIR));
app.use(express.json());

app.use((_req, res, next) => {
  res.db = app.get(`db`);
  next();
});

app.use((req, res, next) => {
  logger.debug(`Маршрут запроса: ${req.url}`);
  next();
});

require(`./routes/api/categories`)(app, require(`../service/data-service/category`));
require(`./routes/api/search`)(app, require(`../service/data-service/offer`));
require(`./routes/api/offers`)(app, require(`../service/data-service/offer`));

app.use(`/offers`, require(`./routes/offers`));
app.use(appRoutes);

app.use((req, res) => {
  res.status(404).send(`Page not found`);
  logger.error(`End request ${req.url} with error ${res.statusCode}`);
});

module.exports = app;
