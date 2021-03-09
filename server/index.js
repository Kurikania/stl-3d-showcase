require('dotenv').config()

const app = require('express')();
const {Nuxt, Builder}  = require('nuxt');
const config = require('../nuxt.config');


const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);


// Init body-parser options (inbuilt with express)

// app.use(bodyParser.json({limit: '50mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


builder.build()
  .then(() => {
  // Рендерить каждый маршрут с Nuxt.js
    app.use(nuxt.render)
    // Запустить сервер
    app.listen(process.env.PORT || 3000)
  });