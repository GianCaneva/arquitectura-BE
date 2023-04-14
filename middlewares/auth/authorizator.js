const jwt = require("jsonwebtoken");
const permission = require("./permission");

function authorize(perm) {
  return function (req, res, next) {
    const token = req.cookies["token"];

    if (perm == permission.ANY && !token) next();
    else
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          console.log(err);
          return res.sendStatus(401);
        }

        req.user = user;
        next();
      });
  };
}

module.exports = authorize;
