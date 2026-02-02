import React from 'react';
import { motion } from 'motion/react';
import { Clock, Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface StickyBattleBarProps {
  sweetScore: number;
  savouryScore: number;
  timeLeft: string;
}

export function StickyBattleBar({ sweetScore, savouryScore, timeLeft }: StickyBattleBarProps) {
  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top Row: Labels and Timer */}
        <div className="flex justify-between items-center mb-2 font-medium text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-pink-600 font-bold uppercase tracking-wider">Sweet Team</span>
            {sweetScore > savouryScore && (
              <span className="bg-pink-100 text-pink-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <Trophy size={12} /> Winning
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full font-mono text-gray-900">
            <Clock size={14} className="text-gray-500" />
            {timeLeft}
          </div>

          <div className="flex items-center gap-2">
            {savouryScore > sweetScore && (
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <Trophy size={12} /> Winning
              </span>
            )}
            <span className="text-amber-600 font-bold uppercase tracking-wider">Savoury Team</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-end px-2"
            initial={{ width: '50%' }}
            animate={{ width: `${sweetScore}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <span className="text-[10px] font-bold text-white tabular-nums">{sweetScore}%</span>
          </motion.div>
          <motion.div 
            className="h-full bg-gradient-to-l from-amber-400 to-amber-600 flex items-center justify-start px-2"
            initial={{ width: '50%' }}
            animate={{ width: `${savouryScore}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <span className="text-[10px] font-bold text-white tabular-nums">{savouryScore}%</span>
          </motion.div>
          
          {/* Center VS Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5 shadow-sm z-10">
            <div className="bg-gray-900 text-white text-[9px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
              VS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
