const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require('../../config/ROLES_LIST')

router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmployees)
  .put(employeesController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
