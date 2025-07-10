# Offbeat Backend

This is the backend for **Offbeat**, a real-time multiplayer game inspired by Kahoot and Jackbox. Players can host a game session and others can join using a unique game code. The backend handles WebSocket communication, game state management, and player coordination.

## 🚀 Features

- **WebSocket Communication**: Real-time updates between host and players.
- **Game Code Generation**: Unique 4-letter codes for joining games.
- **Lobby Management**: Players join lobbies using a valid game code and name.
- **Game State Sync**: All players transition to the game phase simultaneously when the host starts the game.

## 🛠️ Tech Stack

- **Node.js** with **Express** (or Fastify)
- **WebSocket** (e.g., `ws` or `socket.io`)
- **UUID / Custom Code Generator**
- **In-memory store** (e.g., `Map`, or Redis for production

