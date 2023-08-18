const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');
const Story = require('../models/Story');
const { createStories, getPublicStories, getStorieById, updateStory, deleteStory, getFullStory, getUserStories } = require('../services/storyService');

//Post
//Creating a storie
router.post('/create', hasUser, async (req, res) => {
    try {

        req.body.user = req.user.id;
        await createStories(req.body)

        res.redirect('/');

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
        res.render('error/500');
    }
})

//Show full story
router.get('/:id', hasUser, async (req, res) => {
    try {
        const story = await getFullStory(req.params.id);

        if (!story) {
            return res.render('error/404');
        }

        res.render('stories/show', {
            story
        })
    } catch (error) {
        console.error(error)
        res.render('error/404');
    }
})

//Show edit storie
router.get('/edit/:id', hasUser, async (req, res) => {

    try {
        const id = req.params.id;
        const item = await getStorieById(id);

        if (!item) {
            return res.render('error/404')
        }

        if (item.user != req.user.id) {
            res.redirect('/stories')
        }
        else {
            res.render('stories/edit', {
                item,
            })
        }

    } catch (error) {
        res.render('error/500');
    }
})

//Update storie
router.put('/:id', hasUser, async (req, res) => {

    try {

        let story = await getStorieById(req.params.id)

        if (!story) {
            return res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/stories')
        }
        else {
            story = await updateStory(req.params.id, req.body);

        }
        res.redirect('/');

    } catch (error) {
        console.error(error)
        return res.render('error/500');
    }
})

//DELETE storie
router.delete('/:id', hasUser, async (req, res) => {
    try {
        await deleteStory(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error(error)
        return res.render('error/500');
    }
})


router.get('/user/:userId', hasUser, async (req, res) => {
    try {
        const stories = await getUserStories(req.params.userId);

        res.render('stories/index', {
            stories
        })
    } catch (error) {
        console.error(error);
        res.render('error/500')
    }
})

module.exports = router