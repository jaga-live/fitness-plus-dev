const router = require('express').Router()


require('dotenv')
///Hash and Encryption
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Database Models
const User = require('../../models/user')


//Middleware
var verifyAuth = require('../../auth/verify.auth')


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

        //After account creation
        var userCreated = await User.findOne({ 'email': req.body.email }, { _id: 1})
        var token = jwt.sign({
            id: userCreated._id,
            type: 'user'
        }, process.env.JWT_SECRET)
       
        
        await User.updateOne({ '_id': userCreated._id }, {
            $push: { jwt: token }
        })

        return res.status(200).send({ token: token })

    } catch (e) {

        return res.status(400).send('Bad Request')

    }



})



////User Profile 

router.post('/userprofile', verifyAuth,async(req,res)=>{
const {id} = req.userData

const user = await User.findOne({_id:id},{name:1,avatar:1,email:1})
return res.status(200).send(user)

})


//Upadte userprofile

router.post('/updateuserprofile',verifyAuth,async(req,res)=>{
const {id} = req.userData

try {
    await User.updateOne({_id:id},{
        $set: req.body
    })
    res.send('updated')
    
} catch (error) {
    res.status(400)
}



})









module.exports = router