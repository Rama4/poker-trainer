import axios from 'axios'

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      // Redirect to login if needed
    }
    return Promise.reject(error)
  }
)

export interface TrainingScenario {
  id: string
  description: string
  players: Array<{
    id: string
    name: string
    chips: number
    position: number
    actions: string[]
  }>
  communityCards: Array<{
    suit: string
    rank: string
  }>
  potSize: number
  suspiciousPlayerId: string
  boardTexture: 'dry' | 'wet' | 'coordinated'
  potOdds: number
  correctAnswer: 'bluff' | 'value'
}

export interface BluffPrediction {
  scenarioId: string
  prediction: 'bluff' | 'value'
  confidence?: number
  reasoning?: string
}

export interface BluffResult {
  correct: boolean
  actualAnswer: 'bluff' | 'value'
  confidence: number
  explanation: string
  modelPrediction: {
    bluffProbability: number
    features: Record<string, number>
  }
}

export const api = {
  // Training scenarios
  async getTrainingScenario(): Promise<TrainingScenario> {
    const response = await apiClient.get('/training/scenario')
    return response.data
  },

  async submitBluffPrediction(prediction: BluffPrediction): Promise<BluffResult> {
    const response = await apiClient.post('/training/predict', prediction)
    return response.data
  },

  // User stats
  async getUserStats(): Promise<{
    totalScenarios: number
    correctPredictions: number
    accuracy: number
    currentStreak: number
    bestStreak: number
    averageConfidence: number
  }> {
    const response = await apiClient.get('/user/stats')
    return response.data
  },

  // Game data
  async getPlayerProfiles(): Promise<Array<{
    id: string
    name: string
    avatar?: string
    playingStyle: 'tight' | 'loose' | 'aggressive' | 'passive'
    bluffFrequency: number
  }>> {
    const response = await apiClient.get('/game/players')
    return response.data
  },

  // Settings
  async updateUserSettings(settings: {
    difficulty: 'easy' | 'medium' | 'hard'
    scenarioTypes: string[]
    enableHints: boolean
  }): Promise<void> {
    await apiClient.put('/user/settings', settings)
  },
}

export default api

