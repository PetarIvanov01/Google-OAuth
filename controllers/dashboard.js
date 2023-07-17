const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');
const { getAllStories } = require('../services/storyService');

//Rendering dashboard page
router.get('/', hasUser, (req, res) => {
    res.render('home');
})

router.get('/dashboard', hasUser, async (req, res) => {

    try {
        const stories = await getAllStories(req.user.id);

        res.render('dashboard', {
            name: req.user.username,
            stories
        });
    } catch (error) {
        res.render('error/500');
    }
})




module.exports = router