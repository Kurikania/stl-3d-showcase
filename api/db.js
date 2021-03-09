const mongoose = require('mongoose')

mongoose.connect( process.env.DATABASE_URL|| 'mongodb://localhost/test', {useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to the Database. Yayzow!");
})
.catch(err => {
    console.log(err);
});

//mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log("Connected to mongoose"))

module.exports = db