import { BluffDatasetAdapter, BluffScenario, BluffPrediction, ScenarioOptions, PredictionResult, TrainingStats } from '../types';
import { loadModel, predictBluff } from '../model/bluff-model';

export class ManualScenarioAdapter implements BluffDatasetAdapter {
  private model: any;
  private manualScenarios: BluffScenario[] = [];
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
    this.model = await loadModel('poker-bench-v1'); // We'll use the same model for consistency
  }

  // Method to add a new manual scenario
  async addScenario(scenario: BluffScenario): Promise<void> {
    // Validate the scenario
    this.validateScenario(scenario);
    
    // Use the model to analyze and label the scenario
    const prediction = await predictBluff(this.model, scenario);
    
    // Store the scenario with the model's prediction as ground truth
    this.manualScenarios.push({
      ...scenario,
      isBluff: prediction.isBluff,
    });
  }

  private validateScenario(scenario: BluffScenario): void {
    // Implement validation logic here
    // Check for required fields, valid card combinations, etc.
    if (!scenario.communityCards || scenario.communityCards.length !== 5) {
      throw new Error('Invalid community cards');
    }
    // Add more validation as needed
  }

  async getNextScenario(options: ScenarioOptions): Promise<BluffScenario> {
    // Prioritize manual scenarios if available
    const filteredScenarios = this.manualScenarios.filter(scenario => {
      if (options.difficulty && scenario.difficulty !== options.difficulty) return false;
      if (options.scenarioTypes && !options.scenarioTypes.includes(scenario.scenarioType)) return false;
      if (options.excludeIds && options.excludeIds.includes(scenario.id)) return false;
      return true;
    });

    if (filteredScenarios.length === 0) {
      throw new Error('No matching scenarios available');
    }

    const randomIndex = Math.floor(Math.random() * filteredScenarios.length);
    const scenario = filteredScenarios[randomIndex];

    // Remove sensitive information
    const { isBluff, ...presentedScenario } = scenario;
    return presentedScenario;
  }

  async submitPrediction(scenarioId: string, prediction: BluffPrediction): Promise<PredictionResult> {
    const scenario = this.manualScenarios.find(s => s.id === scenarioId);
    if (!scenario) throw new Error('Scenario not found');

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
      actualAnswer: modelPrediction.isBluff ? 'bluff' : 'value',
      confidence: modelPrediction.confidence,
      explanation: modelPrediction.explanation,
    };
  }

  async getStats(): Promise<TrainingStats> {
    return this.stats;
  }
}
