const { Op } = require("sequelize");
const { models } = require("../db");

exports.getList = async function (user, days) {
  let movementsDb = await models.movement.findAll({
    where: {
      accountId: user.account.id,
      creationDate: { [Op.gt]: new Date(new Date() - days * 24 * 60 * 60 * 1000) },
    },
  });
  
  return movementsDb;
};

exports.getBalanceCreditLastMovements = async function (user, days) {
  let balance = await models.movement.sum("amount", {
    where: {
      accountId: user.account.id,
      creationDate: { [Op.gt]: new Date(new Date() - days * 24 * 60 * 60 * 1000) },
      amount: { [Op.gt]: 0 }
    },
  });
  
  return balance;
};

exports.getBalanceDebitLastMovements = async function (user, days) {
  let balance = await models.movement.sum("amount", {
    where: {
      accountId: user.account.id,
      creationDate: { [Op.gt]: new Date(new Date() - days * 24 * 60 * 60 * 1000) },
      amount: { [Op.lt]: 0 }
    },
  });
  
  return -balance;
};

exports.insert = function (movement, t) {
  let movementDb = models.movement.create(movement, { transaction: t });
  return movementDb;
};
