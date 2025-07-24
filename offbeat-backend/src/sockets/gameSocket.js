// src/sockets/gameSocket.js

//imports utility function for game code
const { generateCode } = require('../utils/codeGenerator');

// In-memory store, keep track of all active game lobbies
//each lobby is stored with a key (game code), & value (an object w/ host & players)
const lobbies = new Map();
const votes = new Map();

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

    // Emit to the newly joined player only
    socket.emit('joined_successfully', {
      gameCode,
      players: lobby.players.map((p) => p.name),
    });


    // Notify all players in the lobby
    io.to(gameCode).emit('player_joined', {
      players: lobby.players.map((p) => p.name),
    });

    console.log(`${playerName} joined game ${gameCode}`);//logs join event for debugging
  });

  socket.on('start_game', ({ gameCode }) => {
    const lobby = lobbies.get(gameCode);

    if (!lobby || lobby.host !== socket.id) {
      socket.emit('error', { message: 'Only the host can start the game' });
      return;
    }

    io.to(gameCode).emit('game_started');
    console.log(`Game ${gameCode} started`);

    // Automatically end voting after 45 seconds (30 prep + 15 vote)
    setTimeout(() => {
      endVoting(gameCode, io);
    }, 45000);
  });


  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    // Optional: clean up lobbies or notify others
  });//logs when a player disconnects.

  socket.on('submit_vote', ({ gameCode, vote }) => {
    if (!lobbies.has(gameCode)) return;

    if (!votes.has(gameCode)) {
      votes.set(gameCode, []);
    }

    votes.get(gameCode).push(vote);
    console.log(`Vote received for ${gameCode}: ${vote}`);
  });
}

function endVoting(gameCode, io) {
  const voteList = votes.get(gameCode) || [];
  const tally = {};

  voteList.forEach((vote) => {
    tally[vote] = (tally[vote] || 0) + 1;
  });

  io.to(gameCode).emit('vote_results', { results: tally });
  console.log(`Results for ${gameCode}:`, tally);
}


module.exports = { handleSocketEvents };//exports function so it can be used in your server.js
