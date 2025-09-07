import React from 'react'
import { Player } from '../store/slices/gameSlice'
import PlayerChips from './PlayerChips'

interface PlayerPositionProps {
  player: Player
  position: number
  totalPlayers: number
  isSuspicious?: boolean
}

const PlayerPosition: React.FC<PlayerPositionProps> = ({
  player,
  position,
  totalPlayers,
  isSuspicious = false,
}) => {
  // Calculate position around the elliptical table
  const angle = (position * 360) / totalPlayers
  const radiusX = 45 // Horizontal radius percentage
  const radiusY = 35 // Vertical radius percentage
  
  const x = 50 + radiusX * Math.cos((angle * Math.PI) / 180)
  const y = 50 + radiusY * Math.sin((angle * Math.PI) / 180)

  const isActive = !player.isFolded && !player.hasActed
  const isDealer = player.isDealer

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <div
        className={`relative flex flex-col items-center transition-all duration-300 ${
          isSuspicious ? 'animate-pulse' : ''
        }`}
      >
        {/* Player avatar and info */}
        <div
          className={`relative theme-bg-tertiary rounded-full p-4 border-4 transition-all duration-300 ${
            isActive
              ? 'theme-border-accent shadow-lg shadow-[var(--accent)]/50'
              : player.isFolded
              ? 'theme-border opacity-50'
              : 'theme-border'
          } ${
            isSuspicious ? 'theme-border-error shadow-lg shadow-[var(--error)]/50' : ''
          }`}
        >
          {/* Dealer button */}
          {isDealer && (
            <div className="absolute -top-2 -right-2 w-6 h-6 theme-bg-accent rounded-full flex items-center justify-center text-[var(--bg-primary)] text-xs font-bold">
              D
            </div>
          )}

          {/* Player avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-full flex items-center justify-center text-[var(--bg-primary)] font-bold text-lg">
            {player.name.charAt(0).toUpperCase()}
          </div>

          {/* Suspicious indicator */}
          {isSuspicious && (
            <div className="absolute -top-1 -left-1 w-4 h-4 theme-bg-error rounded-full flex items-center justify-center">
              <span className="theme-text-primary text-xs">!</span>
            </div>
          )}
        </div>

        {/* Player info and bet container */}
        <div className="flex items-center space-x-3 mt-2">
          {/* Current bet */}
          {player.currentBet > 0 && !player.isFolded && (
            <PlayerChips amount={player.currentBet} />
          )}
          
          {/* Player name and chips */}
          <div className="text-center">
            <div className={`text-sm font-semibold ${player.isFolded ? 'theme-text-muted' : 'theme-text-primary'}`}>
              {player.name}
            </div>
            <div className={`text-xs ${player.isFolded ? 'theme-text-muted' : 'theme-text-secondary'}`}>
              ${player.chips.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Player cards (placeholder) */}
        {!player.isFolded && (
          <div className="flex space-x-1 mt-2">
            <div className="w-6 h-8 theme-bg-tertiary rounded border theme-border"></div>
            <div className="w-6 h-8 theme-bg-tertiary rounded border theme-border"></div>
          </div>
        )}

        {/* Action indicator */}
        {player.hasActed && !player.isFolded && (
          <div className="text-xs theme-text-success font-semibold mt-1">
            {player.currentBet > 0 ? 'BET' : 'CHECK'}
          </div>
        )}

        {player.isFolded && (
          <div className="text-xs theme-text-error font-semibold mt-1">FOLD</div>
        )}

        {player.isAllIn && (
          <div className="text-xs theme-text-warning font-semibold mt-1">ALL-IN</div>
        )}
      </div>
    </div>
  )
}

export default PlayerPosition

