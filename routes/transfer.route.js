var express = require('express');
var router = express.Router();
const authorize = require("../middlewares/auth/authorizator");
const permission = require("../middlewares/auth/permission");

const transfer_controller = require("../controllers/transfer.controller");

router.post("/", authorize(permission.LOGGED), transfer_controller.transfer);

module.exports = router;
