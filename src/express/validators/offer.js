'use strict';

const Joi = require(`@hapi/joi`);

module.exports = Joi.object({
  'title': Joi.string().min(3).max(255).required().messages({
    'string.min': `Минимальная длинна заголовка {#limit} символа`,
    'string.max': `Максимальная длинна заголовка {#limit} символа`,
    'string.required': `Поле обязательно к заполнению`,
  }),
  'img': Joi.string(),
  'price': Joi.number().required(),
  'type': Joi.string().valid(`buy`, `sell`).required(),
  'description': Joi.string(),
  'categories': Joi.array().items(Joi.number()),
  'author_id': Joi.number().required(),
  'date_create': Joi.date(),
});
