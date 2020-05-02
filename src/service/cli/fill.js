'use strict';
const fs = require(`fs`).promises;

const GeneratorHelper = require(`../../GeneratorHelper`);

const chalk = require(`chalk`);
const {getOfferData} = require(`../../utils`);

const EXIT_CODE_ERROR = 1;
const DEFAULT_OFFER_COUNT = 5;

const FILE_NAME = `fill-db.sql`;
const MAX_SENTENCES_COUNT = 4;
const MAX_COMMENTS_TEXT_COUNT = 5;

const CommentsCount = {
  min: 2,
  max: 10,
};

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
  name: `--fill`,
  async run(count) {
    if (count > 1000) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(EXIT_CODE_ERROR);
    }

    const generator = new GeneratorHelper(await getOfferData());

    const user = generator.createUser({
      id: 1,
      avatar: 'avatar.jpg',
      name: 'Bob',
      email: 'bob@mail.ru',
      password: '123456'
    });

    const user2 = generator.createUser({
      id: 2,
      avatar: 'avatar02.jpg',
      name: 'Rob',
      email: 'rob@mail.ru',
      password: '123456'
    });

    const offerConfig = {
      type: Object.values(OfferType),
      maxSentencesCount: MAX_SENTENCES_COUNT,
      imgCount: ItemImgCount,
      sumRestrict: SumRestrict,
      commentsCount: CommentsCount,
      maxCommentsTextCount: MAX_COMMENTS_TEXT_COUNT,
    };

    const halfOffersCount = parseInt(DEFAULT_OFFER_COUNT / 2, 10);
    const offers = Array.from({length: +(count || DEFAULT_OFFER_COUNT)}, (_it, idx) =>
      generator.createOffer((idx > halfOffersCount ? user2 : user).id, {...offerConfig, id: idx + 1})
    );

    try {
      await fs.writeFile(FILE_NAME, generator.generateSql());
      console.log(chalk.green(`Данные успешно сгенерированы`));
    } catch (err) {
      console.error(chalk.red(`Ошибка при записи моковых данных в файл: ${err}`));
      process.exit(EXIT_CODE_ERROR);
    }
  }
};

