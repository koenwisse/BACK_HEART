"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Artwork Title 1",
          imageUrl: "https://imgur.com/gallery/MRhYAHD",
          hearts: 111,
          minimumBid: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Artwork Title 2",
          imageUrl: "https://imgur.com/gallery/5yeBVeM",
          hearts: 222,
          minimumBid: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: "Artwork Title 3",
          imageUrl: "https://imgur.com/gallery/gNuPO",
          hearts: 333,
          minimumBid: 333,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("artworks", null, {});
  },
};
