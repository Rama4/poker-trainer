import React from 'react';
import MinimizeButton from './MinimizeButton';

interface TransparentPanelProps {
  isMinimized: boolean;
  onToggle: () => void;
  position?: 'top' | 'bottom';
  children: React.ReactNode;
}

const TransparentPanel: React.FC<TransparentPanelProps> = ({
  isMinimized,
  onToggle,
  position = 'top',
  children,
}) => {
  if (isMinimized) {
    return (
      <MinimizeButton
        isMinimized={true}
        onToggle={onToggle}
        position={position === 'top' ? 'top-right' : 'bottom-right'}
        size={position === 'top' ? 'sm' : 'md'}
        showBackground={true}
      />
    );
  }

  return (
    <div className={`absolute ${position === 'top' ? 'top-4 left-4 right-4' : 'bottom-6 left-6 right-6'} rounded-lg p-4 bg-black/50 backdrop-blur-sm text-center border theme-border shadow-dark-elevated`}>
      <MinimizeButton
        isMinimized={false}
        onToggle={onToggle}
        size={position === 'top' ? 'sm' : 'md'}
      />
      {children}
    </div>
  );
};

export default TransparentPanel;
