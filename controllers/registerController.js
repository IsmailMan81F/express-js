const data = {
  users: require("../data/users.json"),
  setUsers(newUsers) {
    this.users = newUsers;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !roles)
    return res.status(401).send("message: Username, Password and Roles are required");

  const exist = data.users.find((user) => user.username == username);
  if (exist) return res.status(409).send("Error: The user already exists");

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username: username, password: hashedPassword, roles: roles  };
    data.setUsers([...data.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(data.users)
    );
    res.status(201).send("message: User was created succefully");
  } catch (error) {
    console.log("Error : " + error.message);
    return res.status(501).send(`Error: ${error.message}`);
  }
};

module.exports = { registerController };
