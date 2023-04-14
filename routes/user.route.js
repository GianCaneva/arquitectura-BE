var express = require('express');
var router = express.Router();
const authorize = require("../middlewares/auth/authorizator");
const permission = require("../middlewares/auth/permission");

const user_controller = require("../controllers/user.controller");

router.post("/login", user_controller.login);
router.post("/logout", authorize(permission.LOGGED), user_controller.logout);
// router.post("/create", user_controller.create);

module.exports = router;
