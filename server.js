// SIMPLY LAUNCH APP.JS WITHOUT ERROR HANDLE
//////////////////////////////////////////////
// console.log('Hello!');

// const http = require('http');
// const app = require('./backend/app');
// const port = process.env.POR || 3000;

// app.set('port', port);

// const server = http.createServer(app)

// server.listen(port);

//launch backend app.js with error handling

const app = require("./backend/app");
const debug = require("debug")("node-angular");//to drugie to dowolna nazwa chyba
const http = require("http");


const normalizePort = val => {//normalize port function, to ensure it's a valid number when we receive from environment
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => { //on error funtion to log smth on each error type
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {//to output that we listen to upcoming req
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000"); //setting up the port
app.set("port", port); //set port on exxpress app

const server = http.createServer(app); //set up node server
server.on("error", onError); //set up listener on error
server.on("listening", onListening); //set up listener on listening
server.listen(port); //start a server


//also installed nodemon "npm i --save-dev nodemon" to install the testing environment, watches node.js files and restart on change
//wcześniej używaliśmy "node server.js", żeby odpalić za każdym razem

