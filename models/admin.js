const mongoose = require('mongoose')


var adminSchema = new mongoose.Schema({


email: String,

password:{
    type: String,
    trim :true
},

jwt:{
    type :Array
}



})

var admin = mongoose.model('admin',adminSchema)


module.exports = admin