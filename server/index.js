
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('express')();
const {Nuxt, Builder}  = require('nuxt');
const config = require('../nuxt.config.js');


const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);


builder.build()
  .then(() => {
  // Рендерить каждый маршрут с Nuxt.js
    app.use(nuxt.render)
    // Запустить сервер
    app.listen(process.env.PORT || 3000)
  });