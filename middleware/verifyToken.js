const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) {
        return res.status(401).json({
        status: "fail",
        message: "Token is required"
        });
    }
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    next();

  } catch (err) {
        const error = appError.create("Invalid token", 401, httpStatusText.ERROR);
        return next(error);
  }
};

module.exports = verifyToken;