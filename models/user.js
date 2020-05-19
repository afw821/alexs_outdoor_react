
const bcrypt = require('bcryptjs');
const hashPassword = async function (user){
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.isAdmin = false;
}


module.exports = function (connection, Sequelize) {
    const User = connection.define('User', {

        // Giving the Author model a name of type STRING
        name: {
            type: Sequelize.STRING,
            validate: {
                len: [2, 50],
                
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                len: [5,25],
            
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                len: [5,25],
                is: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
            }
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
        } 
    });

    User.associate = function (models) {

        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Purchase, {
            onDelete: 'cascade'
        });
    };

    User.beforeCreate(hashPassword)
    

    return User;
};