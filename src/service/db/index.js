'use strict';

const logger = require(`../../logger`).getLogger();
const {Pool} = require(`pg`);
const pool = new Pool();

module.exports = async () => {
  logger.info(`Подключение к БД`);
  let connect = null;

  try {
    connect = await pool.connect();
    logger.info(`Соединение установлено`);
  } catch (err) {
    logger.error(`Ошибка при подключении к БД: ${err}`);
    return false;
  }

  return {connect, pool};
};
