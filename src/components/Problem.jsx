import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowDown } from 'lucide-react';

export default function Problem() {
  const [ref, isVisible] = useScrollReveal(0.6);

  // Smooth scroll handler for the arrow button
  const scrollToNext = (e) => {
    e.preventDefault();
    const nextSection = document.getElementById('how-it-works');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FFE9EE] rounded-[48px] mx-4 shadow-sm relative z-20 overflow-hidden border-2 border-[#FFB3C6]/50">
      
      {/* --- FRIENDSHIP ANIMATION 1: Floating Conversation Bubbles (Top Left) --- */}
      <div className={`absolute top-10 left-10 md:left-32 w-24 h-24 text-[#FD5E53] transition-all duration-1000 delay-300 pointer-events-none ${isVisible ? 'opacity-40 animate-float' : 'opacity-0 translate-y-10'}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Bubble 1 */}
          <path d="M20 50 C20 30, 45 30, 45 50 C45 65, 30 70, 20 80 C25 70, 20 65, 20 50 Z" />
          {/* Bubble 2 */}
          <path d="M50 40 C50 20, 80 20, 80 40 C80 55, 65 60, 50 70 C55 60, 50 55, 50 40 Z" />
          {/* Sparkles inside */}
          <circle cx="33" cy="45" r="2" fill="currentColor" />
          <circle cx="65" cy="35" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* --- FRIENDSHIP ANIMATION 2: Connecting Hearts (Bottom Right) --- */}
      <div className={`absolute bottom-20 right-10 md:right-32 w-32 h-32 text-[#E2725B] transition-all duration-1000 delay-700 pointer-events-none ${isVisible ? 'opacity-40 animate-float' : 'opacity-0 -translate-y-10'}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Heart 1 */}
          <path d="M20 30 Q10 20 20 10 Q30 20 20 30" transform="scale(1.5) translate(0, 10)" />
          {/* Heart 2 */}
          <path d="M20 30 Q10 20 20 10 Q30 20 20 30" transform="scale(2) translate(25, 5)" />
          {/* Connecting dashed line */}
          <path d="M40 50 Q 55 60 70 45" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        <h2 className="text-4xl md:text-5xl font-serif text-[#2A2A2A] mb-10">
          Making friends as an adult is <br className="hidden md:block"/>
          <span className="relative inline-block">
            weirdly hard.
            {/* Hand-drawn underline that animates when scrolled into view */}
            {isVisible && (
              <svg className="absolute -bottom-3 -left-2 w-[110%] h-4 -z-10 text-[#E1AD01]" viewBox="0 0 200 20" fill="none">
                <path d="M5 10 Q 50 20 100 5 T 195 15" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="draw-path" />
              </svg>
            )}
          </span>
        </h2>
        
        {/* Text Reveal Logic: Fades from light pink/gray to bold Terracotta */}
        <p className={`text-2xl md:text-4xl font-serif leading-relaxed transition-colors duration-1000 ${isVisible ? 'text-[#E2725B]' : 'text-[#2A2A2A]/20'}`}>
          You work remotely. You moved to a new city. Your social circles have changed. 
          Existing apps feel random, awkward, or unsafe. You want to meet people outside 
          your bubble, but you're tired of shallow small talk.
        </p>

        {/* Clickable Action Area */}
        <div className={`mt-16 transition-opacity duration-1000 delay-500 flex flex-col items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xl font-bold text-[#FD5E53] mb-6">That’s why we created a better way.</p>
          
          {/* Functional Arrow Button */}
          <button 
            onClick={scrollToNext}
            className="group flex flex-col items-center justify-center cursor-pointer focus:outline-none"
            aria-label="Scroll to next section"
          >
            <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#FFB3C6] group-hover:shadow-[6px_6px_0px_#E1AD01] group-hover:-translate-y-1 transition-all duration-300">
              <ArrowDown className="text-[#FFE9EE] group-hover:animate-bounce" size={32} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}