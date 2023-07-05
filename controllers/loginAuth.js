const router = require('express').Router();
const passport = require('passport');
const { hasUser, isGuest } = require('../middlewares/guards');

//Rendering login page
router.get('/login', isGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })

})

// Auth with Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Auth callback 
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
        res.redirect('/');
    })

// Logout
router.get('/logout', hasUser, (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
})
module.exports = router