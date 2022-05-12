const jwt = require("jsonwebtoken");

const db = require("../models");

// create main Model
const User = db.users;

exports.isAuthenticateUser = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1].replace(/"/g, "");

  if (!token) {
    return res.status(401).json("Please login to access this resource");
  }
  const deCodeData = jwt.verify(token, process.env.jwt_secret);

  try {
    req.user = await User.findOne({ where: { id: deCodeData.id } });
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json(`Role ${req.user.role} is not allowed to access this resource`);
    }
    next();
  };
};
