const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  _id: {
    type: String,
    required: true
  },  
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
