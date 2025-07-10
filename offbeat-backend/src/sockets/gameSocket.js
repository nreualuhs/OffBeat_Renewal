// src/sockets/gameSocket.js

//imports utility function for game code
const { generateCode } = require('../utils/codeGenerator');

// In-memory store, keep track of all active game lobbies
//each lobby is stored with a key (game code), & value (an object w/ host & players)
const lobbies = new Map();

//called everytime a new client connects via websocket
//socket = individual client
function handleSocketEvents(socket, io) {
  console.log(`Socket connected: ${socket.id}`);//logs connection of new client for debugging

  // Host creates a game
  socket.on('create_game', () => {
    const gameCode = generateCode();
    lobbies.set(gameCode, {
      host: socket.id,
      players: [],
    });//stores new lobby in memory w/ host ID and empty player list

    socket.join(gameCode);//add host to socket.IO room to allow broadcasting messages
    socket.emit('game_created', { gameCode });//sends game code back to host so they can share it with others
    console.log(`Game created with code: ${gameCode}`);//logs creation of game
  });

  // Player joins a game
  socket.on('join_game', ({ gameCode, playerName }) => {
    const lobby = lobbies.get(gameCode);//look up lobby using game code

    if (!lobby) {
      socket.emit('error', { message: 'Invalid game code' });
      return;
    }//if invalid, send error and exit

    const player = { id: socket.id, name: playerName };//creat player object and add to lobby list
    lobby.players.push(player);

    socket.join(gameCode);

    // Notify all players in the lobby
    io.to(gameCode).emit('player_joined', { playerName });//broadcast new player to everyone
    console.log(`${playerName} joined game ${gameCode}`);//logs join event for debugging
  });

  // Host starts the game
  //listens for start_game event from the host
  socket.on('start_game', ({ gameCode }) => {
    const lobby = lobbies.get(gameCode);

    //ensures that only the host can start the game. if not, sends an error
    if (!lobby || lobby.host !== socket.id) {
      socket.emit('error', { message: 'Only the host can start the game' });
      return;
    }

    //broadcast to all players in the room that the game has started
    io.to(gameCode).emit('game_started');

    console.log(`Game ${gameCode} started`);//logs start of the game
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    // Optional: clean up lobbies or notify others
  });//logs when a player disconnects. 
}

module.exports = { handleSocketEvents };//exports function so it can be used in your server.js
