import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Trophy, Users, Package } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HeroBattleProps {
  sweetScore: number;
  savouryScore: number;
  sweetMembers: number;
  savouryMembers: number;
  sweetProducts: number;
  savouryProducts: number;
}

export function HeroBattle({ 
  sweetScore, 
  savouryScore,
  sweetMembers,
  savouryMembers,
  sweetProducts,
  savouryProducts
}: HeroBattleProps) {

  const sweetWinning = sweetScore > savouryScore;
  const savouryWinning = savouryScore > sweetScore;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[600px] overflow-hidden">
      
      {/* SWEET SIDE */}
      <div className="relative group overflow-hidden cursor-pointer h-[500px] md:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1719257795456-149e546fcc99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZSUyMHBpbmt8ZW58MXx8fHwxNzY5OTkxNDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sweet Team"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-900/40 to-transparent mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center text-white z-10 pb-16 md:pb-20">
          
          {/* Badge */}
          <div className="mb-4">
            {sweetWinning ? (
              <span className="bg-pink-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-bounce">
                <Trophy size={16} /> WINNING
              </span>
            ) : (
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold text-sm flex items-center gap-2">
                TRAILING
              </span>
            )}
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">TEAM SWEET</h2>
          <p className="text-pink-100 max-w-sm mb-6 font-medium">Indulgent chocolates, decadent cakes, and sugary delights.</p>
          
          {/* Stats */}
          <div className="flex gap-6 mb-8 text-sm font-medium text-pink-50 border-t border-white/20 pt-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{sweetMembers.toLocaleString()}</span>
              <span className="text-pink-200 text-xs uppercase flex items-center gap-1"><Users size={12}/> Fans</span>
            </div>
            <div className="w-px bg-white/20 h-full" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{sweetScore}%</span>
              <span className="text-pink-200 text-xs uppercase">Score</span>
            </div>
            <div className="w-px bg-white/20 h-full" />
             <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{sweetProducts}</span>
              <span className="text-pink-200 text-xs uppercase flex items-center gap-1"><Package size={12}/> Items</span>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/50 transform transition-all hover:-translate-y-1 flex items-center gap-2 text-lg">
            <ShoppingCart size={20} />
            Shop Sweet
          </button>
        </div>
      </div>

      {/* SAVOURY SIDE */}
      <div className="relative group overflow-hidden cursor-pointer h-[500px] md:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1648775170273-dcbe48fb12a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBzYXZvdXJ5JTIwYnVyZ2VyJTIwZnJpZXMlMjBvcmFuZ2V8ZW58MXx8fHwxNzY5OTkxNDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Savoury Team"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/40 to-transparent mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center text-white z-10 pb-16 md:pb-20">
          
          {/* Badge */}
          <div className="mb-4">
            {savouryWinning ? (
              <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-bounce">
                <Trophy size={16} /> WINNING
              </span>
            ) : (
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-bold text-sm flex items-center gap-2">
                TRAILING
              </span>
            )}
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">TEAM SAVOURY</h2>
          <p className="text-amber-100 max-w-sm mb-6 font-medium">Crispy snacks, cheesy bites, and salty cravings.</p>

          {/* Stats */}
           <div className="flex gap-6 mb-8 text-sm font-medium text-amber-50 border-t border-white/20 pt-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{savouryMembers.toLocaleString()}</span>
              <span className="text-amber-200 text-xs uppercase flex items-center gap-1"><Users size={12}/> Fans</span>
            </div>
            <div className="w-px bg-white/20 h-full" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{savouryScore}%</span>
              <span className="text-amber-200 text-xs uppercase">Score</span>
            </div>
            <div className="w-px bg-white/20 h-full" />
             <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{savouryProducts}</span>
              <span className="text-amber-200 text-xs uppercase flex items-center gap-1"><Package size={12}/> Items</span>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-amber-500/50 transform transition-all hover:-translate-y-1 flex items-center gap-2 text-lg">
            <ShoppingCart size={20} />
            Shop Savoury
          </button>
        </div>
      </div>

    </div>
  );
}
