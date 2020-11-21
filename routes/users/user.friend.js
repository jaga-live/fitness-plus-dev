const router = require('express').Router()
const cron = require('node-cron')

////Midlleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const FriendReq = require('../../models/friends.req');
const Friend = require('../../models/friend');
const Notify = require("../../models/notify")




////view all friends

router.post('/myfriends',verifyAuth,async(req,res)=>{
const {id} = req.userData

var data = await Friend.find({'token':id})

var token = []

data.map((ele,index)=>{

    token.push(data[index].friendId)

})

var user = await User.find({_id : token},{
    name: 1,
    avatar : 1
})

res.status(200).send(user)

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


var friend = await Friend.countDocuments({"token":id,"friendId":friendId})

var incoming = await FriendReq.countDocuments({"token":friendId,"friendId":id})

var outgoing = await FriendReq.countDocuments({"token":id,"friendId":friendId,"status":"pending"})

var data = {
    name: user.name,
    avatar : user.avatar,
    private: user.private,
    activityPoint : user.private !== true ? user.activityPoint : "Account is Private",
    isFriend : friend === 0 ? false : true,
    incoming : incoming === 0 ? false : true ,
    outgoing : outgoing === 0 ? false : true 
}

res.send(data)

})





////Send a request to a Person

router.post('/sendrequest',verifyAuth,async(req,res)=>{
const {id} = req.userData
const {friendId,time,date} = req.body

try {
    var name = await User.findOne({_id:id},{name:1})
    var user = await User.findOne({_id:friendId},{name:1,email:1})

    var data = {
        token: id,
        friendName : user.name,
        friendMail: user.email,
        friendId : user._id

    }

    var saveData = await FriendReq(data)
    await saveData.save()

    await Notify.insertMany({
        token : friendId,
        friendId: id,
        time : time,
        date : date,
        message : `${name.name} sent you a friend request!`
    })

    return res.send('updated')

} catch (error) {
    
   return res.status(400)
}


})





//////Accept friend request///
router.post('/acceptrequest',verifyAuth, async(req,res)=>{
const {id} = req.userData
const {friendId} = req.body

var user = await User.findOne({_id:id},{name:1})

try{

//update the current friend req tracker
await FriendReq.updateOne({token:friendId,friendId: id, status:"pending"},{
    status : "accepted"
})


//new collections for friends
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
    friendName: user.name
})

await Friend.insertMany(data)

return res.status(200).send('Updated')

}catch(e){
    console.log(e)
    return res.status(400).send("Something went wrong")
}


})






//Reject Friend Request

router.post('/rejectrequest', verifyAuth,async(req,res)=>{
const {id}= req.userData
const {friendId} = req.body

await FriendReq.updateOne({token : friendId, friendId : id, status:"pending"},{
    status : "rejected"
})

res.send(200).send("Updated")

})




////Requests sent///

router.post('/request_sent',verifyAuth,async(req,res)=>{
const {id} = req.userData


var data = await FriendReq.find({token : id, status : "pending"})
var token = []

data.map((ele,index)=>{
    token.push(data[index].friendId)
})

var users  =await User.find({_id: token},{
    name: 1,
    avatar : 1
})

res.status(200).send(users)


})



////Incoming friend requests////
router.post('/request_received',verifyAuth,async(req,res)=>{
const {id} = req.userData


var data = await FriendReq.find({friendId : id, status : "pending"})
var token = []
data.map((ele,index)=>{
    token.push(data[index].token)
})

var users  = await User.find({_id: token},{
    name: 1,
    avatar : 1
})

res.status(200).send(users)

})





module.exports = router

