import React from 'react';
import { Clock, Trophy, MoveHorizontal } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { formatTime } from '../utils/gameUtils';

const ScoreBoard: React.FC = () => {
  const { state } = useGame();
  const { moves, timeRemaining, difficulty } = state;

  return (
    <div className="flex justify-between items-center w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <Clock className="w-5 h-5 text-orange-500 mr-2" />
        <span className="font-mono text-lg font-semibold">{formatTime(timeRemaining)}</span>
      </div>
      
      <div className="flex items-center">
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
          {difficulty}
        </span>
      </div>
      
      <div className="flex items-center">
        <MoveHorizontal className="w-5 h-5 text-blue-500 mr-2" />
        <span className="font-semibold">{moves}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;