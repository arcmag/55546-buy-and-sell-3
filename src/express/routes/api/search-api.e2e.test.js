'use strict';

const request = require(`supertest`);
const server = require(`../../index`);

describe(`Проверка REST API для работы с поиском`, () => {
  test(`Поиск объявлений`, async () => {
    const res = await request(server).get(`/api/search?query=title`);
    expect(res.statusCode).toBe(200);
  });
});
