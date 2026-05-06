import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-[#FFE9EE] relative z-20 border-t-4 border-dashed border-[#FFB3C6]">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A2A2A]">Transparent, Simple Pricing.</h2>
          <p className="text-xl text-[#2A2A2A]/70 mt-4 font-medium">No hidden fees. Pay only for the experiences you love.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative">
          
          {/* Arrow pointing from Step 1 to Step 2 (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-[#FD5E53]">
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M10 50 Q 50 10 90 50 M 70 30 L 90 50 L 70 70" />
            </svg>
          </div>

          {/* STEP 1: Meet & Greet */}
          <div className="bg-[#FAF9F6] rounded-[32px] p-8 border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#2A2A2A] relative transform -rotate-1">
            <div className="absolute -top-4 -right-4 bg-[#FDE047] text-[#2A2A2A] font-black px-4 py-1 border-2 border-[#2A2A2A] rotate-6 shadow-[2px_2px_0px_#2A2A2A]">
              STEP 1
            </div>
            
            <h3 className="text-3xl font-serif text-[#2A2A2A] mb-2">The Meet & Greet</h3>
            <div className="text-5xl font-black text-[#FD5E53] mb-6">$15</div>
            <p className="text-lg text-[#2A2A2A]/80 font-bold mb-6">A low-pressure, guided introduction. See if the chemistry is right before committing.</p>
            
            <ul className="space-y-3 font-medium text-[#2A2A2A]">
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-[#E1AD01]"/> 5-10 like-minded locals</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-[#E1AD01]"/> Public, cozy Ottawa cafe/bar</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-[#E1AD01]"/> Guided conversation prompts</li>
            </ul>
          </div>

          {/* STEP 2: The 4-Week Circle */}
          <div className="bg-[#FD5E53] rounded-[32px] p-8 border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#2A2A2A] relative transform rotate-1 text-[#FAF9F6]">
            <div className="absolute -top-4 -left-4 bg-[#2A2A2A] text-[#FAF9F6] font-black px-4 py-1 border-2 border-[#2A2A2A] -rotate-6 shadow-[2px_2px_0px_#FAF9F6]">
              STEP 2
            </div>

            <h3 className="text-3xl font-serif mb-2">The 4-Week Circle</h3>
            <div className="text-5xl font-black text-[#FDE047] mb-6">$39 - $129</div>
            <p className="text-lg text-[#FAF9F6]/90 font-bold mb-6">Found your group? Join a curated 4-week journey. Price depends on the activities chosen.</p>
            
            <ul className="space-y-3 font-medium">
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-[#2A2A2A]"/> Weekly planned hangouts</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-[#2A2A2A]"/> Dedicated group chat</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-[#2A2A2A]"/> Priority matching for future</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}