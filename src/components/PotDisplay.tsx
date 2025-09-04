import React from 'react'

interface PotDisplayProps {
  amount: number
}

const PotDisplay: React.FC<PotDisplayProps> = ({ amount }) => {
  return (
    <div className="bg-gray-800 border-2 border-gold rounded-lg px-6 py-3 shadow-lg">
      <div className="text-center">
        <div className="text-sm text-gray-300 uppercase tracking-wide">Pot</div>
        <div className="text-2xl font-bold text-gold">
          ${amount.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default PotDisplay

