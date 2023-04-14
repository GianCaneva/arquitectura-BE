var express = require('express');
var router = express.Router();
const authorize = require("../middlewares/auth/authorizator");
const permission = require("../middlewares/auth/permission");

const account_controller = require("../controllers/account.controller");

router.get("/", authorize(permission.LOGGED), account_controller.get);
router.get("/find", authorize(permission.LOGGED), account_controller.find);
router.patch("/recharge", authorize(permission.LOGGED), account_controller.recharge);

module.exports = router;
