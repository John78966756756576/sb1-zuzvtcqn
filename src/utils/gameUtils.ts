import { Card, Difficulty, FoodItem } from '../types';
import { foodItems } from '../data/foodItems';

export const getInitialCards = (difficulty: Difficulty): Card[] => {
  // Determine number of pairs based on difficulty
  const pairCount = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;
  
  // Get random food items
  const randomFoods = [...foodItems]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairCount);
  
  // Create pairs and shuffle
  const pairs = [...randomFoods, ...randomFoods].map((food, index) => ({
    ...food,
    flipped: false,
    matched: false,
    position: index,
  }));
  
  return pairs.sort(() => Math.random() - 0.5);
};

export const getInitialTimeByDifficulty = (difficulty: Difficulty): number => {
  switch(difficulty) {
    case 'easy': return 60;
    case 'medium': return 90;
    case 'hard': return 120;
    default: return 60;
  }
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const calculateScore = (moves: number, timeRemaining: number, difficulty: Difficulty): number => {
  const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
  const baseScore = 1000;
  const movesPenalty = moves * 10;
  const timeBonus = timeRemaining * 5;
  
  return Math.max(0, Math.floor((baseScore - movesPenalty + timeBonus) * difficultyMultiplier));
};

export const checkGameOver = (cards: Card[]): boolean => {
  return cards.every(card => card.matched);
};