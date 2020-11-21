const router = require('express').Router()


////Midlleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const FriendReq = require('../../models/friends.req');
const Friend = require('../../models/friends.req');


/////View leaderboard///

router.post('/viewleaderboard',verifyAuth ,async(req,res)=>{
const {id} = req.userData


var friends = await Friend.find({token:id})
var token = []


friends.map((ele,index)=>{
token.push(friends[index].friendId)
})

var user = await User.find({_id:token},{
    name: 1,
    avatar : 1,
    activityPoint : -1

})

res.send(user)


})



module.exports = router