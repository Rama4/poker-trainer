import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const StatsPanel: React.FC = () => {
  const { trainingStats } = useSelector((state: RootState) => state.game)
  
  const totalScenarios = trainingStats.correct + trainingStats.incorrect
  const accuracy = totalScenarios > 0 ? (trainingStats.correct / totalScenarios) * 100 : 0

  const stats = [
    {
      label: 'Total Scenarios',
      value: totalScenarios.toString(),
      icon: '📊',
      color: 'text-dark-text-secondary',
    },
    {
      label: 'Correct Predictions',
      value: trainingStats.correct.toString(),
      icon: '✅',
      color: 'text-dark-success',
    },
    {
      label: 'Incorrect Predictions',
      value: trainingStats.incorrect.toString(),
      icon: '❌',
      color: 'text-dark-error',
    },
    {
      label: 'Accuracy',
      value: `${accuracy.toFixed(1)}%`,
      icon: '🎯',
      color: 'text-dark-accent',
    },
    {
      label: 'Current Streak',
      value: trainingStats.streak.toString(),
      icon: '🔥',
      color: 'text-dark-warning',
    },
    {
      label: 'Best Streak',
      value: trainingStats.bestStreak.toString(),
      icon: '🏆',
      color: 'text-dark-accent',
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-dark-surface-elevated rounded-lg shadow-dark-elevated">
      <h3 className="text-lg font-semibold text-dark-text-primary">Training Statistics</h3>
      
      {/* Main stats grid */}
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-dark-tertiary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-sm text-dark-text-secondary">{stat.label}</span>
              </div>
              <span className={`text-xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Accuracy visualization */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">Accuracy Progress</h4>
        <div className="w-full bg-dark-secondary rounded-full h-3">
          <div
            className="bg-gradient-to-r from-dark-success to-dark-accent h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(accuracy, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-dark-text-muted mt-1">
          <span className="text-dark-text-secondary">0%</span>
          <span className="font-medium text-dark-text-primary">{accuracy.toFixed(1)}%</span>
          <span className="text-dark-text-secondary">100%</span>
        </div>
      </div>

      {/* Performance insights */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">Performance Insights</h4>
        <div className="space-y-2 text-sm">
          {accuracy >= 80 && (
            <div className="text-dark-success">🎉 Excellent! You're a bluff detection expert!</div>
          )}
          {accuracy >= 60 && accuracy < 80 && (
            <div className="text-dark-warning">👍 Good work! Keep practicing to improve.</div>
          )}
          {accuracy < 60 && totalScenarios > 5 && (
            <div className="text-dark-error">💪 Keep training! Focus on betting patterns and position.</div>
          )}
          {trainingStats.streak >= 5 && (
            <div className="text-dark-accent">🔥 You're on fire! {trainingStats.streak} correct in a row!</div>
          )}
          {totalScenarios === 0 && (
            <div className="text-dark-text-muted">Start training to see your statistics here.</div>
          )}
        </div>
      </div>

      {/* Quick tips */}
      <div className="bg-dark-tertiary rounded-lg p-4">
        <h4 className="font-medium text-dark-text-primary mb-3">💡 Tips for Improvement</h4>
        <ul className="space-y-1 text-xs text-dark-text-secondary">
          <li>• Pay attention to bet sizing relative to pot</li>
          <li>• Consider player position and timing</li>
          <li>• Analyze board texture and possible draws</li>
          <li>• Look for betting pattern inconsistencies</li>
          <li>• Factor in opponent's playing style</li>
        </ul>
      </div>
    </div>
  )
}

export default StatsPanel

