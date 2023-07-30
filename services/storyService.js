const Story = require('../models/Story')

async function getAllStories(id) {
    try {
        return Story.find({ user: id }).lean();
    } catch (error) {
        throw error
    }
}

async function getUserStories(userId) {
    try {
        return Story.find({ user: userId, status: 'public' }).populate('user').lean();
    } catch (error) {
        throw error
    }
}

async function getFullStory(id) {
    try {
        return await Story.findById(id).populate('user').lean();
    } catch (error) {
        throw error
    }
}
async function getStorieById(id) {
    try {
        return Story.findOne({ _id: id }).lean();
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
        return Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();

    } catch (error) {
        throw error
    }
}
async function updateStory(id, story) {
    try {
        return Story.findByIdAndUpdate({ _id: id }, story, {
            new: true,
            runValidators: true
        })
    } catch (error) {
        throw error
    }
}

async function deleteStory(id) {
    try {
        await Story.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }
}
module.exports = { getAllStories, getUserStories,getFullStory, deleteStory, createStories, updateStory, getPublicStories, getStorieById }