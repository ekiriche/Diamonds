'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex space-x-4">
            {session && (
              <>
              <Link href="/games" className="hover:text-gray-300">
                Games
              </Link>
              <Link href="/payment" className="hover:text-gray-300">
                Store
              </Link>
              <Link href="/leaderboard" className="hover:text-gray-300">
                Leaderboard
              </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {session?.user && (
              <>
                <div className="flex items-center space-x-2">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full hidden sm:inline"
                    />
                  )}
                  <span className="hidden sm:inline">{session.user.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}