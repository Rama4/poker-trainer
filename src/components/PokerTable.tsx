import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import PlayerPosition from './PlayerPosition'
import CommunityCards from './CommunityCards'
import PotDisplay from './PotDisplay'
import ActionPanel from './ActionPanel'
import LoadingSpinner from './LoadingSpinner'
import TransparentPanel from './TransparentPanel'

// Mock players for the poker table layout
const mockPlayers = [
  { id: '1', name: 'You', chips: 1500, position: 0, isDealer: false, currentBet: 0, hasActed: true, isFolded: false, isAllIn: false, cards: [] },
  { id: '2', name: 'Alice', chips: 2300, position: 1, isDealer: false, currentBet: 100, hasActed: true, isFolded: false, isAllIn: false, cards: [] },
  { id: '3', name: 'Bob', chips: 890, position: 2, isDealer: true, currentBet: 0, hasActed: false, isFolded: false, isAllIn: false, cards: [] },
  { id: '4', name: 'Charlie', chips: 3200, position: 3, isDealer: false, currentBet: 200, hasActed: true, isFolded: false, isAllIn: false, cards: [] },
  { id: '5', name: 'Diana', chips: 0, position: 4, isDealer: false, currentBet: 0, hasActed: true, isFolded: true, isAllIn: false, cards: [] },
  { id: '6', name: 'Eve', chips: 1800, position: 5, isDealer: false, currentBet: 200, hasActed: true, isFolded: false, isAllIn: false, cards: [] },
]

// Mock community cards
const mockCommunityCards = [
  { suit: 'spades', rank: '2', value: 2 },
  { suit: 'hearts', rank: '8', value: 8 },
  { suit: 'spades', rank: '3', value: 3 },
  { suit: 'hearts', rank: '7', value: 7 },
  { suit: 'diamonds', rank: 'Q', value: 12 },
]

const PokerTable: React.FC = () => {
  const { loading, scenario, gamePhase } = useSelector((state: RootState) => state.game)
  const [showActionPanel, setShowActionPanel] = useState(true);
  const [showScenario, setShowScenario] = useState(true);

  if (loading && !scenario) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="flex-1 h-full bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] p-6">
      {/* Main poker table */}
      <div className="relative w-full h-full max-w-6xl mx-auto">
        {/* Table surface */}
        <div className="poker-table w-full h-full relative flex items-center justify-center shadow-dark-elevated rounded-2xl">
          
          {/* Player positions around the table */}
          <div className="absolute inset-0">
            {mockPlayers.map((player, index) => (
              <PlayerPosition
                key={player.id}
                player={player}
                position={index}
                totalPlayers={mockPlayers.length}
                isSuspicious={scenario?.suspiciousPlayerId === player.id}
              />
            ))}
          </div>

          {/* Center area with community cards and pot */}
          <div className="flex flex-col items-center space-y-6">
            {/* @ts-ignore */}
            <CommunityCards cards={mockCommunityCards.slice(0, gamePhase === 'flop' ? 3 : gamePhase === 'turn' ? 4 : 5)} />
            <PotDisplay amount={2266} />
          </div>

          {/* Scenario description overlay */}
          {scenario && (
            <TransparentPanel
              isMinimized={!showScenario}
              onToggle={() => setShowScenario(!showScenario)}
              position="top"
            >
              <h3 className="text-lg font-semibold theme-text-primary mb-2">Training Scenario</h3>
              <p className="theme-text-secondary">{scenario.description}</p>
              <div className="mt-2 text-sm theme-text-accent">
                Pot Odds: {scenario.potOdds}:1 | Board: {scenario.boardTexture}
              </div>
            </TransparentPanel>
          )}

          {/* Action panel */}
          <TransparentPanel
            isMinimized={!showActionPanel}
            onToggle={() => setShowActionPanel(!showActionPanel)}
            position="bottom"
            >
            <ActionPanel/>
          </TransparentPanel>
        </div>
      </div>
    </div>
  )
}

export default PokerTable

