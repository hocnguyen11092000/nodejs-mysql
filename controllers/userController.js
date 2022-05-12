const db = require("../models");
const sendToken = require("../utils/jwt");

const bcrypt = require("bcryptjs");

// create main Model
const User = db.users;

// main work

// 1. create product

const Register = async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  let info = {
    email: req.body.email,
    password: passwordHash,
    userName: req.body.userName,
  };

  try {
    const user = await User.create(info);
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please enter Email or Password", 400));
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json("Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json("Wrong password");
  }
  sendToken(user, 200, res);
};

module.exports = {
  Register,
  Login,
};
