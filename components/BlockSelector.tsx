
import React from 'react';

interface BlockSelectorProps {
  selectedBlocks: number[];
  onToggleBlock: (block: number) => void;
}

const BlockSelector: React.FC<BlockSelectorProps> = ({ selectedBlocks, onToggleBlock }) => {
  const blocks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-6 gap-2 pt-1">
      {blocks.map(block => {
        const isSelected = selectedBlocks.includes(block);
        return (
          <button
            key={block}
            type="button"
            onClick={() => onToggleBlock(block)}
            className={`
              p-2 rounded-md text-sm font-semibold transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${isSelected 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }
            `}
          >
            {block}
          </button>
        );
      })}
    </div>
  );
};

export default BlockSelector;
