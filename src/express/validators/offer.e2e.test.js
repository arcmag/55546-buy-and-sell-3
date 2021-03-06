'use strict';

const schema = require(`./offer`);

const mock = {
  'title': `Тестовый заголовок`,
  'img': `path/img.jpg`,
  'price': 1000,
  'type': `buy`,
  'description': `Тестовое описание...`,
  'categories': [3, 5, 7],
  'author_id': 1,
  'date_create': new Date(),
};

describe(`Проверка валидации комментария`, () => {
  test(`Корректна валидация`, async () => {
    let res = null;
    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toStrictEqual(mock);
  });

  test(`Валидация с недостаточной длинной заголовка`, async () => {
    let res = null;

    mock.title = ``;

    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toEqual(null);
  });

  test(`Валидация с некорректным типом изображения`, async () => {
    let res = null;

    mock.img = 123;

    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toEqual(null);
  });

  test(`Валидация с некорректным типом цены`, async () => {
    let res = null;

    mock.price = `123`;

    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toEqual(null);
  });

  test(`Валидация с некорректным значением предлодения`, async () => {
    let res = null;

    mock.type = `new type`;

    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toEqual(null);
  });

  test(`Валидация с некорректным списком категорий`, async () => {
    let res = null;

    mock.categories = [`1`, null, false];

    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toEqual(null);
  });

  test(`Валидация с некорректным значением идентификатора автора`, async () => {
    let res = null;

    mock[`author_id`] = `1`;

    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toEqual(null);
  });

  test(`Валидация с не корректной датой`, async () => {
    let res = null;

    mock[`date_create`] = `Дата`;

    try {
      res = await schema.validateAsync(mock);
    } catch (err) {
      //
    }

    expect(res).toEqual(null);
  });
});
