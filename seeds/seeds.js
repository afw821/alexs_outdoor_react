// Import Database Models
// =============================================================
const db = require('../models');
// Syncing our sequelize models 
// =============================================================
db.sequelize.sync().then(function () {
    db.Category.bulkCreate([
        {
            "name": "Sporting",
        },
        {
            "name": "Recreation",
        },
        {
            "name": "Fishing",
        },
        {
            "name": "Water Sports",
        },
        {
            "name": "Hunting",
        },
        {
            "name": "Outdoor",
        },
    ]).then(function (response) {
        console.log('------Data Categories Seeded!!---------');

        db.User.bulkCreate([
            {
                "firstName": "Alex",
                "lastName": "Watkins",
                "address": "123 Main St",
                "address2": null,
                "city": "Atlanta",
                "state": "Ga",
                "zipCode": 12345,
                "email": "afw821@gmail.com",
                "password": "12345",
                "isAdmin": true
            },
            {
                "firstName": "Crystal",
                "lastName": "Watkins",
                "address": "123 Main St",
                "address2": "Apt 22",
                "city": "Atlanta",
                "state": "Ga",
                "zipCode": 12345,
                "email": "cctennis23@gmail.com",
                "password": "12345",
                "isAdmin": false
            }

        ]).then(function (res) {
            console.log('------Data Users Seeded!!---------');
            db.Product.bulkCreate([
                {
                    "name": "molestie in, tempus eu, ligula. Aenean euismod mauris eu elit.",
                    "inStock": 4,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "a purus. Duis elementum, dui quis accumsan convallis, ante lectus",
                    "inStock": 5,
                    "price": 4.99,
                    "CategoryId": 2
                },
                {
                    "name": "et pede. Nunc sed orci lobortis augue scelerisque mollis. Phasellus",
                    "inStock": 9,
                    "price": 4.99,
                    "CategoryId": 6
                },
                {
                    "name": "dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et",
                    "inStock": 9,
                    "price": 4.99,
                    "CategoryId": 4
                },
                {
                    "name": "sit amet luctus vulputate, nisi sem semper erat, in consectetuer",
                    "inStock": 4,
                    "price": 4.99,
                    "CategoryId": 5
                },
                {
                    "name": "sit amet, consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet",
                    "inStock": 9,
                    "price": 4.99,
                    "CategoryId": 2
                },
                {
                    "name": "arcu. Vestibulum ante ipsum primis in faucibus orci luctus et",
                    "inStock": 5,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit",
                    "inStock": 5,
                    "price": 4.99,
                    "CategoryId": 3
                },
                {
                    "name": "et tristique pellentesque, tellus sem mollis dui, in sodales elit",
                    "inStock": 5,
                    "price": 4.99,
                    "CategoryId": 6
                },
                {
                    "name": "orci. Ut semper pretium neque. Morbi quis urna. Nunc quis",
                    "inStock": 2,
                    "price": 4.99,
                    "CategoryId": 6
                },
                {
                    "name": "egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere",
                    "inStock": 3,
                    "price": 4.99,
                    "CategoryId": 4
                },
                {
                    "name": "tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus. Nullam",
                    "inStock": 7,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "in consequat enim diam vel arcu. Curabitur ut odio vel",
                    "inStock": 9,
                    "price": 4.99,
                    "CategoryId": 2
                },
                {
                    "name": "tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec",
                    "inStock": 7,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "sit amet, risus. Donec nibh enim, gravida sit amet, dapibus",
                    "inStock": 8,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "a feugiat tellus lorem eu metus. In lorem. Donec elementum,",
                    "inStock": 8,
                    "price": 4.99,
                    "CategoryId": 3
                },
                {
                    "name": "vitae risus. Duis a mi fringilla mi lacinia mattis. Integer",
                    "inStock": 7,
                    "price": 4.99,
                    "CategoryId": 5
                },
                {
                    "name": "tellus justo sit amet nulla. Donec non justo. Proin non",
                    "inStock": 6,
                    "price": 4.99,
                    "CategoryId": 6
                },
                {
                    "name": "blandit viverra. Donec tempus, lorem fringilla ornare placerat, orci lacus",
                    "inStock": 2,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "egestas, urna justo faucibus lectus, a sollicitudin orci sem eget",
                    "inStock": 10,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "erat eget ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor.",
                    "inStock": 8,
                    "price": 4.99,
                    "CategoryId": 3
                },
                {
                    "name": "mattis ornare, lectus ante dictum mi, ac mattis velit justo",
                    "inStock": 4,
                    "price": 4.99,
                    "CategoryId": 1
                },
                {
                    "name": "fames ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque",
                    "inStock": 9,
                    "CategoryId": 1
                },]).then(function (res) {
                    console.log('----------products seeded-------');
                }).catch(function (err) {
                    console.log('----error seeding products------');
                })
        }).catch(function (err) {
            console.log('err seeding users');
        })

    }).catch(function (error) {
        console.log('------Error seeding categories-------');
    });
});