import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { removeNotification } from '../store/slices/uiSlice'

const NotificationCenter: React.FC = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector((state: RootState) => state.ui)

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    notifications.forEach((notification) => {
      const timeElapsed = Date.now() - notification.timestamp
      if (timeElapsed < 5000) {
        const timeRemaining = 5000 - timeElapsed
        setTimeout(() => {
          dispatch(removeNotification(notification.id))
        }, timeRemaining)
      }
    })
  }, [notifications, dispatch])

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const bgColor = {
          success: 'bg-green-600',
          error: 'bg-red-600',
          warning: 'bg-yellow-600',
          info: 'bg-blue-600',
        }[notification.type]

        const icon = {
          success: '✅',
          error: '❌',
          warning: '⚠️',
          info: 'ℹ️',
        }[notification.type]

        return (
          <div
            key={notification.id}
            className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg max-w-sm flex items-center space-x-3 animate-slide-in`}
          >
            <span className="text-lg">{icon}</span>
            <span className="flex-1 text-sm">{notification.message}</span>
            <button
              onClick={() => dispatch(removeNotification(notification.id))}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default NotificationCenter

