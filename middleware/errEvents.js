const { logEvent } = require("./logEvents");

const errHandler = (err, req, res, next) => {
  logEvent(err.name + " : " + err.message, "errLog.txt");
  console.log(err.name + " : " + err.message);
  res.status(500).send(err.name + " : " + err.message);
  next();
};

module.exports = errHandler;
