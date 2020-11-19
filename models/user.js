const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    trim: true,
  },

  name: {
    type: String,
  },

  avatar: {
    type: String,
    default: null,
  },

  activityPoint: {
    type:Number,
    default : 0
  },

  workoutType: {
    type: Array,
    default: [
      { name: "Pull Ups", count: 0 },
      { name: "Push Ups", count: 0 },
      { name: "Squats", count: 0 },
    ],
  },

  jwt: {
    type: Array,
  },
});


userSchema.index({
  name: 'text'
})

let user = mongoose.model("user", userSchema);

module.exports = user;
