module.exports = function (connection, Sequelize) {
    const Cart = connection.define('Cart', {

        // Giving the Cart model a name of type STRING
        name: {
            type: Sequelize.STRING
        }
    });

    Cart.associate = function (models) {

        // We're saying that a Article should belong to an Author
        // A Article can't be created without an Author due to the foreign key constraint
        Cart.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Cart.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Cart;
};