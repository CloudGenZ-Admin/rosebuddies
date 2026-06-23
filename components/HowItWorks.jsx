"use client";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-12 bg-brand-light relative z-30 overflow-x-clip">
      <div className="max-w-5xl mx-auto relative">
        
        {/* HEADER */}
        <div className="text-center mb-16 lg:mb-24 relative">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-text relative inline-block leading-tight">
            Four Simple Steps 
            <br/>
            <span className="relative inline-block mt-2">
              To Finding Your Circle
              <svg className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-[105%] sm:w-[110%] h-4 sm:h-6 -z-10 text-brand-lime-dark" viewBox="0 0 200 20" fill="none">
                <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>
        
        <div className="relative flex">
          {/* Dashed vertical line connecting steps (Only visible on Desktop) */}
          <div className="hidden lg:block absolute left-8 top-10 bottom-0 w-1 bg-dashed border-l-4 border-dashed border-brand-lemon-dark z-0"></div>

          <div className="w-full flex flex-col gap-10 lg:gap-8">
            
            {/* STEP 1: White Highlight (Cream) Background */}
            {/* Changed from 'sticky' to 'relative lg:sticky' so it scrolls normally on mobile */}
            <div className="relative lg:sticky lg:top-24 h-auto z-10 w-full lg:w-[90%]">
              <div className="relative bg-brand-cream rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-14 border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-lemon-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-lemon-dark)] transform -rotate-1 transition-transform hover:rotate-0">
                {/* Number Badge */}
                <div className="absolute -top-5 sm:-top-6 -left-3 sm:-left-6 lg:-left-12 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-brand-accent border-4 border-brand-dark rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] z-20">1</div>
                {/* Tape accent */}
                <div className="absolute -top-2 sm:-top-3 right-6 sm:right-10 w-16 sm:w-20 h-4 sm:h-6 bg-brand-secondary/50 backdrop-blur-sm rotate-3 z-20"></div>
                
                <div className="pl-2 sm:pl-4 lg:pl-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-3 sm:mb-4 text-brand-text">Find Your Circle</h3>
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-brand-text-primary leading-relaxed font-sans">
                    Answer five simple questions about your interests, social preferences, and the experiences you enjoy. This isn't a compatibility test. We don't use algorithms to decide who your friends should be.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 2: Juicy Lemon (Primary) Background */}
            <div className="relative lg:sticky lg:top-32 h-auto z-20 w-full lg:w-[90%] lg:ml-[5%]">
              <div className="relative bg-brand-primary rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-14 border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-lemon-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-lemon-dark)] transform rotate-1 transition-transform hover:rotate-0">
                {/* Number Badge */}
                <div className="absolute -top-5 sm:-top-6 -left-3 sm:-left-6 lg:-left-12 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-brand-cream border-4 border-brand-dark rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] z-20">2</div>
                {/* Tape accent */}
                <div className="absolute -top-2 sm:-top-3 right-10 sm:right-20 w-14 sm:w-16 h-4 sm:h-6 bg-brand-lemon-dark/60 backdrop-blur-sm -rotate-6 z-20"></div>
                
                <div className="pl-2 sm:pl-4 lg:pl-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-3 sm:mb-4 text-brand-text">Join a Meet & Greet <span className="text-brand-lime-dark text-lg sm:text-xl lg:text-2xl block mt-1 sm:mt-2">($25 One-Time Experience)</span></h3>
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-brand-text-primary leading-relaxed font-sans mb-3 sm:mb-4">
                    Meet new people in a relaxed, welcoming environment.
                  </p>
                  <ul className="text-base sm:text-lg font-bold text-brand-text leading-relaxed font-sans space-y-2 mb-4">
                    <li>✓ Facilitated introductions</li>
                    <li>✓ Guided conversations</li>
                    <li>✓ Experienced community hosts</li>
                    <li>✓ Shared interest activities</li>
                    <li>✓ Opportunities to meet future club members</li>
                  </ul>
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-brand-text-primary leading-relaxed font-sans">
                    Most people attend alone. That's exactly why we're here.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 3: Golden Lemon (Secondary) Background */}
            <div className="relative lg:sticky lg:top-40 h-auto z-30 w-full lg:w-[90%] lg:ml-[10%]">
              <div className="relative bg-brand-secondary rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-14 border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] transform -rotate-1 transition-transform hover:rotate-0">
                {/* Number Badge */}
                <div className="absolute -top-5 sm:-top-6 -left-3 sm:-left-6 lg:-left-12 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] z-20">3</div>
                {/* Tape accent */}
                <div className="absolute -top-2 sm:-top-3 right-1/4 w-16 sm:w-24 h-4 sm:h-6 bg-brand-cream/40 backdrop-blur-sm rotate-2 z-20"></div>
                
                <div className="pl-2 sm:pl-4 lg:pl-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-5 sm:mb-6 text-brand-text">Choose Your Path</h3>
                  
                  <div className="mb-5 sm:mb-6">
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-text mb-1 sm:mb-2">Friendship Clubs <span className="text-base sm:text-lg lg:text-xl font-normal block lg:inline lg:ml-2 text-brand-text-primary">(Starting at $40/month)</span></h4>
                    <p className="text-base sm:text-lg lg:text-xl font-medium text-brand-text leading-relaxed font-sans">
                      Join a recurring social circle where friendships can grow naturally through shared interests and regular gatherings.
                    </p>
                  </div>
                  
                  <div className="text-center font-black text-brand-text-primary/60 text-xl sm:text-2xl my-4 sm:my-6">OR</div>
                  
                  <div>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-text mb-1 sm:mb-2">Curated Experiences <span className="text-base sm:text-lg lg:text-xl font-normal block lg:inline lg:ml-2 text-brand-text-primary">($250 Experience Pass)</span></h4>
                    <p className="text-base sm:text-lg lg:text-xl font-medium text-brand-text leading-relaxed font-sans">
                      Five weeks. Eight to twelve people. One professionally organized experience each week. We handle the planning. You focus on connecting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: Lime Accent Background */}
            <div className="relative lg:sticky lg:top-48 h-auto z-40 w-full lg:w-[90%] lg:ml-[15%]">
              <div className="relative bg-brand-accent rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-14 border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] transform rotate-1 transition-transform hover:rotate-0">
                {/* Number Badge */}
                <div className="absolute -top-5 sm:-top-6 -left-3 sm:-left-6 lg:-left-12 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-brand-secondary border-4 border-brand-dark rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] z-20">4</div>
                {/* Tape accent */}
                <div className="absolute -top-2 sm:-top-3 right-6 sm:right-10 w-16 sm:w-24 h-4 sm:h-6 bg-brand-primary/60 backdrop-blur-sm -rotate-2 z-20"></div>
                
                <div className="pl-2 sm:pl-4 lg:pl-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-3 sm:mb-4 text-brand-dark">Build Your Circle</h3>
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-brand-dark/90 leading-relaxed font-sans">
                    Over time, familiar faces become trusted friends.<br/>
                    Conversations become connections.<br/>
                    Connections become community.<br/>
                    <br/>
                    Because meaningful friendship isn't built in a single night. It's built through showing up.
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