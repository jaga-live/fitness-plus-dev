const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


require('dotenv').config()
require('./database/mongoose')
const app = express()


//Configure express application

app.use(express.json({limit:"5mb"}))
app.use(cors())






////////Enabling Routes/////////

//Auh
const authRoute = require('./auth/auth')


app.use([authRoute])


///Users
const userRegister = require('./routes/users/user.register')
const userActivity = require('./routes/users/user.activity')
const userFriend = require('./routes/users/user.friend')
const userChallenge = require('./routes/users/user.challenge')
const userLeader = require("./routes/users/user.leaderboard")
const userNotify = require('./routes/users/user.notification')
app.use([userRegister,userActivity,userFriend,userChallenge,userLeader,userNotify])



////Admin 
const adminRoute = require('./routes/admin/admin.challenges')


app.use([adminRoute])




///Hello World

app.get('/',(req,res)=>{

    res.send("Fitness Plus - ©️2020")

})


////Starting Node Js Server
const port = process.env.PORT

app.listen(port,()=>{

console.log(`Server is running on Port ${port}`)

})



