import React from "react";

interface PlayerChipsProps {
  amount: number;
}

const PlayerChips: React.FC<PlayerChipsProps> = ({ amount }) => {
  const getChipColor = (value: number) => {
    if (value >= 1000) return "theme-bg-secondary theme-border";
    if (value >= 500) return "theme-bg-tertiary theme-border";
    if (value >= 100) return "theme-bg-success theme-border-success";
    if (value >= 25) return "theme-bg-accent border-[var(--accent-dark)]";
    if (value >= 5) return "theme-bg-error theme-border-error";
    return "theme-bg-surface-elevated theme-border theme-text-primary";
  };

  console.log(
    "PlayerChips: chip color for amount",
    amount,
    getChipColor(amount)
  );
  const getChipStacks = (amount: number) => {
    const stacks = [];
    let remaining = amount;

    // Black chips ($1000+)
    if (remaining >= 1000) {
      const count = Math.floor(remaining / 1000);
      stacks.push({
        color: "bg-dark-secondary border-dark-border",
        count,
        value: 1000,
      });
      remaining %= 1000;
    }

    // Purple chips ($500)
    if (remaining >= 500) {
      const count = Math.floor(remaining / 500);
      stacks.push({
        color: "bg-dark-tertiary border-dark-border",
        count,
        value: 500,
      });
      remaining %= 500;
    }

    // Green chips ($100)
    if (remaining >= 100) {
      const count = Math.floor(remaining / 100);
      stacks.push({
        color: "bg-dark-success border-dark-success",
        count,
        value: 100,
      });
      remaining %= 100;
    }

    // Blue chips ($25)
    if (remaining >= 25) {
      const count = Math.floor(remaining / 25);
      stacks.push({ color: "bg-dark-accent border-dark-accent-dark", count, value: 25 });
      remaining %= 25;
    }

    // Red chips ($5)
    if (remaining >= 5) {
      const count = Math.floor(remaining / 5);
      stacks.push({ color: "bg-dark-error border-dark-error", count, value: 5 });
      remaining %= 5;
    }

    // White chips ($1)
    if (remaining > 0) {
      stacks.push({
        color: "bg-dark-surface-elevated border-dark-border text-dark-text-primary",
        count: remaining,
        value: 1,
      });
    }

    return stacks;
  };

  const chipStacks = getChipStacks(amount);

  return (
    <div className="flex items-center space-x-1">
      {chipStacks.map((stack, index) => (
        <div key={index} className="relative">
          {/* Chip stack */}
          <div className="relative">
            {Array.from({ length: Math.min(stack.count, 5) }).map(
              (_, chipIndex) => (
                <div
                  key={chipIndex}
                  className={`chip w-8 h-8 ${stack.color} absolute`}
                  style={{
                    bottom: `${chipIndex * 2}px`,
                    zIndex: chipIndex,
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold theme-text-primary">
                      {stack.value >= 1000
                        ? `${stack.value / 1000}K`
                        : stack.value}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Stack count indicator */}
          {stack.count > 5 && (
            <div className="absolute -top-2 -right-1 theme-bg-accent text-[var(--bg-primary)] text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {stack.count}
            </div>
          )}
        </div>
      ))}

      {/* Total amount */}
      <div className="ml-2 mt-8 text-sm font-bold theme-text-accent">
        ${amount.toLocaleString()}
      </div>
    </div>
  );
};

export default PlayerChips;
