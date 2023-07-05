const hasUser = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login')
    }
}
const isGuest = (req, res, next) => {

    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    else {
        return next();
    }
}

module.exports = { hasUser, isGuest }