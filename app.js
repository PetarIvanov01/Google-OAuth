const express = require('express');
const dotenv = require('dotenv');
const dbConfig = require('./config/dbConfig');
const expressConfig = require('./config/expressConfig');
const routesConfig = require('./config/routes');

dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000;

start();
async function start() {

    const app = express();
    
    await dbConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
}
