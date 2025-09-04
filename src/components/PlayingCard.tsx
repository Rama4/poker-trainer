import React from 'react'
import { Card } from '../store/slices/gameSlice'

interface PlayingCardProps {
  card: Card
  faceDown?: boolean
  small?: boolean
}

const PlayingCard: React.FC<PlayingCardProps> = ({ 
  card, 
  faceDown = false, 
  small = false 
}) => {
  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥'
      case 'diamonds': return '♦'
      case 'clubs': return '♣'
      case 'spades': return '♠'
      default: return '?'
    }
  }

  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-black'
  }

  const cardSize = small ? 'w-12 h-16' : 'w-16 h-24'
  const fontSize = small ? 'text-xs' : 'text-sm'

  if (faceDown) {
    return (
      <div className={`${cardSize} bg-blue-900 border border-gray-400 rounded-lg flex items-center justify-center`}>
        <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg border border-gray-300 flex items-center justify-center">
          <div className="text-blue-300 opacity-50">🂠</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${cardSize} card relative flex flex-col shadow-card transition-transform hover:scale-105`}>
      {/* Top left corner */}
      <div className={`absolute top-1 left-1 ${fontSize} font-bold ${getSuitColor(card.suit)}`}>
        <div>{card.rank}</div>
        <div className="leading-none">{getSuitSymbol(card.suit)}</div>
      </div>
      
      {/* Center suit symbol */}
      <div className={`flex-1 flex items-center justify-center ${getSuitColor(card.suit)}`}>
        <span className={small ? 'text-lg' : 'text-2xl'}>{getSuitSymbol(card.suit)}</span>
      </div>
      
      {/* Bottom right corner (rotated) */}
      <div className={`absolute bottom-1 right-1 ${fontSize} font-bold ${getSuitColor(card.suit)} transform rotate-180`}>
        <div>{card.rank}</div>
        <div className="leading-none">{getSuitSymbol(card.suit)}</div>
      </div>
    </div>
  )
}

export default PlayingCard

