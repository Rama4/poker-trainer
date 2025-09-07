import React from 'react'

const HelpPanel: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-dark-surface-elevated rounded-lg shadow-dark-elevated">
      <h3 className="text-lg font-semibold text-dark-text-primary">Help & Guide</h3>

      {/* Getting Started */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">🚀 Getting Started</h4>
        <div className="space-y-2 text-sm text-dark-text-secondary">
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
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">🔍 How to Analyze Bluffs</h4>
        <div className="space-y-3 text-sm text-dark-text-secondary">
          <div>
            <strong className="text-dark-text-primary">1. Bet Sizing</strong>
            <p>Large bets often indicate bluffs or very strong hands. Medium bets usually suggest value.</p>
          </div>
          <div>
            <strong className="text-dark-text-primary">2. Position</strong>
            <p>Players in late position can bluff more frequently. Early position bets are usually stronger.</p>
          </div>
          <div>
            <strong className="text-dark-text-primary">3. Board Texture</strong>
            <p>Wet boards (many draws) favor bluffs. Dry boards favor value bets.</p>
          </div>
          <div>
            <strong className="text-dark-text-primary">4. Betting Pattern</strong>
            <p>Sudden aggression after passive play often indicates a bluff.</p>
          </div>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">🎯 Bluff Indicators</h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-dark-error bg-opacity-30 rounded p-3 border border-dark-error/50">
            <h5 className="font-medium text-dark-error mb-2">Likely Bluffs</h5>
            <ul className="text-xs text-dark-text-secondary space-y-1">
              <li>• Oversized bets (2x+ pot)</li>
              <li>• Quick betting after scare cards</li>
              <li>• Aggression from tight players</li>
              <li>• Betting into multiple opponents</li>
            </ul>
          </div>
          <div className="bg-dark-success bg-opacity-30 rounded p-3 border border-dark-success/50">
            <h5 className="font-medium text-dark-success mb-2">Likely Value</h5>
            <ul className="text-xs text-dark-text-secondary space-y-1">
              <li>• Standard bet sizes (0.5-0.75x pot)</li>
              <li>• Consistent aggression</li>
              <li>• Betting for protection</li>
              <li>• Strong board connections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">💡 Pro Tips</h4>
        <div className="space-y-2 text-sm text-dark-text-secondary">
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
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">⌨️ Keyboard Shortcuts</h4>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">New Scenario</span>
            <kbd className="bg-dark-secondary px-2 py-1 rounded text-xs text-dark-text-primary">Ctrl+N</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Bluff Prediction</span>
            <kbd className="bg-dark-secondary px-2 py-1 rounded text-xs text-dark-text-primary">B</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Value Prediction</span>
            <kbd className="bg-dark-secondary px-2 py-1 rounded text-xs text-dark-text-primary">V</kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-text-secondary">Submit</span>
            <kbd className="bg-dark-secondary px-2 py-1 rounded text-xs text-dark-text-primary">Enter</kbd>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">🆘 Need Help?</h4>
        <div className="space-y-2 text-sm text-dark-text-secondary">
          <p>If you encounter any issues or have questions:</p>
          <div className="flex flex-col space-y-2">
            <button className="w-full bg-dark-secondary text-dark-text-primary px-4 py-2 rounded-lg hover:bg-dark-hover transition-colors duration-200">📧 Contact Support</button>
            <button className="w-full bg-dark-secondary text-dark-text-primary px-4 py-2 rounded-lg hover:bg-dark-hover transition-colors duration-200">📖 View Documentation</button>
            <button className="w-full bg-dark-error text-dark-text-primary px-4 py-2 rounded-lg hover:bg-dark-error/80 transition-colors duration-200">🐛 Report Bug</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPanel

