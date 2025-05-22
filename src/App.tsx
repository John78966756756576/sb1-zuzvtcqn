import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import Auth from './components/Auth';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Food Memory Match</h1>
              <p className="text-gray-600">Find matching food pairs before time runs out!</p>
              <button
                onClick={() => supabase.auth.signOut()}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
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
    </Router>
  );
}

export default App;