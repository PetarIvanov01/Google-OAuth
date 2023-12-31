const morgan = require('morgan');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');

module.exports = (app) => {
    //Passport config
    require('../config/passport')(passport);

    //Showing stuff on the console when request is made
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    //Parsing body
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    //Method override
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method
            delete req.body._method
            return method
        }
    }))

    //Handlebars Helpers
    const { formatDate, truncate, stripTags, editIcon, select } = require('../helpers/hbs');

    //Handlebars Config
    app.engine('.hbs', exphbs.engine({ helpers: { formatDate, editIcon, truncate, stripTags, select }, defaultLayout: 'main', extname: '.hbs' }));
    app.set('view engine', '.hbs');

    //Session Config
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
    }))

    //Passport middlewares
    app.use(passport.initialize());
    app.use(passport.session());

    //Set global var
    app.use(function (req, res, next) {
        res.locals.user = req.user || null;
        next();
    })

    //Static files middleware
    app.use(express.static(path.join(__dirname, '../public')));

}