require('dotenv').config()


const app = require('express')();
const {Nuxt, Builder}  = require('nuxt');
const config = require('../nuxt.config.js');


const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);

const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')

// Init body-parser options (inbuilt with express)

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Require & Import API routes
const users = require('../api/routes/users')
const models = require('../api/routes/models')
const comments = require('../api/routes/comments')

// Use API Routes
app.use(users)
app.use(models)
app.use(comments)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}


builder.build()
  .then(() => {
  // Рендерить каждый маршрут с Nuxt.js
    app.use(nuxt.render)
    // Запустить сервер
    app.listen(process.env.PORT)
  });