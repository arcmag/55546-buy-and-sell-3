'use strict';

const level = process.env.LOG_LEVEL;
const logger = require(`pino`)({
  name: `pino-and-express`,
  level: level ? level.trim() : `info`,
  prettyPrint: {
    translateTime: (new Date()).toLocaleString(`ru`,
        [`hour`, `minute`, `second`].reduce((obj, it) => ({...obj, [it]: `numeric`}), {})
    )
  }
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
