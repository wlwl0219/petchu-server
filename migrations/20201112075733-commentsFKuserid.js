"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // foreign key 연결
    await queryInterface.addConstraint("comments", {
      fields: ["userid"],
      type: "foreign key",
      name: "FK_comments_userid",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("comments", "FK_comments_userid");
  },
};
