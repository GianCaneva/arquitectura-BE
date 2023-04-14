var express = require('express');
var router = express.Router();
const authorize = require("../middlewares/auth/authorizator");
const permission = require("../middlewares/auth/permission");

const movement_controller = require("../controllers/movement.controller");

router.get("/", authorize(permission.LOGGED), movement_controller.history);

module.exports = router;
