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
    <div className="w-80 theme-bg-surface-elevated border-l theme-border flex flex-col shadow-dark-elevated h-full">
      {/* Tab buttons */}
      <div className="flex border-b theme-border shrink-0">
        <button
          onClick={() => dispatch(toggleStats())}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            showStats ? 'theme-bg-tertiary theme-text-primary' : 'theme-text-secondary hover:bg-[var(--hover)]'
          }`}
        >
          📊 Stats
        </button>
        <button
          onClick={() => dispatch(toggleSettings())}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            showSettings ? 'theme-bg-tertiary theme-text-primary' : 'theme-text-secondary hover:bg-[var(--hover)]'
          }`}
        >
          ⚙️ Settings
        </button>
        <button
          onClick={() => dispatch(toggleHelp())}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            showHelp ? 'theme-bg-tertiary theme-text-primary' : 'theme-text-secondary hover:bg-[var(--hover)]'
          }`}
        >
          ❓ Help
        </button>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {showStats && <StatsPanel />}
        {showSettings && <SettingsPanel />}
        {showHelp && <HelpPanel />}
        
        {!showStats && !showSettings && !showHelp && (
          <div className="p-4">
            <h3 className="text-lg font-semibold theme-text-primary mb-3">Current Scenario</h3>
            {scenario ? (
              <div className="space-y-4">
                <div className="theme-section p-3">
                  <h4 className="font-medium theme-text-primary mb-1.5">Scenario Details</h4>
                  <p className="text-sm theme-text-secondary mb-2">{scenario.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="theme-text-muted">Pot Odds:</span>
                      <span className="theme-text-primary ml-1">{scenario.potOdds}:1</span>
                    </div>
                    <div>
                      <span className="theme-text-muted">Board:</span>
                      <span className="theme-text-primary ml-1 capitalize">{scenario.boardTexture}</span>
                    </div>
                  </div>
                </div>

                <div className="theme-section p-3">
                  <h4 className="font-medium theme-text-primary mb-1.5">Available Actions</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {scenario.playerActions.map((action, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 theme-bg-secondary rounded text-xs theme-text-secondary capitalize"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs theme-text-accent px-1">
                  💡 Analyze the betting pattern, position, and board texture to make your decision
                </div>
              </div>
            ) : (
              <div className="theme-text-muted text-center py-8">
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

