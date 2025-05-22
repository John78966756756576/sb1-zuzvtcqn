import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState, Card, Difficulty } from '../types';
import { getInitialCards, getInitialTimeByDifficulty, checkGameOver } from '../utils/gameUtils';

// Define the initial state
const initialState: GameState = {
  cards: [],
  flippedCards: [],
  moves: 0,
  score: 0,
  gameStarted: false,
  gameOver: false,
  difficulty: 'easy',
  timeRemaining: 60,
};

// Define action types
type GameAction =
  | { type: 'START_GAME'; payload: { difficulty: Difficulty } }
  | { type: 'FLIP_CARD'; payload: { card: Card } }
  | { type: 'CHECK_MATCH' }
  | { type: 'RESET_FLIPPED' }
  | { type: 'TICK' }
  | { type: 'RESET_GAME' };

// Create the reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        cards: getInitialCards(action.payload.difficulty),
        difficulty: action.payload.difficulty,
        timeRemaining: getInitialTimeByDifficulty(action.payload.difficulty),
        gameStarted: true,
        gameOver: false,
        moves: 0,
        score: 0,
        flippedCards: [],
      };
    
    case 'FLIP_CARD':
      // Don't allow flipping if there are already 2 flipped cards
      if (state.flippedCards.length >= 2) return state;
      
      // Don't allow flipping matched or already flipped cards
      if (action.payload.card.matched || action.payload.card.flipped) return state;
      
      const updatedCards = state.cards.map(card => 
        card.position === action.payload.card.position
          ? { ...card, flipped: true }
          : card
      );
      
      return {
        ...state,
        cards: updatedCards,
        flippedCards: [...state.flippedCards, action.payload.card],
      };
    
    case 'CHECK_MATCH':
      if (state.flippedCards.length !== 2) return state;
      
      const [first, second] = state.flippedCards;
      const isMatch = first.id === second.id;
      
      const cardsAfterCheck = state.cards.map(card => {
        if (isMatch && (card.position === first.position || card.position === second.position)) {
          return { ...card, matched: true };
        }
        return card;
      });
      
      const gameOver = checkGameOver(cardsAfterCheck);
      
      return {
        ...state,
        cards: cardsAfterCheck,
        moves: state.moves + 1,
        gameOver,
      };
    
    case 'RESET_FLIPPED':
      return {
        ...state,
        cards: state.cards.map(card => 
          !card.matched ? { ...card, flipped: false } : card
        ),
        flippedCards: [],
      };
    
    case 'TICK':
      if (!state.gameStarted || state.gameOver) return state;
      
      const newTimeRemaining = state.timeRemaining - 1;
      return {
        ...state,
        timeRemaining: newTimeRemaining,
        gameOver: newTimeRemaining <= 0 ? true : state.gameOver,
      };
    
    case 'RESET_GAME':
      return {
        ...initialState,
      };
    
    default:
      return state;
  }
};

// Create the context
interface GameContextProps {
  state: GameState;
  flipCard: (card: Card) => void;
  startGame: (difficulty: Difficulty) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

// Create the provider
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Handle timer
  useEffect(() => {
    let timer: number | undefined;
    
    if (state.gameStarted && !state.gameOver) {
      timer = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.gameStarted, state.gameOver]);
  
  // Check for matches when 2 cards are flipped
  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
        setTimeout(() => {
          dispatch({ type: 'RESET_FLIPPED' });
        }, 500);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [state.flippedCards]);
  
  const flipCard = (card: Card) => {
    dispatch({ type: 'FLIP_CARD', payload: { card } });
  };
  
  const startGame = (difficulty: Difficulty) => {
    dispatch({ type: 'START_GAME', payload: { difficulty } });
  };
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  return (
    <GameContext.Provider value={{ state, flipCard, startGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

// Create a custom hook
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};