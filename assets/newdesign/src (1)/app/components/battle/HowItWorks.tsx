import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Pick Your Side",
      description: "Choose between Team Sweet or Team Savoury. Your purchase counts as a vote for your team.",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      id: 2,
      title: "Battle for the Win",
      description: "Watch the live score update. Every sale tips the scale. The battle ends when the timer hits zero.",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      id: 3,
      title: "Winners Get 20% Off",
      description: "If your team wins, you unlock an exclusive 20% discount code for your next purchase.",
      color: "bg-green-50 text-green-600 border-green-200"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4">How The Battle Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the ultimate food fight. Shop your favorites to support your team and unlock rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              {/* Number Circle */}
              <div className={`
                absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-white shadow-sm
                ${step.color}
              `}>
                {step.id}
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
