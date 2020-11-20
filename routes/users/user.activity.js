const router = require("express").Router();

////Middleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");
const func = require('../../utility/func')

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const user = require("../../models/user");




////View all the activity count

router.post("/viewactivity", verifyAuth, async (req, res) => {
  const { id } = req.userData;
  const { time } = req.body;


  var work = await Work.findOne({
    userId: id,
    date: await date.timestampToDate(time),
  });

  var activity = await User.findOne({_id:id},{activityPoint:1})


var temp = {
  activityPoint : activity.activityPoint,
  workouts: work !== null ? work.workouts : []
}


  if (work !== null) return res.status(200).send(temp);



  ////if no actiivity logged for that day
  var workType = await User.findOne({ _id: id }, { workoutType: 1 });

  var data = {
    userId: id,
    workouts: workType.workoutType,
    activityPoint : activity.activityPoint,
    time: time,
    date: date.timestampToDate(time)
  };

  var saveData = await Work(data);
  await saveData.save();

  return res.status(200).send(data);
});





////View Activity Point

router.post('/activitypoint',verifyAuth,async(req,res)=>{
const {id} = req.userData

var activity = await User.findOne({_id:id},{activityPoint:1})

res.send(activity)
} )




////Update activity in home screen
router.post("/updateactivity", verifyAuth, async (req, res) => {
  const { id } = req.userData;
  const {time}= req.body


    
    await Work.updateOne(
    {
      userId: id,
      date: date.timestampToDate(time),
    },
    {
      workouts: req.body.workouts,
    }
  );

 
var userData = req.body.workouts

userData.map((element,index)=>{

userData[index].count = 0

})


  await User.updateOne(
    { _id: id },
    {
      workoutType: userData,
      $inc : {activityPoint : 2}
    }
  );

   res.status(200).send("Updated");




});








module.exports = router;
