const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({

token: String,

friendId : String


})


var friend = mongoose.model('friend',friendSchema)

module.exports = friend