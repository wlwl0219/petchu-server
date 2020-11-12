"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      models.posts.hasMany(models.comments, {
        foreignKey: "postid",
        sourceKey: "id",
      });
      models.posts.belongsTo(models.users, {
        foreignKey: "userid",
        targetKey: "id",
      });
      models.posts.hasMany(models.post_tags, {
        foreignKey: "postid",
        sourceKey: "id",
      });
    }
  }
  posts.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      content: DataTypes.STRING,
      userid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return posts;
};
