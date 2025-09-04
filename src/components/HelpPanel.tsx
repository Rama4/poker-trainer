import React from 'react'

const HelpPanel: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold text-white">Help & Guide</h3>

      {/* Getting Started */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-3">🚀 Getting Started</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <p>Welcome to Poker Trainer! This app helps you improve your bluff detection skills using AI-powered scenarios.</p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>Each scenario presents a poker situation</li>
            <li>Analyze the betting pattern and board texture</li>
            <li>Decide if the player is bluffing or betting for value</li>
            <li>Get instant feedback from our AI model</li>
          </ul>
        </div>
      </div>

      {/* How to Analyze */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-3">🔍 How to Analyze Bluffs</h4>
        <div className="space-y-3 text-sm text-gray-300">
          <div>
            <strong className="text-white">1. Bet Sizing</strong>
            <p>Large bets often indicate bluffs or very strong hands. Medium bets usually suggest value.</p>
          </div>
          <div>
            <strong className="text-white">2. Position</strong>
            <p>Players in late position can bluff more frequently. Early position bets are usually stronger.</p>
          </div>
          <div>
            <strong className="text-white">3. Board Texture</strong>
            <p>Wet boards (many draws) favor bluffs. Dry boards favor value bets.</p>
          </div>
          <div>
            <strong className="text-white">4. Betting Pattern</strong>
            <p>Sudden aggression after passive play often indicates a bluff.</p>
          </div>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-3">🎯 Bluff Indicators</h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-red-900 bg-opacity-50 rounded p-3">
            <h5 className="font-medium text-red-400 mb-2">Likely Bluffs</h5>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Oversized bets (2x+ pot)</li>
              <li>• Quick betting after scare cards</li>
              <li>• Aggression from tight players</li>
              <li>• Betting into multiple opponents</li>
            </ul>
          </div>
          <div className="bg-green-900 bg-opacity-50 rounded p-3">
            <h5 className="font-medium text-green-400 mb-2">Likely Value</h5>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Standard bet sizes (0.5-0.75x pot)</li>
              <li>• Consistent aggression</li>
              <li>• Betting for protection</li>
              <li>• Strong board connections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-3">💡 Pro Tips</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start space-x-2">
            <span>🎭</span>
            <div>
              <strong>Timing Tells:</strong> Quick bets often indicate bluffs, while delays suggest tough decisions with marginal hands.
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span>📊</span>
            <div>
              <strong>Pot Odds:</strong> Consider if the bet size makes sense for the hand strength they're representing.
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span>🎯</span>
            <div>
              <strong>Player Types:</strong> Tight players bluff less, aggressive players bluff more frequently.
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span>🃏</span>
            <div>
              <strong>Board Reading:</strong> Consider what hands would bet for value on this specific board texture.
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-3">⌨️ Keyboard Shortcuts</h4>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">New Scenario</span>
            <kbd className="bg-gray-600 px-2 py-1 rounded text-xs">Ctrl+N</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Bluff Prediction</span>
            <kbd className="bg-gray-600 px-2 py-1 rounded text-xs">B</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Value Prediction</span>
            <kbd className="bg-gray-600 px-2 py-1 rounded text-xs">V</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Submit</span>
            <kbd className="bg-gray-600 px-2 py-1 rounded text-xs">Enter</kbd>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-white mb-3">🆘 Need Help?</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <p>If you encounter any issues or have questions:</p>
          <div className="flex flex-col space-y-2">
            <button className="btn-secondary text-sm">📧 Contact Support</button>
            <button className="btn-secondary text-sm">📖 View Documentation</button>
            <button className="btn-secondary text-sm">🐛 Report Bug</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPanel

