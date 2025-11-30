const data = {
  users: require("../data/users.json"),
  setUsers(newUsers) {
    this.users = newUsers;
  },
};

const path = require("path");
const fsPromises = require("fs").promises;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const logoutController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  else {
    const refreshToken = cookie.jwt;
    const currentUser = data.users.find(
      (user) => user.refreshToken == refreshToken
    );
    if (!currentUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(204);
    } else {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err || currentUser.username != decoded.userInfo.username) {
            res.status(404);
          } else {
            const otherUsers = data.users.filter(
              (user) => user.refreshToken != refreshToken
            );
            currentUser.refreshToken = "";
            data.setUsers([...otherUsers, currentUser]);
            await fsPromises.writeFile(
              path.join(__dirname, "..", "data", "users.json"),
              JSON.stringify(data.users)
            );
            res.clearCookie("jwt", {
              httpOnly: true,
            });
            res.status(200).json({ message: "logged out" });
          }
        }
      );
    }
  }
};

module.exports = { logoutController };
