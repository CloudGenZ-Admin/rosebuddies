export default function HowItWorks() {
  return (
    // ID added here so the Arrow from the previous section scrolls exactly here!
    // Background is a very soft warm cream to complement the pink above it.
    <section id="how-it-works" className="py-32 px-6 md:px-12 bg-[#FDF8F5] relative z-30">
      <div className="max-w-5xl mx-auto relative">
        
        <div className="text-center mb-24 relative">
          <h2 className="text-5xl md:text-6xl font-serif text-[#2A2A2A] relative inline-block">
            Friendship, Made Easier.
            {/* Hand-drawn underline */}
            <svg className="absolute -bottom-4 -left-4 w-[110%] h-6 -z-10 text-[#FFD6E0]" viewBox="0 0 200 20" fill="none">
              <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            </svg>
          </h2>
        </div>
        
        {/* The Sticky Ladder Container */}
        <div className="relative flex">
          
          {/* LADDER RAIL (The vertical line connecting the steps) */}
          <div className="hidden md:block absolute left-8 top-10 bottom-0 w-1 bg-dashed border-l-4 border-dashed border-[#FFB3C6] z-0"></div>

          <div className="w-full flex flex-col gap-8">
            
            {/* --- LADDER STEP 1 --- */}
            {/* Color: Warm Scrapbook Cream */}
            <div className="sticky top-24 pt-4 pb-12 md:pb-24 h-auto z-10 w-full md:w-[90%]">
              <div className="relative bg-[#FAF9F6] rounded-3xl p-8 md:p-14 border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#FFB3C6] transform -rotate-1 transition-transform hover:rotate-0">
                
                {/* Number Badge (The Ladder Rung Indicator) */}
                <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-[#FFD6E0] border-4 border-[#2A2A2A] rounded-full flex items-center justify-center text-3xl font-black font-serif text-[#2A2A2A] shadow-[4px_4px_0px_#2A2A2A] z-20">
                  1
                </div>
                {/* Washi Tape */}
                <div className="absolute -top-3 right-10 w-20 h-6 bg-[#E1AD01]/50 backdrop-blur-sm rotate-3 z-20"></div>

                <div className="pl-4 md:pl-8">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-[#2A2A2A]">The Vibe Check</h3>
                  <p className="text-xl font-medium text-[#2A2A2A]/80 leading-relaxed font-sans">
                    Take our short matching quiz. Tell us your communication style, interests, and availability. We match based on values, not just age or algorithms.
                  </p>
                </div>
              </div>
            </div>

            {/* --- LADDER STEP 2 --- */}
            {/* Color: Soft Mustard Yellow. Notice 'md:ml-[5%]' which shifts it right to create a ladder/step effect */}
            <div className="sticky top-32 pt-4 pb-12 md:pb-16 h-auto z-20 w-full md:w-[90%] md:ml-[5%]">
              <div className="relative bg-[#FDE047] rounded-3xl p-8 md:p-14 border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#FD5E53] transform rotate-1 transition-transform hover:rotate-0">
                
                {/* Number Badge */}
                <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-[#FAF9F6] border-4 border-[#2A2A2A] rounded-full flex items-center justify-center text-3xl font-black font-serif text-[#2A2A2A] shadow-[4px_4px_0px_#2A2A2A] z-20">
                  2
                </div>
                {/* Washi Tape */}
                <div className="absolute -top-3 right-20 w-16 h-6 bg-[#FFB3C6]/60 backdrop-blur-sm -rotate-6 z-20"></div>

                <div className="pl-4 md:pl-8">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-[#2A2A2A]">The Meet & Greet <span className="text-[#FD5E53]">($15)</span></h3>
                  <p className="text-xl font-medium text-[#2A2A2A]/80 leading-relaxed font-sans">
                    Low-pressure and guided. We match you with 5-10 like-minded locals at a cozy Ottawa cafe or brewery. See if the chemistry is there.
                  </p>
                </div>
              </div>
            </div>

            {/* --- LADDER STEP 3 --- */}
            {/* Color: Warm Terracotta. 'md:ml-[10%]' shifts it furthest right */}
            <div className="sticky top-40 pt-4 pb-12 h-auto z-30 w-full md:w-[90%] md:ml-[10%]">
              <div className="relative bg-[#E2725B] rounded-3xl p-8 md:p-14 border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#2A2A2A] transform -rotate-1 transition-transform hover:rotate-0">
                
                {/* Number Badge */}
                <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-[#FDE047] border-4 border-[#2A2A2A] rounded-full flex items-center justify-center text-3xl font-black font-serif text-[#2A2A2A] shadow-[4px_4px_0px_#2A2A2A] z-20">
                  3
                </div>
                {/* Washi Tape */}
                <div className="absolute -top-3 right-1/4 w-24 h-6 bg-[#FAF9F6]/40 backdrop-blur-sm rotate-2 z-20"></div>

                <div className="pl-4 md:pl-8">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-[#FAF9F6]">The 4-Week Circle <span className="text-[#FDE047]">($39 - $129)</span></h3>
                  <p className="text-xl font-medium text-[#FAF9F6]/90 leading-relaxed font-sans">
                    Found your group? Join a curated 4-week journey. From bookstore browses to trivia nights, we handle the planning. You just show up and connect.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}