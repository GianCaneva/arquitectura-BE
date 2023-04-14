const ContactService = require("../services/contact.service")
const { getReqUser } = require("../utils/session.util");

exports.getList = async function (req, res, next) {
  /* #swagger.responses[200] = {
        description: 'Contactos.',
        schema: [
          {
            "id": 2,
            "accountId": 1,
            "observation": "Comentario",
            "account": {
              "id": 1,
              "alias": "alias1",
              "cbu": "1111111111111111111111",
              "user": {
                "id": 1,
                "docTypeId": "DNI",
                "docNumber": "1",
                "name": "Usuario 1"
              }
            }
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
    let contacts = await ContactService.getList(getReqUser(req));
    return res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

exports.add = async function (req, res, next) {
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Contacto a agregar.',
        schema: {
          $accountId: 2,
          observation: "Comentario opcional"
        }
  } */
  /* #swagger.responses[201] = {
        description: 'Contacto agregado.',
        schema: {
          "id": 1,
          "userId": 1,
          "accountId": 2
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
    let contact = await ContactService.add(getReqUser(req), req.body);
    return res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
};
