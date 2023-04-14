class BusinessError extends Error {
  constructor(message, logMessage) {
    super(message);
    this.name = "BusinessError";
    this.statusCode = 400;
    this.logMessage = logMessage;
  }
}

module.exports = BusinessError;
