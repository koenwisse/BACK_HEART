"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Artwork Title 1",
          imageUrl: "https://imgur.com/RCkbo5h.png",
          hearts: 111,
          minimumBid: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Artwork Title 2",
          imageUrl: "https://imgur.com/prZA4Ik.png",
          hearts: 222,
          minimumBid: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: "Artwork Title 3",
          imageUrl: "https://imgur.com/AtdREis.png",
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
