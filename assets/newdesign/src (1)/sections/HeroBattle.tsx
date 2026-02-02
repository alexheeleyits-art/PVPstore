import { motion } from "motion/react";
import { ArrowRight, Users, Box } from "lucide-react";

export function HeroBattle() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
      
      {/* Sweet Side */}
      <div className="relative group overflow-hidden h-[500px] md:h-[600px]">
        <div className="absolute inset-0 bg-gray-900">
            <img 
                src="https://images.unsplash.com/photo-1707465876054-6fab1049e119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNhZGVudCUyMGNob2NvbGF0ZSUyMGRlc3NlcnQlMjByb3NlJTIwcGlua3xlbnwxfHx8fDE3Njk5OTE2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Sweet Desserts" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-rose-800/40 to-transparent mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 mix-blend-overlay pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
          <div className="mb-4 flex items-center gap-2">
            <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-pink-900/50">
                Winning • 54%
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black uppercase mb-4 tracking-tighter drop-shadow-xl">
            Team <br/>Sweet
          </h2>
          <p className="text-pink-100 max-w-sm mb-8 text-lg font-medium drop-shadow-md">
            Decadent chocolates, fluffy pastries, and sugar-coated dreams.
          </p>

          <div className="flex gap-6 mb-8 text-sm font-semibold text-pink-50">
            <div className="flex items-center gap-2">
                <Users className="w-5 h-5" /> 2.4k Members
            </div>
            <div className="flex items-center gap-2">
                <Box className="w-5 h-5" /> 24 Products
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-rose-900 px-8 py-4 rounded-full font-black text-xl flex items-center gap-3 hover:bg-rose-50 transition-colors shadow-xl"
          >
            JOIN SWEET <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Savoury Side */}
      <div className="relative group overflow-hidden h-[500px] md:h-[600px]">
        <div className="absolute inset-0 bg-gray-900">
            <img 
                src="https://images.unsplash.com/photo-1543384490-fc38bd91de41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZvdXJ5JTIwc2FsdHklMjBzbmFja3MlMjBjaGlwcyUyMGFtYmVyJTIwb3JhbmdlfGVufDF8fHx8MTc2OTk5MTYwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Savoury Snacks"
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-800/40 to-transparent mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 to-yellow-500/20 mix-blend-overlay pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
          <div className="mb-4 flex items-center gap-2">
            <span className="bg-gray-800 text-white/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                Losing • 46%
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black uppercase mb-4 tracking-tighter drop-shadow-xl">
            Team <br/>Savoury
          </h2>
          <p className="text-amber-100 max-w-sm mb-8 text-lg font-medium drop-shadow-md">
            Crispy chips, spicy nuts, and cheese-dusted perfection.
          </p>

          <div className="flex gap-6 mb-8 text-sm font-semibold text-amber-50">
            <div className="flex items-center gap-2">
                <Users className="w-5 h-5" /> 1.9k Members
            </div>
            <div className="flex items-center gap-2">
                <Box className="w-5 h-5" /> 28 Products
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-amber-900 px-8 py-4 rounded-full font-black text-xl flex items-center gap-3 hover:bg-amber-50 transition-colors shadow-xl"
          >
            JOIN SAVOURY <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

    </section>
  );
}
