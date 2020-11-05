const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

email:{
    type : String,
    trim : true,
    unique : true
},

password:{
    type:String,
    trim: true
},

name:{
    type:String
},

avatar:{
    type:String,
    default:"none"
},

workoutType:{
    type : Object,
    default :{
        'pushups': 0,
        'pullups': 0,
        'squats': 0
    }
},
jwt:{
    type:Array
}



})


let user = mongoose.model('user',userSchema)


module.exports = user

