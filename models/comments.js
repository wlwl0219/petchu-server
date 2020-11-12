"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    static associate(models) {
      models.comments.belongsTo(models.users, {
        foreignKey: "userid",
        targetKey: "id",
      });
      models.comments.belongsTo(models.posts, {
        foreignKey: "postid",
        targetKey: "id",
      });
    }
  }
  comments.init(
    {
      postid: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
