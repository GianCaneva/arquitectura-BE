const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Pagos",
  },
  host: "pay.deliver.ar:4000",
  // host: "localhost:4000",
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
