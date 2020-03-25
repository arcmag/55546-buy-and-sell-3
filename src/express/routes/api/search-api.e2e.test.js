'use strict';

const fs = require(`fs`).promises;
const request = require(`supertest`);
const server = require(`../../index`);

describe(`Проверка REST API для работы с поиском`, () => {
  let mockOffer = null;

  beforeAll(async () => {
    mockOffer = JSON.parse((await fs.readFile(`mock.json`)).toString())[0];
  });

  test(`Поиск объявлений`, async () => {
    const res = await request(server).get(`/api/search?query=${encodeURIComponent(mockOffer.title)}`);
    expect(res.statusCode).toBe(200);
  });
});
