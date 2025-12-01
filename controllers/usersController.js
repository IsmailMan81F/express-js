const User = require("../model/user");

const getAllusers = async (req, res) => {
  const users = await User.find();
  const orderedUsers = users.map((user) => ({
    _id: user._id,
    username: user.username,
    password: user.password,
    roles: user.roles,
    refreshToken: user.refreshToken,
  }));
  if (!users[0]) return res.status(404).json({ message: "No User found" });
  else res.json(orderedUsers);
};

const deleteUser = async (req, res) => {
  const deletedUser = await User.findOne({ username: req.params.username });
  if (!deletedUser) return res.status(403).json({ Error: "User not found" });
  else {
    await User.deleteOne({ username: req.params.username });
    res.status(200).json({ message: "User deleted successfuly" });
  }
};

module.exports = {
  getAllusers,
  deleteUser,
};
