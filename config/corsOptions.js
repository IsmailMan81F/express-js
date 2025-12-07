const list = ["http://localhost:3500", "http://127.0.0.1:5500", "http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (list.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("The access is forbidden by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
