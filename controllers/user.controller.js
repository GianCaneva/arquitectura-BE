const UserService = require("../services/user.service")

exports.login = async function (req, res, next) {
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Datos login.',
        schema: {
          $docTypeId: "DNI",
          $docNumber: "1",
          $password: "1"
        }
  } */
  /* #swagger.responses[200] = {
        description: 'Login OK.',
        schema: {
          "user": {
            "id": 1,
            "docTypeId": "DNI",
            "docNumber": "1",
            "name": "Apellido 1"
          }
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
  try {
    let loginResp = await UserService.login(req.body);
    res.setHeader("Set-Cookie", `token=${loginResp.token}; HttpOnly; Path=/`);
    return res.status(200).json({ user: loginResp.user });
  } catch (e) {
    next(e);
  }
};

exports.logout = async function (req, res, next) {
  /* #swagger.responses[204] = {
        description: 'Logout OK.'
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
    res.setHeader("Set-Cookie", `token=; HttpOnly; Path=/; max-age=0`);
    return res.status(204).json();
  } catch (e) {
    next(e);
  }
};

exports.create = async function (req, res, next) {
  try {
    let user = await UserService.create(req.body);
    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};
