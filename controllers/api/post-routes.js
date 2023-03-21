const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/create', async (req, res) => {
    console.log('trying')

    try{
        const dbPostData = await Post.create({
            title: req.body.title, content: req.body.content,
            user_id: req.session.user_id
        });
        console.log('post created')
        res.status(200).json({message: 'post created'});
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;