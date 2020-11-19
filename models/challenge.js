const mongoose = require("mongoose")

var challengeSchema = new mongoose.Schema({


date : String,

valid : Number,

workoutName : String,


})

var challenge = mongoose.model('challenge', challengeSchema)


module.exports = challenge