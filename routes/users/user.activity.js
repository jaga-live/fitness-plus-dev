const router = require("express").Router();

////Midlleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");
const func = require('../../utility/func')

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");




////View all the activity count

router.post("/viewactivity", verifyAuth, async (req, res) => {
  const { id } = req.userData;
  const { time } = req.body;


  var work = await Work.findOne({
    userId: id,
    date: await date.timestampToDate(time),
  });


  if (work !== null) return res.status(200).send(work);



  ////if no actiivity logged for that day
  var workType = await User.findOne({ _id: id }, { workoutType: 1 });

  var data = {
    userId: id,
    workouts: workType.workoutType,
    time: time,
    date: date.timestampToDate(time)
  };

  var saveData = await Work(data);
  await saveData.save();

  return res.status(200).send(data);
});






////Update activity in home screen
router.post("/updateactivity", verifyAuth, async (req, res) => {
  const { id } = req.userData;
  const {time}= req.body

  try{
    
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
    }
  );

  return res.status(200).send("Updated");

}catch{
  return res.status(400).send("Something went wrong")
}


});








module.exports = router;
