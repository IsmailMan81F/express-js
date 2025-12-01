const Employee = require("../model/employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees[0])
    return res.status(404).json({ message: "No employee found" });
  else res.json(employees);
};

const createEmployee = async (req, res) => {
  if (!req?.body?._id)
    return res.status(404).json({ message: "id is required" });
  const targetEmployee = await Employee.findOne({ _id: req.body._id });
  if (targetEmployee)
    return res.status(403).json({ Error: "Employee aleady exists" });
  else {
    try {
      await Employee.create(req.body);
      res.status(200).json({ message: "New employee added" });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
};

const getEmployee = async (req, res) => {
  const searchEmployee = await Employee.findOne({ _id: req.query.id });
  if (!searchEmployee)
    return res.status(403).json({ Error: "Employee not found" });
  else {
    res.status(200).json(searchEmployee);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "id is required" });
  const targetEmployee = await Employee.findOne({ _id: req.params.id });
  if (!targetEmployee)
    return res.status(403).json({ Error: "Employee not found" });
  else {
    if (req.body._id) targetEmployee._id = req.body._id;
    if (req.body.name) targetEmployee.name = req.body.name;
    if (req.body.age) targetEmployee.age = req.body.age;
    if (req.body.email) targetEmployee.email = req.body.email;
    if (req.body.phoneNumber) targetEmployee.phoneNumber = req.body.phoneNumber;
    await targetEmployee.save();
    res.status(200).json({ message: "Employee updated successfuly" });
  }
};

const deleteEmployee = async (req, res) => {
  const deletedEmployee = await Employee.findOne({ _id: req.params.id });
  if (!deletedEmployee)
    return res.status(403).json({ Error: "Employee not found" });
  else {
    await Employee.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Employee deleted successfuly" });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
