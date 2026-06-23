"use client";
import { Heart } from 'lucide-react';

export default function CommunityStandards() {
  return (
    // Added overflow-x-clip to prevent horizontal scrolling, scaled padding for mobile
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-brand-light relative z-30 overflow-x-clip" style={{ backgroundImage: `radial-gradient(var(--color-brand-lemon-dark) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      
      {/* Added mt-4 on mobile to give the absolute heart icon enough top space */}
      <div className="max-w-4xl mx-auto relative group mt-4 sm:mt-0">
        
        {/* Card: Scaled border radius, padding, and shadows for mobile to desktop */}
        <div className="bg-brand-cream p-6 sm:p-10 md:p-16 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border-4 border-brand-dark shadow-[6px_6px_0px] md:shadow-[12px_12px_0px] shadow-brand-dark relative z-10 hover:-translate-y-2 transition-transform duration-500">
          
          {/* Heart Badge: Scaled down on mobile to prevent going off-screen, repositioned */}
          <div className="absolute -top-5 -left-2 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[2px_2px_0px] sm:shadow-[4px_4px_0px] shadow-brand-dark z-20">
            <Heart fill="currentColor" className="text-brand-dark w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </div>
          
          {/* Added pt-4 on mobile so text clears the heart icon */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-dark mb-6 md:mb-8 text-center pt-4 sm:pt-0">
            Community Over Cliques
          </h2>
          
          <div className="text-lg sm:text-xl md:text-2xl font-sans font-medium text-brand-dark leading-relaxed space-y-5 sm:space-y-6">
            <p className="text-center">
              Rosebuddies was created because many adults know what it feels like to be on the outside looking in. We're committed to creating a community where everyone feels:
            </p>
            
            {/* Pills container scaled gap and padding */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 py-4 sm:py-6 text-base sm:text-lg">
              <span className="bg-brand-light border-2 border-brand-dark px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] -rotate-2">✓ Safe</span>
              <span className="bg-brand-light border-2 border-brand-dark px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] rotate-1">✓ Respected</span>
              <span className="bg-brand-light border-2 border-brand-dark px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] -rotate-1">✓ Valued</span>
              <span className="bg-brand-light border-2 border-brand-dark px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] rotate-2">✓ Included</span>
              <span className="bg-brand-light border-2 border-brand-dark px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] -rotate-2">✓ Connected</span>
            </div>

            {/* Replaced white text with text-brand-dark for contrast on the yellow primary background */}
            <p className="bg-brand-primary text-brand-dark p-4 sm:p-6 rounded-xl sm:rounded-2xl border-4 border-brand-dark font-bold text-center shadow-[4px_4px_0px_#1A5415] transform rotate-1 text-base sm:text-xl">
              Zero tolerance for harassment, discrimination, intimidation, or behaviour that creates an unsafe environment.
            </p>
            
            <p className="text-center font-serif text-xl sm:text-2xl md:text-3xl mt-6 md:mt-8">
              Because friendship grows best where people feel they belong.
            </p>
            
           
          </div>
        </div>

      </div>
    </section>
  );
}