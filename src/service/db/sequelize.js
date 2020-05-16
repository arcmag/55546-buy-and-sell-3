'use strict';

const config = require(`../../config`);

const {Sequelize} = require(`sequelize`);
const sequelize = new Sequelize(
    config.DB_PGDATABASE,
    config.DB_PGUSER,
    config.DB_PGPASSWORD, {
      dialect: `postgres`,
      host: config.DB_PGHOST,
      port: config.DB_PGPORT,
    });

module.exports = (async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully.`);
  } catch (err) {
    console.error(`Unable to connect to the database:`, err);
  }

  return sequelize;
})();
