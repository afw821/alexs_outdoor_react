module.exports = function (connection, Sequelize) {
  const Review = connection.define("Review", {
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    stars: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    Review.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Review;
};
