const { saveUser } = require('../services/userService');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback'
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {
                    const user = await saveUser(profile)

                    return cb(null, user);

                } catch (error) {
                    console.error(error);
                }
            }))

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, {
                id: user._id,
                username: user.firstName,
                picture: user.image
            });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}
