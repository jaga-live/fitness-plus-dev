const router = require('express').Router()
const cron = require('node-cron')

////Midlleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const FriendReq = require('../../models/friends.req');
const Friend = require('../../models/friends.req');






////view all friends

router.post('/myfriends',async(req,res)=>{
const {id} = req.userData

var data = await Friend.find({'token':id})

res.status(200).send(data)

})






//////Searching People /////

router.post('/searchpeople',verifyAuth,async(req,res)=>{
const {id} = req.userData
const {text} = req.body



var data = await User.find({ 
    _id : {$ne: id},
    name: { $regex: text, $options: "i" } ,
    
},
{
    name : 1,
    avatar : 1
}
)



return res.send(data)

})


/////View single person

router.post('/viewsingleperson',verifyAuth ,async(req,res)=>{
const {id} = req.userData
const {friendId} = req.body

var user = await User.findOne({_id : friendId },{
    name: 1,
    avatar : 1,
    private : 1,
    activityPoint: 1
})

var data = {
    name: user.name,
    avatar : user.avatar,
    private: user.private,
    activityPoint : user.activityPoint,
    
}

var friend = await Friend.countDocuments({"token":id,"friendId":friendId})

var incoming = await FriendReq.countDocuments({"token":friendId,"friendId":id})

var outgoing = await FriendReq.countDocuments({"token":id,"friendId":friendId})


res.send(data)

})





////Send a request to a Person

router.post('/sendrequest',async(req,res)=>{
const {id} = req.userData
const {friendId} = req.body

try {

    var user = await User.findOne({_id:friendId},{name:1,email:1})

    var data = {
        token: id,
        friendName : user.name,
        friendMail: user.email,
        friendId : user._id

    }

    var saveData = await FriendReq(data)
    await saveData.save()

    return res.send('updated')

} catch (error) {
    
   return res.status(400)
}


})





//////Accept friend request///
router.post('/acceptrequest', async(req,res)=>{
const {id,name} = req.userData
const {friendId} = req.body

try{

//update the current friend req tracker
await FriendReq.updateOne({token:friendId,friendId: id, status:"pending"},{
    status : "accepted"
})


//new collections for friens
var friendName = await User.findOne({_id:friendId},{name:1})
var data = []

data.push({
    token: id,
    friendId,
    friendName : friendName.name
})

data.push({
    token: friendId,
    friendId: id,
    friendName: name
})

await Friend.insertMany(data)

return res.status(200).send('Updated')

}catch{
    return res.status(400).send("Something went wrong")
}


})






//Reject Friend Request

router.post('/rejectrequest',async(req,res)=>{
const {id}= req.userData

await FriendReq.updateOne({token : friendId, friendId : id, status:"pending"},{
    status : "rejected"
})

res.send(200).send("Updated")

})




////Requests sent///

router.post('/request_sent',verifyAuth,async(req,res)=>{
const {id} = req.userData


var data = await FriendReq.findOne({token : id, status : "pending"})

res.status(200).send(data)


})



////Incoming friend requests////
router.post('/request_received',verifyAuth,async(req,res)=>{
const {id} = req.userData


var data = await FriendReq.findOne({friendId : id, status : "pending"})

res.status(200).send(data)

})





module.exports = router

