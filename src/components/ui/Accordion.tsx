import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  index: number;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen = false,
  onToggle,
  index,
}) => {
  return (
    <div className="border-b border-[#23272F]/60 transition-colors duration-200">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between text-left gap-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D97736]"
        aria-expanded={isOpen}
      >
        <span className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-[#6B7280] group-hover:text-[#D97736] transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base sm:text-lg font-medium text-[#E5E7EB] group-hover:text-white transition-colors">
            {question}
          </span>
        </span>
        <span className={`p-1.5 rounded-full bg-[#131518] text-[#9CA3AF] group-hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#1F2228]' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>
      
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed pl-8 sm:pl-9 pr-4 max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
