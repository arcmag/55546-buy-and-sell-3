'use strict';

const {getRandomInt, shuffle} = require(`./utils`);

const CategoryCode = {
  'Книги': `books`,
  'Разное': `other`,
  'Посуда': `tableware`,
  'Игры': `games`,
  'Животные': `animals`,
  'Журналы': `journals`,
};

module.exports = class GeneratorHelper {
  constructor(data) {
    this.data = data;

    this.categories = [];
    this.users = [];
    this.offers = [];
    this.comments = [];

    this.offersCategory = [];

    this.categoriesInit();
  }

  createUser(config) {
    this.users.push(config);
    return config;
  }

  categoriesInit() {
    this.categories = this.data.categories.map((name, idx) => ({
      id: idx + 1,
      name,
      code: CategoryCode[name]
    }));
  }

  createOffer(author_id, config) {
    const {titles, sentences} = this.data;

    const offer = {
      id: config.id,
      author_id,
      type: config.type[getRandomInt(0, (config.type.length - 1))],
      title: titles[getRandomInt(0, titles.length - 1)],
      description: shuffle(sentences.slice()).slice(0, getRandomInt(1, config.maxSentencesCount)),
      price: getRandomInt(config.sumRestrict.min, config.sumRestrict.max),
      img: `item${(`` + getRandomInt(config.imgCount.min, config.imgCount.max)).padStart(2, `0`)}.jpg`,
      date_create: Date.now(),
    };

    this.offers.push(offer);
    this.offerAddCategories(offer.id);
    this.offerAddComments(offer.id, author_id, config);

    return offer;
  }

  offerAddCategories(offer_id) {
    const offerCategories = shuffle(this.categories.slice()).slice(0, getRandomInt(1, this.categories.length - 1))
      .map(({id}, idx) => ({id: idx + this.offersCategory.length + 1, offer_id, category_id: id}));

    this.offersCategory = [...this.offersCategory, ...offerCategories];
  }

  offerAddComments(offer_id, author_id, config) {
    const offerComments = Array.from({length: getRandomInt(config.commentsCount.min,
        config.commentsCount.max)}, (_it, idx) => ({
      id: idx + this.comments.length + 1,
      author_id,
      offer_id,
      text: shuffle(this.data.comments.slice()).slice(0, getRandomInt(1, config.maxCommentsTextCount)).join(` `),
      date_create: Date.now(),
    }));

    this.comments = [...this.comments, ...offerComments];
  }

  createStringSql(table, rows, data) {
    return `INSERT INTO ${table} (${rows}) VALUES\r ${data.map((it, idx, arr) =>
      `\t(${it})${(idx + 1 !== arr.length ? `,` : `;`)}\r`).join(``)}\r\r`;
  }

  generateSql() {
    const {categories, users, offers, offersCategory, comments} = this;
    let result = ``;

    result += this.createStringSql(`categories`, [`id`, `name`, `code`],
        categories.map(({id, name, code}) => [id, `'${name}'`, `'${code}'`]));

    result += this.createStringSql(`users`, [`id`, `avatar`, `name`, `email`, `password`],
        users.map(({id, avatar, name, email, password}) =>
          [id, `'${avatar}'`, `'${name}'`, `'${email}'`, `'${password}'`]));

    result += this.createStringSql(`offers`, [`id`, `title`, `img`, `price`, `type`, `description`, `author_id`],
        offers.map(({id, title, img, price, type, description, author_id}) =>
          [id, `'${title}'`, `'${img}'`, `'${price}'`, `'${type}'`, `'${description}'`, `'${author_id}'`]));

    result += this.createStringSql(`offers_category`, [`id`, `offer_id`, `category_id`],
        offersCategory.map(({id, offer_id, category_id}) => [id, offer_id, category_id]));

    result += this.createStringSql(`comments`, [`id`, `author_id`, `offer_id`, `text`],
        comments.map(({id, author_id, offer_id, text}) => [id, author_id, offer_id, `'${text}'`]));

    return result;
  }
};
