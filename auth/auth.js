const router = require("express").Router();

require("dotenv").config();
///Hash and Encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Middleware
var verifyAuth = require("../auth/verify.auth");

//Database Model
const User = require("../models/user");
const Admin = require('../models/admin')




router.post("/login", async (req, res) => {
    
      var user = await User.findOne(
        { email: req.body.email },
        { _id: 1, password: 1, name: 1,avatar : 1 }
      );


      ////Admin
      if (!user) {

            var admin = await Admin.findOne({'email':req.body.email},{_id: 1, password: 1})

            if(!admin) return res.status(403).send("Invalid Username or Password");

            if (!bcrypt.compareSync(req.body.password, admin.password)) {
                return res.status(403).send("Invalid Username or Password");
              }

              var tkn = jwt.sign(
                {
                  id: admin._id,
                  type: "admin",
                },
                process.env.JWT_SECRET
              );
          
              await Admin.updateOne(
                { _id: admin._id },
                {
                  $push: { jwt: tkn },
                }
              );
              return res.status(200).send({ token: tkn,type:"admin" });

      } 


  ///User
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(403).send("Invalid Username or Password");
      }
  
      var token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          type: "user",
        },
        process.env.JWT_SECRET
      );
  
      await User.updateOne(
        { _id: user._id },
        {
          $push: { jwt: token },
        }
      );
  
      return res.status(200).send({ token: token,avatar : user.avatar,type:"user" });
    
   
  });








///Check Auth Status

router.post("/checkauthstatus", verifyAuth, async (req, res) => {
  const { id, type } = req.userData;

  if (type === "user") {

    var user = await User.findOne(
      { _id: id },
      { name: 1, email: 1, avatar: 1 }
    );

    var data ={
      name : user.name,
      email : user.email,
      avatar : user.avatar
    }
    return res.send(data);

  }

  if (type === "admin") {
    var admin = await Admin.findOne({_id: id},{
      _id:1
    })

    var data = {
      _id : admin._id,
      type: "admin"
    }
    return res.send(data)
  }
});




///Logout

router.post("/logout", verifyAuth, async (req, res) => {
  const { id, token, type } = req.userData;

  if (type === "user") {
    await User.updateOne(
      { _id: id },
      {
        $pull: { jwt: token },
      }
    );
  }

  res.send("updated");
});

module.exports = router;
