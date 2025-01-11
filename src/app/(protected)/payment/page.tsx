'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PurchaseButton from '@/components/PurchaseButton';

const DIAMOND_PACKAGES = [
  { amount: 100, price: 0.99 },
  { amount: 500, price: 4.99 },
  { amount: 1000, price: 9.99 },
];

export default function PaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [diamonds, setDiamonds] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/login');
      return;
    }
    
    const storedDiamonds = localStorage.getItem('diamonds');
    setDiamonds(storedDiamonds ? parseInt(storedDiamonds) : 0);
  }, [session, router, status]);

  const handlePurchase = (amount: number) => {
    const newTotal = diamonds + amount;
    setDiamonds(newTotal);
    localStorage.setItem('diamonds', newTotal.toString());
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Buy Diamonds</h1>
        
        {/* Current balance */}
        <div className="bg-white rounded-lg p-6 mb-8 text-center shadow-md">
          <h2 className="text-xl mb-2">Your Current Balance</h2>
          <p className="text-3xl font-bold text-purple-600">💎 {diamonds}</p>
        </div>

        {/* Purchase options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIAMOND_PACKAGES.map(({ amount, price }) => (
            <PurchaseButton
              key={amount}
              amount={amount}
              price={price}
              onPurchase={handlePurchase}
            />
          ))}
        </div>

        {/* Success message */}
        {showSuccess && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
            Purchase successful! 🎉
          </div>
        )}
      </div>
    </div>
  );
}