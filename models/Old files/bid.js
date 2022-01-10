"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // - bid belongs to artwork
      bid.belongsTo(models.artwork);
    }
  }
  //   ### Bid

  // | key       | data type | required | notes                                |
  // | --------- | --------- | -------- | ------------------------------------ |
  // | id        | Integer   | yes      | Already added by model:generate      |
  // | email     | String    | yes      |                                      |
  // | amount    | Integer   | yes      |                                      |
  // | createdAt | Date      | yes      | Already added by model:generate      |
  // | updatedAt | Date      | yes      | Already added by model:generate      |
  // | artworkId | Integer   | yes      | Foreign key (references an artworks) |

  // **Relations:**

  // - bid belongs to artwork

  user.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      artworkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return bid;
};
