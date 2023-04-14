var express = require('express');
var router = express.Router();
const authorize = require("../middlewares/auth/authorizator");
const permission = require("../middlewares/auth/permission");

const contacts_controller = require("../controllers/contact.controller");

router.get("/", authorize(permission.LOGGED), contacts_controller.getList);
router.post("/", authorize(permission.LOGGED), contacts_controller.add);

module.exports = router;
