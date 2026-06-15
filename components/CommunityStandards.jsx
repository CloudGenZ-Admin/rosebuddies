"use client";
import { Heart } from 'lucide-react';

export default function CommunityStandards() {
  return (
    <section className="py-32 px-6 bg-brand-light relative z-30" style={{ backgroundImage: `radial-gradient(var(--color-brand-lemon-dark) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      <div className="max-w-4xl mx-auto relative group">
        
        <div className="bg-brand-cream p-8 md:p-16 rounded-[40px] border-4 border-brand-dark shadow-[12px_12px_0px] shadow-brand-dark relative z-10 hover:-translate-y-2 transition-transform duration-500">
          
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px] shadow-brand-dark z-20">
            <Heart fill="currentColor" size={40} className="text-brand-dark" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 text-center">Community Over Cliques</h2>
          
          <div className="text-xl md:text-2xl font-sans font-medium text-brand-dark leading-relaxed space-y-6">
            <p className="text-center">Rosebuddies was created because many adults know what it feels like to be on the outside looking in. We're committed to creating a community where everyone feels:</p>
            
            <div className="flex flex-wrap justify-center gap-4 py-6">
              <span className="bg-brand-light border-2 border-brand-dark px-6 py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] -rotate-2">✓ Safe</span>
              <span className="bg-brand-light border-2 border-brand-dark px-6 py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] rotate-1">✓ Respected</span>
              <span className="bg-brand-light border-2 border-brand-dark px-6 py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] -rotate-1">✓ Valued</span>
              <span className="bg-brand-light border-2 border-brand-dark px-6 py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] rotate-2">✓ Included</span>
              <span className="bg-brand-light border-2 border-brand-dark px-6 py-2 rounded-full font-bold shadow-[2px_2px_0px_#1A5415] -rotate-2">✓ Connected</span>
            </div>

            {/* Replaced white text with text-brand-dark for contrast on the yellow primary background */}
            <p className="bg-brand-primary text-brand-dark p-6 rounded-2xl border-4 border-brand-dark font-bold text-center shadow-[4px_4px_0px_#1A5415] transform rotate-1">
              Zero tolerance for harassment, discrimination, intimidation, or behaviour that creates an unsafe environment.
            </p>
            
            <p className="text-center font-serif text-2xl md:text-3xl mt-8">Because friendship grows best where people feel they belong.</p>
            
            <div className="text-center pt-8">
              <button className="text-brand-dark font-bold underline decoration-brand-accent decoration-4 underline-offset-8 hover:text-brand-lime-dark transition-colors">
                [ Learn More About Our Community Standards ]
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}