'use strict';

const fs = require(`fs`);
const {getRandomInt, shuffle} = require(`../../utils`);

const EXIT_CODE_ERROR = 1;
const DEFAULT_COUNT = 1;
const FILE_NAME = `mock.json`;
const MAX_SENTENCES_COUNT = 4;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const ItemImgCount = {
  min: 1,
  max: 16,
};

module.exports = {
  name: `--generate`,
  run(count) {
    if (count > 1000) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(EXIT_CODE_ERROR);
    }

    const mockData = Array(+(count || DEFAULT_COUNT)).fill(null).map(() => ({
      type: OfferType[getRandomInt(0, 1) ? `offer` : `sale`],
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      description: shuffle(SENTENCES.slice()).slice(0, getRandomInt(1, MAX_SENTENCES_COUNT)),
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      picture: `item${(`` + getRandomInt(ItemImgCount.min, ItemImgCount.max)).padStart(2, `0`)}.jpg`,
      category: shuffle(CATEGORIES.slice()).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
    }));

    fs.writeFile(FILE_NAME, JSON.stringify(mockData), (err) => {
      if (err) {
        console.error(`Ошибка при записи моковых данных в файл`);
        process.exit(EXIT_CODE_ERROR);
      }

      console.log(`Данные успешно сгенерированы`);
      process.exit();
    });
  }
};

