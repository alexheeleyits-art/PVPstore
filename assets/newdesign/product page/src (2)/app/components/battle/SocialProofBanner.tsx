import React from 'react';
import { Star, Package, Users, Tag } from 'lucide-react';

interface SocialProofBannerProps {
  itemsSold: number;
  activeShoppers: number;
}

export function SocialProofBanner({ itemsSold, activeShoppers }: SocialProofBannerProps) {
  return (
    <div className="bg-white border-y border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="text-gray-900 font-black text-2xl md:text-3xl mb-1 flex items-center gap-2">
              <Package className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />
              {itemsSold.toLocaleString()}+
            </div>
            <span className="text-sm text-gray-500 font-medium">Items Sold in Battle</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="text-gray-900 font-black text-2xl md:text-3xl mb-1 flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400 w-6 h-6 md:w-8 md:h-8" />
              4.9/5
            </div>
            <span className="text-sm text-gray-500 font-medium">Average Product Rating</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="text-gray-900 font-black text-2xl md:text-3xl mb-1 flex items-center gap-2">
              <Users className="text-green-600 w-6 h-6 md:w-8 md:h-8" />
              {activeShoppers}
            </div>
            <span className="text-sm text-gray-500 font-medium">Shoppers Voting Now</span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="text-gray-900 font-black text-2xl md:text-3xl mb-1 flex items-center gap-2">
              <Tag className="text-purple-600 w-6 h-6 md:w-8 md:h-8" />
              20% OFF
            </div>
            <span className="text-sm text-gray-500 font-medium">For The Winning Team</span>
          </div>

        </div>
      </div>
    </div>
  );
}
