const router = require("express").Router();
var passport = require('passport');
var User = require('../models/User');

router.post("/register", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, function (err) {
        if (err) {
            console.log('error while user register!', err);
            return next(err);
        }

        console.log('user registered!');

        res.sendStatus(200);
    });
});



router.post("/login", passport.authenticate('local'), function (req, res) {
    res.sendStatus(200);
    console.log('user authenticated')
})
router.get('/login', function (req, res) {
    res.send({ user: req.user });
    console.log(req.user);
});


router.get('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
});


module.exports = router;