const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
  console.log(`${req.method}\t${req.path}\t${req.headers.origin}`);
  logEvent(`${req.method}\t${req.path}\t${req.headers.origin}`, "reqLog.txt");
  next();
};

const logEvent = async (message, logName) => {
  const dateTime = format(new Date(), "yyyyMMdd");
  const info = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "info"))) {
      await fsPromises.mkdir(path.join(__dirname, "info"));
    }
    await fsPromises.appendFile(path.join(__dirname, "info", logName), info);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { logger, logEvent };
