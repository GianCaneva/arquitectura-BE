const sequelize = require("../db");
const { models } = require("../db");
const MovementService = require("../services/movement.service");
const MovementTypeService = require("../services/movement_type.service");
const BusinessError = require("../errors/business_error");

exports.find = async function (params) {
  let conditions = params.alias ? { alias: params.alias } : { cbu: params.cbu };
  let accountDb = await models.account.findOne({
    attributes: { exclude: ["userId", "balance"] },
    include: [{ model: models.user, attributes: { exclude: ["password"] } }],
    where: conditions,
  });
  if (!accountDb)
    throw new BusinessError("CBU o alias no encontrado.", `CBU o alias: ${params.alias || params.cbu}.`);
  return accountDb;
};

exports.recharge = async function (user, req) {
  try {
    const result = await sequelize.transaction(async (t) => {
      this.updateBalance(req.amount, user.account.id, t);
      let movementType = await MovementTypeService.get(MovementTypeService.types.RECHARGE);

      let movementDb = await MovementService.insert(
        {
          accountId: user.account.id,
          amount: req.amount,
          movementTypeId: movementType.id,
          description: movementType.descriptionCredit,
          usernameCredit: user.name,
        },
        t
      );

      let accountDb = await models.account.findByPk(user.account.id);
      return {
        movement: movementDb,
        account: accountDb,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

exports.getUserAccount = async function (user) {
  let account = await models.account.findOne({
    include: [
      {
        model: models.user,
        where: {
          docTypeId: user.docTypeId,
          docNumber: user.docNumber,
        },
        include: models.docType,
      },
    ],
  });
  delete account?.dataValues?.user;
  return account;
};

exports.updateBalance = function (amount, accountId, t) {
  models.account.increment(
    { balance: amount },
    {
      where: { id: accountId },
      transaction: t,
    }
  );
};
