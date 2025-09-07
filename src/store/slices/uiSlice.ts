import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  showSettings: boolean
  showStats: boolean
  showHelp: boolean
  selectedPlayer: string | null
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    timestamp: number
  }>
  theme: 'dark' | 'light'
  soundEnabled: boolean
  animationsEnabled: boolean
}

const initialState: UIState = {
  showSettings: false,
  showStats: false,
  showHelp: false,
  selectedPlayer: null,
  notifications: [],
  theme: 'dark',
  soundEnabled: true,
  animationsEnabled: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings
      state.showStats = false
      state.showHelp = false
    },
    toggleStats: (state) => {
      state.showStats = !state.showStats
      state.showSettings = false
      state.showHelp = false
    },
    toggleHelp: (state) => {
      state.showHelp = !state.showHelp
      state.showSettings = false
      state.showStats = false
    },
    setSelectedPlayer: (state, action: PayloadAction<string | null>) => {
      state.selectedPlayer = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: `notification_${Date.now()}`,
        timestamp: Date.now(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload
    },
    setSoundEnabled: (state, action: PayloadAction<boolean>) => {
      state.soundEnabled = action.payload
    },
    setAnimationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.animationsEnabled = action.payload
    },
  },
})

export const {
  toggleSettings,
  toggleStats,
  toggleHelp,
  setSelectedPlayer,
  addNotification,
  removeNotification,
  clearNotifications,
  setTheme,
  setSoundEnabled,
  setAnimationsEnabled,
} = uiSlice.actions

export default uiSlice.reducer

