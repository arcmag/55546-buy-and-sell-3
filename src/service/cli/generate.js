'use strict';

const chalk = require(`chalk`);
const nanoid = require(`nanoid`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);

const EXIT_CODE_ERROR = 1;
const DEFAULT_COUNT = 1;
const FILE_NAME = `mock.json`;
const MAX_SENTENCES_COUNT = 4;
const MAX_COMMENTS_COUNT = 10;
const MAX_COMMENTS_TEXT_COUNT = 5;

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

const getDataByFile = async (path) => (await fs.readFile(path)).toString().trim().split(`\n`);

module.exports = {
  name: `--generate`,
  async run(count) {
    if (count > 1000) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(EXIT_CODE_ERROR);
    }

    const titles = await getDataByFile(`data/titles.txt`);
    const sentences = await getDataByFile(`data/sentences.txt`);
    const categories = await getDataByFile(`data/categories.txt`);
    const comments = await getDataByFile(`data/comments.txt`);

    const mockData = Array.from({length: +(count || DEFAULT_COUNT)}, () => ({
      id: nanoid(),
      type: OfferType[getRandomInt(0, 1) ? `offer` : `sale`],
      title: titles[getRandomInt(0, titles.length - 1)],
      description: shuffle(sentences.slice()).slice(0, getRandomInt(1, MAX_SENTENCES_COUNT)),
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      picture: `item${(`` + getRandomInt(ItemImgCount.min, ItemImgCount.max)).padStart(2, `0`)}.jpg`,
      category: shuffle(categories.slice()).slice(0, getRandomInt(1, categories.length - 1)),
      comments: Array.from({length: getRandomInt(1, MAX_COMMENTS_COUNT)}, () => {
        return {
          id: nanoid(),
          text: shuffle(comments.slice()).slice(0, getRandomInt(1, MAX_COMMENTS_TEXT_COUNT)).join(` `)
        };
      })
    }));

    try {
      await fs.writeFile(FILE_NAME, JSON.stringify(mockData));
      console.log(chalk.green(`Данные успешно сгенерированы`));
    } catch (err) {
      console.error(chalk.red(`Ошибка при записи моковых данных в файл: ${err}`));
      process.exit(EXIT_CODE_ERROR);
    }
  }
};

