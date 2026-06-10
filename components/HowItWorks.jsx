"use client";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 md:px-12 bg-brand-light relative z-30">
      <div className="max-w-5xl mx-auto relative">
        
        {/* HEADER */}
        <div className="text-center mb-24 relative">
          <h2 className="text-5xl md:text-6xl font-serif text-brand-dark relative inline-block">
            Four Simple Steps 
            <br/>
            <span className="relative inline-block mt-2">
              To Finding Your Circle
              {/* Swapped pink for lime-dark on the underline SVG */}
              <svg className="absolute -bottom-4 -left-4 w-[110%] h-6 -z-10 text-brand-lime-dark" viewBox="0 0 200 20" fill="none">
                <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>
        
        <div className="relative flex">
          {/* Swapped pink border for lemon-dark border */}
          <div className="hidden md:block absolute left-8 top-10 bottom-0 w-1 bg-dashed border-l-4 border-dashed border-brand-lemon-dark z-0"></div>

          <div className="w-full flex flex-col gap-8">
            
            {/* STEP 1: Lemon Sorbet (Cream) Background */}
            <div className="sticky top-24 pt-4 pb-12 md:pb-24 h-auto z-10 w-full md:w-[90%]">
              <div className="relative bg-brand-cream rounded-3xl p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-lemon-dark transform -rotate-1 transition-transform hover:rotate-0">
                <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-lime border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px] shadow-brand-dark z-20">1</div>
                <div className="absolute -top-3 right-10 w-20 h-6 bg-brand-accent/50 backdrop-blur-sm rotate-3 z-20"></div>
                <div className="pl-4 md:pl-8">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-brand-dark">Find Your Circle</h3>
                  <p className="text-xl font-medium text-brand-dark/80 leading-relaxed font-sans">
                    Answer five simple questions about your interests, social preferences, and the experiences you enjoy. This isn't a compatibility test. We don't use algorithms to decide who your friends should be.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 2: Pure Lemon (Primary) Background */}
            <div className="sticky top-32 pt-4 pb-12 md:pb-16 h-auto z-20 w-full md:w-[90%] md:ml-[5%]">
              <div className="relative bg-brand-primary rounded-3xl p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-lemon-dark transform rotate-1 transition-transform hover:rotate-0">
                <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-cream border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px] shadow-brand-dark z-20">2</div>
                <div className="absolute -top-3 right-20 w-16 h-6 bg-brand-lemon-dark/60 backdrop-blur-sm -rotate-6 z-20"></div>
                <div className="pl-4 md:pl-8">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-brand-dark">Join a Meet & Greet <span className="text-brand-lime-dark text-2xl block mt-2">($25 One-Time Experience)</span></h3>
                  <p className="text-xl font-medium text-brand-dark/80 leading-relaxed font-sans mb-4">
                    Meet new people in a relaxed, welcoming environment.
                  </p>
                  <ul className="text-lg font-bold text-brand-dark/90 leading-relaxed font-sans space-y-2 mb-4">
                    <li>✓ Facilitated introductions</li>
                    <li>✓ Guided conversations</li>
                    <li>✓ Experienced community hosts</li>
                    <li>✓ Shared interest activities</li>
                    <li>✓ Opportunities to meet future club members</li>
                  </ul>
                  <p className="text-xl font-medium text-brand-dark/80 leading-relaxed font-sans">
                    Most people attend alone. That's exactly why we're here.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 3: Amber/Golden (Secondary) Background */}
            <div className="sticky top-40 pt-4 pb-12 h-auto z-30 w-full md:w-[90%] md:ml-[10%]">
              <div className="relative bg-brand-secondary rounded-3xl p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark transform -rotate-1 transition-transform hover:rotate-0">
                <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px] shadow-brand-dark z-20">3</div>
                <div className="absolute -top-3 right-1/4 w-24 h-6 bg-brand-cream/40 backdrop-blur-sm rotate-2 z-20"></div>
                <div className="pl-4 md:pl-8">
                  {/* Changed text from cream to dark for better contrast on the Amber bg */}
                  <h3 className="text-3xl md:text-4xl font-serif mb-6 text-brand-dark">Choose Your Path</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-2xl font-black text-brand-dark mb-2">Friendship Clubs <span className="text-xl font-normal block md:inline md:ml-2">(Starting at $40/month)</span></h4>
                    <p className="text-xl font-medium text-brand-dark/90 leading-relaxed font-sans">
                      Join a recurring social circle where friendships can grow naturally through shared interests and regular gatherings.
                    </p>
                  </div>
                  
                  <div className="text-center font-black text-brand-dark/40 text-2xl my-4">OR</div>
                  
                  <div>
                    <h4 className="text-2xl font-black text-brand-dark mb-2">Curated Experiences <span className="text-xl font-normal block md:inline md:ml-2">($250 Experience Pass)</span></h4>
                    <p className="text-xl font-medium text-brand-dark/90 leading-relaxed font-sans">
                      Five weeks. Eight to twelve people. One professionally organized experience each week. We handle the planning. You focus on connecting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: Lime Green Background */}
            <div className="sticky top-48 pt-4 pb-12 h-auto z-40 w-full md:w-[90%] md:ml-[15%]">
              <div className="relative bg-brand-lime rounded-3xl p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark transform rotate-1 transition-transform hover:rotate-0">
                <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-secondary border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px] shadow-brand-dark z-20">4</div>
                <div className="absolute -top-3 right-10 w-24 h-6 bg-brand-lemon/60 backdrop-blur-sm -rotate-2 z-20"></div>
                <div className="pl-4 md:pl-8">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 text-brand-dark">Build Your Circle</h3>
                  <p className="text-xl font-medium text-brand-dark/90 leading-relaxed font-sans">
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