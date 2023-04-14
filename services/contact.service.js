const { models } = require("../db");
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
    let contactDb = await models.contact.create({
      userId: user.id,
      ...req,
    });

    return contactDb;
  } catch (error) {
    if (error.parent?.code == "ER_DUP_ENTRY") throw new BusinessError("Contacto existente.", `accountId: ${req.accountId}.`);
  }
};
