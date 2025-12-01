const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require('../../config/ROLES_LIST')

router.route("/").get(verifyRoles(ROLES_LIST.admin), usersController.getAllusers);
router.route("/:username/delete").delete(verifyRoles(ROLES_LIST.editor, ROLES_LIST.admin), usersController.deleteUser);


module.exports = router;
