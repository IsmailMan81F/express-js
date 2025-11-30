const express = require("express");
const subRouter = express.Router();
const path = require("path");


subRouter.use(express.static(path.join(__dirname, '..', 'public')))

subRouter.get("/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

subRouter.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = subRouter;
