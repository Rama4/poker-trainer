import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-600 rounded-full animate-spin border-t-blue-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🃏</span>
        </div>
      </div>
      <div className="text-gray-400 text-center">
        <div className="font-medium">Loading scenario...</div>
        <div className="text-sm">Preparing your training session</div>
      </div>
    </div>
  )
}

export default LoadingSpinner

