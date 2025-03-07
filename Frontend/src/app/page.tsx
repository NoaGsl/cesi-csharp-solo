'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bonjour 👋
        </h1>
        <button 
          onClick={() => router.push("/")}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Chercher des employés
        </button>
      </div>
    </div>
  );
}
