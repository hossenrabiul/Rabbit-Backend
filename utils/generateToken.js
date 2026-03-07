const jwt = require("jsonwebtoken");

exports.secret = "kdkdk4dkd9didkd";
exports.generateToken = (userId, email, role) => {
  return jwt.sign({ id: userId, email: email, role: role }, "hhio76788jjt", {
    expiresIn: "7d",
  });
};
