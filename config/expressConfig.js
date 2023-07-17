const morgan = require('morgan');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')

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

    //Handlebars Helpers
    const { formatDate, truncate, stripTags, editIcon } = require('../helpers/hbs');

    //Handlebars Config
    app.engine('.hbs', exphbs.engine({ helpers: { formatDate, editIcon, truncate, stripTags }, defaultLayout: 'main', extname: '.hbs' }));
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