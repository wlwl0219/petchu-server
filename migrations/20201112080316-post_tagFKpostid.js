"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // foreign key 연결
    await queryInterface.addConstraint("post_tags", {
      fields: ["postid"],
      type: "foreign key",
      name: "FK_post_tags_postid",
      references: {
        table: "posts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("post_tags", "FK_post_tags_postid");
  },
};
