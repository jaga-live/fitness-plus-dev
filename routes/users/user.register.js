const router = require('express').Router()



///Hash and Encryption
const bcrypt = require('bcrypt')


//Database Models
const User = require('../../models/user')





////Signup for Users

router.post('/signup/user', async (req, res) => {

    try {
        const user = await User.countDocuments({ 'email': req.body.email })
        if (user !== 0) return res.status(409).send('Email Already Exists')

        var data = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name
        }

        var saveData = await User(data)

        await saveData.save()

        return res.status(200).send('Account Created')

    } catch (e) {

        return res.status(400).send('Bad Request')

    }



})



////User Profile 

router.post('/userprofile',async(req,res)=>{
const {id} = req.userData

const user = await User.findOne({_id:id},{name:1,avatar:1,email:1})
return res.status(200).send(user)



})






module.exports = router