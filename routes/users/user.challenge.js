const router = require('express').Router()

////Middleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");
const func = require('../../utility/func')

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");



/////View challenges


router.post('/viewchallenge', verifyAuth ,async (req,res)=>{
const {id} = req.userData


   
})


module.exports = router