module.exports = function (connection, Sequelize) {
    const Product = connection.define('Product', {

        // Giving the Product model a name of type STRING
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate :{
                len: [2, 50],
                notNull: true
            }
        },
        inStock: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                isNumeric: true
            }
        }
    });

    Product.associate = function (models) {

        // Associating Product with Posts
        // When an Product is deleted, also delete any associated Posts
        Product.hasMany(models.Purchase, {
            onDelete: 'cascade'
        });

        Product.belongsTo(models.Category, { //creates CategoryId foreign key
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Product;
};