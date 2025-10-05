export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
}

export interface Action {
  type: 'fold' | 'check' | 'call' | 'bet' | 'raise';
  amount?: number;
  position: 'BTN' | 'SB' | 'BB' | 'UTG' | 'MP' | 'CO';
  timing?: number; // milliseconds taken to act
}

export interface BluffScenario {
  id: string;
  communityCards: Card[];
  playerCards?: Card[]; // Optional for hidden information
  position: string;
  potSize: number;
  stackSize: number;
  actions: Action[];
  boardTexture: string;
  potOdds: number;
  difficulty: 'easy' | 'medium' | 'hard';
  scenarioType: 'river_bluff' | 'turn_aggression' | 'preflop_3bet' | 'check_raise';
  isBluff?: boolean; // Ground truth, only available for training data
}

export interface BluffPrediction {
  isBluff: boolean;
  confidence: number;
  explanation?: string;
}

// Base interface for all dataset adapters
export interface BluffDatasetAdapter {
  getNextScenario(options: ScenarioOptions): Promise<BluffScenario>;
  submitPrediction(scenarioId: string, prediction: BluffPrediction): Promise<PredictionResult>;
  getStats(): Promise<TrainingStats>;
}

export interface ScenarioOptions {
  difficulty?: 'easy' | 'medium' | 'hard';
  scenarioTypes?: string[];
  excludeIds?: string[]; // Scenarios to exclude (already seen)
}

export interface PredictionResult {
  correct: boolean;
  actualAnswer: 'bluff' | 'value';
  confidence: number;
  explanation?: string;
}

export interface TrainingStats {
  correct: number;
  incorrect: number;
  streak: number;
  bestStreak: number;
  byDifficulty: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
}
