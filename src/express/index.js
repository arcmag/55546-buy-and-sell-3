'use strict';

const path = require(`path`);
const express = require(`express`);
const appRoutes = require(`./routes`);
const app = express();

const logger = require(`../logger`).getLogger();
const STATIC_DIR = path.join(__dirname, `public`);

const apiCategories = require(`./routes/api/categories`);
const apiSearch = require(`./routes/api/search`);
const apiOffers = require(`./routes/api/offers`);
const apiComments = require(`./routes/api/comments`);

const dataServiceCategory = require(`../service/data-service/category`);
const dataServiceSearch = require(`../service/data-service/search`);
const dataServiceOffer = require(`../service/data-service/offer`);
const dataServiceComment = require(`../service/data-service/comment`);

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

apiCategories(app, dataServiceCategory);
apiSearch(app, dataServiceSearch);
apiOffers(app, dataServiceOffer);
apiComments(app, dataServiceComment);

app.use(`/offers`, require(`./routes/offers`));
app.use(appRoutes);

app.use((req, res) => {
  res.status(404).send(`Page not found`);
  logger.error(`End request ${req.url} with error ${res.statusCode}`);
});

module.exports = app;
