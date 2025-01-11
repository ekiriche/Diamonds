'use client';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function LoginPage() {
  const { data: session } = useSession()

  console.log(session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Welcome to Gaming Platform</h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/games' })}
          className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md hover:bg-gray-50"
        >
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="mr-2 h-6 w-6"
            width={32}
            height={32}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}