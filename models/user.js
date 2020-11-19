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
      { name: "pullups", count: 0 },
      { name: "pushups", count: 0 },
      { name: "squats", count: 0 },
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
