'use client'; // Needed to use client-side interactivity like onClick

import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function HostPage() {
  const router = useRouter();

  return (
    //main container of page
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">

      <h1 className='text-4xl font-bold mb-6'>🎵 Offbeat</h1>
      <p className='text-lg mb-12 max-w-md'>
        Share game code! 12345
      </p>

      <div className='flex flex-col gap-4 w-full max-w-xs'>
        <Link 
          href='/game/laptopHost'
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          START GAME
        </Link>
      </div>
      <div className='flex flex-col gap-4 w-full max-w-xs'>
        <br></br>
        <h3>Players: molly, holly, rolly, tolly, bolly</h3>
      </div>

    </main>
  );
}