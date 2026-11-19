import React from 'react';
import { User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="flex items-start justify-between pb-6 select-none">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          {title}
        </h1>
        <p className="text-gray-500 text-sm mt-1.5 font-normal">
          {subtitle}
        </p>
      </div>

      {/* Teacher Role Dropdown Badge */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-purple-200/90 hover:border-purple-300 rounded-full text-sm font-medium text-gray-700 shadow-2xs transition hover:bg-purple-50/40"
        >
          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <User className="w-3.5 h-3.5" />
          </div>
          <span>教师端</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};
