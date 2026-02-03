import { Star, TrendingUp, Users } from "lucide-react";

export function SocialProof() {
  return (
    <div className="bg-gray-50 py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="flex flex-col items-center">
            <div className="text-4xl font-black text-gray-900 mb-2">1,247+</div>
            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 text-green-500" /> Items Sold
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-1">
                4.9 <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-gray-600 text-sm font-medium">Average Rating</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl font-black text-gray-900 mb-2">247</div>
            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <Users className="w-4 h-4 text-blue-500" /> Live Shoppers
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 mb-2">
                20% OFF
            </div>
            <div className="text-gray-600 text-sm font-medium">For Winning Team</div>
          </div>

        </div>
      </div>
    </div>
  );
}
