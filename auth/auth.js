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
    try {
      var user = await User.findOne(
        { email: req.body.email },
        { _id: 1, password: 1, name: 1 }
      );


      ////Admin
      if (!user) {

            var admin = await Admin.findOne({'email':req.body.email},{_id: 1, password: 1})

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
              return res.status(200).send({ token: tkn });

      } else {
        return res.status(403).send("Invalid Email Or Password");
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
  
      return res.status(200).send({ token: token });
    } catch {
      return res.status(400).send("Bad Request");
    }
  });








///Check Auth Status

router.post("/checkauthstatus", verifyAuth, async (req, res) => {
  const { id, type } = req.userData;

  if (type === "user") {
    var user = await User.findOne(
      { _id: id },
      { name: 1, email: 1, avatar: 1 }
    );
    return res.send(user);
  }

  if (type === "admin") {
    return 0;
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
