import { Game } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link 
      href={`/games/${game.id}`}
      className="block overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
    >
      <div className="relative h-48 w-full">
        <Image
          src={game.background_image}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">{game.name}</h2>
        <p className="text-sm text-gray-600">
          Released: {new Date(game.released).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}