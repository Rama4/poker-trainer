import React from "react";

interface PlayerChipsProps {
  amount: number;
}

const PlayerChips: React.FC<PlayerChipsProps> = ({ amount }) => {
  const getChipColor = (value: number) => {
    if (value >= 1000) return "bg-chip-black border-gray-300";
    if (value >= 500) return "bg-purple-600 border-purple-300";
    if (value >= 100) return "bg-chip-green border-green-300";
    if (value >= 25) return "bg-chip-blue border-blue-300";
    if (value >= 5) return "bg-chip-red border-red-300";
    return "bg-white border-gray-400 text-black";
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
        color: "bg-chip-black border-gray-300",
        count,
        value: 1000,
      });
      remaining %= 1000;
    }

    // Purple chips ($500)
    if (remaining >= 500) {
      const count = Math.floor(remaining / 500);
      stacks.push({
        color: "bg-purple-600 border-purple-300",
        count,
        value: 500,
      });
      remaining %= 500;
    }

    // Green chips ($100)
    if (remaining >= 100) {
      const count = Math.floor(remaining / 100);
      stacks.push({
        color: "bg-chip-green border-green-300",
        count,
        value: 100,
      });
      remaining %= 100;
    }

    // Blue chips ($25)
    if (remaining >= 25) {
      const count = Math.floor(remaining / 25);
      stacks.push({ color: "bg-chip-blue border-blue-300", count, value: 25 });
      remaining %= 25;
    }

    // Red chips ($5)
    if (remaining >= 5) {
      const count = Math.floor(remaining / 5);
      stacks.push({ color: "bg-chip-red border-red-300", count, value: 5 });
      remaining %= 5;
    }

    // White chips ($1)
    if (remaining > 0) {
      stacks.push({
        color: "bg-white border-gray-400 text-black",
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
                    <span className="text-xs font-bold">
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
            <div className="absolute -top-2 -right-1 bg-yellow-500 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {stack.count}
            </div>
          )}
        </div>
      ))}

      {/* Total amount */}
      <div className="ml-2 text-sm font-bold text-yellow-400">
        ${amount.toLocaleString()}
      </div>
    </div>
  );
};

export default PlayerChips;
