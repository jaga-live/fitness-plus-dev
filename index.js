const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


require('dotenv').config()
require('./database/mongoose')
const app = express()


//Configure express application

app.use(express.json({limit:"2mb"}))







////////Enabling Routes/////////

//Auh
const authRoute = require('./auth/auth')


app.use([authRoute])


///Usres
const userRegister = require('./routes/users/user.register')
const userActivity = require('./routes/users/user.activity')

app.use([userRegister,userActivity])





////Starting Node Js Server
const port = process.env.PORT

app.listen(port,()=>{

console.log(`Server is running on Port ${port}`)

})



