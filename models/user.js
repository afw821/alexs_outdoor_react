const bcrypt = require("bcryptjs");
const hashPassword = async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.isAdmin = false;
};

module.exports = function (connection, Sequelize) {
  const User = connection.define("User", {
    // Giving the Author model a name of type STRING
    firstName: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    address: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    address2: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    state: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    zipCode: {
      type: Sequelize.INTEGER,
      validate: {
        len: [2, 50],
      },
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        len: [5, 50],

        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: [5, 50],
        is: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g,
      },
    },
    isAdmin: {
      type: Sequelize.TINYINT,
    },
  });

  User.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Purchase, {
      onDelete: "cascade",
    });
  };

  User.beforeCreate(hashPassword);

  return User;
};
