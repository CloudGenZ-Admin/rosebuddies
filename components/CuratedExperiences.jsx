"use client";
import { Star } from 'lucide-react';

export default function CuratedExperiencesSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-light relative z-20 border-t-4 border-dashed border-brand-lemon-dark">
      <div className="max-w-5xl mx-auto">
        <div className="bg-brand-cream rounded-[32px] p-8 md:p-14 border-4 border-brand-dark shadow-[12px_12px_0px_var(--color-brand-dark)] relative transform -rotate-1">
          
          {/* Badge */}
          <div className="absolute -top-4 -right-4 bg-brand-primary text-brand-dark font-black px-6 py-2 border-2 border-brand-dark rotate-6 shadow-[4px_4px_0px_var(--color-brand-dark)] text-xl">
            CURATED EXPERIENCES
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-serif text-brand-text mb-6">
                Small Groups. Deeper Connections.
              </h3>
              <p className="text-xl text-brand-text-primary font-bold mb-6 font-sans leading-relaxed">
                Some people thrive in smaller settings. Our Curated Experiences bring together 8–12 people for five weeks of shared experiences designed to help friendships develop naturally.
              </p>
              <p className="text-2xl font-black text-brand-lime-dark font-sans mt-8">
                You simply show up.<br/>We'll take care of the rest.
              </p>
            </div>
            
            {/* Inner Card (Examples) */}
            <div className="bg-brand-light p-8 rounded-2xl border-4 border-brand-dark transform rotate-2">
              <h4 className="text-2xl font-serif text-brand-text mb-6 border-b-2 border-brand-lemon-dark/40 pb-4">
                Examples include:
              </h4>
              <ul className="space-y-4 font-bold text-xl text-brand-text font-sans">
                <li className="flex items-center gap-3">
                  <Star size={24} className="text-brand-secondary fill-brand-secondary"/> Dinner Experiences
                </li>
                <li className="flex items-center gap-3">
                  <Star size={24} className="text-brand-secondary fill-brand-secondary"/> Cooking Classes
                </li>
                <li className="flex items-center gap-3">
                  <Star size={24} className="text-brand-secondary fill-brand-secondary"/> Comedy Nights
                </li>
                <li className="flex items-center gap-3">
                  <Star size={24} className="text-brand-secondary fill-brand-secondary"/> Wellness Experiences
                </li>
                <li className="flex items-center gap-3">
                  <Star size={24} className="text-brand-secondary fill-brand-secondary"/> Cultural Outings
                </li>
                <li className="flex items-center gap-3">
                  <Star size={24} className="text-brand-secondary fill-brand-secondary"/> Local Adventures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}