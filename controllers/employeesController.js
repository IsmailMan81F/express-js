const data = {
  users: require("../data/users.json"),
  setUsers(newUsers) {
    this.users = newUsers;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const getAllEmployees = (req, res) => {
  res.json(data.users);
};

const updateEmployee = (req, res) => {
  res.json({ name: req.body.name, age: req.body.age });
};
const deleteEmployee = async (req, res) => {
  const deletedUser = data.users.find(
    (user) => user.username == req.body.username
  );
  if (!deletedUser) return res.sendStatus(404);
  const otherUsers = data.users.filter(
    (user) => user.username != deletedUser.username
  );
  data.setUsers(otherUsers);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "users.json"),
    JSON.stringify(data.users)
  );
  res.status(200).json({
    message: "User deleted successfully",
  });
};

const getEmployee = (req, res) => {
  const searchEmployee = data.users.find(
    (em) => em.id == parseInt(req.body.id)
  );
  if (!searchEmployee) return res.status(404).send("Error: Employee not found");
  res.json(searchEmployee);
};

module.exports = {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
