import React from 'react';
import Card from './Card';
import { useGame } from '../context/GameContext';

const GameBoard: React.FC = () => {
  const { state, flipCard } = useGame();
  const { cards, difficulty } = state;

  // Determine grid columns based on difficulty
  const gridCols = difficulty === 'easy' 
    ? 'grid-cols-3' 
    : difficulty === 'medium' 
      ? 'grid-cols-4' 
      : 'grid-cols-5';

  return (
    <div className="w-full max-w-3xl mx-auto p-2">
      <div 
        className={`grid ${gridCols} gap-3 sm:gap-4`}
      >
        {cards.map((card) => (
          <Card 
            key={`${card.id}-${card.position}`} 
            card={card} 
            onClick={flipCard} 
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;