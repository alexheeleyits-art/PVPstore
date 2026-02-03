import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function BattleBar() {
  const [timeLeft, setTimeLeft] = useState("23:42:15");
  const [sweetPct, setSweetPct] = useState(54);

  // Simulate slight fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate between 53 and 55
      const fluctuation = Math.random() > 0.5 ? 0.1 : -0.1;
      setSweetPct((prev) => Math.min(Math.max(prev + fluctuation, 53), 55));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Battle Status & Timer */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600 block"></span>
              LIVE BATTLE
            </div>
            <div className="flex items-center gap-2 font-mono text-gray-800 bg-gray-100 px-3 py-1 rounded text-sm">
              <Clock className="w-4 h-4" />
              {timeLeft}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 w-full max-w-2xl flex items-center gap-3">
            <div className="text-right font-bold text-pink-600 w-24">
              SWEET <span className="text-xs text-gray-500 block">Leading</span>
            </div>
            
            <div className="relative h-6 flex-1 bg-gray-100 rounded-full overflow-hidden flex">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-end px-2"
                animate={{ width: `${sweetPct}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <span className="text-white text-xs font-bold">{sweetPct.toFixed(1)}%</span>
              </motion.div>
              <motion.div 
                className="h-full bg-gradient-to-l from-orange-400 to-amber-500 flex items-center justify-start px-2"
                animate={{ width: `${100 - sweetPct}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <span className="text-white text-xs font-bold">{(100 - sweetPct).toFixed(1)}%</span>
              </motion.div>
            </div>

            <div className="text-left font-bold text-amber-600 w-24">
              SAVOURY <span className="text-xs text-gray-500 block">Trailing</span>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
             <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
               JOIN NOW
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
