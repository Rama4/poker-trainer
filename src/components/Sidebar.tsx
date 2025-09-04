import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { toggleStats, toggleSettings, toggleHelp } from '../store/slices/uiSlice'
import StatsPanel from './StatsPanel'
import SettingsPanel from './SettingsPanel'
import HelpPanel from './HelpPanel'

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showStats, showSettings, showHelp } = useSelector((state: RootState) => state.ui)
  const { scenario } = useSelector((state: RootState) => state.game)

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Tab buttons */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => dispatch(toggleStats())}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            showStats ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          📊 Stats
        </button>
        <button
          onClick={() => dispatch(toggleSettings())}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            showSettings ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          ⚙️ Settings
        </button>
        <button
          onClick={() => dispatch(toggleHelp())}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            showHelp ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          ❓ Help
        </button>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto">
        {showStats && <StatsPanel />}
        {showSettings && <SettingsPanel />}
        {showHelp && <HelpPanel />}
        
        {!showStats && !showSettings && !showHelp && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Current Scenario</h3>
            {scenario ? (
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Scenario Details</h4>
                  <p className="text-sm text-gray-300 mb-3">{scenario.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Pot Odds:</span>
                      <span className="text-white ml-1">{scenario.potOdds}:1</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Board:</span>
                      <span className="text-white ml-1 capitalize">{scenario.boardTexture}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Available Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    {scenario.playerActions.map((action, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-600 rounded text-xs text-gray-300 capitalize"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  💡 Analyze the betting pattern, position, and board texture to make your decision
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                No active scenario
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar

