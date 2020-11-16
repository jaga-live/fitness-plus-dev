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

    time : {
        type: Number,
        
    },
    date:{
        
    }


})


let work = mongoose.model('work', workSchema)


module.exports = work

