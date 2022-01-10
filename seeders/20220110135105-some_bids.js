"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "art@arty.com",
          amount: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 1,
        },
        {
          email: "bert@berty.com",
          amount: 1900,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 1,
        },
        {
          email: "cassandra@cassy.com",
          amount: 1700,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 2,
        },
        {
          email: "doris@doriss.com",
          amount: 2500,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 2,
        },
        {
          email: "ernie@ernies.com",
          amount: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 2,
        },
        {
          email: "ferdinand@ferdies.com",
          amount: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {});
  },
};
