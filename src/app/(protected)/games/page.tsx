'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GameCard from '@/components/GameCard';
import Pagination from '@/components/Pagination';
import { Game, GamesResponse } from '@/types';

export default function GamesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/login');
      return;
    }

    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${currentPage}&page_size=12`
        );
        const data: GamesResponse = await response.json();
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / 12));
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [session, currentPage, router, status]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Popular Games</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

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
          </>
        )}
      </div>
    </div>
  );
}