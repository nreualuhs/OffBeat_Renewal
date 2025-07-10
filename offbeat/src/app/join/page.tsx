'use client'; // Needed to use client-side interactivity like onClick

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import socket from '@/lib/socket';

export default function JoinPage() {
  const router = useRouter();//used to navigate to another page
  
  /** usestate is a react hook that lets you create and manage state in a functional component 
   *    gameCode & playerName = state variables (store current values from input)
   *    setGameCode & setPlayerName = functions update values
  */
  const [gameCode, setGameCode] = useState('');//state for game code input
  const [playerName, setPlayerName] = useState('');//state for player name input
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (gameCode && playerName) {
      socket.emit('join_game', { gameCode, playerName });

      socket.on('player_joined', () => {
        router.push('/game/player');
      });

      socket.on('error', ({ message }) => {
        setError(message);
      });
    }
  };

  return (
    //main container of page
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">🎵 Offbeat</h1>

      <input
        type="text"
        placeholder="Game Code"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
        className="mb-4 px-4 py-2 border"
      />
      <input
        type="text"
        placeholder="Your Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="mb-4 px-4 py-2 border"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button onClick={handleJoin} className="bg-green-500 text-white px-6 py-2 rounded">
        Join
      </button>
    </main>
  );
}