import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BluffDetectionService } from '../../services/bluff-detection/bluff-detection-service';

// Initialize the bluff detection service
const bluffService = BluffDetectionService.getInstance('poker-bench');

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
  selectedDifficulty: 'easy' | 'medium' | 'hard';
  selectedScenarioTypes: string[];
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
  selectedDifficulty: 'medium',
  selectedScenarioTypes: ['river_bluff', 'turn_aggression', 'preflop_3bet', 'check_raise'],
};

// Async thunks for API calls
export const fetchTrainingScenario = createAsyncThunk(
  'game/fetchTrainingScenario',
  async (_, { getState }) => {
    const state = getState() as { game: GameState };
    const { selectedDifficulty, selectedScenarioTypes } = state.game;

    const scenario = await bluffService.getNextScenario({
      difficulty: selectedDifficulty,
      scenarioTypes: selectedScenarioTypes,
    });

    // Convert the scenario to the format expected by the frontend
    return {
      id: scenario.id,
      description: `${scenario.position} player in a ${scenario.boardTexture} board`,
      suspiciousPlayerId: 'player_1',
      playerActions: scenario.actions.map(a => `${a.type}${a.amount ? ` ${a.amount}` : ''}`),
      boardTexture: scenario.boardTexture,
      potOdds: scenario.potOdds,
    };
  }
);

export const submitBluffDetection = createAsyncThunk(
  'game/submitBluffDetection',
  async ({ prediction, scenarioId }: { prediction: 'bluff' | 'value'; scenarioId: string }) => {
    const result = await bluffService.submitPrediction(scenarioId, {
      isBluff: prediction === 'bluff',
      confidence: 0.8, // We could get this from the UI in the future
    });

    return {
      correct: result.correct,
      actualAnswer: result.actualAnswer,
      confidence: result.confidence,
    };
  }
);

export const switchDataset = createAsyncThunk(
  'game/switchDataset',
  async (datasetType: 'poker-bench' | 'manual') => {
    await bluffService.switchDataset(datasetType);
    return datasetType;
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
    setDifficulty: (state, action: PayloadAction<'easy' | 'medium' | 'hard'>) => {
      state.selectedDifficulty = action.payload;
    },
    setScenarioTypes: (state, action: PayloadAction<string[]>) => {
      state.selectedScenarioTypes = action.payload;
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
      })
      .addCase(switchDataset.fulfilled, (state) => {
        // Reset stats when switching datasets
        state.trainingStats = {
          correct: 0,
          incorrect: 0,
          streak: 0,
          bestStreak: 0,
        };
      });
  },
});

export const {
  setPlayers,
  setCommunityCards,
  updatePot,
  setGamePhase,
  resetGame,
  clearError,
  setDifficulty,
  setScenarioTypes,
} = gameSlice.actions;
export default gameSlice.reducer;