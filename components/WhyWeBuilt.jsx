"use client";
import { Sparkles } from 'lucide-react';

export default function WhyWeBuilt() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-cream relative z-20 border-t-4 border-brand-dark">
      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 relative inline-block">
          Friendship Shouldn't Feel Like Breaking Into Someone Else's Circle
          <div className="absolute -top-8 -left-8 w-12 h-12 text-brand-primary opacity-60">
            <Sparkles size={48} />
          </div>
        </h2>
        
        <div className="text-xl md:text-2xl font-serif text-brand-dark/80 leading-relaxed text-left space-y-6">
          <p>Rosebuddies was born from an experience many adults know well.</p>
          <p>As people who were new to the city, we found ourselves rebuilding our social circles from scratch. We attended community events. We joined groups. We introduced ourselves.</p>
          <p>People were kind, but we still went home feeling like visitors in someone else's story. Most friendship circles were already formed. People had their routines, traditions, inside jokes, and trusted groups.</p>
          <p className="font-bold text-brand-dark text-2xl">The challenge wasn't meeting people. The challenge was finding a place where we truly belonged.</p>
          <p>We realized many adults were experiencing the same struggle. That's why we created Rosebuddies.</p>
          <p>Not as another app designed to keep people scrolling, but as a community designed to bring people together in real life. Because everyone deserves more than a welcome. They deserve a sense of belonging.</p>
        </div>
      </div>
    </section>
  );
}