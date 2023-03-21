const { Comment } = require('../models');

const commentData = [
    {
        text: " ",
        user_id: 1,
        post_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;