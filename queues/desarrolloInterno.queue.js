const TransferService = require("../services/transfer.service");
const MovementTypeService = require("../services/movement_type.service");
const PartnerQueue = require("./partner.queue");

exports.processMessage = async function (msg) {
  let origMsg = JSON.parse(JSON.stringify(msg));
  try {
    if (msg.tipo == "compra") await buy(msg);
    else if (msg.tipo == "pago") await payment(msg);
    else if (msg.tipo == "reintegro") await refund(msg);
  } catch (error) {
    PartnerQueue.postError(origMsg, error.message || error);
  }
};

async function buy(msg) {
    msg.debitUser.docTypeId = msg.debitUser.docType;
    msg.creditUser.docTypeId = msg.creditUser.docType;

    await TransferService.transfer(msg, MovementTypeService.types.BUY);
}

async function payment(msg) {
    msg.debitUser.docTypeId = msg.debitUser.docType;
    msg.creditUser.docTypeId = msg.creditUser.docType;

    await TransferService.transfer(msg, MovementTypeService.types.PAYMENT);
}

async function refund(msg) {
  msg.debitUser.docTypeId = msg.debitUser.docType;
  msg.creditUser.docTypeId = msg.creditUser.docType;

  await TransferService.transfer(msg, MovementTypeService.types.REFUND);
}