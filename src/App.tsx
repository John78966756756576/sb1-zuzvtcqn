import React from 'react';
import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Food Memory Match</h1>
            <p className="text-gray-600">Find matching food pairs before time runs out!</p>
          </header>
          
          <GameControls />
          <ScoreBoard />
          <GameBoard />
          
          <footer className="mt-8 text-center text-sm text-gray-500">
            <p>Flip cards to find matching food items. Match all pairs to win!</p>
          </footer>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;