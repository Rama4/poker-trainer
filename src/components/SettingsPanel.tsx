import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { setSoundEnabled, setAnimationsEnabled, setTheme } from '../store/slices/uiSlice'

const SettingsPanel: React.FC = () => {
  const dispatch = useDispatch()
  const { soundEnabled, animationsEnabled, theme } = useSelector((state: RootState) => state.ui)

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-white">Settings</h3>

      {/* Display Settings */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-4">🎨 Display</h4>
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Theme</span>
            <div className="flex bg-gray-600 rounded-lg p-1">
              <button
                onClick={() => dispatch(setTheme('dark'))}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'text-gray-400'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => dispatch(setTheme('light'))}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  theme === 'light' ? 'bg-gray-800 text-white' : 'text-gray-400'
                }`}
              >
                Light
              </button>
            </div>
          </div>

          {/* Animations Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Animations</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={(e) => dispatch(setAnimationsEnabled(e.target.checked))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-4">🔊 Audio</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Sound Effects</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => dispatch(setSoundEnabled(e.target.checked))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Training Settings */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-4">🎯 Training</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Difficulty Level</label>
            <select className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 text-sm">
              <option value="easy">Easy - Clear bluffs only</option>
              <option value="medium" selected>Medium - Mixed scenarios</option>
              <option value="hard">Hard - Marginal situations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Scenario Types</label>
            <div className="space-y-2">
              {['River Bluffs', 'Turn Aggression', 'Preflop 3-bets', 'Check-raises'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Show Hints</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-4">📊 Data & Privacy</h4>
        <div className="space-y-3">
          <button className="w-full btn-secondary text-sm">
            Export Training Data
          </button>
          <button className="w-full btn-secondary text-sm">
            Reset Statistics
          </button>
          <button className="w-full btn-danger text-sm">
            Clear All Data
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-4">ℹ️ About</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div>Version: 1.0.0</div>
          <div>Build: Electron + React</div>
          <div>AI Model: Bluff Detection v2.1</div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel

