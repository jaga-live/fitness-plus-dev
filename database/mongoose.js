const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.DB


mongoose.connect(url, {

    useUnifiedTopology: true,
    useCreateIndex : true,
    useNewUrlParser : true
}, (err, res) => {

    if (err) console.log('Cannot connect to MongoDB Server')
    if (res) console.log("MongoDB Server Connected")


})


module.exports = mongoose