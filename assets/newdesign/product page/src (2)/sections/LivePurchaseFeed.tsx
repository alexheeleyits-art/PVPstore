import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

interface Purchase {
  id: number;
  user: string;
  item: string;
  team: 'sweet' | 'savoury';
  time: string;
}

const MOCK_NAMES = ["Alex", "Sarah", "Mike", "Jessica", "David", "Emma", "Tom", "Lisa"];
const SWEET_ITEMS = ["Dark Choco Box", "Macaron Set", "Strawberry Tart", "Donut 6-pack"];
const SAVOURY_ITEMS = ["Spicy Chips", "Cheese Puffs", "Pretzel Mix", "Beef Jerky"];

export function LivePurchaseFeed() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: 1, user: "Alex", item: "Dark Choco Box", team: "sweet", time: "Just now" },
    { id: 2, user: "Lisa", item: "Spicy Chips", team: "savoury", time: "2s ago" },
    { id: 3, user: "Mike", item: "Macaron Set", team: "sweet", time: "5s ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const isSweet = Math.random() > 0.45; // Sweet is winning slightly
      const newPurchase: Purchase = {
        id: Date.now(),
        user: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
        item: isSweet 
          ? SWEET_ITEMS[Math.floor(Math.random() * SWEET_ITEMS.length)]
          : SAVOURY_ITEMS[Math.floor(Math.random() * SAVOURY_ITEMS.length)],
        team: isSweet ? 'sweet' : 'savoury',
        time: 'Just now'
      };

      setPurchases(prev => [newPurchase, ...prev.slice(0, 2)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Live Purchase Feed</h3>
        
        <div className="flex flex-col md:flex-row gap-4">
          <AnimatePresence mode="popLayout">
            {purchases.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`flex-1 flex items-center gap-3 p-3 rounded-lg border-l-4 shadow-sm bg-gray-50 ${
                  p.team === 'sweet' ? 'border-pink-500' : 'border-amber-500'
                }`}
              >
                <div className={`p-2 rounded-full ${p.team === 'sweet' ? 'bg-pink-100 text-pink-600' : 'bg-amber-100 text-amber-600'}`}>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {p.user} bought <span className={p.team === 'sweet' ? 'text-pink-600' : 'text-amber-600'}>{p.item}</span>
                  </p>
                  <p className="text-xs text-gray-500">{p.time}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
