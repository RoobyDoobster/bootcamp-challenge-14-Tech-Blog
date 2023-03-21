const sequelize = require('../config/connection');
const seedUsers = require('./User');
const seedPosts = require('./Post');
const seedComment = require('./Comment');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log(`\n----- DATABASE SYNCED -----\n`);

    await seedUsers();
    console.log(`\n----- seedUsers SEEDED -----\n`);
    
    await seedPosts();
    console.log(`\n----- seedPosts SEEDED -----\n`);
    
    await seedComment();
    console.log(`\n----- seedComment SEEDED -----\n`);

    process.exit(0);
};

seedAll();