import React from 'react'

interface PotDisplayProps {
  amount: number
}

const PotDisplay: React.FC<PotDisplayProps> = ({ amount }) => {
  return (
    <div className="theme-bg-surface-elevated border-2 theme-border-accent rounded-lg px-6 py-3 shadow-dark-elevated">
      <div className="text-center">
        <div className="text-sm theme-text-secondary uppercase tracking-wide">Pot</div>
        <div className="text-2xl font-bold theme-text-accent">
          ${amount.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default PotDisplay

