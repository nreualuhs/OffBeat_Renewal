'use client'; // Needed to use client-side interactivity like onClick

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JoinPage() {
  const router = useRouter();//used to navigate to another page
  
  /** usestate is a react hook that lets you create and manage state in a functional component 
   *    gameCode & playerName = state variables (store current values from input)
   *    setGameCode & setPlayerName = functions update values
  */
  const [gameCode, setGameCode] = useState('');//state for game code input
  const [playerName, setPlayerName] = useState('');//state for player name input

  const handleJoin = () => {
    if (gameCode && playerName) {
      router.push('/game/player'); // navigate to player game page
    }
  };

  return (
    //main container of page
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6 py-12"
    >
      <div className="text-center text-black">
        {/* Stylized Title */}
        <h1 className="text-4xl font-bold mb-6">🎵 Offbeat</h1>

        {/* Game Code Input */}
        <p>Enter Game Code: </p>
        <input
          type="text"
          placeholder="e.g., 69420"
          className="w-full max-w-xs px-4 py-3 rounded-md mb-4 text-black text-center placeholder-gray-500 border border-black"
          
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
        />

        {/* Name Input */}
        <p>Enter Name: </p>
        <input
          type="text"
          placeholder="e.g., Lauren Da Beast"
          className="w-full max-w-xs px-4 py-3 rounded-md mb-6 text-black text-center placeholder-gray-500 border border-black"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        {/* Join Button */}
        <button
          onClick={handleJoin}
          className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full transition duration-200"
        >
          Join
        </button>
      </div>
    </main>
  );
}