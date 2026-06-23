"use client";
import { Star } from 'lucide-react';

export default function CuratedExperiencesSection() {
  return (
    // Added overflow-x-clip to prevent horizontal scrolling on small mobile devices
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-brand-light relative z-20 border-t-4 border-dashed border-brand-lemon-dark overflow-x-clip">
      <div className="max-w-5xl mx-auto mt-4 sm:mt-0">
        
        {/* Main Card */}
        <div className="bg-brand-cream rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 pt-10 sm:p-10 md:p-14 border-4 border-brand-dark shadow-[6px_6px_0px_var(--color-brand-dark)] md:shadow-[12px_12px_0px_var(--color-brand-dark)] relative transform -rotate-1">
          
          {/* Badge: Made fully responsive for text size, padding, and positioning */}
          <div className="absolute -top-4 sm:-top-4 right-2 sm:-right-4 bg-brand-primary text-brand-dark font-black px-3 sm:px-4 md:px-6 py-1.5 md:py-2 border-2 border-brand-dark rotate-3 sm:rotate-6 shadow-[2px_2px_0px_var(--color-brand-dark)] md:shadow-[4px_4px_0px_var(--color-brand-dark)] text-sm sm:text-base md:text-xl z-10 max-w-[90%] text-center">
            CURATED EXPERIENCES
          </div>
          
          {/* Grid Layout: Stacks on mobile, side-by-side on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mt-2 sm:mt-0">
            
            {/* Left Content Area */}
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">
                Small Groups. Deeper Connections.
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-brand-text-primary font-bold mb-6 font-sans leading-relaxed">
                Some people thrive in smaller settings. Our Curated Experiences bring together 8–12 people for five weeks of shared experiences designed to help friendships develop naturally.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-black text-brand-lime-dark font-sans mt-6 md:mt-8">
                You simply show up.<br/>We'll take care of the rest.
              </p>
            </div>
            
            {/* Inner Card (Examples): Scaled padding and rotation */}
            <div className="bg-brand-light p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border-4 border-brand-dark transform rotate-1 sm:rotate-2">
              <h4 className="text-xl sm:text-2xl font-serif text-brand-text mb-4 md:mb-6 border-b-2 border-brand-lemon-dark/40 pb-3 md:pb-4">
                Examples include:
              </h4>
              
              <ul className="space-y-3 md:space-y-4 font-bold text-base sm:text-lg md:text-xl text-brand-text font-sans">
                {/* Changed to items-start and added shrink-0 to perfectly align wrapped text */}
                <li className="flex items-start gap-3">
                  <Star className="text-brand-secondary fill-brand-secondary shrink-0 mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6"/> 
                  <span>Dinner Experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-brand-secondary fill-brand-secondary shrink-0 mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6"/> 
                  <span>Cooking Classes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-brand-secondary fill-brand-secondary shrink-0 mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6"/> 
                  <span>Comedy Nights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-brand-secondary fill-brand-secondary shrink-0 mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6"/> 
                  <span>Wellness Experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-brand-secondary fill-brand-secondary shrink-0 mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6"/> 
                  <span>Cultural Outings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="text-brand-secondary fill-brand-secondary shrink-0 mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6"/> 
                  <span>Local Adventures</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}