"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      models.users.hasMany(models.comments, {
        foreignKey: "userid",
        sourceKey: "id",
      });
      models.users.hasMany(models.posts, {
        foreignKey: "userid",
        sourceKey: "id",
      });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      nickname: DataTypes.STRING,
      icon: DataTypes.STRING,
      userinfo: DataTypes.STRING,
      socialinfo: DataTypes.STRING,
      petinfo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
