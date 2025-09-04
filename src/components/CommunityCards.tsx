import React from 'react'
import { Card } from '../store/slices/gameSlice'
import PlayingCard from './PlayingCard'

interface CommunityCardsProps {
  cards: Card[]
}

const CommunityCards: React.FC<CommunityCardsProps> = ({ cards }) => {
  // Ensure we always show 5 card slots
  const cardSlots = Array.from({ length: 5 }, (_, index) => cards[index] || null)

  return (
    <div className="flex space-x-2">
      {cardSlots.map((card, index) => (
        <div key={index} className="relative">
          {card ? (
            <PlayingCard card={card} />
          ) : (
            <div className="w-16 h-24 bg-gray-700 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs">?</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CommunityCards

