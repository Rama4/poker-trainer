import { BluffDatasetAdapter, BluffScenario, BluffPrediction, ScenarioOptions, PredictionResult, TrainingStats } from './types';
import { PokerBenchAdapter } from './adapters/poker-bench-adapter';
import { ManualScenarioAdapter } from './adapters/manual-scenario-adapter';

export type DatasetType = 'poker-bench' | 'manual' | 'custom';

export class BluffDetectionService {
  private static instance: BluffDetectionService;
  private adapter: BluffDatasetAdapter;
  private seenScenarios: Set<string> = new Set();

  private constructor(datasetType: DatasetType) {
    this.adapter = this.createAdapter(datasetType);
  }

  public static getInstance(datasetType: DatasetType = 'poker-bench'): BluffDetectionService {
    if (!BluffDetectionService.instance) {
      BluffDetectionService.instance = new BluffDetectionService(datasetType);
    }
    return BluffDetectionService.instance;
  }

  private createAdapter(datasetType: DatasetType): BluffDatasetAdapter {
    switch (datasetType) {
      case 'poker-bench':
        return new PokerBenchAdapter();
      case 'manual':
        return new ManualScenarioAdapter();
      default:
        throw new Error(`Unsupported dataset type: ${datasetType}`);
    }
  }

  public async switchDataset(datasetType: DatasetType): Promise<void> {
    this.adapter = this.createAdapter(datasetType);
    this.seenScenarios.clear();
  }

  public async getNextScenario(options: ScenarioOptions = {}): Promise<BluffScenario> {
    // Add seen scenarios to exclusion list
    const fullOptions = {
      ...options,
      excludeIds: Array.from(this.seenScenarios),
    };

    const scenario = await this.adapter.getNextScenario(fullOptions);
    this.seenScenarios.add(scenario.id);
    return scenario;
  }

  public async submitPrediction(scenarioId: string, prediction: BluffPrediction): Promise<PredictionResult> {
    return this.adapter.submitPrediction(scenarioId, prediction);
  }

  public async getStats(): Promise<TrainingStats> {
    return this.adapter.getStats();
  }

  // Method to add manual scenarios when using ManualScenarioAdapter
  public async addManualScenario(scenario: BluffScenario): Promise<void> {
    if (this.adapter instanceof ManualScenarioAdapter) {
      await (this.adapter as ManualScenarioAdapter).addScenario(scenario);
    } else {
      throw new Error('Cannot add manual scenarios to non-manual adapter');
    }
  }
}
