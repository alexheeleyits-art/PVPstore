import { motion } from "motion/react";
import { useState } from "react";
import { Star, ShieldCheck, Truck, Clock, Check, Plus, Minus, Heart } from "lucide-react";

export function ProductPage() {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1629610306962-a8aa73153d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjaG9jb2xhdGUlMjBib3glMjBwYWNrYWdpbmclMjBvcGVufGVufDF8fHx8MTc3MDA4MDUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1665632930458-e187c0e62835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjB0cnVmZmxlJTIwY2xvc2UlMjB1cCUyMHRleHR1cmV8ZW58MXx8fHwxNzcwMDgwNTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763803872177-9bd6a35c2ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xkaW5nJTIwY2hvY29sYXRlJTIwYm94JTIwZ2lmdHxlbnwxfHx8fDE3NzAwODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb / Back */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <a href="#" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-black transition-colors">Team Sweet</a>
          <span>/</span>
          <span className="text-black font-medium">Midnight Truffle Collection</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
               <motion.img 
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={images[activeImg]} 
                  alt="Product View" 
                  className="w-full h-full object-cover"
               />
               <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-10">
                 Team Sweet Item
               </div>
               <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-pink-600 transition-colors" />
               </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative w-24 aspect-square rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeImg === idx ? 'border-pink-600 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-gray-500 text-sm font-medium">(128 Reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                Midnight Truffle Collection
              </h1>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">$28.00</span>
                <span className="text-xl text-gray-400 line-through">$34.00</span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">SAVE 18%</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Handcrafted dark chocolate truffles dusted with cocoa powder. Rich, intense, and perfect for the ultimate chocolate lover. Each bite counts as a vote for Team Sweet.
              </p>
            </div>

            {/* Battle Impact Box */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-xl p-5 mb-8">
               <div className="flex items-start gap-4">
                 <div className="bg-white p-2 rounded-lg shadow-sm text-pink-600">
                   <Star className="w-6 h-6 fill-pink-600" />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 mb-1">Boost Team Sweet!</h4>
                   <p className="text-sm text-gray-600 mb-2">Purchasing this item adds <span className="font-bold text-pink-600">+15 Points</span> to the live battle score.</p>
                   <div className="w-full h-2 bg-pink-200 rounded-full overflow-hidden">
                     <div className="h-full w-[75%] bg-pink-500 rounded-full animate-pulse" />
                   </div>
                   <p className="text-xs text-pink-600 font-bold mt-1 text-right">Team Impact: High</p>
                 </div>
               </div>
            </div>

            {/* Selectors */}
            <div className="mb-8 space-y-4">
               <div>
                 <span className="block text-sm font-bold text-gray-900 mb-2">Size</span>
                 <div className="flex gap-3">
                   {['12 Piece', '24 Piece', '48 Piece'].map((size, idx) => (
                     <button key={size} className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all ${idx === 0 ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-400'}`}>
                       {size}
                     </button>
                   ))}
                 </div>
               </div>
               <div>
                  <span className="block text-sm font-bold text-gray-900 mb-2">Quantity</span>
                  <div className="inline-flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => setQty(Math.max(1, qty-1))} className="p-3 hover:bg-gray-50 text-gray-600"><Minus className="w-4 h-4" /></button>
                    <span className="w-12 text-center font-bold">{qty}</span>
                    <button onClick={() => setQty(qty+1)} className="p-3 hover:bg-gray-50 text-gray-600"><Plus className="w-4 h-4" /></button>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-8">
              <button className="w-full bg-pink-600 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-pink-200 hover:bg-pink-700 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                ADD TO CART & VOTE SWEET
              </button>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">
                <Clock className="w-4 h-4" /> Selling Fast: 42 sold in last hour
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-gray-400" />
                 <span className="text-sm text-gray-600">Authentic Swiss Chocolate</span>
               </div>
               <div className="flex items-center gap-3">
                 <Truck className="w-5 h-5 text-gray-400" />
                 <span className="text-sm text-gray-600">Free Cold-Pack Shipping</span>
               </div>
               <div className="flex items-center gap-3">
                 <Check className="w-5 h-5 text-gray-400" />
                 <span className="text-sm text-gray-600">Gluten Free Ingredients</span>
               </div>
               <div className="flex items-center gap-3">
                 <Star className="w-5 h-5 text-gray-400" />
                 <span className="text-sm text-gray-600">Award Winning Taste</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
