import { BluffDatasetAdapter, BluffScenario, BluffPrediction, ScenarioOptions, PredictionResult, TrainingStats, Action } from '../types';
import { loadModel, predictBluff } from '../model/bluff-model';

// Helper function to create a scenario
const createScenario = (
  id: string,
  communityCards: BluffScenario['communityCards'],
  position: string,
  actions: Action[],
  difficulty: 'easy' | 'medium' | 'hard',
  scenarioType: BluffScenario['scenarioType'],
  isBluff: boolean,
  potSize: number = 100,
  stackSize: number = 1000,
): BluffScenario => ({
  id,
  communityCards,
  position,
  potSize,
  stackSize,
  actions,
  boardTexture: getBoardTexture(communityCards),
  potOdds: calculatePotOdds(actions, potSize),
  difficulty,
  scenarioType,
  isBluff,
});

// Helper to calculate pot odds based on last bet and pot size
const calculatePotOdds = (actions: Action[], potSize: number): number => {
  const lastBet = actions.reverse().find(a => a.type === 'bet' || a.type === 'raise')?.amount || 0;
  return lastBet > 0 ? Number((potSize / lastBet).toFixed(1)) : 0;
};

// Helper to analyze board texture
const getBoardTexture = (cards: BluffScenario['communityCards']): string => {
  const ranks = cards.map(c => c.rank);
  const suits = cards.map(c => c.suit);
  
  const isFlushPossible = suits.filter(s => suits.filter(x => x === s).length >= 3).length > 0;
  const isStraightPossible = ranks.some(r => ranks.filter(x => Math.abs(Number(x) - Number(r)) <= 4).length >= 3);
  const hasPair = ranks.some(r => ranks.filter(x => x === r).length >= 2);
  
  if (isFlushPossible && isStraightPossible) return 'Draw-heavy';
  if (isFlushPossible) return 'Flush possible';
  if (isStraightPossible) return 'Straight possible';
  if (hasPair) return 'Paired';
  return 'Dry';
};

export class PokerBenchAdapter implements BluffDatasetAdapter {
  private model: any; // Replace with actual model type
  private scenarios: BluffScenario[] = [];
  private stats: TrainingStats = {
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
    byDifficulty: {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 },
    },
  };

  constructor() {
    this.initializeModel();
  }

  private async initializeModel() {
    this.model = await loadModel('poker-bench-v1');
    // Load initial scenarios from the dataset
    this.scenarios = await this.loadScenarios();
  }

  private async loadScenarios(): Promise<BluffScenario[]> {
    return [
      // River Bluff Scenarios
      createScenario(
        'river_bluff_1',
        [
          { suit: 'hearts', rank: 'A' },
          { suit: 'spades', rank: 'K' },
          { suit: 'diamonds', rank: 'Q' },
          { suit: 'clubs', rank: '2' },
          { suit: 'hearts', rank: '7' },
        ],
        'BTN',
        [
          { type: 'bet', amount: 50, position: 'CO' },
          { type: 'call', position: 'BTN' },
          { type: 'check', position: 'CO' },
          { type: 'bet', amount: 150, position: 'BTN' },
        ],
        'medium',
        'river_bluff',
        true,
        300,
        800
      ),

      // Turn Aggression Scenario
      createScenario(
        'turn_aggression_1',
        [
          { suit: 'hearts', rank: '9' },
          { suit: 'hearts', rank: '8' },
          { suit: 'hearts', rank: '2' },
          { suit: 'spades', rank: 'K' },
        ],
        'CO',
        [
          { type: 'bet', amount: 30, position: 'UTG' },
          { type: 'call', position: 'CO' },
          { type: 'call', position: 'BTN' },
          { type: 'check', position: 'UTG' },
          { type: 'bet', amount: 120, position: 'CO' },
        ],
        'hard',
        'turn_aggression',
        false,
        200,
        1200
      ),

      // Preflop 3-bet Scenario
      createScenario(
        'preflop_3bet_1',
        [],
        'BTN',
        [
          { type: 'raise', amount: 15, position: 'MP' },
          { type: 'raise', amount: 45, position: 'BTN' },
        ],
        'easy',
        'preflop_3bet',
        true,
        70,
        1500
      ),

      // Check-raise Scenario
      createScenario(
        'check_raise_1',
        [
          { suit: 'clubs', rank: 'J' },
          { suit: 'diamonds', rank: 'J' },
          { suit: 'hearts', rank: '7' },
        ],
        'BB',
        [
          { type: 'bet', amount: 40, position: 'BTN' },
          { type: 'check', position: 'BB' },
          { type: 'bet', amount: 60, position: 'BTN' },
          { type: 'raise', amount: 180, position: 'BB' },
        ],
        'medium',
        'check_raise',
        false,
        160,
        900
      ),

      // River Value Bet Scenario
      createScenario(
        'river_value_1',
        [
          { suit: 'spades', rank: 'A' },
          { suit: 'diamonds', rank: 'K' },
          { suit: 'hearts', rank: 'Q' },
          { suit: 'clubs', rank: 'J' },
          { suit: 'spades', rank: '10' },
        ],
        'MP',
        [
          { type: 'bet', amount: 75, position: 'MP' },
          { type: 'call', position: 'BTN' },
          { type: 'bet', amount: 225, position: 'MP' },
        ],
        'medium',
        'river_bluff',
        false,
        400,
        1100
      ),

      // Semi-bluff Scenario
      createScenario(
        'turn_semibluff_1',
        [
          { suit: 'hearts', rank: 'K' },
          { suit: 'hearts', rank: 'Q' },
          { suit: 'diamonds', rank: '7' },
          { suit: 'hearts', rank: '2' },
        ],
        'SB',
        [
          { type: 'check', position: 'SB' },
          { type: 'bet', amount: 50, position: 'BB' },
          { type: 'raise', amount: 150, position: 'SB' },
        ],
        'hard',
        'turn_aggression',
        true,
        180,
        950
      ),

      // Small Blind Defense
      createScenario(
        'sb_defense_1',
        [
          { suit: 'clubs', rank: '8' },
          { suit: 'diamonds', rank: '8' },
          { suit: 'hearts', rank: '3' },
        ],
        'SB',
        [
          { type: 'bet', amount: 60, position: 'BTN' },
          { type: 'raise', amount: 180, position: 'SB' },
        ],
        'hard',
        'check_raise',
        true,
        240,
        800
      ),

      // Continuation Bet Defense
      createScenario(
        'cbet_defense_1',
        [
          { suit: 'spades', rank: 'A' },
          { suit: 'hearts', rank: '7' },
          { suit: 'diamonds', rank: '2' },
        ],
        'BB',
        [
          { type: 'raise', amount: 25, position: 'BTN' },
          { type: 'call', position: 'BB' },
          { type: 'bet', amount: 35, position: 'BTN' },
          { type: 'raise', amount: 105, position: 'BB' },
        ],
        'medium',
        'check_raise',
        false,
        140,
        1300
      ),

      // Multiway Pot Bluff
      createScenario(
        'multiway_bluff_1',
        [
          { suit: 'diamonds', rank: 'K' },
          { suit: 'hearts', rank: 'Q' },
          { suit: 'spades', rank: 'J' },
          { suit: 'clubs', rank: '4' },
          { suit: 'diamonds', rank: '2' },
        ],
        'CO',
        [
          { type: 'check', position: 'UTG' },
          { type: 'check', position: 'MP' },
          { type: 'bet', amount: 200, position: 'CO' },
        ],
        'hard',
        'river_bluff',
        true,
        400,
        1600
      ),
    ];
  }

  async getNextScenario(options: ScenarioOptions): Promise<BluffScenario> {
    // Filter scenarios based on options
    const filteredScenarios = this.scenarios.filter(scenario => {
      if (options.difficulty && scenario.difficulty !== options.difficulty) return false;
      if (options.scenarioTypes && !options.scenarioTypes.includes(scenario.scenarioType)) return false;
      if (options.excludeIds && options.excludeIds.includes(scenario.id)) return false;
      return true;
    });

    if (filteredScenarios.length === 0) {
      throw new Error('No matching scenarios available');
    }

    // Select a random scenario from filtered list
    const randomIndex = Math.floor(Math.random() * filteredScenarios.length);
    const scenario = filteredScenarios[randomIndex];

    // Remove player cards and isBluff for prediction
    const { isBluff, ...presentedScenario } = scenario;
    return presentedScenario;
  }

  async submitPrediction(scenarioId: string, prediction: BluffPrediction): Promise<PredictionResult> {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (!scenario) throw new Error('Scenario not found');

    // Use the model to get the ground truth and confidence
    const modelPrediction = await predictBluff(this.model, scenario);
    
    const correct = modelPrediction.isBluff === prediction.isBluff;
    
    // Update stats
    if (correct) {
      this.stats.correct++;
      this.stats.streak++;
      this.stats.byDifficulty[scenario.difficulty].correct++;
    } else {
      this.stats.incorrect++;
      this.stats.streak = 0;
    }
    this.stats.byDifficulty[scenario.difficulty].total++;
    this.stats.bestStreak = Math.max(this.stats.bestStreak, this.stats.streak);

    return {
      correct,
      actualAnswer: scenario.isBluff ? 'bluff' : 'value',
      confidence: modelPrediction.confidence,
      explanation: modelPrediction.explanation,
    };
  }

  async getStats(): Promise<TrainingStats> {
    return this.stats;
  }
}