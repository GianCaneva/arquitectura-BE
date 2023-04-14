var jwt = require("jsonwebtoken");

exports.jwtSign = function (user) {
  return jwt.sign(
    {
      id: user.id,
      docTypeId: user.docTypeId,
      docNumber: user.docNumber,
      name: user.name,
      account: user.account,
    },
    process.env.SECRET,
    {
      expiresIn: 86400,
    }
  );
};
