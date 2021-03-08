const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')

// Create express instnace
const app = express()

// Init body-parser options (inbuilt with express)

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Require & Import API routes
const users = require('./routes/users')
const models = require('./routes/models')
const comments = require('./routes/comments')

// Use API Routes
app.use(users)
app.use(models)
app.use(comments)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}