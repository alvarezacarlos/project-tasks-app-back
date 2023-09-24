const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(404)
        .json({ ok: false, message: "User is not Authenticated" });
    }
    const result = await jwt.verify(token, process.env.SALT);
    const { _id } = result;
    const userFound = await User.findOne({ _id });

    if (!userFound) {
      return res
        .status(404)
        .json({ ok: false, message: "User is not Authenticated" });
    }
    req.user = userFound;    

    return next();
  } catch (err) {
    return res
      .status(404)
      .json({ ok: false, message: "Request failed", error: err });
  }
};

function isAuthorized(roles) {  
  return (req, res, next) => {
    //verify if the user has the role to perform the action    
    if (roles.indexOf(req.user.role) > -1) {      
      return next();
    }

    return res.status(404).json({
      ok: false,
      message: "User do not have the required permissions",
    });
  };
}

module.exports = {
  isAuthenticated,
  isAuthorized,
};
