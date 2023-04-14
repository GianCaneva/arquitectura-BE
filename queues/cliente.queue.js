const TransferService = require("../services/transfer.service");
const MovementTypeService = require("../services/movement_type.service");
const UserService = require("../services/user.service");
const PartnerQueue = require("./partner.queue");

exports.processMessage = async function (msg) {
  let origMsg = JSON.parse(JSON.stringify(msg));
  try {
    if (msg.tipo == "compra") await buy(msg);
    if (msg.tipo == "crearCliente") await createClient(msg);
  } catch (error) {
    PartnerQueue.postError(origMsg, error.message || error);
  }
};

async function buy(msg) {
    msg.debitUser.docTypeId = msg.debitUser.docType;
    msg.creditUser.docTypeId = msg.creditUser.docType;

    await TransferService.transfer(msg, MovementTypeService.types.BUY);
}

async function createClient(msg) {
  msg.docTypeId = msg.tipoDocumento;
  msg.docNumber = msg.numeroDocumento;
  msg.name = msg.nombre + " " + msg.apellido;
  
  await UserService.create(msg);
}
