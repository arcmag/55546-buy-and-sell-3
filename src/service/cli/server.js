'use strict';

const config = require(`../../config`);
const db = require(`../db`);
const logger = require(`../../logger`).getLogger();
const app = require(`../../express`);

const DEFAULT_PORT = 8080;

const getPort = () => {
  if (process.env.PORT) {
    return +(process.env.PORT.trim());
  }

  return +(config.PORT || DEFAULT_PORT);
};

module.exports = {
  name: `--server`,
  async run() {
    const dataDb = await db();
    if (!dataDb) {
      logger.error(`Прекращение работы`);
      process.exit(1);
    }

    app.listen(getPort(), () => {
      logger.info(`Запуск сервера`);
    }).on(`error`, (err) => {
      logger.error(`Server can't start. Error: ${err}`);
    });
  }
};
