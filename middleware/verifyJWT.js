const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) return res.sendStatus(401);

  //validation of the token

  const token = auth.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .sendStatus(403)
    else {
      req.username = decoded.userInfo.username;
    }
  });

  next();
};

module.exports = verifyJWT;
