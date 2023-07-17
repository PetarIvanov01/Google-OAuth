const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');
const { createStories, getPublicStories } = require('../services/storyService');

//Post
//Creating a storie
router.post('/create', hasUser, async (req, res) => {
    try {

        req.body.user = req.user.id;
        await createStories(req.body)

        res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
})
//Rendering stories page
router.get('/create', hasUser, (req, res) => {
    try {

        res.render('stories/create');

    } catch (error) {
        res.render('error/500')
    }
})

//Show all Stories
router.get('/', hasUser, async (req, res) => {
    try {

        const stories = await getPublicStories();

        res.render('stories/index', {
            stories
        })

    } catch (error) {
        res.render('error/500')
    }
})




module.exports = router