"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // foreign key 연결
    await queryInterface.addConstraint("posts", {
      fields: ["userid"],
      type: "foreign key",
      name: "FK2_posts_userid",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("posts", "FK2_posts_userid");
  },
};
