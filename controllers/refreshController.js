const User = require('../model/user') 
const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  else {
    const refreshToken = cookie.jwt;
    const foundUser = await User.findOne({refreshToken : refreshToken})
    console.log(foundUser)
    if (!foundUser) return res.sendStatus(404);
    else {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err || foundUser.username != decoded.userInfo.username)
            return res.sendStatus(403);
          else {
            const accessToken = jwt.sign(
              { userInfo: { username: foundUser.username, roles: foundUser.roles } },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            req.username = decoded.userInfo.username;
            return res.status(200).json({ accessToken });
          }
        }
      );
    }
  }
};

module.exports = { refreshController };
