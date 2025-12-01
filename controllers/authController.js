const User = require('../model/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).send("message: Username and Password are required");

  const foundUser = await User.findOne({username: username})
  if (!foundUser)
    return res.status(404).json({ Error: `User : ${username} not found` });

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username, roles: foundUser.roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { userInfo: { username: foundUser.username, roles: foundUser.roles } },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    try {
      foundUser.refreshToken = refreshToken;
      await foundUser.save()

    } catch (error) {
      console.log("Error : " + error.message);
      return res.status(501).send("Error: Something went wrong");
    }

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none", // for localhost testing, None + Secure needed only if HTTPS
      secure: false, // false for HTTP, true for HTTPS
    });

    return res
      .status(200)
      .json([
        { message: `This user is authorised` },
        { accessToken },
      ]);
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { authController };
