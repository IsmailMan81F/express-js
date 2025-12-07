const User = require("../model/user");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password)
    return res.status(401).json({ message: "Username, Password are required" });

  const exist = await User.findOne({ username: username });
  if (exist) return res.status(409).json({ Error: "The user already exists" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      roles: roles,
    });
    const result = await newUser.save();

    res
      .status(201)
      .json({ message: `New user ${result.username} was successfuly created` });
  } catch (error) {
    console.log("Error : " + error.message);
    return res.status(501).json({ Error: error.message });
  }
};

module.exports = { registerController };
