const { handleSocketEvents } = require('./sockets/gameSocket');

const express = require('express');//imports Express framework, simplifies creating HTTP servers & API's
const http = require('http');//import to work wuth both http and websocket connections
const cors = require('cors');//allow backend to accept requests from different origins
const { Server } = require('socket.io');//enable real time communication

require('dotenv').config();//load env variables from a .enc file into process.env

const app = express();//init Express app instance
app.use(cors());//enable frontend to communicate with this backend

const server = http.createServer(app);//creates http server 


//init socketIo server attached to http server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend dev port
    methods: ["GET", "POST"]
  }
});

//import custom function that defines how to handle webSocket events
//const { handleSocketEvents } = require('./sockets/gameSocket');

//listens for new websocket connections
//when a client connects, it calls handleSocketEvents with socket and io
io.on('connection', (socket) => {
  handleSocketEvents(socket, io);
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));