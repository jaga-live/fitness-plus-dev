const router = require('express').Router()



////Middleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");
const func = require('../../utility/func')

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const Admin = require('../../models/admin')
const Challenge = require('../../models/challenge')


/////Adding Challenges
router.post('/addchallenge', verifyAuth,async (req,res)=>{
const {id} = req.userData


await Challenge.insertMany(req.body)

res.status(200).send("Upadted")

})



////View challenge
router.post('/admin_view_challenge', verifyAuth,async(req,res)=>{
const {id} = req.userData


var challenge = await Challenge.find({'date':req.body.date})

return res.send(challenge)


})



module.exports = router