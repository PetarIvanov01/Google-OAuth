const Story = require('../models/Story')

async function getAllStories(id) {
    try {
        return Story.find({ user: id }).lean();
    } catch (error) {
        throw error
    }
}

async function createStories(data) {
    try {
        const { title, status, body, user } = data;

        await Story.create({
            title,
            status,
            body,
            user
        })

    } catch (error) {
        throw error
    }
}

async function getPublicStories() {
    try {
        return Story.find({ status:'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();

    } catch (error) {
        throw error
    }
}

module.exports = { getAllStories, createStories, getPublicStories }