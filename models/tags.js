"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    static associate(models) {
      models.tags.hasMany(models.post_tags, {
        foreignKey: "tagid",
        sourceKey: "id",
      });
    }
  }
  tags.init(
    {
      tagname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tags",
    }
  );
  return tags;
};
