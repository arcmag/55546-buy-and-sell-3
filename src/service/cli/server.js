'use strict';

const logger = require(`../../logger`).getLogger();

const DEFAULT_PORT = 8080;

module.exports = {
  name: `--server`,
  run(port) {
    require(`../../express`).listen(port || DEFAULT_PORT, () => {
      logger.info(`Запуск сервера`);
    }).on(`error`, (err) => {
      logger.error(`Server can't start. Error: ${err}`);
    });
  }
};
