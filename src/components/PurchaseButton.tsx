'use client';

import { useState } from 'react';

interface PurchaseButtonProps {
  amount: number;
  price: number;
  onPurchase: (amount: number) => void;
}

export default function PurchaseButton({ amount, price, onPurchase }: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    onPurchase(amount);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={isLoading}
      className={`relative flex flex-col items-center justify-center rounded-lg p-6 transition-all
        ${isLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}
        text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
    >
      <span className="text-3xl mb-2">💎 {amount}</span>
      <span className="text-xl font-bold">${price}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </button>
  );
}