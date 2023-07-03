const morgan = require('morgan');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');

module.exports = (app) => {

    if (process.env.NODE_ENV === 'development') {
        //Showing stuff on the console when request is made
        app.use(morgan('dev'))
    }

    app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
    app.set('view engine', '.hbs');

    app.use(express.static(path.join(__dirname, '../public')));

}