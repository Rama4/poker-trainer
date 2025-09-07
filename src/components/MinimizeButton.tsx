import React from 'react';

interface MinimizeButtonProps {
  isMinimized: boolean;
  onToggle: () => void;
  position?: 'top-right' | 'bottom-right' | 'center-right';
  size?: 'sm' | 'md';
  showBackground?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

const MinimizeButton: React.FC<MinimizeButtonProps> = ({
  isMinimized,
  onToggle,
  position = 'top-right',
  size = 'sm',
  showBackground = false,
  orientation = 'vertical',
}) => {
  const positionClasses = {
    'top-right': 'top-2 right-2',
    'bottom-right': 'bottom-6 right-6',
    'center-right': 'top-1/2 -translate-y-1/2 -right-3',
  };

  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
  };

  const baseClasses = showBackground
    ? "theme-bg-surface-elevated theme-text-primary p-2 rounded-lg hover:bg-[var(--hover)] transition-colors duration-200 border theme-border shadow-dark-elevated"
    : "theme-text-muted hover:text-[var(--text-primary)] transition-colors duration-200";

  return (
    <button
      onClick={onToggle}
      className={`absolute ${positionClasses[position]} ${showBackground ? 'p-3' : ''} ${baseClasses}`}
      title={isMinimized ? "Show panel" : "Minimize panel"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={orientation === 'vertical' 
            ? (isMinimized ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7")
            : (isMinimized ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7")
          }
        />
      </svg>
    </button>
  );
};

export default MinimizeButton;
