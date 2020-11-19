const mongoose = require('mongoose')

//Utility
var date = require('../utility/date')



const workSchema = new mongoose.Schema({

    userId: {
        type: String
    },

    workouts:{
        type: Object
    },

    activityPoints:{
        type:Number
    },

    time : {
        type: Number,
        default : 0
        
    },
    date:{
        type:String
    }


})


let work = mongoose.model('work', workSchema)


module.exports = work

