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
var data = []

var challenge = await Challenge.find({'date': req.body.date})

var activity = await Work.findOne({userId:id,date : req.body.date})



var workouts = activity !== null ? activity.workouts : []


for (let index = 0; index < challenge.length; index++) {
   
    for (let i = 0; i < workouts.length; i++) {
        
        if(challenge[index].workoutName === workouts[i].name){
            data.push({
                name : challenge[index].workoutName,
                count : workouts[i].count,
                total : challenge[index].count,
                percentage : 0
            })
        }
        
    }
    
}

res.send(data)

   
})


module.exports = router