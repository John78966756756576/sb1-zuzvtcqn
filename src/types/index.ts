export interface FoodItem {
  id: number;
  name: string;
  emoji: string;
  category: 'fruit' | 'vegetable' | 'dessert' | 'fastFood';
}

export interface Card extends FoodItem {
  flipped: boolean;
  matched: boolean;
  position: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  moves: number;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
  difficulty: Difficulty;
  timeRemaining: number;
}