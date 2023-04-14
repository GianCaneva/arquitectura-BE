const AccountService = require("../services/account.service");
const MovementService = require("../services/movement.service");
const BusinessError = require("../errors/business_error");
const { getReqUser } = require("../utils/session.util");

exports.get = async function (req, res, next) {
  /* #swagger.responses[200] = {
        description: 'Datos de la cuenta del usuario logueado.',
        schema: {
          "last30Balance": {
            "debit": 600.5,
            "credit": 200
          },
          "account": {
            "id": 1,
            "userId": 1,
            "balance": 396.5,
            "alias": "alias1",
            "cbu": "1111111111111111111111"
          }
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
    let user = getReqUser(req);
    let account = await AccountService.getUserAccount(user);
    return res.status(200).json({
      last30Balance: {
        debit: await MovementService.getBalanceDebitLastMovements(user, 30),
        credit: await MovementService.getBalanceCreditLastMovements(user, 30)
      },
      account
    });
  } catch (e) {
    next(e);
  }
};

exports.find = async function (req, res, next) {
  /* #swagger.responses[200] = {
        description: 'Cuenta encontrada.',
        schema: [{
          "id": 2,
          "alias": "alias2",
          "cbu": "2222222222222222222222",
          "user": {
            "id": 11,
            "docTypeId": "DNI",
            "docNumber": "2",
            "name": "Usuario 2"
          }
        }]
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
    if (!req.query.alias && !req.query.cbu) throw new BusinessError("Informar alias o cbu.");
    if (req.query.alias && req.query.cbu) throw new BusinessError("Informar alias o cbu, no ambos.");
    let account = await AccountService.find(req.query);
    return res.status(200).json(account);
  } catch (e) {
    next(e);
  }
};


exports.recharge = async function (req, res, next) {
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Recarga.',
        schema: {
          $amount: 100.0
        }
  } */
  /* #swagger.responses[200] = {
        description: 'Recarga realizada.',
        schema: {
          "movement": {
            "creationDate": "2022-10-23T00:31:50.624Z",
            "id": 72,
            "accountId": 1,
            "amount": 100,
            "movementTypeId": "RECHARGE",
            "description": "Recarga de saldo",
            "usernameCredit": "Usuario 1"
          },
          "account": {
            "id": 1,
            "userId": 1,
            "balance": "696.50",
            "alias": "alias1",
            "cbu": "1111111111111111111111"
          }
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
    let account = await AccountService.recharge(getReqUser(req), req.body);
    return res.status(200).json(account);
  } catch (e) {
    next(e);
  }
};

