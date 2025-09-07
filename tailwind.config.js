/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Uber-inspired Dark Theme
        'dark': {
          'primary': '#000000',      // Pure black
          'secondary': '#1A1A1A',    // Dark gray
          'tertiary': '#2A2A2A',     // Medium dark gray
          'accent': '#FFD700',       // Gold
          'accent-dark': '#E6C200',  // Darker gold
          'surface': '#121212',      // Very dark surface
          'surface-elevated': '#1E1E1E', // Elevated surface
          'text-primary': '#FFFFFF', // White text
          'text-secondary': '#B0B0B0', // Light gray text
          'text-muted': '#757575',   // Muted gray text
          'border': '#333333',       // Dark border
          'hover': '#3A3A3A',        // Hover state
          'success': '#00D4AA',      // Uber green
          'error': '#FF4444',        // Error red
          'warning': '#FFB800',      // Warning amber
        },
        // Light Theme
        'light': {
          'primary': '#FFFFFF',      // White
          'secondary': '#F5F5F5',    // Light gray
          'tertiary': '#E0E0E0',     // Medium light gray
          'accent': '#C8A415',       // Darker gold for light theme
          'accent-light': '#FFD700', // Bright gold
          'surface': '#FAFAFA',      // Light surface
          'surface-elevated': '#FFFFFF', // Elevated surface
          'text-primary': '#000000', // Black text
          'text-secondary': '#424242', // Dark gray text
          'text-muted': '#757575',   // Muted text
          'border': '#E0E0E0',       // Light border
          'hover': '#F0F0F0',        // Hover state
          'success': '#00A693',      // Darker Uber green
          'error': '#D32F2F',        // Error red
          'warning': '#F57C00',      // Warning orange
        },
        // Legacy poker colors (keeping for backward compatibility)
        'poker-green': '#0F5132',
        'poker-felt': '#1B5E20',
        'card-bg': '#FAFAFA',
        'chip-blue': '#1976D2',
        'chip-red': '#D32F2F',
        'chip-green': '#388E3C',
        'chip-black': '#424242',
        'gold': '#FFD700',
      },
      fontFamily: {
        'poker': ['Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0,0,0,0.3)',
        'chip': '0 2px 4px rgba(0,0,0,0.4)',
        'table': 'inset 0 0 50px rgba(0,0,0,0.3)',
        'dark-elevated': '0 8px 32px rgba(0,0,0,0.5)',
        'light-elevated': '0 4px 16px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        // Dark theme CSS variables
        '.theme-dark': {
          '--bg-primary': '#000000',
          '--bg-secondary': '#1A1A1A',
          '--bg-tertiary': '#2A2A2A',
          '--bg-surface': '#121212',
          '--bg-surface-elevated': '#1E1E1E',
          '--accent': '#FFD700',
          '--accent-dark': '#E6C200',
          '--text-primary': '#FFFFFF',
          '--text-secondary': '#B0B0B0',
          '--text-muted': '#757575',
          '--border': '#333333',
          '--hover': '#3A3A3A',
          '--success': '#00D4AA',
          '--error': '#FF4444',
          '--warning': '#FFB800',
        },
        // Light theme CSS variables
        '.theme-light': {
          '--bg-primary': '#FFFFFF',
          '--bg-secondary': '#F5F5F5',
          '--bg-tertiary': '#E0E0E0',
          '--bg-surface': '#FAFAFA',
          '--bg-surface-elevated': '#FFFFFF',
          '--accent': '#C8A415',
          '--accent-dark': '#B8941A',
          '--text-primary': '#000000',
          '--text-secondary': '#424242',
          '--text-muted': '#757575',
          '--border': '#E0E0E0',
          '--hover': '#F0F0F0',
          '--success': '#00A693',
          '--error': '#D32F2F',
          '--warning': '#F57C00',
        },
        
        // Theme utility classes
        '.theme-panel': {
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        },
        '.theme-section': {
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '0.5rem',
          padding: '1rem',
        },
        '.theme-button': {
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
          transitionProperty: 'background-color',
          transitionDuration: '200ms',
          '&:hover': {
            backgroundColor: 'var(--hover)',
          },
        },
        '.theme-button-primary': {
          backgroundColor: 'var(--accent)',
          color: 'var(--bg-primary)',
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
          transitionProperty: 'background-color',
          transitionDuration: '200ms',
          '&:hover': {
            backgroundColor: 'var(--accent-dark)',
          },
        },
        '.theme-button-danger': {
          backgroundColor: 'var(--error)',
          color: 'var(--text-primary)',
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
          transitionProperty: 'background-color',
          transitionDuration: '200ms',
          '&:hover': {
            backgroundColor: 'var(--error)',
            opacity: '0.8',
          },
        },
        '.theme-text-primary': {
          color: 'var(--text-primary)',
        },
        '.theme-text-secondary': {
          color: 'var(--text-secondary)',
        },
        '.theme-text-muted': {
          color: 'var(--text-muted)',
        },
        '.theme-text-accent': {
          color: 'var(--accent)',
        },
        '.theme-text-success': {
          color: 'var(--success)',
        },
        '.theme-text-error': {
          color: 'var(--error)',
        },
        '.theme-text-warning': {
          color: 'var(--warning)',
        },
        '.theme-bg-primary': {
          backgroundColor: 'var(--bg-primary)',
        },
        '.theme-bg-secondary': {
          backgroundColor: 'var(--bg-secondary)',
        },
        '.theme-bg-tertiary': {
          backgroundColor: 'var(--bg-tertiary)',
        },
        '.theme-bg-surface': {
          backgroundColor: 'var(--bg-surface)',
        },
        '.theme-bg-surface-elevated': {
          backgroundColor: 'var(--bg-surface-elevated)',
        },
        '.theme-bg-accent': {
          backgroundColor: 'var(--accent)',
        },
        '.theme-bg-success': {
          backgroundColor: 'var(--success)',
        },
        '.theme-bg-error': {
          backgroundColor: 'var(--error)',
        },
        '.theme-bg-warning': {
          backgroundColor: 'var(--warning)',
        },
        '.theme-border': {
          borderColor: 'var(--border)',
        },
        '.theme-border-accent': {
          borderColor: 'var(--accent)',
        },
        '.theme-border-success': {
          borderColor: 'var(--success)',
        },
        '.theme-border-error': {
          borderColor: 'var(--error)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

