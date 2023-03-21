const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        const user = dbUserData.get({ plain: true })

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = user.id;
            res.status(200).json(user);
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if(!dbUserData) {
            res.status(400)
            .json({ message: 'Incorrect username or password. Please try again'});
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password. Please try again'});
            return;
        }

        const user = dbUserData.get({ plain: true })

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = user.id;

            res.status(200)
            .json({ user: user, message: 'You are now loggid in'});
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;