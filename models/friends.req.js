const mongoose= require('mongoose')

const friendSchema = new mongoose.Schema({

token: String,

friendName: String,

friendId : String,

friendMail: String,

status : {
    type : String,
    default : "pending"
},


})

const friend = mongoose.model('friend-req',friendSchema)


module.exports = friend