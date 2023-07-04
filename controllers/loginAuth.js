const router = require('express').Router();
const passport = require('passport');
//Rendering login page

router.get('/login', (req, res) => {

    res.render('login', {
        layout: 'login'
    })

})
// Auth with Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
        res.redirect('/');
    })

module.exports = router