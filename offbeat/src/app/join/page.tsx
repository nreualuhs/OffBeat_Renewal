'use client'; // Needed to use client-side interactivity like onClick

import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Join Page</h1>
    </div>
  );
}