const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth?.startsWith("Bearer ")) return res.sendStatus(401);

    //test the roles
    const roles = [...allowedRoles];
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      else {
        req.username = decoded.userInfo.username;
        req.roles = decoded.userInfo.roles;

        const result = Object.values(req.roles)
          .map((role) => roles.includes(role))
          .find((val) => val == true);
        if (!result) return res.sendStatus(403);
        else next();
      }
    });
  };
};

module.exports = verifyRoles;
