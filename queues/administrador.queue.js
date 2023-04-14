const UserService = require("../services/user.service");
const PartnerQueue = require("./partner.queue");

exports.processMessage = async function (msg) {
  let origMsg = JSON.parse(JSON.stringify(msg));
  try {
    if (msg.tipo == "crearRepartidor") await createDelivery(msg);
    else if (msg.tipo == "crearProveedor") await createProvider(msg);
  } catch (error) {
    PartnerQueue.postError(origMsg, error.message || error);
  }
};


async function createDelivery(msg) {
  msg.docTypeId = msg.tipoDocumento;
  msg.docNumber = msg.numeroDocumento;
  msg.name = msg.nombre + " " + msg.apellido;
  msg.password = msg.password || msg.numeroDocumento;
  
  await UserService.create(msg);
}

async function createProvider(msg) {
  msg.docTypeId = msg.tipoDocumento;
  msg.docNumber = msg.numeroDocumento;
  msg.name = msg.razonSocial;
  msg.password = msg.password || msg.numeroDocumento;
  
  await UserService.create(msg);
}