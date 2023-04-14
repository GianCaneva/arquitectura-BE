const MovementService = require("../services/movement.service");
const { getReqUser } = require("../utils/session.util");

exports.history = async function (req, res, next) {
  /* #swagger.responses[200] = {
      description: 'Historial de movimientos.',
      schema: [
        {
          "id": 70,
          "accountId": 1,
          "amount": -100.5,
          "movementTypeId": "TRANSFER",
          "billNumber": 123,
          "creationDate": "2022-10-23T00:31:04.000Z",
          "description": "Pago enviado",
          "usernameDebit": "Usuario 1",
          "usernameCredit": "Usuario 2"
        },
        {
          "id": 72,
          "accountId": 1,
          "amount": 100,
          "movementTypeId": "RECHARGE",
          "billNumber": null,
          "creationDate": "2022-10-23T00:31:50.000Z",
          "description": "Recarga de saldo",
          "usernameDebit": null,
          "usernameCredit": "Usuario 1"
        },
        {
          "id": 73,
          "accountId": 1,
          "amount": -500,
          "movementTypeId": "TRANSFER",
          "billNumber": 123,
          "creationDate": "2022-10-23T01:04:04.000Z",
          "description": "Pago enviado",
          "usernameDebit": "Usuario 1",
          "usernameCredit": "Usuario 2"
        }
      ]
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
    let movements = await MovementService.getList(getReqUser(req), 30);

    return res.status(200).json(movements);
  } catch (e) {
    next(e);
  }
};
