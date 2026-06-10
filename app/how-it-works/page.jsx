"use client";
import { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DetailedHowItWorksPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [step3Option, setStep3Option] = useState('A'); // Sub-menu state for Step 3
  const totalSteps = 3;

  const nextStep = () => setActiveStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <main className="bg-brand-light min-h-screen overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="pt-24 md:pt-32"></div>

      {/* --- INTRO --- */}
      <section className="py-8 relative z-30">
        <div className="max-w-5xl mx-auto px-5 md:px-12 relative">
          <div className="absolute -top-10 -right-4 md:-right-10 opacity-10 text-brand-primary pointer-events-none z-0">
            <Heart size={150} fill="currentColor" stroke="none" className="w-24 h-24 md:w-40 md:h-40" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark mb-4 relative inline-block">
              How Rosebuddies Works
              <svg className="absolute -bottom-2 -left-2 w-[110%] h-3 md:h-4 -z-10 text-brand-yellow" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-serif text-brand-primary mb-6 mt-6 leading-tight">
              Friendship Was Never Meant To Be Decided by An Algorithm
            </h2>
            
            <div className="text-base sm:text-lg md:text-xl font-medium font-sans text-brand-dark/90 space-y-4">
              <p>Most friendship platforms ask you to create a profile, answer questions, and trust an algorithm to decide who you should meet. <strong className="text-brand-dark">We believe there is a better way.</strong></p>
              
              <p>At Rosebuddies, we create opportunities for people to meet naturally, build genuine connections, and develop meaningful friendships through real-life experiences, shared interests, positive energy, and authentic conversations.</p>
              
              {/* Responsive Badges */}
              <div className="flex flex-wrap gap-2 md:gap-4 py-2">
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-primary font-bold text-sm sm:text-base line-through decoration-2">No matching systems</span>
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-primary font-bold text-sm sm:text-base line-through decoration-2">No compatibility scores</span>
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-primary font-bold text-sm sm:text-base line-through decoration-2">No swiping</span>
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-primary font-bold text-sm sm:text-base line-through decoration-2">No endless scrolling</span>
              </div>
              
              <p>We believe no algorithm can predict chemistry, connection, or friendship. Some of life's best relationships begin unexpectedly, with a simple conversation, a shared laugh, or a chance encounter. We don't want to rob you of the experience of meeting someone organically.</p>
              
              <p>Our Friendship Clubs and Curated Experiences are built around shared interests and real-world interaction. We create the space, facilitate the experience, and support the journey.</p>
              
              <div className="font-bold text-brand-dark text-lg sm:text-xl p-4 md:p-6 bg-brand-yellow border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] rounded-xl transform -rotate-1 mt-4 inline-block w-full sm:w-auto">
                The rest is up to you. Because friendship was never meant to be an algorithm. It was always meant to happen naturally.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SLIDER SECTION --- */}
      <section className="py-12 pb-24 bg-brand-cream border-t-4 border-dashed border-brand-dark z-20 relative flex-grow">
        <div className="max-w-6xl mx-auto px-5 md:px-12 w-full">
            
          {/* MAIN STEP TABS */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
            {[1, 2, 3].map((num) => (
              <button 
                key={num}
                onClick={() => setActiveStep(num)}
                className={`py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-lg md:text-xl font-black font-serif border-4 border-brand-dark transition-all rounded-xl leading-none flex items-center justify-center
                  ${activeStep === num 
                    ? 'bg-brand-primary text-brand-cream shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] translate-y-0' 
                    : 'bg-brand-light text-brand-dark shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:bg-brand-yellow opacity-70 hover:opacity-100'}
                `}
              >
                Step {num}
              </button>
            ))}
          </div>

          {/* SLIDER CONTAINER */}
          <div className="bg-brand-dark rounded-[24px] shadow-[6px_6px_0px_#FD5E53] md:shadow-[8px_8px_0px_#FD5E53] border-4 border-brand-dark relative z-10 w-full overflow-hidden">
            <div className="rounded-[20px] bg-brand-light relative w-full overflow-hidden h-full">
              <div 
                className="flex transition-transform duration-500 ease-in-out items-stretch h-full w-full"
                style={{ transform: `translateX(-${(activeStep - 1) * 100}%)` }}
              >
                
                {/* --- SLIDE 1 (Content spread using flex-col & mt-auto) --- */}
                <div className="w-full h-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-light flex flex-col">
                  {/* Top Text Content */}
                  <div className="max-w-4xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-2">Start With a Meet & Greet</h3>
                    <p className="text-lg sm:text-xl font-black text-brand-primary mb-6">$25 One-Time Experience</p>
                    
                    <div className="text-base sm:text-lg font-medium text-brand-dark/90 space-y-4 max-w-3xl">
                      <p>Every Rosebuddies journey begins with a Meet & Greet. Our Meet & Greets are welcoming social gatherings designed to help people connect naturally in a relaxed, pressure-free environment.</p>
                      <p>You'll meet new people, join guided conversations, and discover shared interests without awkward networking or forced introductions.</p>
                      <p className="font-bold text-brand-dark text-lg sm:text-xl pt-2">Most people attend alone. That's exactly why we're here.</p>
                    </div>
                  </div>
                  
                  {/* Bottom "What's Included" Box spans to the bottom */}
                  <div className="mt-auto pt-8 md:pt-12">
                    <div className="bg-brand-pink-light p-5 sm:p-6 rounded-xl border-4 border-brand-dark md:rotate-1">
                      <h4 className="font-black text-brand-dark mb-4 text-lg sm:text-xl font-serif uppercase tracking-wide">What's Included:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-bold text-sm sm:text-base text-brand-dark/90">
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]">
                          <span className="text-brand-primary">✓</span> Facilitated introductions
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]">
                          <span className="text-brand-primary">✓</span> Icebreakers & prompts
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]">
                          <span className="text-brand-primary">✓</span> Experienced hosts
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]">
                          <span className="text-brand-primary">✓</span> Welcoming environment
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A] sm:col-span-2 lg:col-span-1">
                          <span className="text-brand-primary">✓</span> Meet potential friends
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 2 (Content spread using flex-col & mt-auto) --- */}
                <div className="w-full h-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-pink border-l-4 border-brand-dark flex flex-col">
                  {/* Top Text Content */}
                  <div className="max-w-4xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-6">Find Your People</h3>
                    
                    <div className="text-base sm:text-lg font-medium text-brand-dark/90 space-y-4 max-w-3xl">
                      <p>Meaningful friendships rarely happen in a single conversation.</p>
                      <p>That's why Rosebuddies focuses on helping people discover connections through shared experiences and repeated interactions.</p>
                      <p className="font-bold text-brand-dark text-lg sm:text-xl pt-2">At your Meet & Greet, you'll naturally gravitate towards people you enjoy spending time with.</p>
                    </div>
                  </div>
                  
                  {/* Bottom "No Compatibility" Box spans to the bottom */}
                  <div className="mt-auto pt-8 md:pt-12">
                    <div className="bg-brand-cream p-6 sm:p-8 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#2A2A2A] md:-rotate-1 flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
                      <div className="text-left flex-1">
                        <p className="font-black text-2xl sm:text-3xl lg:text-4xl text-brand-primary uppercase tracking-wide leading-tight text-center lg:text-left">
                          No compatibility scores.<br/>
                          No personality tests.
                        </p>
                      </div>
                      <div className="bg-brand-yellow p-4 sm:p-6 rounded-xl border-4 border-brand-dark md:rotate-2 shadow-[4px_4px_0px_#2A2A2A] flex-shrink-0 w-full lg:w-auto text-center">
                        <span className="font-black text-xl sm:text-2xl text-brand-dark">Just authentic<br/>human connection.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 3 (WITH SUB-MENUS) --- */}
                <div className="w-full h-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-yellow border-l-4 border-brand-dark flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-2">Choose Your Path</h3>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-brand-dark/80">After your Meet & Greet, continue your journey in one of two ways.</p>
                  </div>

                  {/* SUB-MENU TOGGLE */}
                  <div className="flex w-full bg-brand-light border-4 border-brand-dark rounded-xl mb-6 overflow-hidden shadow-[4px_4px_0px_#2A2A2A]">
                    <button 
                      onClick={() => setStep3Option('A')}
                      className={`flex-1 py-3 px-2 text-center font-black font-serif text-sm sm:text-base border-r-4 border-brand-dark transition-colors
                        ${step3Option === 'A' ? 'bg-brand-primary text-brand-cream' : 'text-brand-dark hover:bg-brand-cream'}
                      `}
                    >
                      Option A <span className="hidden sm:inline">: Friendship Club</span>
                    </button>
                    <button 
                      onClick={() => setStep3Option('B')}
                      className={`flex-1 py-3 px-2 text-center font-black font-serif text-sm sm:text-base transition-colors
                        ${step3Option === 'B' ? 'bg-brand-pink text-brand-dark' : 'text-brand-dark hover:bg-brand-cream'}
                      `}
                    >
                      Option B <span className="hidden sm:inline">: Curated Experience</span>
                    </button>
                  </div>

                  {/* DYNAMIC CONTENT AREA */}
                  <div className="flex-grow flex flex-col h-full animate-fade-in">
                    {step3Option === 'A' ? (
                      /* Option A Content */
                      <div className="bg-brand-cream p-5 sm:p-6 md:p-8 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] flex flex-col flex-grow relative">
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-brand-dark">Join a Friendship Club</h4>
                        <p className="text-base sm:text-lg font-black text-brand-primary mb-4">Starting at $40/month</p>
                        
                        {/* 2-col on mobile, 4-col on tablet/desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#2A2A2A]">
                            <strong className="text-brand-primary block text-sm sm:text-base mb-1">🍽️ Dinner Club</strong>
                            Great food & conversation.
                          </div>
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#2A2A2A]">
                            <strong className="text-brand-primary block text-sm sm:text-base mb-1">🚶 Walk & Talk</strong>
                            Fresh air & movement.
                          </div>
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#2A2A2A]">
                            <strong className="text-brand-primary block text-sm sm:text-base mb-1">☕ Coffee Meetup</strong>
                            Casual familiar faces.
                          </div>
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#2A2A2A]">
                            <strong className="text-brand-primary block text-sm sm:text-base mb-1">🗣️ Golden Years</strong>
                            Enjoy life's next chapter.
                          </div>
                        </div>

                        {/* Memberships Layout */}
                        <div className="bg-brand-pink-light p-4 rounded-xl border-2 border-brand-dark mt-auto border-dashed">
                          <p className="font-bold text-sm sm:text-base mb-3 text-center uppercase tracking-wide font-serif">Membership Options</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs sm:text-sm font-bold">
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center flex justify-center items-center">1 Month: $40</div>
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center text-brand-primary flex justify-center items-center">3-Month: Save 10%</div>
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center text-brand-primary flex justify-center items-center">6-Month: Save 15%</div>
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center text-brand-primary flex justify-center items-center">12-Month: Save 20%</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Option B Content */
                      <div className="bg-brand-dark text-brand-cream p-5 sm:p-6 md:p-8 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] flex flex-col flex-grow relative">
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-brand-cream">Join a Curated Experience</h4>
                        <p className="text-base sm:text-lg font-black text-brand-yellow mb-4">$250 Experience Pass</p>
                        
                        <p className="text-sm sm:text-base md:text-lg font-medium mb-6 text-brand-cream/90 flex-grow max-w-2xl">
                          Prefer smaller groups and a more intimate experience? Our Curated Experiences are designed for people who want to build deeper connections within a small group setting.
                        </p>
                        
                        <div className="bg-brand-cream text-brand-dark p-5 rounded-xl border-4 border-brand-dark mt-auto md:rotate-1 shadow-[4px_4px_0px_#E1AD01] w-full md:w-fit">
                          <h5 className="font-black text-sm sm:text-base mb-3 font-serif uppercase">Each Experience Includes:</h5>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-bold text-sm sm:text-base text-brand-dark/90">
                            <li className="flex items-center gap-2"><span className="text-brand-primary">✓</span> 5 weeks</li>
                            <li className="flex items-center gap-2"><span className="text-brand-primary">✓</span> 1 experience per week</li>
                            <li className="flex items-center gap-2"><span className="text-brand-primary">✓</span> 8–12 participants</li>
                            <li className="flex items-center gap-2"><span className="text-brand-primary">✓</span> Professionally organized</li>
                            <li className="flex items-center gap-2 sm:col-span-2"><span className="text-brand-primary">✓</span> Facilitated introductions & engagement</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* SLIDER NAVIGATION BUTTONS */}
          <div className="flex justify-between items-center mt-8 px-1 sm:px-2 w-full">
            <button 
              onClick={prevStep}
              disabled={activeStep === 1}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 font-bold font-sans rounded-full border-4 border-brand-dark transition-all text-sm sm:text-base md:text-lg
                ${activeStep === 1 
                  ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed border-gray-400' 
                  : 'bg-brand-cream text-brand-dark shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:bg-brand-light'
                }`}
            >
              <ChevronLeft size={18} strokeWidth={3} />
              Back
            </button>
            
            {activeStep < totalSteps ? (
              <button 
                onClick={nextStep}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 font-bold font-sans rounded-full border-4 border-brand-dark transition-all text-sm sm:text-base md:text-lg bg-brand-yellow text-brand-dark shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1"
              >
                Next Step
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            ) : (
              <a href="/#waitlist" className="flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 bg-brand-primary text-brand-cream font-black text-sm sm:text-lg font-sans rounded-full border-4 border-brand-dark shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 animate-fade-in whitespace-nowrap">
                Get Started <ArrowRight strokeWidth={3} size={18} />
              </a>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}