const jwt = require('jsonwebtoken')

require('dotenv').config()

//Database models
const User = require('../models/user')



module.exports = async (req,res,next)=>{

try{var token = (req.headers.authorization).split(" ")[1]

var user = await User.countDocuments({'jwt':token})
if(!user) return res.status(403).send('Invalid Token')

var check = jwt.verify(token,process.env.JWT_SECRET)

req.userData = check

next()

}catch{
    return res.status(403).send("Unauthorized")
}

}