"use client";
import { useState, useRef, useEffect } from 'react';
import { Shield, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CommunityStandardsPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [sliderHeight, setSliderHeight] = useState('auto');
  const slideRefs = useRef([]);
  const totalSteps = 5;

  // Dynamic Height calculation
  useEffect(() => {
    const updateHeight = () => {
      if (slideRefs.current[activeStep - 1]) {
        setSliderHeight(slideRefs.current[activeStep - 1].offsetHeight);
      }
    };

    updateHeight();
    
    // Recalculate on window resize
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [activeStep]);

  const nextStep = () => setActiveStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));

  const tabNames = ["Safety", "Respect", "Community", "Support", "Accountability"];

  return (
    <main className="bg-brand-light min-h-screen overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="pt-24 md:pt-32"></div>

      {/* --- INTRO: Compact & Responsive --- */}
      <section className="py-8 relative z-30">
        <div className="max-w-5xl mx-auto px-5 md:px-12 relative">
          <div className="absolute -top-10 -right-4 md:-right-10 opacity-10 text-brand-primary pointer-events-none z-0">
            <Shield size={150} fill="currentColor" stroke="none" className="w-24 h-24 md:w-40 md:h-40" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark mb-4 relative inline-block">
              Community Standards
              <svg className="absolute -bottom-2 -left-2 w-[110%] h-3 md:h-4 -z-10 text-brand-yellow" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-serif text-brand-primary mb-6 mt-6 leading-tight">
              Belonging, Respect & Safety
            </h2>
            
            <div className="text-base sm:text-lg md:text-xl font-medium font-sans text-brand-dark/90 space-y-4 max-w-4xl">
              <p>At Rosebuddies, we believe meaningful friendships can only grow in environments where people feel safe, respected, valued, and included.</p>
              
              <p className="font-bold text-brand-dark text-xl sm:text-2xl pt-2">Our goal is not simply to help people meet.</p>
              
              <div className="font-bold text-brand-dark text-lg sm:text-xl p-4 md:p-6 bg-brand-yellow border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] rounded-xl transform -rotate-1 mt-4 inline-block w-full">
                Our goal is to create a community where people can build genuine connections and experience a true sense of belonging. By joining Rosebuddies, every member agrees to help create that environment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC SLIDER SECTION --- */}
      <section className="py-12 pb-24 bg-brand-cream border-t-4 border-dashed border-brand-dark z-20 relative flex-grow">
        <div className="max-w-6xl mx-auto px-5 md:px-12 w-full">
            
          {/* TABS - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-6">
            {tabNames.map((name, index) => {
              const num = index + 1;
              return (
                <button 
                  key={num}
                  onClick={() => setActiveStep(num)}
                  className={`py-2 sm:py-3 px-2 text-sm sm:text-base font-black font-serif border-4 border-brand-dark transition-all rounded-xl leading-none flex items-center justify-center text-center
                    ${activeStep === num 
                      ? 'bg-brand-primary text-brand-cream shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] translate-y-0' 
                      : 'bg-brand-light text-brand-dark shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:bg-brand-yellow opacity-70 hover:opacity-100'}
                  `}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC HEIGHT SLIDER CONTAINER */}
          <div className="bg-brand-dark rounded-[24px] shadow-[6px_6px_0px_#2A2A2A] md:shadow-[8px_8px_0px_#2A2A2A] border-4 border-brand-dark relative z-10 w-full overflow-hidden">
            <div 
              className="rounded-[20px] bg-brand-light relative w-full overflow-hidden transition-[height] duration-500 ease-in-out"
              style={{ height: sliderHeight === 'auto' ? 'auto' : `${sliderHeight}px` }}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out items-start w-full"
                style={{ transform: `translateX(-${(activeStep - 1) * 100}%)` }}
              >
                
                {/* --- SLIDE 1: Safe Spaces --- */}
                <div ref={(el) => (slideRefs.current[0] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-light flex flex-col gap-6">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-4">Safe Spaces, Real-Life Connections</h3>
                    <p className="text-base sm:text-lg md:text-xl font-medium text-brand-dark/90">
                      Rosebuddies experiences take place in public venues, organized group settings, or approved community spaces designed to encourage comfortable and meaningful interactions.
                    </p>
                  </div>
                  
                  <div className="bg-brand-cream p-5 sm:p-8 rounded-2xl border-4 border-brand-dark transform md:rotate-1 shadow-[4px_4px_0px_#E1AD01] w-fit">
                    <p className="font-black text-brand-dark text-lg sm:text-xl md:text-2xl leading-relaxed">
                      For everyone's safety, we encourage members to get to know one another through Rosebuddies experiences before arranging private meetups independently.
                    </p>
                  </div>
                </div>

                {/* --- SLIDE 2: Zero Tolerance --- */}
                <div ref={(el) => (slideRefs.current[1] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-pink border-l-4 border-brand-dark flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-dark mb-2">Respect Is Non-Negotiable</h3>
                    <p className="text-base sm:text-lg font-bold text-brand-dark/90">Every member deserves to be treated with dignity and respect.</p>
                  </div>
                  
                  <div className="bg-brand-light p-5 sm:p-6 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] md:-rotate-1 max-w-4xl">
                    <h4 className="font-black text-brand-primary uppercase tracking-wide text-lg sm:text-xl mb-4">We have zero tolerance for:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-bold text-sm sm:text-base text-brand-dark/90">
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Harassment or intimidation</li>
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Bullying or discrimination</li>
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Hate speech</li>
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Threatening or aggressive behaviour</li>
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Unwanted advances</li>
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Repeated boundary violations</li>
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Dishonesty or impersonation</li>
                      <li className="flex items-start gap-2"><span className="text-brand-primary font-black text-lg leading-none mt-0.5">✖</span> Creating an unsafe environment</li>
                    </ul>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg font-bold bg-brand-cream p-4 rounded-xl border-4 border-brand-dark text-brand-dark text-center md:rotate-1 w-fit mt-2">
                    Members who violate these standards may be suspended or permanently removed from the Rosebuddies community.
                  </p>
                </div>

                {/* --- SLIDE 3: Cliques & Privacy --- */}
                <div ref={(el) => (slideRefs.current[2] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-yellow border-l-4 border-brand-dark flex flex-col gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Community Over Cliques */}
                    <div className="bg-brand-light rounded-[24px] p-5 sm:p-6 border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] relative flex flex-col gap-4 md:-rotate-1 h-full">
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
                    <div className="bg-brand-cream rounded-[24px] p-5 sm:p-6 border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] relative flex flex-col gap-4 md:rotate-1 h-full">
                      <div>
                        <h4 className="text-xl sm:text-2xl font-serif font-black text-brand-dark mb-2">Privacy & Boundaries</h4>
                        <p className="text-base sm:text-lg font-black text-brand-primary mb-3">Your privacy matters.</p>
                        <p className="text-sm sm:text-base font-medium font-sans mb-3 text-brand-dark/90">Members control what personal information they choose to share.</p>
                        <p className="text-sm sm:text-base font-medium font-sans text-brand-dark/90">We encourage everyone to take their time getting to know others and to share contact information only when they feel comfortable doing so.</p>
                      </div>
                      <p className="text-sm sm:text-base font-bold bg-brand-pink-light p-3 rounded-xl border-2 border-brand-dark mt-auto">
                        Rosebuddies does not sell personal information to third parties.
                      </p>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 4: Speak Up & Shared Responsibility --- */}
                <div ref={(el) => (slideRefs.current[3] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-primary text-brand-cream border-l-4 border-brand-dark flex flex-col gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
                    
                    <div className="flex flex-col gap-5 h-full">
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-yellow mb-4">Speak Up, We Will Listen</h3>
                        <p className="text-lg sm:text-xl font-bold font-sans mb-3">If something doesn't feel right, we want to know.</p>
                        <p className="text-sm sm:text-base md:text-lg font-medium font-sans text-brand-cream/90">
                          Members can confidentially report concerns, inappropriate behaviour, safety issues, or violations of our community standards.
                        </p>
                      </div>
                      <div className="bg-brand-dark p-5 rounded-xl border-4 border-brand-dark mt-auto">
                        <p className="text-sm sm:text-base font-bold text-brand-yellow">All reports are reviewed carefully and handled with discretion, fairness, and respect.</p>
                      </div>
                    </div>

                    <div className="bg-brand-cream text-brand-dark p-5 sm:p-8 rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#2A2A2A] flex flex-col gap-5 md:rotate-1 h-full">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-brand-dark mb-4">Shared Responsibility</h3>
                        <p className="text-sm sm:text-base font-medium mb-2">Creating a welcoming community is a shared responsibility. We ask members to:</p>
                      </div>
                      <ul className="space-y-3 font-bold text-sm sm:text-base mt-auto">
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]"><span className="text-brand-primary">✓</span> Treat others with kindness and respect</li>
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]"><span className="text-brand-primary">✓</span> Honour personal boundaries</li>
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]"><span className="text-brand-primary">✓</span> Communicate honestly</li>
                        <li className="flex items-start gap-2 bg-brand-light p-2 rounded-lg border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A]"><span className="text-brand-primary">✓</span> Support an inclusive environment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* --- SLIDE 5: Accountability & Notice --- */}
                <div ref={(el) => (slideRefs.current[4] = el)} className="w-full flex-shrink-0 p-5 sm:p-8 md:p-10 bg-brand-dark text-brand-cream border-l-4 border-brand-dark flex flex-col gap-6">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-cream mb-4 border-b-4 border-brand-cream/20 pb-4">Membership Accountability</h3>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold font-sans mb-4 text-brand-pink">
                      Membership in Rosebuddies is a privilege, not a right.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-medium font-sans text-brand-cream/80">
                      Rosebuddies reserves the right to suspend, restrict, or terminate membership at its sole discretion when a member's conduct is inconsistent with our community values, standards, or the wellbeing of other members.
                    </p>
                  </div>

                  <div className="bg-brand-light text-brand-dark p-5 sm:p-8 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#E1AD01] transform md:-rotate-1 w-fit mt-2">
                    <h4 className="text-lg sm:text-xl font-black font-serif uppercase tracking-wider text-brand-primary mb-3 flex items-center gap-2">
                      <AlertTriangle size={24} strokeWidth={3} /> Important Notice
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base font-medium font-sans mb-3">While Rosebuddies works hard to create safe and welcoming experiences, we cannot guarantee the actions, behaviour, intentions, or compatibility of individual members.</p>
                    <p className="text-xs sm:text-sm md:text-base font-medium font-sans mb-4">Participation in Rosebuddies events, activities, and experiences is voluntary and undertaken at each member's own discretion.</p>
                    
                    <p className="text-xs sm:text-sm md:text-base font-bold bg-brand-yellow inline-block p-3 border-2 border-brand-dark rounded-xl shadow-[2px_2px_0px_#2A2A2A]">
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
            
            <button 
              onClick={nextStep}
              disabled={activeStep === totalSteps}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 font-bold font-sans rounded-full border-4 border-brand-dark transition-all text-sm sm:text-base md:text-lg
                ${activeStep === totalSteps 
                  ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed border-gray-400' 
                  : 'bg-brand-yellow text-brand-dark shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1'
                }`}
            >
              Next Step
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>

        </div>
      </section>

      {/* --- OUTRO: Our Promise (Static below slider) --- */}
      <section className="py-12 pb-24 relative z-10 text-center px-5">
        <div className="inline-block bg-brand-yellow px-6 sm:px-8 py-3 sm:py-4 border-4 border-brand-dark rounded-full mb-8 shadow-[4px_4px_0px_#2A2A2A] sm:shadow-[6px_6px_0px_#2A2A2A] -rotate-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-brand-dark">Our Promise</h2>
        </div>
        
        <div className="text-xl sm:text-2xl md:text-4xl font-bold font-sans leading-tight space-y-4 sm:space-y-6 text-brand-dark max-w-4xl mx-auto">
          <p>We believe everyone deserves more than a place to show up.</p>
          <p>They deserve a place where they feel <span className="text-brand-primary relative inline-block">respected.<svg className="absolute -bottom-2 -left-2 w-[110%] h-3 sm:h-4 -z-10 text-brand-pink" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /></svg></span></p>
          <p>A place where they feel safe.</p>
          <p>A place where they feel seen.</p>
          <p className="text-2xl sm:text-4xl md:text-5xl font-black text-brand-dark bg-brand-pink border-4 border-brand-dark p-4 sm:p-6 rounded-2xl shadow-[4px_4px_0px_#2A2A2A] sm:shadow-[6px_6px_0px_#2A2A2A] mt-8 inline-block rotate-1">
            And most importantly, a place where they feel they <span className="text-brand-cream bg-brand-dark px-2 rounded-lg leading-none py-1">belong.</span>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}