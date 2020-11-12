"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class post_tags extends Model {
    static associate(models) {
      models.post_tags.belongsTo(models.posts, {
        foreignKey: "postid",
        targetKey: "id",
      });
      models.post_tags.belongsTo(models.tags, {
        foreignKey: "tagid",
        targetKey: "id",
      });
    }
  }
  post_tags.init(
    {
      postid: DataTypes.INTEGER,
      tagid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "post_tags",
    }
  );
  return post_tags;
};
