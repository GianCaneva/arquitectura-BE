const { models } = require("../db");
const { Op } = require("sequelize");
const BusinessError = require("../errors/business_error");

exports.getList = async function (user) {
  let contactsDb = await models.contact.findAll({
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: models.account,
        attributes: { exclude: ["balance", "userId"] },
        include: [{ model: models.user, attributes: { exclude: ["password"] } }],
      },
    ],
    where: { userId: user.id },
  });
  return contactsDb;
};

exports.add = async function (user, req) {
  try {
    let account = await models.account.findOne({
      where: {
        [Op.or]: [
          { alias: req?.alias },
          { cbu: req?.cbu }
        ]
      }
    });
    let contactDb = await models.contact.create({
      userId: user?.id,
      accountId: account?.id,
      observation: req?.notes
    });

    return contactDb;
  } catch (error) {
    if (error.parent?.code == "ER_DUP_ENTRY") throw new BusinessError("Contacto existente.", `accountId: ${req.accountId}.`);
    throw error;
  }
};
