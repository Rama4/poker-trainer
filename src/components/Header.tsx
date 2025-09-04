import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { toggleStats, toggleSettings, toggleHelp } from '../store/slices/uiSlice'
import { fetchTrainingScenario, resetGame } from '../store/slices/gameSlice'

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { trainingStats } = useSelector((state: RootState) => state.game)

  const handleNewScenario = () => {
    dispatch(resetGame())
    dispatch(fetchTrainingScenario())
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-white">
            🃏 Poker Trainer
          </h1>
          <div className="text-sm text-gray-300">
            Bluff Detection Training
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Training Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-green-400">
              ✓ {trainingStats.correct}
            </div>
            <div className="text-red-400">
              ✗ {trainingStats.incorrect}
            </div>
            <div className="text-yellow-400">
              🔥 {trainingStats.streak}
            </div>
            <div className="text-purple-400">
              🏆 {trainingStats.bestStreak}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleNewScenario}
              className="btn-primary text-sm"
            >
              New Scenario
            </button>
            <button
              onClick={() => dispatch(toggleStats())}
              className="btn-secondary text-sm"
            >
              Stats
            </button>
            <button
              onClick={() => dispatch(toggleSettings())}
              className="btn-secondary text-sm"
            >
              Settings
            </button>
            <button
              onClick={() => dispatch(toggleHelp())}
              className="btn-secondary text-sm"
            >
              Help
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

