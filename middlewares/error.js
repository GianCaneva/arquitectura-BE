const log4js = require("log4js");
const logger = log4js.getLogger("default");
const { getReqUser } = require("../utils/session.util");

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  console.log("err", err);
  let statusCode = err.statusCode || 500;
  let message = statusCode == 500 ? "Error interno del servidor." : err.message;
  let messageLog = `${err.message}${err.logMessage ? ' - ' + err.logMessage : ''}`;
  logger.error(`${getReqUser(req)?.docNumber || req.body?.docNumber} - ${messageLog}`);

  if (statusCode == 500)
    logger.error(err);

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
