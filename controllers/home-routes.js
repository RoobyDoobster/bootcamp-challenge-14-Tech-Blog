const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const withAuth = require('../utils/auth');
const moment = require('moment');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            limit: 50,
            include: [
                { model: User },
            ],
            order: [
                ['createdAt', 'DESC'],
            ]
        });

        const posts = dbPostData.map((element) => 
        element.get({ plain: true }));

        posts.forEach(element => {
            element.createdAt = moment(new Date(element.createdAt.toISOSring()).format('M/D/YYY'))
        });

        res.render('homepage', {
            posts: posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                { model: User },
                {
                    model: Comment,
                    include: [
                        { model: User }
                    ]
                },
            ],
        });
        if(!dbPostData) {
            res.status(400).json({ message: 'post does not exsist'});
        }

        const post = dbPostData.get({ plain: true })

        post.createdAt = moment(new Date(post.createdAt).toISOString()).format('M/D/YYYY');

        post.comments.forEach(element => {
            element.createdAt = moment(new Date(element.createdAt).toISOString()).format('M/D/YYYY');
        });

        res.render('post', { post: post, loggedIn: req.session.loggedIn});
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.sessionloggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
    if(!(req.sessionloggedIn)) {
        res.redirect('/');
        return;
    }
    try {
        const dbPostData = await Post.findAll({
            limit: 50,
            where: {
                user_id: req.session.user_id
            },
            include: [
                { model: User },
            ],
            order: [
                ['createdAt', 'DESC'],
            ]
        });

        const posts = dbPostData.map((element) =>
        element.get({ plain: true }));

        posts.forEach(element => {
            element.createdAt = moment(new Date(posts[0].createdAt).toISOString()).format('M/D/YYYY');
        });

        res.render('daschboard', { posts: posts, loggedIn: req.session.loggedIn });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;