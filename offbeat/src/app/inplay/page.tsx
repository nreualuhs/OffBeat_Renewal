'use client';

import { useEffect, useState } from 'react';
import socket from '@/lib/socket';

export default function InPlayPage() {
  const [phase, setPhase] = useState<'prep' | 'vote' | 'done'>('prep');
  const [timer, setTimer] = useState(30);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, number> | null>(null);

  const gameCode =
    typeof window !== 'undefined' ? localStorage.getItem('gameCode') : '';

  // Countdown logic
  useEffect(() => {
    if (timer <= 0) {
      if (phase === 'prep') {
        setPhase('vote');
        setTimer(15);
      } else if (phase === 'vote') {
        setPhase('done');
      }
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, phase]);

  // Listen for vote results
  useEffect(() => {
    socket.on('vote_results', ({ results }) => {
      setResults(results);
    });

    return () => {
      socket.off('vote_results');
    };
  }, []);

  const handleVote = (option: string) => {
    if (phase === 'vote' && gameCode && !selectedVote) {
      setSelectedVote(option);
      socket.emit('submit_vote', { gameCode, vote: option });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">🗳️ Voting Round</h1>
      <p className="text-xl mb-6">
        Time Remaining: <strong>{timer}s</strong>
      </p>

      {phase === 'prep' && (
        <p className="text-lg">Get ready! Voting starts soon...</p>
      )}

      {phase === 'vote' && (
        <div className="space-y-4">
          <p className="text-lg">Choose your favorite option:</p>
          <div className="flex flex-col gap-2">
            {['Option A', 'Option B', 'Option C'].map((opt) => (
              <button
                key={opt}
                onClick={() => handleVote(opt)}
                disabled={!!selectedVote}
                className={`px-6 py-2 rounded text-white ${
                  selectedVote === opt
                    ? 'bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {selectedVote && (
            <p className="mt-4 text-green-700">You voted for: {selectedVote}</p>
          )}
        </div>
      )}

      {phase === 'done' && (
        <>
          <p className="text-lg text-gray-600 mb-4">
            Voting is over! Here are the results:
          </p>
          {results ? (
            <ul className="text-left">
              {Object.entries(results).map(([option, count]) => (
                <li key={option} className="text-lg">
                  {option}: <strong>{count}</strong> vote{count !== 1 ? 's' : ''}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Waiting for results...</p>
          )}
        </>
      )}
    </main>
  );
}
