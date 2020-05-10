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

app.use(`/api/categories`, require(`./routes/api/categories`));
app.use(`/api/search`, require(`./routes/api/search`));
app.use(`/api/offers`, require(`./routes/api/offers`));

app.use(`/offers`, require(`./routes/offers`));
app.use(appRoutes);

app.use((req, res) => {
  res.status(404).send(`Page not found`);
  logger.error(`End request ${req.url} with error ${res.statusCode}`);
});

module.exports = app;
