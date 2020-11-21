const router = require('express').Router()

////Midlleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const FriendReq = require('../../models/friends.req');
const Friend = require('../../models/friend');
const Notify = require('../../models/notify')


/////Search Notifications and alert User////

router.post('/notify', verifyAuth,async(req,res)=>{
const {id} = req.userData

var notify = await Notify.countDocuments({
    token: id,
    notify : true

})

res.send(notify)

})



module.exports = router