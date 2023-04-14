const { models } = require("../db");

exports.types = {
  TRANSFER: "TRANSFER",
  RECHARGE: "RECHARGE",
  BUY: "BUY",
  PAYMENT: "PAYMENT",
  REFUND: "REFUND"
};

exports.get = function (id) {
  let movementType = models.movementType.findByPk(id);
  return movementType;
};
