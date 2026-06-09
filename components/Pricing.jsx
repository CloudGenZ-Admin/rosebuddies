"use client";
import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-brand-pink-light relative z-20 border-t-4 border-dashed border-brand-pink-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">Transparent, Simple Pricing.</h2>
          <p className="text-xl text-brand-dark/70 mt-4 font-medium">No hidden fees. Pay only for the experiences you love.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-brand-primary">
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M10 50 Q 50 10 90 50 M 70 30 L 90 50 L 70 70" />
            </svg>
          </div>

          <div className="bg-brand-cream rounded-[32px] p-8 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark relative transform -rotate-1">
            <div className="absolute -top-4 -right-4 bg-brand-yellow text-brand-dark font-black px-4 py-1 border-2 border-brand-dark rotate-6 shadow-[2px_2px_0px] shadow-brand-dark">
              STEP 1
            </div>
            
            <h3 className="text-3xl font-serif text-brand-dark mb-2">The Meet & Greet</h3>
            <div className="text-5xl font-black text-brand-primary mb-6">$15</div>
            <p className="text-lg text-brand-dark/80 font-bold mb-6">A low-pressure, guided introduction. See if the chemistry is right before committing.</p>
            
            <ul className="space-y-3 font-medium text-brand-dark">
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-brand-accent"/> 5-10 like-minded locals</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-brand-accent"/> Public, cozy local cafe/bar</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-brand-accent"/> Guided conversation prompts</li>
            </ul>
          </div>

          <div className="bg-brand-primary rounded-[32px] p-8 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark relative transform rotate-1 text-brand-cream">
            <div className="absolute -top-4 -left-4 bg-brand-dark text-brand-cream font-black px-4 py-1 border-2 border-brand-dark -rotate-6 shadow-[2px_2px_0px] shadow-brand-cream">
              STEP 2
            </div>

            <h3 className="text-3xl font-serif mb-2">The 4-Week Circle</h3>
            <div className="text-5xl font-black text-brand-yellow mb-6">$39 - $129</div>
            <p className="text-lg text-brand-cream/90 font-bold mb-6">Found your group? Join a curated 4-week journey. Price depends on the activities chosen.</p>
            
            <ul className="space-y-3 font-medium">
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-brand-dark"/> Weekly planned hangouts</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-brand-dark"/> Dedicated group chat</li>
              <li className="flex items-center gap-2"><ArrowRight size={18} className="text-brand-dark"/> Priority matching for future</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}