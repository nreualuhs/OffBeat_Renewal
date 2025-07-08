'use client'; // Needed to use client-side interactivity like onClick

import { useRouter } from 'next/navigation';

export default function HostPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Hosting Page</h1>
    </div>
  );
}