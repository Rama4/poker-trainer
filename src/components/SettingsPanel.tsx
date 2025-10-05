import React from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setSoundEnabled, setAnimationsEnabled, setTheme } from '../store/slices/uiSlice'
import { setDifficulty, setScenarioTypes, switchDataset } from '../store/slices/gameSlice'

const SettingsPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const { soundEnabled, animationsEnabled, theme } = useAppSelector(state => state.ui)
  const { selectedDifficulty, selectedScenarioTypes } = useAppSelector(state => state.game)

  const handleScenarioTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      dispatch(setScenarioTypes([...selectedScenarioTypes, type]))
    } else {
      dispatch(setScenarioTypes(selectedScenarioTypes.filter(t => t !== type)))
    }
  }

  return (
    <div className="theme-panel space-y-6">
      <h3 className="text-lg font-semibold theme-text-primary">Settings</h3>

      {/* Display Settings */}
      <div className="theme-section">
        <h4 className="font-medium theme-text-primary mb-4">🎨 Display</h4>
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm theme-text-secondary">Theme</span>
            <div className="flex theme-bg-secondary rounded-lg p-1">
              <button
                onClick={() => dispatch(setTheme('dark'))}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  theme === 'dark' ? 'theme-bg-primary theme-text-primary' : 'theme-text-muted'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => dispatch(setTheme('light'))}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  theme === 'light' ? 'theme-bg-primary theme-text-primary' : 'theme-text-muted'
                }`}
              >
                Light
              </button>
            </div>
          </div>

          {/* Animations Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-dark-text-secondary">Animations</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={(e) => dispatch(setAnimationsEnabled(e.target.checked))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-dark-text-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-text-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dark-accent"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-4">🔊 Audio</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-dark-text-secondary">Sound Effects</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => dispatch(setSoundEnabled(e.target.checked))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-dark-text-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-text-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dark-accent"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Training Settings */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-4">🎯 Training</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-dark-text-secondary mb-2">Difficulty Level</label>
            <select 
              className="w-full bg-dark-secondary text-dark-text-primary rounded-lg px-3 py-2 text-sm"
              value={selectedDifficulty}
              onChange={(e) => dispatch(setDifficulty(e.target.value as 'easy' | 'medium' | 'hard'))}
            >
              <option value="easy">Easy - Clear bluffs only</option>
              <option value="medium">Medium - Mixed scenarios</option>
              <option value="hard">Hard - Marginal situations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-dark-text-secondary mb-2">Scenario Types</label>
            <div className="space-y-2">
              {[
                { id: 'river_bluff', label: 'River Bluffs' },
                { id: 'turn_aggression', label: 'Turn Aggression' },
                { id: 'preflop_3bet', label: 'Preflop 3-bets' },
                { id: 'check_raise', label: 'Check-raises' }
              ].map(({ id, label }) => (
                <label key={id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedScenarioTypes.includes(id)}
                    onChange={(e) => handleScenarioTypeChange(id, e.target.checked)}
                    className="rounded bg-dark-secondary border-dark-border text-dark-accent focus:ring-dark-accent"
                  />
                  <span className="ml-2 text-sm text-dark-text-secondary">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-dark-text-secondary mb-2">Dataset Selection</label>
            <select 
              className="w-full bg-dark-secondary text-dark-text-primary rounded-lg px-3 py-2 text-sm"
              onChange={(e) => {
                const datasetType = e.target.value as 'poker-bench' | 'manual';
                void dispatch(switchDataset(datasetType));
              }}
              defaultValue="poker-bench"
            >
              <option value="poker-bench">PokerBench Dataset</option>
              <option value="manual">Manual Scenarios</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-dark-text-secondary">Show Hints</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-dark-text-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-dark-text-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dark-accent"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-4">📊 Data & Privacy</h4>
        <div className="space-y-3">
          <button className="w-full bg-dark-secondary text-dark-text-primary px-4 py-2 rounded-lg hover:bg-dark-hover transition-colors duration-200">
            Export Training Data
          </button>
          <button className="w-full bg-dark-secondary text-dark-text-primary px-4 py-2 rounded-lg hover:bg-dark-hover transition-colors duration-200">
            Reset Statistics
          </button>
          <button className="w-full bg-dark-error text-dark-text-primary px-4 py-2 rounded-lg hover:bg-dark-error/80 transition-colors duration-200">
            Clear All Data
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-4">ℹ️ About</h4>
        <div className="space-y-2 text-sm text-dark-text-secondary">
          <div>Version: 1.0.0</div>
          <div>Build: Electron + React</div>
          <div>AI Model: Bluff Detection v2.1</div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel