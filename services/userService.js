const mongoose = require('mongoose');
const User = require('../models/User');

async function saveUser(profile) {
    try {
        const user = await User.findOne({ googleId: profile.id })
        if (user) {
            return user
        }
        else {
            return await User.create({
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            })
        }

    } catch (error) {
        throw error
    }
}


module.exports = { saveUser }
