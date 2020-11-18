module.exports = function (connection, Sequelize) {
  const Purchase = connection.define("Purchase", {
    // Giving the Purchase model a name of type STRING
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stripePaymentId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Purchase.associate = function (models) {
    // We're saying that a Article should belong to an Author
    // A Article can't be created without an Author due to the foreign key constraint
    Purchase.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    Purchase.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Purchase;
};
