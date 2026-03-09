const jwt = require("jsonwebtoken");
const { secret } = require("../utils/generateToken");

exports.protect = (req, res, next) => {
  const token = req?.cookies?.token;
  console.log("token", token)
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const decoded = jwt.verify(token, "hhio76788jjt");

  req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

  next();
};
