const mongoose = require('mongoose')


var adminSchema = new mongoose.Schema({


email: String,

password:{
    type: String,
    trim :true
}



})

var admin = mongoose.model('admin',adminSchema)


module.exports = admin