const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');

//Rendering dashboard page
router.get('/', hasUser, (req, res) => {
    res.render('home');
})

router.get('/dashboard', hasUser, (req, res) => {
    
    res.render('dashboard',{
        name: req.user.username
    });
})

//Rendering stories page
router.get('/stories', hasUser, (req, res) => {
    res.render('stories');
})




module.exports = router