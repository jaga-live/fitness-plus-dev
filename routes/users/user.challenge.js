const router = require('express').Router()

////Middleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");
const func = require('../../utility/func')

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const Challenge = require('../../models/challenge')


/////View challenges


router.post('/viewchallenge', verifyAuth ,async (req,res)=>{
const {id} = req.userData
const {time} = req.body

var challenge = await Challenge.find({'date': req.body.date})

var activity = await Work.findOne({_id:id,date : req.body.date})


   
})


module.exports = router