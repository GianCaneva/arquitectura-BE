const StompJs = require("stompjs");
const SockJS = require("sockjs-client");

const socket = new SockJS("http://core.deliver.ar/partners");
const AdministradorQueue = require("./administrador.queue");
const ClienteQueue = require("./cliente.queue");
const DesarrolloInternoQueue = require("./desarrolloInterno.queue");

const stompClient = StompJs.over(socket);
stompClient.connect({}, function (frame) {
  console.log("Connected: " + frame);
  stompClient.subscribe("/topic/partners", function (user) {
    processMessage(JSON.parse(user.body));
  });
  stompClient.send("/app/partners");
});

function processMessage(message) {
  try {
    console.log(new Date() + ' Mensaje recibido: ' + JSON.stringify(message));
    let msg = JSON.parse(message.contenido);

    if (message.emisor == "administrador") AdministradorQueue.processMessage(msg);
    else if (message.emisor == "cliente") ClienteQueue.processMessage(msg);
    else if (message.emisor == "desarrolloInterno") DesarrolloInternoQueue.processMessage(msg);
  } catch(e) {
    console.log("Error al procesar mensaje", e);
  }
}

module.exports = {};
