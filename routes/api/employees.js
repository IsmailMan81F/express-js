const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require('../../config/ROLES_LIST')

router.route("/").get(verifyJWT, employeesController.getAllEmployees);
router.route("/add").post(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), employeesController.createEmployee)
router.route("/search").get(verifyJWT, employeesController.getEmployee);
router.route("/:id/update").put(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), employeesController.updateEmployee)
router.route("/:id/delete").delete(verifyRoles(ROLES_LIST.admin), employeesController.deleteEmployee);


module.exports = router;
