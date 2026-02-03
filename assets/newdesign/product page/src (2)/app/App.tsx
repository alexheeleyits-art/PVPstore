import { LiveStatus } from "@/sections/LiveStatus";
import { Header } from "@/sections/Header";
import { BattleBar } from "@/sections/BattleBar";
import { HeroBattle } from "@/sections/HeroBattle";
import { LivePurchaseFeed } from "@/sections/LivePurchaseFeed";
import { SocialProof } from "@/sections/SocialProof";
import { HowItWorks } from "@/sections/HowItWorks";
import { ProductPage } from "@/sections/ProductPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <LiveStatus />
      <Header />
      <BattleBar />
      <main>
        {/* Product Page Demo */}
        <ProductPage />
        
        {/* Rest of the battle context */}
        <div className="border-t border-gray-200 mt-12">
           <HeroBattle />
        </div>
        <LivePurchaseFeed />
        <SocialProof />
        <HowItWorks />
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-12 text-center text-sm">
        <p>© 2024 Sweet vs Savoury Battle. All rights reserved.</p>
        <p className="mt-2 text-xs text-gray-600">Shopify Liquid Templates generated in /shopify/sections</p>
      </footer>
    </div>
  );
}
