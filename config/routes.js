const dashboard = require('../controllers/dashboard');
const authentication = require('../controllers/loginAuth');

module.exports = (app) => {

    app.use('/', dashboard);
    app.use('/auth', authentication);

}