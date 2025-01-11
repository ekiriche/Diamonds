'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Creator } from '@/app/types';

export default function LeaderboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/login');
      return;
    }

    const fetchCreators = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.rawg.io/api/creators?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=10`
        );
        const data = await response.json();
        setCreators(data.results);
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, [session, router, status]);

  if (!session || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Top Game Creators</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {creators.map((creator, index) => (
            <div 
              key={creator.id}
              className={`p-4 sm:p-6 ${
                index !== creators.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              {/* Mobile Layout (Stack) */}
              <div className="sm:hidden">
                <div className="flex items-center mb-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-10 text-xl font-bold text-gray-400">
                    #{index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={creator.image || '/placeholder-avatar.jpg'}
                      alt={creator.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="48px"
                    />
                  </div>

                  {/* Name */}
                  <div className="ml-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {creator.name}
                    </h2>
                  </div>
                </div>

                {/* Stats */}
                <div className="ml-10 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">Games:</span>
                    {creator.games_count}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {creator.positions.map((position) => (
                      <span
                        key={position.id}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {position.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Layout (Row) */}
              <div className="hidden sm:flex sm:items-center">
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-2xl font-bold text-gray-400">
                  #{index + 1}
                </div>

                {/* Avatar */}
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={creator.image || '/placeholder-avatar.jpg'}
                    alt={creator.name}
                    fill
                    className="object-cover rounded-full"
                    sizes="64px"
                  />
                </div>

                {/* Creator Info */}
                <div className="ml-6 flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {creator.name}
                  </h2>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {creator.positions.map((position) => (
                      <span
                        key={position.id}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {position.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="ml-4 flex-shrink-0 text-right">
                  <div className="text-sm text-gray-600">
                    Games: {creator.games_count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RAWG Attribution */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Data provided by{' '}
          <a 
            href="https://rawg.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            RAWG
          </a>
        </div>
      </div>
    </div>
  );
}