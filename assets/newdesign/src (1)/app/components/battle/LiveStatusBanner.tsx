import React from 'react';
import { motion } from 'motion/react';
import { Users, ShoppingBag, Tag } from 'lucide-react';

interface LiveStatusBannerProps {
  activeShoppers: number;
  itemsSold: number;
}

export function LiveStatusBanner({ activeShoppers, itemsSold }: LiveStatusBannerProps) {
  return (
    <div className="bg-gray-900 text-white py-2 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
        
        {/* Left: Live Indicator */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <motion.span 
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
            ></motion.span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="font-bold tracking-wider text-green-400">LIVE BATTLE</span>
        </div>

        {/* Center: Metrics */}
        <div className="flex items-center gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-400" />
            <span className="font-mono text-white">{activeShoppers}</span> shoppers online
          </div>
          <div className="flex items-center gap-2 hidden sm:flex">
            <ShoppingBag size={14} className="text-gray-400" />
            <span className="font-mono text-white">{itemsSold.toLocaleString()}+</span> items sold
          </div>
        </div>

        {/* Right: Offer Badge */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
          <Tag size={12} strokeWidth={3} />
          WINNER GETS 20% OFF
        </div>

      </div>
    </div>
  );
}
