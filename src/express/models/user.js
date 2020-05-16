'use strict';

const {Model, DataTypes} = require(`sequelize`);

class User extends Model { }

(async () => {
  const sequelize = await require(`../../service/db/sequelize`);

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {sequelize, modelName: `user`, timestamps: false});

  sequelize.sync()
    .then(() => User.create({
      name: `janedoe`,
      email: `janedoe`,
      password: `janedoe`,
      avatar: `janedoe`
    }))
    .then((jane) => {
      console.log(jane.toJSON());
    })
    .catch((err) => {
      console.log(err);
    });
})();
