'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Game } from '@/app/types';
import { useParams } from 'next/navigation'

export default function GamePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/login');
      return;
    }

    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.rawg.io/api/games/${params.id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
        );
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [session, params.id, router, status]);

  if (!session || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Game not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Game Image */}
          <div className="relative h-[400px] w-full">
            <Image
              src={game.background_image || '/placeholder-game.jpg'}
              alt={game.name}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Game Details */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{game.name}</h1>
            
            <div className="space-y-4">
              {/* Release Date */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Release Date</h2>
                <p className="text-gray-600">
                  {new Date(game.released).toLocaleDateString()}
                </p>
              </div>

              {/* Rating */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Rating</h2>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="ml-1 text-gray-600">{game.rating}/5</span>
                </div>
              </div>

              {/* Platforms */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Platforms</h2>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map(({ platform }) => (
                    <span
                      key={platform.id}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {platform.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Website Link */}
              {game.website && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Website</h2>
                  <a
                    href={game.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Official Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push('/games')}
          className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back to Games
        </button>

        {/* RAWG Attribution */}
        <div className="text-center mt-8 text-sm text-gray-600">
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