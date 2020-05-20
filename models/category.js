module.exports = function (connection, Sequelize) {
    const Category = connection.define('Category', {

        // Giving the Product model a name of type STRING
        name: {
            type: Sequelize.STRING,
            validate :{
                len: [2, 50]
            }
        }
    });

    Category.associate = function (models) {

        // Associating Product with Posts
        // When an Product is deleted, also delete any associated Posts
        Category.hasMany(models.Product, {
            onDelete: 'cascade'
        });

    };

    return Category;
};