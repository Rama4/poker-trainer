import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { submitBluffDetection } from '../store/slices/gameSlice'
import { addNotification } from '../store/slices/uiSlice'

const ActionPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { scenario, loading } = useSelector((state: RootState) => state.game)
  const [selectedPrediction, setSelectedPrediction] = useState<'bluff' | 'value' | null>(null)
  const [confidence, setConfidence] = useState(70)
  const [showResult, setShowResult] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)

  const handleSubmitPrediction = async () => {
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
      setTimeout(() => {
        setShowResult(false)
        setSelectedPrediction(null)
        setConfidence(70)
      }, 3000)

    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to submit prediction',
      }))
    }
  }

  if (!scenario) {
    return (
      <div className="absolute bottom-6 left-6 right-6 bg-gray-800 rounded-lg p-6 text-center">
        <div className="text-gray-400">Loading training scenario...</div>
      </div>
    )
  }

  if (showResult && lastResult) {
    return (
      <div className="absolute bottom-6 left-6 right-6 bg-gray-800 rounded-lg p-6 border-2 border-gray-600">
        <div className="text-center space-y-4">
          <div className={`text-2xl font-bold ${lastResult.correct ? 'text-green-400' : 'text-red-400'}`}>
            {lastResult.correct ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Your Prediction</div>
              <div className="font-semibold text-white capitalize">{lastResult.userPrediction}</div>
            </div>
            <div>
              <div className="text-gray-400">Actual Answer</div>
              <div className="font-semibold text-white capitalize">{lastResult.actualAnswer}</div>
            </div>
            <div>
              <div className="text-gray-400">AI Confidence</div>
              <div className="font-semibold text-white">{(lastResult.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Next scenario loading...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute bottom-6 left-6 right-6 bg-gray-800 rounded-lg p-6 border-2 border-gray-600">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Is this player bluffing?
          </h3>
          <p className="text-sm text-gray-300">
            Analyze the situation and make your prediction
          </p>
        </div>

        {/* Prediction buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setSelectedPrediction('bluff')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedPrediction === 'bluff'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            disabled={loading}
          >
            🎭 Bluff
          </button>
          <button
            onClick={() => setSelectedPrediction('value')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedPrediction === 'value'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            disabled={loading}
          >
            💎 Value Bet
          </button>
        </div>

        {/* Confidence slider */}
        {selectedPrediction && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Confidence</span>
              <span>{confidence}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmitPrediction}
            disabled={!selectedPrediction || loading}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedPrediction && !loading
                ? 'btn-primary'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Analyzing...' : 'Submit Prediction'}
          </button>
        </div>

        {/* Hints */}
        <div className="text-xs text-gray-400 text-center space-y-1">
          <div>💡 Consider: bet sizing, player position, board texture, and betting pattern</div>
          <div>📊 Pot odds: {scenario.potOdds}:1 | Board: {scenario.boardTexture}</div>
        </div>
      </div>
    </div>
  )
}

export default ActionPanel

