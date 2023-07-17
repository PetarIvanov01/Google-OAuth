const dashboard = require('../controllers/dashboard');
const authentication = require('../controllers/loginAuth');
const stories = require('../controllers/stories')
module.exports = (app) => {

    app.use('/', dashboard);
    app.use('/stories', stories)
    app.use('/auth', authentication);

}