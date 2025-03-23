const jwt = require("jsonwebtoken");

module.exports = async (playload) => {
  const token = await jwt.sign(playload, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });

  return token;
};
