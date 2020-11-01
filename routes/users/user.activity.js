const router = require('express').Router()


////Midlleware
const verifyAuth = require('../../auth/verify.auth')
const date = require('../../utility/date')

///Database Model
const User = require('../../models/user')
const Work = require('../../models/work')




////View all the activity count

router.post('/viewactivity', verifyAuth, async (req, res) => {

    const { id } = req.userData

    var work = await Work.findOne({

        userId: id,
        date: await date.timestampToDate(Date.now())

    })

    if (work !== null) return res.status(200).send(work)


    ////if no actiivity logged for that day  
    var workType = await User.findOne({ '_id': id }, { 'workoutType': 1 })

    var data = {
        userId: id,
        workouts: workType.workoutType,

    }


    var saveData = await Work(data)
    await saveData.save()

    return res.status(200).send(data)


})



////Update activity in home screen
router.post('/updateactivity', verifyAuth, async (req, res) => {
    const { id } = req.userData

    await Work.updateOne({
        'userId': id,
        'date': date.timestampToDate(Date.now())
    }, {
        workouts: req.body.workouts
    })


    let reset = function (spy) {
        Object.keys(spy).forEach(function (key) { spy[key] = 0 });
        return spy;
    }

    await User.updateOne({ '_id': id }, {
        workoutType: reset(req.body.workouts)
    })

    return res.status(200).send('Updated')


})



module.exports = router