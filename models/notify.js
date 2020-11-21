const mongoose = require('mongoose')

var notifySchema = new mongoose.Schema({

token : String,

friendId : String,

notify : {
    type:Boolean,
    default : true
},

alert:{
    type:Boolean,
    default :true
},

message: String,

date:{
    type:String
},

time: {
    type: String
}

})

var notify = mongoose.model('notify',notifySchema)


module.exports = notify