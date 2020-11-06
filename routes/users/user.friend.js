const router = require('express').Router()


////Midlleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const Friend = require('../../models/friends')


//////Searching People /////

router.post('/searchpeople',async(req,res)=>{
const {id} = req.userData



})




////Send a request to a Person

router.post('/sendrequest',async(req,res)=>{
const {id} = req.userData

try {

    var user = await User.findOne({_id:id},{name:1,email:1})

    var data = {
        token: id,
        friendName : user.name,
        friendMail: user.email,
        friendId : user._id

    }

    var saveData = await Friend(data)
    await saveData.save()

    return res.send('updated')

} catch (error) {
    
   return res.status(400)
}


})






module.exports = router