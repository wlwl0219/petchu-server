"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // foreign key 연결
    await queryInterface.addConstraint("comments", {
      fields: ["postid"],
      type: "foreign key",
      name: "FK_comments_postid",
      references: {
        table: "posts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("comments", "FK_comments_postid");
  },
};
