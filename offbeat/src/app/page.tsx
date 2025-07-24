//client-side navigation between pages needed
import Link from 'next/link';

//defines & exports main component for the homepage
export default function HomePage() {
  return (
    //main container of page (Tailwind CSS utility classes for extra)
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      
      
      <h1 className="text-4xl font-bold mb-6">🎵 Offbeat</h1>
      
      <p className="text-lg mb-12 max-w-md">
        Welcome! In this game, most players are Dancers trying to follow the beat — 
        but one Impostor is faking it. Can you spot the fake?
      </p>

      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/join"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Join Game
        </Link>
        <Link
          href="/host"
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Host Game
        </Link>
      </div>
    </main>
  );
}