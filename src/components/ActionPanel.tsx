import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { submitBluffDetection, fetchTrainingScenario } from '../store/slices/gameSlice'
import { addNotification } from '../store/slices/uiSlice'

/**
 * ActionPanel Component
 * 
 * Main interactive component for the poker training interface where users make
 * predictions about whether an opponent's action is a bluff or value bet.
 * Displays prediction options, confidence slider, and feedback on user predictions.
 */
const ActionPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  
  // Get current game state from Redux store
  const { scenario, loading } = useAppSelector(state => state.game)
  
  // Local state management
  const [selectedPrediction, setSelectedPrediction] = useState<'bluff' | 'value' | null>(null) // User's current prediction
  const [confidence, setConfidence] = useState(70)  // User's confidence level (50-100%)
  const [showResult, setShowResult] = useState(false)  // Controls visibility of result feedback
  const [lastResult, setLastResult] = useState<any>(null)  // Stores the last prediction result

  // Fetch initial scenario on component mount and handle loading state
  useEffect(() => {
    if (!scenario && !loading) {
      void dispatch(fetchTrainingScenario())
    }
  }, [dispatch, scenario, loading])

  /**
   * Handles the submission of user's prediction
   * Dispatches the prediction to the store, shows feedback, and resets the form
   * after a delay for the next scenario
   */
  const handleSubmitPrediction = async () => {
    // Validate required data is present
    if (!selectedPrediction || !scenario) return

    try {
      const result = await dispatch(submitBluffDetection({
        prediction: selectedPrediction,
        scenarioId: scenario.id,
      })).unwrap()

      setLastResult({ ...result, userPrediction: selectedPrediction })
      setShowResult(true)
      
      dispatch(addNotification({
        type: result.correct ? 'success' : 'error',
        message: result.correct 
          ? `Correct! It was a ${result.actualAnswer}` 
          : `Incorrect. It was a ${result.actualAnswer}`,
      }))

      // Reset for next scenario
      setTimeout(async () => {
        setShowResult(false)
        setSelectedPrediction(null)
        setConfidence(70)
        // Fetch next scenario
        await dispatch(fetchTrainingScenario())
      }, 3000)

    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to submit prediction',
      }))
    }
  }

  // Show loading state when no scenario is available
  if (!scenario) {
    return (
      <div className="theme-text-muted">Loading training scenario...</div>
    )
  }

  // Show result feedback after prediction submission
  if (showResult && lastResult) {
    return (
        <div className="text-center space-y-4">
          <div className={`text-2xl font-bold ${lastResult.correct ? 'theme-text-success' : 'theme-text-error'}`}>
            {lastResult.correct ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="theme-text-muted">Your Prediction</div>
              <div className="font-semibold theme-text-primary capitalize">{lastResult.userPrediction}</div>
            </div>
            <div>
              <div className="theme-text-muted">Actual Answer</div>
              <div className="font-semibold theme-text-primary capitalize">{lastResult.actualAnswer}</div>
            </div>
            <div>
              <div className="theme-text-muted">AI Confidence</div>
              <div className="font-semibold theme-text-primary">{(lastResult.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div className="text-xs theme-text-accent">
            Next scenario loading...
          </div>
        </div>
    )
  }

  // Main prediction interface
  return (
    <>
      <div className="space-y-4">
        {/* Header section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold theme-text-primary mb-2">
            Is this player bluffing?
          </h3>
          <p className="text-sm theme-text-secondary">
            Analyze the situation and make your prediction
          </p>
        </div>

        {/* Prediction buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setSelectedPrediction('bluff')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedPrediction === 'bluff'
                ? 'theme-bg-error theme-text-primary shadow-dark-elevated'
                : 'theme-bg-tertiary theme-text-secondary hover:bg-[var(--hover)]'
            }`}
            disabled={loading}
          >
            Bluff
          </button>
          <button
            onClick={() => setSelectedPrediction('value')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedPrediction === 'value'
                ? 'theme-bg-success theme-text-primary shadow-dark-elevated'
                : 'theme-bg-tertiary theme-text-secondary hover:bg-[var(--hover)]'
            }`}
            disabled={loading}
          >
            Value Bet
          </button>
        </div>

        {/* Confidence slider */}
        {selectedPrediction && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm theme-text-muted">
              <span>Confidence</span>
              <span>{confidence}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full h-2 theme-bg-tertiary rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}

        {/* Submit and Skip buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSubmitPrediction}
            disabled={!selectedPrediction || loading}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedPrediction && !loading
                ? 'theme-bg-accent text-[var(--bg-primary)] hover:bg-[var(--accent-dark)] shadow-dark-elevated'
                : 'theme-bg-tertiary theme-text-muted cursor-not-allowed'
            }`}
          >
            {loading ? 'Analyzing...' : 'Submit Prediction'}
          </button>
          <button
            onClick={() => {
              setShowResult(false);
              setSelectedPrediction(null);
              setConfidence(70);
              void dispatch(fetchTrainingScenario());
            }}
            disabled={loading}
            className="px-4 py-2 rounded-lg font-medium text-sm theme-text-secondary hover:theme-text-primary transition-colors duration-200"
          >
            Skip →
          </button>
        </div>

        {/* Hints */}
        <div className="text-xs theme-text-muted text-center space-y-1">
          <div>Consider: bet sizing, player position, board texture, and betting pattern</div>
          <div className="theme-text-accent">Pot odds: {scenario.potOdds}:1 | Board: {scenario.boardTexture}</div>
        </div>
      </div>
    </>
  )
}

export default ActionPanel

