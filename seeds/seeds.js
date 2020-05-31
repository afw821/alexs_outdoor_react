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
    ])

});