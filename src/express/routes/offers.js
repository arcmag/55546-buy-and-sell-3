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

route.get(`/category/:id`, async (req, res) => {
  const {id} = req.params;
  logger.info(`Просмотр списка предложений из категории: ${id}`);

  let currentCategory = null;
  try {
    currentCategory = (await axios.get(getUrlRequest(req, `/api/categories/${id}`))).data;
  } catch (err) {
    logger.info(`Ошибка при получении категорий: ${id}: ${err}`);
  }

  let categories = [];
  try {
    categories = (await axios.get(getUrlRequest(req, `/api/categories`))).data;
  } catch (err) {
    logger.info(`Ошибка при получении категорий: ${id}: ${err}`);
  }

  let offers = [];
  try {
    offers = (await axios.get(getUrlRequest(req, `/api/offers/category/${id}`))).data;
  } catch (err) {
    logger.info(`Ошибка при получении предложений к категории: ${id}: ${err}`);
  }

  res.render(`category-offer`, {offers, categories, currentCategory});
});

route.get(`/add`, async (req, res) => {
  logger.info(`Создание нового предложения: ${res.statusCode}`);

  let categories = [];
  try {
    categories = (await axios.get(getUrlRequest(req, `/api/categories`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка категорий`);
  }

  res.render(`offer-create`, {categories, offer: {}});
});

route.post(`/add`, multer({storage: multerStorage}).single(`avatar`), async (req, res) => {
  const {file, body} = req;

  if (file) {
    body.img = file.filename;
  }

  let categories = [];
  try {
    categories = (await axios.get(getUrlRequest(req, `/api/categories`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка категорий`);
  }
  try {
    const offer = await axios.post(getUrlRequest(req, `/api/offers`), JSON.stringify({...body, author_id: 1}),
        {headers: {'Content-Type': `application/json`}});

    await axios.post(getUrlRequest(req, `/api/categories/set-offer-categories`),
        JSON.stringify({offerId: offer.data.id, categories: body.categories}),
        {headers: {'Content-Type': `application/json`}}).data;

    logger.info(`Создано новое предложение ${offer.data.id}`);
    res.redirect(`/my`);
  } catch (err) {
    logger.error(`Ошибка при создании нового объявления: ${err}`);
  }

  res.render(`offer-create`, {categories, offer: body});
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

  res.render(`offer-edit`, {offer, categories});
});

route.post(`/edit/:id`, multer({storage: multerStorage}).single(`avatar`), async (req, res) => {
  const {file, body, params} = req;
  if (file) {
    body.img = file.filename;
  }

  let categories = [];
  try {
    categories = (await axios.get(getUrlRequest(req, `/api/categories`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении списка категорий`);
  }

  try {
    await axios.put(getUrlRequest(req, `/api/offers/${params.id}`), JSON.stringify(body),
        {headers: {'Content-Type': `application/json`}});

    await axios.post(getUrlRequest(req, `/api/categories/set-offer-categories`),
        JSON.stringify({offerId: params.id, categories: body.categories}),
        {headers: {'Content-Type': `application/json`}}).data;

    logger.info(`Предложение было успешно отредактировано`);
    res.redirect(`/my`);
  } catch (err) {
    logger.error(`Ошибка при редактировании предложения: ${err}`);
  }

  let offer = {};
  try {
    offer = (await axios.get(getUrlRequest(req, `/api/offers/${req.params.id}`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении предложения`);
  }
  res.render(`offer-edit`, {offer, categories});
});

route.get(`/:id`, async (req, res) => {
  let offer = {};
  try {
    offer = (await axios.get(getUrlRequest(req, `/api/offers/${req.params.id}`))).data;
  } catch (err) {
    logger.error(`Ошибка при получении предложения: ${req.params.id}`);
  }

  res.render(`offer`, {offer});
});

module.exports = route;
