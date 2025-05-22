import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const handleClick = () => {
    if (!card.flipped && !card.matched) {
      onClick(card);
    }
  };

  return (
    <div 
      className="relative aspect-square w-full cursor-pointer"
      onClick={handleClick}
    >
      <div 
        className={`
          absolute inset-0 rounded-lg transition-all duration-300 ease-in-out transform 
          ${card.flipped ? 'rotate-y-180 pointer-events-none' : 'rotate-y-0'}
          ${card.matched ? 'opacity-70' : 'opacity-100'}
        `}
      >
        {/* Card Back */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700
            rounded-lg shadow-md flex items-center justify-center
            ${card.flipped ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-300
          `}
        >
          <span className="text-white text-xl font-bold">?</span>
        </div>
        
        {/* Card Front */}
        <div 
          className={`
            absolute inset-0 bg-white rounded-lg shadow-md
            flex flex-col items-center justify-center p-2
            ${card.flipped ? 'opacity-100' : 'opacity-0'}
            ${card.matched ? 'bg-green-50 border-2 border-green-500' : ''}
            transition-opacity duration-300
          `}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl mb-1">{card.emoji}</span>
          <span className="text-xs sm:text-sm font-medium text-center text-gray-700 truncate w-full">
            {card.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;