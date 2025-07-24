'use client'; // Needed to use client-side interactivity like onClick

import { useEffect, useState } from 'react';
import socket from '@/lib/socket';

import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function HostPage() {
  const router = useRouter();
  const [gameCode, setGameCode] = useState('');
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('create_game'); // ask backend to create

    socket.on('game_created', ({ gameCode }) => {
      setGameCode(gameCode);
    });

    socket.on('player_joined', ({ players }) => {
      console.log('Updated Player list:', players);
      setPlayers(players);
    });

    return () => {
      socket.off('game_created');
      socket.off('player_joined');
    };
  }, []);

  const startGame = () => {
    socket.emit('start_game', { gameCode });
  };

  return (
    //main container of page
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">

      <h1 className='text-4xl font-bold mb-6'>🎵 Offbeat</h1>
      <p className='text-lg mb-4'>Share this game code: <strong>{gameCode}</strong></p>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Players:</h3>
        <ul>
          {players.map((name, idx) => (
            <li key={idx}>{name}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={startGame}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
      >
        Start Game
      </button>

    </main>
  );
}