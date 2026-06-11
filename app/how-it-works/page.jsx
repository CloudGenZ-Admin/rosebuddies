"use client";
import { useState, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function HowItWorksAndStandardsPage() {
  // --- HOW IT WORKS STATE ---
  const [hiwActiveStep, setHiwActiveStep] = useState(1);
  const [step3Option, setStep3Option] = useState('A'); // Sub-menu state for Step 3
  const hiwTotalSteps = 4; // Updated from 3 to 4

  const nextHiwStep = () => setHiwActiveStep((prev) => (prev < hiwTotalSteps ? prev + 1 : prev));
  const prevHiwStep = () => setHiwActiveStep((prev) => (prev > 1 ? prev - 1 : prev));

  // --- COMMUNITY STANDARDS STATE ---
  const [csActiveStep, setCsActiveStep] = useState(1);
  const [csSliderHeight, setCsSliderHeight] = useState('auto');
  const slideRefs = useRef([]);
  const csTotalSteps = 5;
  const csTabNames = ["Safety", "Respect", "Community", "Support", "Accountability"];

  // Dynamic Height calculation for Community Standards Slider
  useEffect(() => {
    const updateHeight = () => {
      if (slideRefs.current[csActiveStep - 1]) {
        setCsSliderHeight(slideRefs.current[csActiveStep - 1].offsetHeight);
      }
    };

    updateHeight();
    
    // Recalculate on window resize
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [csActiveStep]);

  const nextCsStep = () => setCsActiveStep((prev) => (prev < csTotalSteps ? prev + 1 : prev));
  const prevCsStep = () => setCsActiveStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <main className="bg-brand-light min-h-screen overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="pt-24 md:pt-32"></div>

      {/* =========================================
          PART 1: HOW IT WORKS
      ========================================= */}

      {/* --- HOW IT WORKS INTRO --- */}
      <section className="py-8 relative z-30">
        <div className="max-w-5xl mx-auto px-5 md:px-12 relative">
          <div className="absolute -top-10 -right-4 md:-right-10 opacity-10 text-brand-primary pointer-events-none z-0">
            <Heart size={150} fill="currentColor" stroke="none" className="w-24 h-24 md:w-40 md:h-40" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark mb-4 relative inline-block">
              How Rosebuddies Works
              <svg className="absolute -bottom-2 -left-2 w-[110%] h-3 md:h-4 -z-10 text-brand-secondary" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-serif text-brand-lime-dark mb-6 mt-6 leading-tight">
              Friendship Was Never Meant To Be Decided by An Algorithm
            </h2>
            
            <div className="text-base sm:text-lg md:text-xl font-medium font-sans text-brand-dark/90 space-y-4">
              <p>Most friendship platforms ask you to create a profile, answer questions, and trust an algorithm to decide who you should meet. <strong className="text-brand-dark">We believe there is a better way.</strong></p>
              
              <p>At Rosebuddies, we create opportunities for people to meet naturally, build genuine connections, and develop meaningful friendships through real-life experiences, shared interests, positive energy, and authentic conversations.</p>
              
              {/* Responsive Badges */}
              <div className="flex flex-wrap gap-2 md:gap-4 py-2">
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-lime-dark font-bold text-sm sm:text-base line-through decoration-2">No matching systems</span>
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-lime-dark font-bold text-sm sm:text-base line-through decoration-2">No compatibility scores</span>
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-lime-dark font-bold text-sm sm:text-base line-through decoration-2">No swiping</span>
                <span className="bg-brand-cream border-2 border-brand-dark px-3 py-1 rounded-full text-brand-lime-dark font-bold text-sm sm:text-base line-through decoration-2">No endless scrolling</span>
              </div>
              
              <p>We believe no algorithm can predict chemistry, connection, or friendship. Some of life's best relationships begin unexpectedly, with a simple conversation, a shared laugh, or a chance encounter. We don't want to rob you of the experience of meeting someone organically.</p>
              
              <p>Our Friendship Clubs and Curated Experiences are built around shared interests and real-world interaction. We create the space, facilitate the experience, and support the journey.</p>
              
              <div className="font-bold text-brand-dark text-lg sm:text-xl p-4 md:p-6 bg-brand-secondary border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] rounded-xl transform -rotate-1 mt-4 inline-block w-full sm:w-auto">
                The rest is up to you. Because friendship was never meant to be an algorithm. It was always meant to happen naturally.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SLIDER --- */}
      <section className="py-12 pb-24 bg-brand-cream border-t-4 border-dashed border-brand-dark z-20 relative flex-grow">
        <div className="max-w-6xl mx-auto px-5 md:px-12 w-full">
            
          {/* MAIN STEP TABS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6">
            {[1, 2, 3, 4].map((num) => (
              <button 
                key={`hiw-tab-${num}`}
                onClick={() => setHiwActiveStep(num)}
                className={`py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-lg md:text-xl font-black font-serif border-4 border-brand-dark transition-all rounded-xl leading-none flex items-center justify-center
                  ${hiwActiveStep === num 
                    ? 'bg-brand-primary text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] translate-y-0' 
                    : 'bg-brand-light text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:bg-brand-secondary opacity-70 hover:opacity-100'}
                `}
              >
                Step {num}
              </button>
            ))}
          </div>

          {/* SLIDER CONTAINER */}
          <div className="bg-brand-dark rounded-[24px] shadow-[6px_6px_0px_#9FD62A] md:shadow-[8px_8px_0px_#9FD62A] border-4 border-brand-dark relative z-10 w-full overflow-hidden">
            <div className="rounded-[20px] bg-brand-light relative w-full overflow-hidden h-full">
              <div 
                className="flex transition-transform duration-500 ease-in-out items-stretch h-full w-full"
                style={{ transform: `translateX(-${(hiwActiveStep - 1) * 100}%)` }}
              >
                
                {/* --- SLIDE 1 --- */}
                <div className="w-full h-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-light flex flex-col">
                  {/* Top Text Content */}
                  <div className="max-w-4xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-2">Start With a Meet & Greet</h3>
                    <p className="text-lg sm:text-xl font-black text-brand-lime-dark mb-6">$25 One-Time Experience</p>
                    
                    <div className="text-base sm:text-lg font-medium text-brand-dark/90 space-y-4 max-w-3xl">
                      <p>Every Rosebuddies journey begins with a Meet & Greet. Our Meet & Greets are welcoming social gatherings designed to help people connect naturally in a relaxed, pressure-free environment.</p>
                      <p>You'll meet new people, join guided conversations, and discover shared interests without awkward networking or forced introductions.</p>
                      <p className="font-bold text-brand-dark text-lg sm:text-xl pt-2">Most people attend alone. That's exactly why we're here.</p>
                    </div>
                  </div>
                  
                  {/* Bottom "What's Included" Box */}
                  <div className="mt-auto pt-8 md:pt-12">
                    <div className="bg-brand-accent/20 p-5 sm:p-6 rounded-xl border-4 border-brand-dark md:rotate-1">
                      <h4 className="font-black text-brand-dark mb-4 text-lg sm:text-xl font-serif uppercase tracking-wide">What's Included:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-bold text-sm sm:text-base text-brand-dark/90">
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                          <span className="text-brand-lime-dark">✓</span> Facilitated introductions
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                          <span className="text-brand-lime-dark">✓</span> Icebreakers & prompts
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                          <span className="text-brand-lime-dark">✓</span> Experienced hosts
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                          <span className="text-brand-lime-dark">✓</span> Welcoming environment
                        </div>
                        <div className="flex items-center gap-2 bg-brand-light p-3 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415] sm:col-span-2 lg:col-span-1">
                          <span className="text-brand-lime-dark">✓</span> Meet potential friends
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 2 --- */}
                <div className="w-full h-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-accent border-l-4 border-brand-dark flex flex-col">
                  {/* Top Text Content */}
                  <div className="max-w-4xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-6">Find Your People</h3>
                    
                    <div className="text-base sm:text-lg font-medium text-brand-dark/90 space-y-4 max-w-3xl">
                      <p>Meaningful friendships rarely happen in a single conversation.</p>
                      <p>That's why Rosebuddies focuses on helping people discover connections through shared experiences and repeated interactions.</p>
                      <p className="font-bold text-brand-dark text-lg sm:text-xl pt-2">At your Meet & Greet, you'll naturally gravitate towards people you enjoy spending time with.</p>
                    </div>
                  </div>
                  
                  {/* Bottom "No Compatibility" Box */}
                  <div className="mt-auto pt-8 md:pt-12">
                    <div className="bg-brand-cream p-6 sm:p-8 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] md:-rotate-1 flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
                      <div className="text-left flex-1">
                        <p className="font-black text-2xl sm:text-3xl lg:text-4xl text-brand-lime-dark uppercase tracking-wide leading-tight text-center lg:text-left">
                          No compatibility scores.<br/>
                          No personality tests.
                        </p>
                      </div>
                      <div className="bg-brand-secondary p-4 sm:p-6 rounded-xl border-4 border-brand-dark md:rotate-2 shadow-[4px_4px_0px_#1A5415] flex-shrink-0 w-full lg:w-auto text-center">
                        <span className="font-black text-xl sm:text-2xl text-brand-dark">Just authentic<br/>human connection.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 3 (WITH SUB-MENUS) --- */}
                <div className="w-full h-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-secondary border-l-4 border-brand-dark flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-2">Choose Your Path</h3>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-brand-dark/80">After your Meet & Greet, continue your journey in one of two ways.</p>
                  </div>

                  {/* SUB-MENU TOGGLE */}
                  <div className="flex w-full bg-brand-light border-4 border-brand-dark rounded-xl mb-6 overflow-hidden shadow-[4px_4px_0px_#1A5415]">
                    <button 
                      onClick={() => setStep3Option('A')}
                      className={`flex-1 py-3 px-2 text-center font-black font-serif text-sm sm:text-base border-r-4 border-brand-dark transition-colors
                        ${step3Option === 'A' ? 'bg-brand-primary text-brand-dark' : 'text-brand-dark hover:bg-brand-cream'}
                      `}
                    >
                      Option A <span className="hidden sm:inline">: Friendship Club</span>
                    </button>
                    <button 
                      onClick={() => setStep3Option('B')}
                      className={`flex-1 py-3 px-2 text-center font-black font-serif text-sm sm:text-base transition-colors
                        ${step3Option === 'B' ? 'bg-brand-accent text-brand-dark' : 'text-brand-dark hover:bg-brand-cream'}
                      `}
                    >
                      Option B <span className="hidden sm:inline">: Curated Experience</span>
                    </button>
                  </div>

                  {/* DYNAMIC CONTENT AREA */}
                  <div className="flex-grow flex flex-col h-full animate-fade-in">
                    {step3Option === 'A' ? (
                      /* Option A Content */
                      <div className="bg-brand-cream p-5 sm:p-6 md:p-8 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] flex flex-col flex-grow relative">
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-brand-dark">Join a Friendship Club</h4>
                        <p className="text-base sm:text-lg font-black text-brand-lime-dark mb-4">Starting at $40/month</p>
                        
                        {/* 2-col on mobile, 4-col on tablet/desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#1A5415]">
                            <strong className="text-brand-lime-dark block text-sm sm:text-base mb-1">🍽️ Dinner Club</strong>
                             Connect over great food and even better conversations.
                          </div>
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#1A5415]">
                            <strong className="text-brand-lime-dark block text-sm sm:text-base mb-1">🚶 Walk & Talk</strong>
                            Fresh air & movement,and genuine conversations.
                          </div>
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#1A5415]">
                            <strong className="text-brand-lime-dark block text-sm sm:text-base mb-1">☕ Coffee Meetup</strong>
                            Casual meetups designed to turn familiar faces into lasting friendships.
                          </div>
                          <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark text-xs sm:text-sm shadow-[2px_2px_0px_#1A5415]">
                            <strong className="text-brand-lime-dark block text-sm sm:text-base mb-1">🗣️ Golden Years</strong>
                            Retired, semi-retired or an empty nester Golden Years Club offers opportunities to enjoy life's next chapter together.
                          </div>
                        </div>

                        {/* Memberships Layout */}
                        <div className="bg-brand-accent/20 p-4 rounded-xl border-2 border-brand-dark mt-auto border-dashed">
                          <p className="font-bold text-sm sm:text-base mb-3 text-center uppercase tracking-wide font-serif">Membership Options</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs sm:text-sm font-bold">
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center flex justify-center items-center">1 Month: $40</div>
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center text-brand-lime-dark flex justify-center items-center">3-Month: Save 10%</div>
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center text-brand-lime-dark flex justify-center items-center">6-Month: Save 15%</div>
                            <div className="bg-brand-cream px-2 py-2 rounded border-2 border-brand-dark text-center text-brand-lime-dark flex justify-center items-center">12-Month: Save 20%</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Option B Content */
                      <div className="bg-brand-dark text-brand-cream p-5 sm:p-6 md:p-8 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] flex flex-col flex-grow relative">
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-brand-cream">Join a Curated Experience</h4>
                        <p className="text-base sm:text-lg font-black text-brand-primary mb-4">$250 Experience Pass</p>
                        
                        <p className="text-sm sm:text-base md:text-lg font-medium mb-6 text-brand-cream/90 flex-grow max-w-2xl">
                          Prefer smaller groups and a more intimate experience? Our Curated Experiences are designed for people who want to build deeper connections within a small group setting.
                        </p>
                        
                        <div className="bg-brand-cream text-brand-dark p-5 rounded-xl border-4 border-brand-dark mt-auto md:rotate-1 shadow-[4px_4px_0px_#F8B800] w-full md:w-fit">
                          <h5 className="font-black text-sm sm:text-base mb-3 font-serif uppercase">Each Experience Includes:</h5>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-bold text-sm sm:text-base text-brand-dark/90">
                            <li className="flex items-center gap-2"><span className="text-brand-lime-dark">✓</span> 5 weeks</li>
                            <li className="flex items-center gap-2"><span className="text-brand-lime-dark">✓</span> 1 experience per week</li>
                            <li className="flex items-center gap-2"><span className="text-brand-lime-dark">✓</span> 8–12 participants</li>
                            <li className="flex items-center gap-2"><span className="text-brand-lime-dark">✓</span> Professionally organized</li>
                            <li className="flex items-center gap-2 sm:col-span-2"><span className="text-brand-lime-dark">✓</span> Facilitated introductions & engagement</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- SLIDE 4: BUILD YOUR CIRCLE --- */}
                <div className="w-full h-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-primary border-l-4 border-brand-dark flex flex-col">
                  {/* Top Text Content */}
                  <div className="max-w-4xl flex-grow">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-4">Build Your Circle</h3>
                    
                    <div className="text-base sm:text-lg md:text-xl font-medium text-brand-dark/90 space-y-3 max-w-3xl">
                      <p className="font-black text-xl sm:text-2xl text-brand-dark mb-4">This is where the magic happens.</p>
                      <p>Over time, familiar faces become trusted friends.</p>
                      <p>Conversations become connections.</p>
                      <p>Connections become community.</p>
                      <p className="pt-2">Whether you choose a Friendship Club, a Curated Experience, or both, Rosebuddies is designed to help you move beyond introductions and towards something many adults are searching for:</p>
                      
                      <div className="font-bold text-brand-dark text-lg sm:text-xl p-3 bg-brand-light border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] rounded-xl transform rotate-1 mt-4 inline-block">
                        A genuine sense of belonging.
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Call to Action Box */}
                  <div className="mt-8 md:mt-12">
                    <div className="bg-brand-dark p-6 sm:p-8 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] md:-rotate-1 flex flex-col items-center justify-center gap-4 w-full text-center">
                      <p className="font-black text-2xl sm:text-3xl lg:text-4xl text-brand-lime-dark uppercase tracking-wide leading-tight">
                        Less Scrolling. More Living.
                      </p>
                      <p className="text-brand-cream text-sm sm:text-base md:text-lg max-w-2xl font-medium">
                        Rosebuddies isn't another app designed to keep you online. It's a community designed to bring you back to real life.
                      </p>
                      <span className="font-black text-xl sm:text-2xl text-brand-primary bg-brand-dark border-2 border-brand-primary px-6 py-2 rounded-full mt-2 shadow-[4px_4px_0px_#9FD62A]">
                        Log off. Show up.
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* SLIDER NAVIGATION BUTTONS */}
          <div className="flex justify-between items-center mt-8 px-1 sm:px-2 w-full">
            <button 
              onClick={prevHiwStep}
              disabled={hiwActiveStep === 1}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 font-bold font-sans rounded-full border-4 border-brand-dark transition-all text-sm sm:text-base md:text-lg
                ${hiwActiveStep === 1 
                  ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed border-gray-400' 
                  : 'bg-brand-cream text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:bg-brand-light'
                }`}
            >
              <ChevronLeft size={18} strokeWidth={3} />
              Back
            </button>
            
            {hiwActiveStep < hiwTotalSteps ? (
              <button 
                onClick={nextHiwStep}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 font-bold font-sans rounded-full border-4 border-brand-dark transition-all text-sm sm:text-base md:text-lg bg-brand-secondary text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1"
              >
                Next Step
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            ) : (
              <a href="/#waitlist" className="flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 bg-brand-primary text-brand-dark font-black text-sm sm:text-lg font-sans rounded-full border-4 border-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 animate-fade-in whitespace-nowrap">
                Get Started <ArrowRight strokeWidth={3} size={18} />
              </a>
            )}
          </div>

        </div>
      </section>

      {/* =========================================
          PART 2: COMMUNITY STANDARDS
      ========================================= */}

      {/* --- SEPARATOR / TRANSITION --- */}
      <div className="w-full border-t-8 border-brand-dark relative z-30"></div>

      {/* --- COMMUNITY STANDARDS INTRO --- */}
      <section className="py-12 md:py-16 bg-brand-light relative z-30">
        <div className="max-w-5xl mx-auto px-5 md:px-12 relative">
          <div className="absolute -top-6 -right-4 md:-top-4 md:-right-10 opacity-10 text-brand-primary pointer-events-none z-0">
            <Shield size={150} fill="currentColor" stroke="none" className="w-24 h-24 md:w-40 md:h-40" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark mb-4 relative inline-block">
              Community Standards
              <svg className="absolute -bottom-2 -left-2 w-[110%] h-3 md:h-4 -z-10 text-brand-secondary" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-serif text-brand-lime-dark mb-6 mt-6 leading-tight">
              Belonging, Respect & Safety
            </h2>
            
            <div className="text-base sm:text-lg md:text-xl font-medium font-sans text-brand-dark/90 space-y-4 max-w-4xl">
              <p>At Rosebuddies, we believe meaningful friendships can only grow in environments where people feel safe, respected, valued, and included.</p>
              
              <p className="font-bold text-brand-dark text-xl sm:text-2xl pt-2">Our goal is not simply to help people meet.</p>
              
              <div className="font-bold text-brand-dark text-lg sm:text-xl p-4 md:p-6 bg-brand-secondary border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] rounded-xl transform -rotate-1 mt-4 inline-block w-full">
                Our goal is to create a community where people can build genuine connections and experience a true sense of belonging. By joining Rosebuddies, every member agrees to help create that environment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMMUNITY STANDARDS SLIDER --- */}
      <section className="py-12 pb-24 bg-brand-cream border-t-4 border-dashed border-brand-dark z-20 relative flex-grow">
        <div className="max-w-6xl mx-auto px-5 md:px-12 w-full">
            
          {/* TABS - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-6">
            {csTabNames.map((name, index) => {
              const num = index + 1;
              return (
                <button 
                  key={`cs-tab-${num}`}
                  onClick={() => setCsActiveStep(num)}
                  className={`py-2 sm:py-3 px-2 text-sm sm:text-base font-black font-serif border-4 border-brand-dark transition-all rounded-xl leading-none flex items-center justify-center text-center
                    ${csActiveStep === num 
                      ? 'bg-brand-primary text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] translate-y-0' 
                      : 'bg-brand-light text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:bg-brand-secondary opacity-70 hover:opacity-100'}
                  `}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC HEIGHT SLIDER CONTAINER */}
          <div className="bg-brand-dark rounded-[24px] shadow-[6px_6px_0px_#1A5415] md:shadow-[8px_8px_0px_#1A5415] border-4 border-brand-dark relative z-10 w-full overflow-hidden">
            <div 
              className="rounded-[20px] bg-brand-light relative w-full overflow-hidden transition-[height] duration-500 ease-in-out"
              style={{ height: csSliderHeight === 'auto' ? 'auto' : `${csSliderHeight}px` }}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out items-start w-full"
                style={{ transform: `translateX(-${(csActiveStep - 1) * 100}%)` }}
              >
                
                {/* --- SLIDE 1: Safe Spaces --- */}
                <div ref={(el) => (slideRefs.current[0] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-light flex flex-col gap-6">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-4">Safe Spaces, Real-Life Connections</h3>
                    <p className="text-base sm:text-lg md:text-xl font-medium text-brand-dark/90">
                      Rosebuddies experiences take place in public venues, organized group settings, or approved community spaces designed to encourage comfortable and meaningful interactions.
                    </p>
                  </div>
                  
                  <div className="bg-brand-cream p-5 sm:p-8 rounded-2xl border-4 border-brand-dark transform md:rotate-1 shadow-[4px_4px_0px_#F8B800] w-fit">
                    <p className="font-black text-brand-dark text-lg sm:text-xl md:text-2xl leading-relaxed">
                      For everyone's safety, we encourage members to get to know one another through Rosebuddies experiences before arranging private meetups independently.
                    </p>
                  </div>
                </div>

                {/* --- SLIDE 2: Zero Tolerance --- */}
                <div ref={(el) => (slideRefs.current[1] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-accent border-l-4 border-brand-dark flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-2">Respect Is Non-Negotiable</h3>
                    <p className="text-base sm:text-lg font-bold text-brand-dark/90">Every member deserves to be treated with dignity and respect.</p>
                  </div>
                  
                  <div className="bg-brand-light p-5 sm:p-6 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] md:-rotate-1 max-w-4xl">
                    <h4 className="font-black text-brand-lime-dark uppercase tracking-wide text-lg sm:text-xl mb-4">We have zero tolerance for:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-bold text-sm sm:text-base text-brand-dark/90">
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Harassment or intimidation</li>
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Bullying or discrimination</li>
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Hate speech</li>
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Threatening or aggressive behaviour</li>
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Unwanted advances</li>
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Repeated boundary violations</li>
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Dishonesty or impersonation</li>
                      <li className="flex items-start gap-2"><span className="text-brand-lime-dark font-black text-lg leading-none mt-0.5">✖</span> Creating an unsafe environment</li>
                    </ul>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg font-bold bg-brand-cream p-4 rounded-xl border-4 border-brand-dark text-brand-dark text-center md:rotate-1 w-fit mt-2">
                    Members who violate these standards may be suspended or permanently removed from the Rosebuddies community.
                  </p>
                </div>

                {/* --- SLIDE 3: Cliques & Privacy --- */}
                <div ref={(el) => (slideRefs.current[2] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-secondary border-l-4 border-brand-dark flex flex-col gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Community Over Cliques */}
                    <div className="bg-brand-light rounded-[24px] p-5 sm:p-6 border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] relative flex flex-col gap-4 md:-rotate-1 h-full">
                      <div>
                        <h4 className="text-xl sm:text-2xl font-serif font-black text-brand-dark mb-3">Community Over Cliques</h4>
                        <p className="text-sm sm:text-base font-medium font-sans mb-3 text-brand-dark/90">Rosebuddies was created because many adults know what it feels like to be on the outside looking in.</p>
                        <p className="text-sm sm:text-base font-medium font-sans text-brand-dark/90">We encourage members to create welcoming spaces where new friendships can form naturally. Exclusionary behaviour or intentional isolation may be addressed by our team.</p>
                      </div>
                      <p className="text-sm sm:text-base font-bold bg-brand-cream p-3 rounded-xl border-2 border-brand-dark border-dashed mt-auto">
                        Great communities grow when people make room for new connections and diverse perspectives.
                      </p>
                    </div>

                    {/* Privacy & Boundaries */}
                    <div className="bg-brand-cream rounded-[24px] p-5 sm:p-6 border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] relative flex flex-col gap-4 md:rotate-1 h-full">
                      <div>
                        <h4 className="text-xl sm:text-2xl font-serif font-black text-brand-dark mb-2">Privacy & Boundaries</h4>
                        <p className="text-base sm:text-lg font-black text-brand-lime-dark mb-3">Your privacy matters.</p>
                        <p className="text-sm sm:text-base font-medium font-sans mb-3 text-brand-dark/90">Members control what personal information they choose to share.</p>
                        <p className="text-sm sm:text-base font-medium font-sans text-brand-dark/90">We encourage everyone to take their time getting to know others and to share contact information only when they feel comfortable doing so.</p>
                      </div>
                      <p className="text-sm sm:text-base font-bold bg-brand-accent/20 p-3 rounded-xl border-2 border-brand-dark mt-auto">
                        Rosebuddies does not sell personal information to third parties.
                      </p>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 4: Speak Up & Shared Responsibility --- */}
                <div ref={(el) => (slideRefs.current[3] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-primary text-brand-dark border-l-4 border-brand-dark flex flex-col gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
                    
                    <div className="flex flex-col gap-5 h-full">
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-4">Speak Up, We Will Listen</h3>
                        <p className="text-lg sm:text-xl font-bold font-sans mb-3">If something doesn't feel right, we want to know.</p>
                        <p className="text-sm sm:text-base md:text-lg font-medium font-sans text-brand-dark/90">
                          Members can confidentially report concerns, inappropriate behaviour, safety issues, or violations of our community standards.
                        </p>
                      </div>
                      <div className="bg-brand-dark p-5 rounded-xl border-4 border-brand-dark mt-auto">
                        <p className="text-sm sm:text-base font-bold text-brand-primary">All reports are reviewed carefully and handled with discretion, fairness, and respect.</p>
                      </div>
                    </div>

                    <div className="bg-brand-cream text-brand-dark p-5 sm:p-8 rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] flex flex-col gap-5 md:rotate-1 h-full">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-brand-dark mb-4">Shared Responsibility</h3>
                        <p className="text-sm sm:text-base font-medium mb-2">Creating a welcoming community is a shared responsibility. We ask members to:</p>
                      </div>
                      <ul className="space-y-3 font-bold text-sm sm:text-base mt-auto">
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]"><span className="text-brand-lime-dark">✓</span> Treat others with kindness and respect</li>
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]"><span className="text-brand-lime-dark">✓</span> Honour personal boundaries</li>
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]"><span className="text-brand-lime-dark">✓</span> Communicate honestly</li>
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]"><span className="text-brand-lime-dark">✓</span> Support an inclusive environment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 5: Accountability & Notice --- */}
                <div ref={(el) => (slideRefs.current[4] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-dark text-brand-cream border-l-4 border-brand-dark flex flex-col gap-6">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-cream mb-4 border-b-4 border-brand-cream/20 pb-4">Membership Accountability</h3>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold font-sans mb-4 text-brand-primary">
                      Membership in Rosebuddies is a privilege, not a right.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-medium font-sans text-brand-cream/80">
                      Rosebuddies reserves the right to suspend, restrict, or terminate membership at its sole discretion when a member's conduct is inconsistent with our community values, standards, or the wellbeing of other members.
                    </p>
                  </div>

                  <div className="bg-brand-light text-brand-dark p-5 sm:p-8 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#F8B800] transform md:-rotate-1 w-fit mt-2">
                    <h4 className="text-lg sm:text-xl font-black font-serif uppercase tracking-wider text-brand-lime-dark mb-3 flex items-center gap-2">
                      <AlertTriangle size={24} strokeWidth={3} /> Important Notice
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base font-medium font-sans mb-3">While Rosebuddies works hard to create safe and welcoming experiences, we cannot guarantee the actions, behaviour, intentions, or compatibility of individual members.</p>
                    <p className="text-xs sm:text-sm md:text-base font-medium font-sans mb-4">Participation in Rosebuddies events, activities, and experiences is voluntary and undertaken at each member's own discretion.</p>
                    
                    <p className="text-xs sm:text-sm md:text-base font-bold bg-brand-secondary inline-block p-3 border-2 border-brand-dark rounded-xl shadow-[2px_2px_0px_#1A5415]">
                      Members are encouraged to exercise good judgment when interacting with others and when sharing personal information.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* SLIDER NAVIGATION BUTTONS */}
          <div className="flex justify-between items-center mt-8 px-1 sm:px-2 w-full">
            <button 
              onClick={prevCsStep}
              disabled={csActiveStep === 1}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 font-bold font-sans rounded-full border-4 border-brand-dark transition-all text-sm sm:text-base md:text-lg
                ${csActiveStep === 1 
                  ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed border-gray-400' 
                  : 'bg-brand-cream text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:bg-brand-light'
                }`}
            >
              <ChevronLeft size={18} strokeWidth={3} />
              Back
            </button>
            
            <button 
              onClick={nextCsStep}
              disabled={csActiveStep === csTotalSteps}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 font-bold font-sans rounded-full border-4 border-brand-dark transition-all text-sm sm:text-base md:text-lg
                ${csActiveStep === csTotalSteps 
                  ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed border-gray-400' 
                  : 'bg-brand-secondary text-brand-dark shadow-[2px_2px_0px_#1A5415] sm:shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1'
                }`}
            >
              Next Step
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>

        </div>
      </section>

      {/* --- OUR PROMISE (Static outtro below CS slider) --- */}
      <section className="bg-brand-light py-12 pb-24 relative z-10 text-center px-5">
        <div className="inline-block bg-brand-secondary px-6 sm:px-8 py-3 sm:py-4 border-4 border-brand-dark rounded-full mb-8 shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] -rotate-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-brand-dark">Our Promise</h2>
        </div>
        
        <div className="text-xl sm:text-2xl md:text-4xl font-bold font-sans leading-tight space-y-4 sm:space-y-6 text-brand-dark max-w-4xl mx-auto">
          <p>We believe everyone deserves more than a place to show up.</p>
          <p>They deserve a place where they feel <span className="text-brand-lime-dark relative inline-block">respected.<svg className="absolute -bottom-2 -left-2 w-[110%] h-3 sm:h-4 -z-10 text-brand-accent" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /></svg></span></p>
          <p>A place where they feel safe.</p>
          <p>A place where they feel seen.</p>
          <p className="text-2xl sm:text-4xl md:text-5xl font-black text-brand-dark bg-brand-accent border-4 border-brand-dark p-4 sm:p-6 rounded-2xl shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] mt-8 inline-block rotate-1">
            And most importantly, a place where they feel they <span className="text-brand-cream bg-brand-dark px-2 rounded-lg leading-none py-1">belong.</span>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}