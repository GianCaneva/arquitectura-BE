const { models } = require("../db");
const BusinessError = require("../errors/business_error");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../utils/jwt.util");

exports.login = async function (user) {
  let userDb = await this.getUser(user);

  let passwordIsValid = bcrypt.compareSync(user.password, userDb?.password || "");

  if (!passwordIsValid) throw new BusinessError("Usuario inexistente o clave incorrecta.");

  const { password, ...details } = userDb.dataValues;
  return { token: jwtSign(details), user: details };
};

exports.getUser = async function (user) {
  let userDb = await models.user.findOne({
    include: [
      {
        model: models.account,
      },
    ],
    where: {
      docTypeId: user.docTypeId,
      docNumber: user.docNumber,
    },
  });

  return userDb;
};

exports.create = async function (user) {
  let userDb = null;
  user.password = bcrypt.hashSync(user.password, 8);

  try {
    userDb = await models.user.create(user);
    accountDb = await models.account.create({
      userId: userDb.id,
      balance: 0,
      alias: 'alias' + userDb.id,
      cbu: String(userDb.id).padStart(22, '0')
    });
  } catch (e) {
    if (e.parent.code == "ER_DUP_ENTRY") throw new BusinessError("Usuario existente.");
  }

  const { password, ...details } = userDb.dataValues;

  return details;
};
