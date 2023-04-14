const TransferService = require("../services/transfer.service");
const MovementTypeService = require("../services/movement_type.service");
const { getReqUser } = require("../utils/session.util");

exports.transfer = async function (req, res, next) {
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Transferencia.',
        schema: {
          $creditUser: {
            docTypeId: "DNI",
            docNumber: "2",
          },
          $amount: 100.0,
          $billNumber: 123,
          description: "Comentario opcional"
        }
  } */
  /* #swagger.responses[200] = {
        description: 'Transferencia realizada.',
        schema: {
          "creationDate": "2022-10-22T00:19:58.221Z",
          "id": 1,
          "accountId": 1,
          "amount": -100.0,
          "movementTypeId": "TRANSFER",
          "description": "Pago enviado",
          "billNumber": 123,
          "usernameDebit": "Usuario 1",
          "usernameCredit": "Usuario 2"
        }
    } */
  /* #swagger.responses[400] = {
        description: 'Error de negocio.',
        schema: {
          "statusCode": 400,
          "message": "Error de negocio."
        }
    } */
  /* #swagger.responses[500] = {
        description: 'Error interno.',
        schema: {
          "statusCode": 500,
          "message": "Error interno del servidor."
        }
    } */
  /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
  try {
    let movement = await TransferService.transfer(req.body, MovementTypeService.types.TRANSFER, getReqUser(req));
    return res.status(200).json(movement);
  } catch (e) {
    next(e);
  }
};
