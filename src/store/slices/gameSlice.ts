import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: string;
  value: number;
}

export interface Player {
  id: string;
  name: string;
  chips: number;
  cards: Card[];
  position: number;
  isDealer: boolean;
  currentBet: number;
  hasActed: boolean;
  isFolded: boolean;
  isAllIn: boolean;
}

export interface GameState {
  players: Player[];
  communityCards: Card[];
  pot: number;
  currentBet: number;
  gamePhase: 'preflop' | 'flop' | 'turn' | 'river' | 'showdown' | 'waiting';
  currentPlayerIndex: number;
  isTrainingMode: boolean;
  scenario: {
    id: string;
    description: string;
    suspiciousPlayerId?: string;
    correctAnswer?: 'bluff' | 'value';
    playerActions: string[];
    boardTexture: string;
    potOdds: number;
  } | null;
  trainingStats: {
    correct: number;
    incorrect: number;
    streak: number;
    bestStreak: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  players: [],
  communityCards: [],
  pot: 0,
  currentBet: 0,
  gamePhase: 'waiting',
  currentPlayerIndex: 0,
  isTrainingMode: true,
  scenario: null,
  trainingStats: {
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
  },
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchTrainingScenario = createAsyncThunk('game/fetchTrainingScenario', async () => {
  // This would call the backend API
  // For now, return mock data
  return {
    id: `scenario_${Date.now()}`,
    description: 'Player raises big on the river with a scary board',
    suspiciousPlayerId: 'player_2',
    correctAnswer: 'bluff' as const,
    playerActions: ['fold', 'call', 'raise'],
    boardTexture: 'wet',
    potOdds: 3.5,
  };
});

export const submitBluffDetection = createAsyncThunk(
  'game/submitBluffDetection',
  async ({ prediction, scenarioId }: { prediction: 'bluff' | 'value'; scenarioId: string }) => {
    console.log('submitBluffDetection: prediction, scenarioId', prediction, scenarioId);
    // This would submit to the ML model via backend API
    // For now, return mock result
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      correct: Math.random() > 0.4, // 60% correct rate for demo
      actualAnswer: Math.random() > 0.5 ? 'bluff' : 'value',
      confidence: Math.random() * 0.4 + 0.6, // 60-100% confidence
    };
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    setCommunityCards: (state, action: PayloadAction<Card[]>) => {
      state.communityCards = action.payload;
    },
    updatePot: (state, action: PayloadAction<number>) => {
      state.pot = action.payload;
    },
    setGamePhase: (state, action: PayloadAction<GameState['gamePhase']>) => {
      state.gamePhase = action.payload;
    },
    resetGame: state => {
      state.players = [];
      state.communityCards = [];
      state.pot = 0;
      state.currentBet = 0;
      state.gamePhase = 'waiting';
      state.scenario = null;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrainingScenario.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingScenario.fulfilled, (state, action) => {
        state.loading = false;
        state.scenario = action.payload;
        state.gamePhase = 'river'; // Set to river for training scenarios
      })
      .addCase(fetchTrainingScenario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch scenario';
      })
      .addCase(submitBluffDetection.pending, state => {
        state.loading = true;
      })
      .addCase(submitBluffDetection.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.correct) {
          state.trainingStats.correct++;
          state.trainingStats.streak++;
          if (state.trainingStats.streak > state.trainingStats.bestStreak) {
            state.trainingStats.bestStreak = state.trainingStats.streak;
          }
        } else {
          state.trainingStats.incorrect++;
          state.trainingStats.streak = 0;
        }
      })
      .addCase(submitBluffDetection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit prediction';
      });
  },
});

export const { setPlayers, setCommunityCards, updatePot, setGamePhase, resetGame, clearError } = gameSlice.actions;
export default gameSlice.reducer;
