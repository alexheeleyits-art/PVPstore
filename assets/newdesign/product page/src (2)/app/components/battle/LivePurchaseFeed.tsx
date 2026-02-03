import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export interface Purchase {
  id: string;
  name: string;
  item: string;
  team: 'sweet' | 'savoury';
  timeAgo: string;
}

interface LivePurchaseFeedProps {
  purchases: Purchase[];
}

export function LivePurchaseFeed({ purchases }: LivePurchaseFeedProps) {
  return (
    <div className="fixed bottom-6 left-6 z-40 w-80 flex flex-col gap-2 pointer-events-none">
       {/* Title */}
       <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-t-lg shadow-sm border-b border-gray-100 self-start">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
             Live Feed
          </span>
       </div>

      <AnimatePresence mode='popLayout'>
        {purchases.map((purchase) => (
          <motion.div
            key={purchase.id}
            layout
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`
              relative overflow-hidden rounded-lg shadow-lg border-l-4 p-3 pr-4 bg-white/95 backdrop-blur-md
              ${purchase.team === 'sweet' ? 'border-pink-500' : 'border-amber-500'}
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                mt-1 p-1.5 rounded-full flex-shrink-0
                ${purchase.team === 'sweet' ? 'bg-pink-100 text-pink-600' : 'bg-amber-100 text-amber-600'}
              `}>
                <ShoppingBag size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5 flex justify-between">
                  <span className="font-medium text-gray-900 truncate max-w-[100px]">{purchase.name}</span>
                  <span>{purchase.timeAgo}</span>
                </p>
                <p className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
                  Bought <span className={purchase.team === 'sweet' ? 'text-pink-600' : 'text-amber-600'}>{purchase.item}</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  for {purchase.team === 'sweet' ? 'Team Sweet' : 'Team Savoury'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
