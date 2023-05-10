const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const morgan  = require("morgan");
const path = require('path')
const rfs = require('rotating-file-stream')
const cors = require("cors");
const createError = require("http-errors");
const swaggerUi = require('swagger-ui-express');
const dotenv = require("dotenv");
const log4js = require("log4js");

dotenv.config();

const usersRouter = require("./routes/user.route");
const transfersRouter = require("./routes/transfer.route");
const movementsRouter = require("./routes/movement.route");
const accountsRouter = require("./routes/account.route");
const contactsRouter = require("./routes/contact.route");
const swaggerFile = require('./swagger_output.json');

const { handleError } = require("./middlewares/error");
const { getReqUser } = require("./utils/session.util");
const { readMessages } = require("./kafka/schemas/recharge");
require("./queues/queue");

var app = express();

var accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log')
});

// morgan.token('docNumber', function (req, res) { return getReqUser(req)?.docNumber || req.body.docNumber })
// app.use(morgan(':date[iso] :docNumber - :method :url :status - :response-time ms', { 
//   stream: accessLogStream,
//   skip: function (req, res) { return req.baseUrl == '/doc' } 
// }));

log4js.configure({
  appenders: { everything: { type: "dateFile", filename: './log/pay.log' } },
  categories: { default: { appenders: ["everything"], level: "debug" } },
});

app.use(
  cors({
    origin: [
      "http://localhost:3100",
      "http://localhost:3000",
      "http://pay.deliver.ar:3000",
      "http://pay.deliver.ar:4000",
    ],
    // default: "http://pay.deliver.ar:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "s2cr2ts2ss34n",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/users", usersRouter
  // #swagger.tags = ['Usuarios']
);
app.use("/contacts", contactsRouter
  // #swagger.tags = ['Contactos']
);
app.use("/accounts", accountsRouter
  // #swagger.tags = ['Cuentas']
);
app.use("/movements", movementsRouter
  // #swagger.tags = ['Movimientos']
);
app.use("/transfers", transfersRouter
  // #swagger.tags = ['Transferencias']
);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use((req, res, next) => {
  next(createError(404));
});

app.use(handleError);

app.all('*', function(req, res, next) {
  const origin = cors.origin.contains(req.header('origin').toLowerCase()) ? req.headers.origin : cors.default;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

readMessages();

module.exports = app;
