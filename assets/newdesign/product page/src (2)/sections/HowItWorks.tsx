export function HowItWorks() {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">HOW THE BATTLE WORKS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Join a team, shop your favorites, and unlock exclusive discounts if your side wins.</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10" />
  
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-3xl font-black text-gray-300 shadow-sm mb-6 relative">
                1
                <div className="absolute inset-0 border-b-4 border-gray-200 rounded-full" />
              </div>
              <h3 className="text-xl font-bold mb-3">Choose Your Team</h3>
              <p className="text-gray-500 leading-relaxed">Pick between Team Sweet or Team Savoury. Your choice determines your discount path.</p>
            </div>
  
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border-2 border-pink-100 rounded-full flex items-center justify-center text-3xl font-black text-pink-300 shadow-sm mb-6 relative">
                2
                <div className="absolute inset-0 border-b-4 border-pink-200 rounded-full" />
              </div>
              <h3 className="text-xl font-bold mb-3">Shop & Vote</h3>
              <p className="text-gray-500 leading-relaxed">Every purchase counts as a vote. Watch the live battle bar shift in real-time.</p>
            </div>
  
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border-2 border-yellow-100 rounded-full flex items-center justify-center text-3xl font-black text-yellow-300 shadow-sm mb-6 relative">
                3
                <div className="absolute inset-0 border-b-4 border-yellow-200 rounded-full" />
              </div>
              <h3 className="text-xl font-bold mb-3">Win Big</h3>
              <p className="text-gray-500 leading-relaxed">If your team wins when the timer hits zero, you get an exclusive 20% OFF coupon.</p>
            </div>
  
          </div>
        </div>
      </section>
    );
  }
