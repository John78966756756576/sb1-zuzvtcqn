import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Play, RefreshCw } from 'lucide-react';
import { Difficulty } from '../types';
import { calculateScore } from '../utils/gameUtils';

const GameControls: React.FC = () => {
  const { state, startGame, resetGame } = useGame();
  const { gameStarted, gameOver, difficulty, moves, timeRemaining } = state;
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulty);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value as Difficulty);
  };

  const handleStartGame = () => {
    startGame(selectedDifficulty);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      {!gameStarted ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Food Memory Game</h2>
          <div className="mb-4">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
              Select Difficulty:
            </label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="easy">Easy (6 pairs)</option>
              <option value="medium">Medium (8 pairs)</option>
              <option value="hard">Hard (10 pairs)</option>
            </select>
          </div>
          <button
            onClick={handleStartGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-md shadow hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
            Game Over!
          </h2>
          <div className="flex flex-col items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mb-2" />
            <p className="text-lg font-medium">Final Score:</p>
            <p className="text-3xl font-bold text-green-600">
              {calculateScore(moves, timeRemaining, difficulty)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Completed in {moves} moves with {timeRemaining} seconds remaining
            </p>
          </div>
          <button
            onClick={resetGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Play Again
          </button>
        </div>
      ) : (
        <button
          onClick={resetGame}
          className="w-full py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all"
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default GameControls;