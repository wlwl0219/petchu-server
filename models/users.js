"use strict";

const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
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
      hooks: {
        beforeCreate: (data, option) => {
          const shasum = crypto.createHmac("sha512", "mysecretkey");
          shasum.update(data.password);
          data.password = shasum.digest("hex");
        },
        beforeFind: (data, option) => {
          if (data.where.password) {
            const shasum = crypto.createHmac("sha512", "mysecretkey");
            shasum.update(data.where.password);
            data.where.password = shasum.digest("hex");
          }
        },
      },
    }
  );
  users.associate = function (models) {
    models.users.hasMany(models.comments, {
      foreignKey: "userid",
      sourceKey: "id",
    });
    models.users.hasMany(models.posts, {
      foreignKey: "userid",
      sourceKey: "id",
    });
  };
  return users;
};
