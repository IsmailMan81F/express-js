const express = require("express");
const rootRouter = express.Router();
const path = require("path");

rootRouter.use(express.static(path.join(__dirname, "..", "public")));

rootRouter.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

rootRouter.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

rootRouter.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, path.join(__dirname, "..", "views", "new-page.html"));
});

module.exports = rootRouter;
