const morgan = require('morgan');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

module.exports = (app) => {
    //Passport config
    require('../config/passport')(passport);

    //Showing stuff on the console when request is made
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    //Handlebars Config
    app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
    app.set('view engine', '.hbs');

    //Session Config
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }))

    //Passport middlewares
    app.use(passport.initialize());
    app.use(passport.session());

    //Static files middleware
    app.use(express.static(path.join(__dirname, '../public')));

}