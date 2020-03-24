'use strict';

const request = require(`supertest`);
const server = require(`../../index`);

const REAL_OFFER_ID = `um3Ewv3Dge9Dqu2KxXyvN`;
const FAKE_OFFER_ID = `9Gc4QREIT1EiNQQuGD3YU2`;

const REAL_COMMENT_ID = `6ggy7QHiRHUwnXyuL4z7d`;
const FAKE_COMMENT_ID = `9Gc4QREIT1EiNQQuGD3YU2`;

const mockOffer = {
  "id": `9Gc4QREIT1EiNQQuGD3YU`,
  "type": `sale`,
  "title": `Куплю антиквариат`,
  "description": [
    `При покупке с меня бесплатная доставка в черте города.`
  ],
  "sum": 43588,
  "picture": `item05.jpg`,
  "category": [
    `Журналы`,
    `Книги`,
    `Игры`
  ],
  "comments": [
    {
      "id": `uxoWVhwFsjLT8PuhVpk1O`,
      "text": [
        `С чем связана продажа? Почему так дешёво?`,
        `Продаю в связи с переездом. Отрываю от сердца.`,
        `Неплохо, но дорого`
      ]
    },
    {
      "id": `ZYcOXUaTW-7DGmXHAO-an`,
      "text": [
        `Неплохо, но дорого`,
        `С чем связана продажа? Почему так дешёво?`,
        `Вы что?! В магазине дешевле.`,
        `Оплата наличными или перевод на карту?`
      ]
    }
  ]
};

describe(`Проверка REST API для работы с объявлениями`, () => {
  test(`Получение всех предложений`, async () => {
    const res = await request(server).get(`/api/offers`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получение конкретного объявления по ID`, async () => {
    const res = await request(server).get(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получение несуществующего объявления`, async () => {
    const res = await request(server).get(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Создание нового объявления`, async () => {
    const res = await request(server)
    .post(`/api/offers`)
    .send(mockOffer);
    expect(res.statusCode).toBe(200);
  });

  test(`Создание нового объявления без нужных данных`, async () => {
    const res = await request(server)
      .post(`/api/offers`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test(`Обновление объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Обновление несуществующего объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Удаление объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Удаление несуществующего объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${FAKE_OFFER_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Получение списка комментариев у конкретного объявления`, async () => {
    const res = await request(server)
      .get(`/api/offers/${REAL_OFFER_ID}/comments`);
    expect(res.statusCode).toBe(200);
  });

  test(`Получение списка комментариев у несуществующего объявления`, async () => {
    const res = await request(server)
      .get(`/api/offers/${FAKE_OFFER_ID}/comments`);
    expect(res.statusCode).toBe(400);
  });

  test(`Удаляет комментарий у объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Удаляет комментарий у несуществующего объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${FAKE_OFFER_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Удаляет несуществующий комментарий у объявления`, async () => {
    const res = await request(server)
      .delete(`/api/offers/${REAL_OFFER_ID}/comments/${FAKE_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Создаёт новый комментарий у объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(200);
  });

  test(`Создаёт новый комментарий у несуществующего объявления`, async () => {
    const res = await request(server)
      .put(`/api/offers/${FAKE_OFFER_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(400);
  });

  test(`Создаёт новый комментарий у объявления без нужных данных`, async () => {
    const res = await request(server)
      .put(`/api/offers/${REAL_OFFER_ID}/comments`)
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
