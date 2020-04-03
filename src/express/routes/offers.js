'use strict';

const router = require(`express`).Router;
const route = router();
const logger = require(`../../logger`).getLogger();
const path = require(`path`);
const axios = require(`axios`);

const multer = require(`multer`);
const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, `../../tmp`));
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const {getUrlRequest} = require(`../../utils`);

route.get(`/category/:id`, (req, res) => {
  res.render(`category`);
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/add`, async (req, res) => {
  let categories = [];
  try {
    // categpries = (await axios.get(`${URL}/api/categories`)).data;
    categories = (await axios.get(getUrlRequest(req, `/api/categories`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка категорий`);
  }

  res.render(`new-ticket`, {categories, offer: {}});
  logger.info(`Status code ${res.statusCode}`);
});

route.post(`/add`, multer({storage: multerStorage}).single(`avatar`), async (req, res) => {
  const {body} = req;

  try {
    const offer = {
      title: body[`ticket-name`],
      description: body.comment,
      category: body.category,
      sum: body.price,
      type: body.action,
      // picture: files.avatar.path,
    };

    await axios.post(getUrlRequest(req, `/api/offers`), JSON.stringify(offer), {
      headers: {
        'Content-Type': `application/json`
      }
    });

    res.redirect(`/my`);
    logger.info(`Status code ${res.statusCode}`);
    return;
  } catch (err) {
    logger.error(`Ошибка при создании нового объявления`);
  }

  res.render(`new-ticket`, {
    offer: {
      title: body[`ticket-name`] || ``,
      description: body.comment || ``,
      category: body.category || ``,
      sum: body.price || ``,
      type: body.action || ``,
    },
  });
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/edit/:id`, async (req, res) => {
  let offer = {};
  let categories = [];

  try {
    offer = (await axios.get(getUrlRequest(req, `/api/offers/${req.params.id}`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении предложения`);
  }

  try {
    categories = (await axios.get(getUrlRequest(req, `/api/categories`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка категорий`);
  }

  res.render(`ticket-edit`, {offer, categories});
  logger.info(`Status code ${res.statusCode}`);
});

route.get(`/:id`, (req, res) => {
  res.render(`ticket`);
  logger.info(`Status code ${res.statusCode}`);
});

module.exports = route;
