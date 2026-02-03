import { motion } from "motion/react";
import { Users, ShoppingBag, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export function LiveStatus() {
  const [activeShoppers, setActiveShoppers] = useState(247);
  const [itemsSold, setItemsSold] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random walk
      setActiveShoppers(prev => Math.max(200, prev + Math.floor(Math.random() * 5) - 2));
      setItemsSold(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white w-full py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm">
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-bold tracking-wider">LIVE STATUS</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-4 h-4" />
            <span className="tabular-nums font-bold text-white">{activeShoppers}</span> active shoppers
          </div>

          <div className="hidden sm:flex items-center gap-2 text-gray-300">
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums font-bold text-white">{itemsSold}+</span> items sold
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-3 py-1 rounded-full font-bold shadow-[0_0_15px_rgba(234,179,8,0.5)]">
          <Trophy className="w-3 h-3" />
          WINNER GETS 20% OFF
        </div>

      </div>
    </div>
  );
}
