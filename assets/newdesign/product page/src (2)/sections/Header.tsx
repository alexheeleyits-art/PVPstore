import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = {
    sweet: {
      title: "Team Sweet",
      categories: [
        { name: "Choco Decadence", href: "#" },
        { name: "Donut Factory", href: "#" },
        { name: "Macaron Mania", href: "#" },
        { name: "Pastry Paradise", href: "#" },
        { name: "Ice Cream Dreams", href: "#" },
      ],
      featured: [
        { name: "Gourmet Donuts", img: "https://images.unsplash.com/photo-1769372742160-488b07674729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZG9udXRzfGVufDF8fHx8MTc2OTk5MjQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
        { name: "Artisanal Truffles", img: "https://images.unsplash.com/photo-1769433509476-bd68b1229916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuYWwlMjBjaG9jb2xhdGUlMjB0cnVmZmxlc3xlbnwxfHx8fDE3Njk5OTI0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      ]
    },
    savoury: {
      title: "Team Savoury",
      categories: [
        { name: "Crispy Chips", href: "#" },
        { name: "Spicy Nuts", href: "#" },
        { name: "Jerky & Meats", href: "#" },
        { name: "Cheese Boards", href: "#" },
        { name: "Popcorn Party", href: "#" },
      ],
      featured: [
        { name: "Potato Chips", img: "https://images.unsplash.com/photo-1604565011092-c0fa4416f80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjaGlwcyUyMGJvd2x8ZW58MXx8fHwxNzY5OTkyNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
        { name: "Roasted Nuts", img: "https://images.unsplash.com/photo-1626738740202-ce4e9c4ae674?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMG51dHMlMjByb2FzdGVkfGVufDF8fHx8MTc2OTk5MjQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      ]
    }
  };

  return (
    <header className="relative bg-white z-[60] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
             <div className="bg-black text-white font-black text-xl w-10 h-10 flex items-center justify-center rounded-lg">
                VS
             </div>
             <div className="flex flex-col leading-none">
                <span className="font-black text-lg tracking-tight">SWEET</span>
                <span className="font-bold text-sm text-gray-400 tracking-widest">SAVOURY</span>
             </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveMenu('sweet')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={`flex items-center gap-1 font-bold text-sm tracking-wide uppercase transition-colors ${activeMenu === 'sweet' ? 'text-pink-600' : 'text-gray-600 hover:text-black'}`}>
                Shop Sweet <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'sweet' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveMenu('savoury')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={`flex items-center gap-1 font-bold text-sm tracking-wide uppercase transition-colors ${activeMenu === 'savoury' ? 'text-amber-600' : 'text-gray-600 hover:text-black'}`}>
                Shop Savoury <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'savoury' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <a href="#" className="font-bold text-sm text-gray-600 hover:text-black tracking-wide uppercase">Bundles</a>
            <a href="#" className="font-bold text-sm text-gray-600 hover:text-black tracking-wide uppercase">Our Story</a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button className="text-gray-600 hover:text-black">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-black hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-black relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </button>
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl border-t"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-4 gap-8">
                
                {/* Categories */}
                <div className="col-span-1">
                  <h3 className={`font-black uppercase tracking-widest mb-4 ${activeMenu === 'sweet' ? 'text-pink-600' : 'text-amber-600'}`}>
                    {menuItems[activeMenu as keyof typeof menuItems].title}
                  </h3>
                  <ul className="space-y-3">
                    {menuItems[activeMenu as keyof typeof menuItems].categories.map((cat, idx) => (
                      <li key={idx}>
                        <a href={cat.href} className="text-gray-600 hover:text-black font-medium text-sm transition-colors hover:translate-x-1 inline-block">
                          {cat.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <a href="#" className="text-xs font-bold underline decoration-2 underline-offset-4 hover:text-gray-600">VIEW ALL PRODUCTS</a>
                  </div>
                </div>

                {/* Featured Images */}
                <div className="col-span-3 grid grid-cols-2 gap-6">
                    {menuItems[activeMenu as keyof typeof menuItems].featured.map((item, idx) => (
                      <div key={idx} className="group relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 cursor-pointer">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute bottom-4 left-4">
                          <h4 className="text-white font-bold text-lg drop-shadow-md">{item.name}</h4>
                        </div>
                      </div>
                    ))}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu (Simple) */}
      <AnimatePresence>
        {mobileMenuOpen && (
           <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
           >
             <div className="px-4 py-6 space-y-4">
               <a href="#" className="block font-bold text-lg text-pink-600">Shop Sweet</a>
               <a href="#" className="block font-bold text-lg text-amber-600">Shop Savoury</a>
               <a href="#" className="block font-bold text-lg text-gray-800">Bundles</a>
               <a href="#" className="block font-bold text-lg text-gray-800">Our Story</a>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
