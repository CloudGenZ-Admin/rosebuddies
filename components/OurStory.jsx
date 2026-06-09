"use client";
import { Play, Sparkles, ArrowRight } from 'lucide-react';

export default function OurStory() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-pink-light rounded-[48px] mx-4 shadow-sm relative z-20 overflow-hidden border-2 border-brand-pink-dark/50 mt-12">
      
      {/* Background Doodles */}
      <div className="absolute top-10 left-10 w-24 h-24 text-brand-primary opacity-30 animate-float pointer-events-none">
        <Sparkles size={64} />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-16 text-center md:text-left relative inline-block">
          Our Story
          <svg className="absolute -bottom-3 -left-2 w-[110%] h-4 -z-10 text-brand-accent" viewBox="0 0 200 20" fill="none">
            <path d="M5 10 Q 50 20 100 5 T 195 15" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: The Narrative */}
          <div className="text-lg md:text-xl font-sans font-medium text-brand-dark/90 leading-relaxed space-y-6">
            <p className="font-serif text-2xl md:text-3xl font-bold text-brand-dark leading-snug">
              Rosebuddies was born from an experience many adults know well.
            </p>
            <p>
              As people who were new to the city, we found ourselves trying to rebuild our social circles from scratch. We attended community events. We joined groups. We introduced ourselves.
            </p>
            <p>
              People were kind, but we still went home feeling like visitors in someone else's story. Most friendship circles were already formed. People had their routines, traditions, inside jokes, and trusted groups.
            </p>
            <p className="bg-brand-yellow p-4 rounded-xl border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] font-bold text-brand-dark -rotate-1">
              The challenge wasn't meeting people, it was finding a place where we truly belonged.
            </p>
            <p>
              We realized many adults were experiencing the same struggle. Whether you're new to a city, working remotely, navigating a life transition, or simply growing apart from old friendships, meaningful connections can feel increasingly out of reach.
            </p>
            <p className="font-bold text-brand-primary text-2xl font-serif mt-6">
              That's why we created Rosebuddies.
            </p>
            <p>
              Not as another app designed to keep people scrolling, but as a community designed to bring people together in real life. No algorithms. No endless swiping. Just real people, real conversations, and real opportunities to build meaningful friendships.
            </p>
            <p className="font-bold">
              Because everyone deserves more than a welcome, they deserve a sense of belonging. A place where familiar faces become trusted friends, and strangers become part of your story.
            </p>
          </div>

          {/* Right Side: Founders Videos & CTA */}
          <div className="flex flex-col items-center gap-10">
            
            {/* The 2 Videos (Scrapbook Style) */}
            <div className="relative w-full max-w-md h-[400px]">
              
              {/* Video 1 (Background/Offset) */}
              <div className="absolute top-0 right-0 w-4/5 aspect-[4/3] bg-brand-cream p-3 rounded-2xl border-4 border-brand-dark shadow-[8px_8px_0px_#2A2A2A] rotate-6 hover:rotate-0 hover:z-30 transition-all cursor-pointer group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-brand-primary/80 backdrop-blur-sm -rotate-3 z-20"></div>
                <div className="w-full h-full bg-brand-dark rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80" alt="Video thumbnail 1" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                  <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] relative z-10 group-hover:scale-110 transition-transform">
                    <Play className="text-brand-dark fill-brand-dark ml-1" size={24} />
                  </div>
                </div>
              </div>

              {/* Video 2 (Foreground) */}
              <div className="absolute bottom-0 left-0 w-4/5 aspect-[4/3] bg-brand-cream p-3 rounded-2xl border-4 border-brand-dark shadow-[8px_8px_0px_#2A2A2A] -rotate-3 hover:rotate-0 hover:z-30 transition-all cursor-pointer group z-20 mt-12">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-brand-accent/80 backdrop-blur-sm rotate-2 z-20"></div>
                <div className="w-full h-full bg-brand-dark rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80" alt="Video thumbnail 2" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                  <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] relative z-10 group-hover:scale-110 transition-transform">
                    <Play className="text-brand-cream fill-brand-cream ml-1" size={24} />
                  </div>
                </div>
              </div>
              
            </div>

            {/* CTA Button Below Videos */}
            <div className="mt-8 z-30">
              <a href="#waitlist" className="group flex items-center justify-center gap-3 bg-brand-dark text-brand-pink-light font-bold font-sans text-xl px-10 py-5 rounded-full shadow-[6px_6px_0px] shadow-brand-primary hover:shadow-[8px_8px_0px] hover:shadow-brand-accent hover:-translate-y-1 transition-all duration-300 border-4 border-brand-dark">
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}