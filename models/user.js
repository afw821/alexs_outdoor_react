module.exports = function (connection, Sequelize) {
    const User = connection.define('User', {

        // Giving the Author model a name of type STRING
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [2, 50],
                notNull: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [5,25],
                notNull: true,
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [5,25],
                notNull: true,
                isLowerCase: true,
                isUpperCase: true,
                is: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
            }
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false 
        } 
    });

    User.associate = function (models) {

        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Purchase, {
            onDelete: 'cascade'
        });
    };
    

    return User;
};