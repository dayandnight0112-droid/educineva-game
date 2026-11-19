import React from 'react';
import { Game } from '../types';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  isSelected: boolean;
  onSelect: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(game)}
      className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col group ${
        isSelected
          ? 'ring-2 ring-[#2563eb] shadow-md border-transparent'
          : 'border border-gray-200/90 hover:border-gray-300 hover:shadow-md shadow-2xs'
      }`}
    >
      {/* Game Image Banner */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        <img
          src={game.coverUrl}
          alt={game.name}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300 select-none"
          loading="lazy"
        />
      </div>

      {/* Card Bottom Content */}
      <div className="px-5 py-4 flex items-center justify-between bg-white">
        <h3 className="text-base font-bold text-gray-900 tracking-tight group-hover:text-[#e60067] transition-colors">
          {game.name}
        </h3>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(game);
          }}
          className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
            isSelected
              ? 'border-[#2563eb] text-[#2563eb] bg-blue-50/60 font-semibold'
              : 'border-gray-200 text-gray-700 hover:border-[#e60067] hover:text-[#e60067] hover:bg-[#fde7f0]'
          }`}
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>游戏设定</span>
        </button>
      </div>
    </div>
  );
};
