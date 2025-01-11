import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Hero Section */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Gaming Platform
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Your ultimate destination for exploring the world of games. 
            Discover new titles, track your gaming collection, and join our 
            vibrant community.
          </p>

          <Link 
            href="/login" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transform transition-transform hover:scale-105"
          >
            Get Started
          </Link>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Browse Games</h2>
              <p className="text-gray-400">
                Explore a vast collection of games with detailed information and ratings.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Virtual Currency</h2>
              <p className="text-gray-400">
                Purchase diamonds to enhance your gaming experience.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
              <p className="text-gray-400">
                Discover top game creators and their achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}