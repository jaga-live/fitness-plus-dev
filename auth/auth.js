const router = require('express').Router()


require('dotenv').config()
///Hash and Encryption
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Middleware


//Database Model
const User = require('../models/user')




router.post('/login', async (req, res) => {

    try {
        var user = await User.findOne({ 'email': req.body.email }, { _id: 1, password: 1 })
        if (!user) return res.status(403).send('Invalid Email Or Password')

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(403).send('Invalid Username or Password')
        }


        var token = jwt.sign({
            id: user._id,
            type: 'user'
        }, process.env.JWT_SECRET)

        await User.updateOne({ '_id': user._id }, {
            $push: { jwt: token }
        })

        return res.status(200).send({ token: token })


    } catch {

        return res.status(400).send('Bad Request')

    }

})




module.exports = router