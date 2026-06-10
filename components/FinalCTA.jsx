"use client";

const WaveSVG = ({ className }) => (
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={className}>
    <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" />
  </svg>
);

export default function FinalCTA() {
  return (
    // Base section background: Lemonade Yellow
    <section id="waitlist" className="py-32 px-6 relative overflow-hidden z-20 bg-brand-light">
      
      {/* Animated Lemon/Juice Waves Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-[45%] md:h-[60%] flex animate-wave-1">
          <WaveSVG className="w-1/2 h-full text-brand-lemon-light fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-lemon-light fill-current" />
        </div>
        <div className="absolute bottom-0 left-0 w-[200%] h-[30%] md:h-[40%] flex animate-wave-2">
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
        </div>
      </div>

      {/* Main Card: Lemon Sorbet (Cream) with Dark Lemon-Bark Borders */}
      <div className="max-w-4xl mx-auto bg-brand-cream border-4 border-brand-dark rounded-[40px] p-8 md:p-16 shadow-[12px_12px_0px_var(--color-brand-dark)] relative z-10 mt-8 text-center">
        
        {/* Sticky Tape: Amber/Secondary Color */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-brand-secondary/80 backdrop-blur-md -rotate-2 border-2 border-brand-dark shadow-sm z-20"></div>

        <div className="mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-dark inline-block relative">
            Ready To Find Your Circle?
            {/* Accent Star: Lime Dark */}
            <svg className="absolute -right-12 -top-8 w-10 h-10 text-brand-lime-dark animate-bounce" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
              <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
            </svg>
          </h2>
        </div>
        
        <div className="text-2xl md:text-3xl leading-relaxed font-serif text-brand-dark relative z-10">
          <p className="mb-8 font-sans font-medium text-brand-dark/90">
            The first conversation could change everything. Take the Interest Check, join a Meet & Greet, and start building meaningful friendships in real life.
          </p>

          <p className="mb-12 font-black text-4xl md:text-5xl text-brand-lime-dark uppercase tracking-wide">
            Less Scrolling. More Living.<br/>
            <span className="text-brand-dark">Log Off. Show Up. Belong.</span>
          </p>

          <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
            
            {/* Button 1: Dark Button with Lime Shadow */}
            <a href="#interest" className="group relative inline-flex items-center justify-center bg-brand-dark text-brand-cream font-sans font-bold text-xl px-10 py-5 rounded-full hover:-translate-y-1 transition-transform w-full sm:w-auto border-4 border-brand-dark shadow-[6px_6px_0px_var(--color-brand-lime-dark)] hover:shadow-[8px_8px_0px_var(--color-brand-secondary)]">
              [ Find My Circle ]
            </a>

            {/* Button 2: Pure Lemon Button with Dark Shadow */}
            <a href="#meet" className="group relative inline-flex items-center justify-center bg-brand-primary text-brand-dark font-sans font-bold text-xl px-10 py-5 rounded-full hover:-translate-y-1 transition-transform w-full sm:w-auto border-4 border-brand-dark shadow-[6px_6px_0px_var(--color-brand-dark)] hover:shadow-[8px_8px_0px_var(--color-brand-lime-dark)]">
              [ Join the Next Meet & Greet ]
            </a>

          </div>
        </div>
      </div>

      <style>{`
        .animate-wave-1 { animation: waveSlide 20s linear infinite; }
        .animate-wave-2 { animation: waveSlide 12s linear infinite reverse; }
        @keyframes waveSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}