const jwt = require("jsonwebtoken");

require("dotenv").config();

//Database models
const User = require("../models/user");
const Admin = require('../models/admin')

module.exports = async (req, res, next) => {
  try {

    var token = req.headers.authorization.split(" ")[1];
    var check = jwt.verify(token, process.env.JWT_SECRET);

  if(check.type === "user"){

      var user = await User.countDocuments({ jwt: token });
      if (user === 0) return res.status(403).send("Invalid Token");
    }
    if(check.type === "admin"){

      var admin = await Admin.countDocuments({ jwt: token });
      if (admin === 0) return res.status(403).send("Invalid Token");
    }



    req.userData = check;
    req.userData.token = token

    next();

  } catch {
    return res.status(403).send("Unauthorized");
  }
};
