const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    user: {
      type: Number,
      default: 1000,
    },
    editor: {
      type: Number,
    },
    admin: {
      type: Number,
    },
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
