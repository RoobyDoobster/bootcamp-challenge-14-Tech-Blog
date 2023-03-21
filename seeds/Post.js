const { Post } = require('../models');

const postData = [
    {
        title: " ",
        content: " ",
        user_id: 1,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;