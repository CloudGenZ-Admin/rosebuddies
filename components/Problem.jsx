"use client";
import { useScrollReveal } from '../hooks/useScrollReveal'; 
import { ArrowDown } from 'lucide-react';

export default function Problem() {
  const [ref, isVisible] = useScrollReveal(0.6);

  const scrollToNext = (e) => {
    e.preventDefault();
    // Pointing to the No Algorithm section next
    const nextSection = document.getElementById('no-algorithm');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-cream rounded-[48px] mx-4 shadow-sm relative z-20 overflow-hidden border-2 border-brand-lemon-dark/50">
      
      {/* Doodle 1 */}
      <div className={`absolute top-10 left-10 md:left-32 w-24 h-24 text-brand-accent transition-all duration-1000 delay-300 pointer-events-none ${isVisible ? 'opacity-40 animate-float' : 'opacity-0 translate-y-10'}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 50 C20 30, 45 30, 45 50 C45 65, 30 70, 20 80 C25 70, 20 65, 20 50 Z" />
          <path d="M50 40 C50 20, 80 20, 80 40 C80 55, 65 60, 50 70 C55 60, 50 55, 50 40 Z" />
          <circle cx="33" cy="45" r="2" fill="currentColor" />
          <circle cx="65" cy="35" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Doodle 2 */}
      <div className={`absolute bottom-20 right-10 md:right-32 w-32 h-32 text-brand-secondary transition-all duration-1000 delay-700 pointer-events-none ${isVisible ? 'opacity-40 animate-float' : 'opacity-0 -translate-y-10'}`}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 30 Q10 20 20 10 Q30 20 20 30" transform="scale(1.5) translate(0, 10)" />
          <path d="M20 30 Q10 20 20 10 Q30 20 20 30" transform="scale(2) translate(25, 5)" />
          <path d="M40 50 Q 55 60 70 45" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        <h2 className="text-3xl md:text-5xl font-serif text-brand-text mb-10 leading-snug">
          Friendship shouldn't feel like <br className="hidden md:block"/>
          <span className="relative inline-block">
            breaking into someone else's circle.
            {isVisible && (
              <svg className="absolute -bottom-3 -left-2 w-[110%] h-4 -z-10 text-brand-accent" viewBox="0 0 200 20" fill="none">
                <path d="M5 10 Q 50 20 100 5 T 195 15" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="draw-path" />
              </svg>
            )}
          </span>
        </h2>
        
        <div className={`text-xl md:text-2xl font-serif leading-relaxed transition-colors duration-1000 space-y-6 ${isVisible ? 'text-brand-text-primary' : 'text-brand-text/20'}`}>
          <p>
            As people who were new to the city, we found ourselves rebuilding our social circles from scratch. We attended community events. We joined groups. We introduced ourselves.
          </p>
          <p>
            People were kind, but we still went home feeling like visitors in someone else's story. Most friendship circles were already formed.
          </p>
          <p className={`font-bold transition-colors duration-1000 delay-300 ${isVisible ? 'text-brand-text' : 'text-brand-text/20'}`}>
            The challenge wasn't meeting people. The challenge was finding a place where we truly belonged.
          </p>
        </div>

        <div className={`mt-16 transition-opacity duration-1000 delay-500 flex flex-col items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xl font-bold text-brand-text-accent mb-6">That's why we created Rosebuddies.</p>
          
          <button 
            onClick={scrollToNext}
            className="group flex flex-col items-center justify-center cursor-pointer focus:outline-none"
            aria-label="Scroll to next section"
          >
            <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px] shadow-brand-lemon-dark group-hover:shadow-[6px_6px_0px] group-hover:shadow-brand-accent group-hover:-translate-y-1 transition-all duration-300">
              <ArrowDown className="text-brand-cream group-hover:animate-bounce" size={32} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}