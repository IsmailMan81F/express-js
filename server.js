//modules
require('dotenv').config()
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const rootRouter = require("./routes/root");
const subRouter = require("./routes/subdir");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const authRouter = require("./routes/auth");
const registerRouter = require("./routes/register");
const refreshRouter = require("./routes/refresh");
const logoutRouter = require("./routes/logout");
const employeesRouter = require("./routes/api/employees");
const cookieParser = require("cookie-parser");


//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
app.use("/subdir", subRouter);
app.use("/refresh", refreshRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/auth", authRouter);
app.use("/employees", employeesRouter);
app.use("/", rootRouter);

//404 Error not-Found
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

//running the server
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
