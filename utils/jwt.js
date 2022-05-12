const jwt = require("jsonwebtoken");
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.jwt_secret, {
    expiresIn: "1d",
  });

  delete user.dataValues.password;

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
