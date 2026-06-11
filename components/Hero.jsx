"use client";
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand'; 

const Polaroid = ({ src, alt, baseRotation, positionClasses, mouseX, mouseY, depth, tapeColor = "bg-brand-secondary/60", children }) => {
  const moveX = mouseX * depth;
  const moveY = mouseY * depth;

  return (
    <div 
      className={`absolute group bg-brand-cream border-2 border-brand-lemon-dark p-3 pb-12 shadow-2xl rounded-2xl cursor-pointer w-48 md:w-64 ${positionClasses}`}
      style={{
        transform: `translate(${moveX}px, ${moveY}px) rotate(${baseRotation}deg)`,
        transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' 
      }}
    >
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${tapeColor} backdrop-blur-sm -rotate-3 z-50 shadow-sm opacity-80`}></div>
      <div className="w-full h-48 md:h-56 bg-brand-lemon-dark/40 rounded-lg overflow-hidden relative transition-transform duration-500 group-hover:scale-[1.03]">
        <img src={src} alt={alt} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" />
        <svg className="absolute top-3 right-3 w-10 h-10 text-brand-primary drop-shadow-md" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          {children}
        </svg>
      </div>
    </div>
  );
};

const FloatingDoodle = ({ children, classes, delay = "0s" }) => (
  <div className={`absolute pointer-events-none animate-float ${classes}`} style={{ animationDelay: delay }}>
    {children}
  </div>
);

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden px-6 md:px-12 lg:px-24 bg-brand-light"
      style={{ 
        backgroundImage: `radial-gradient(var(--color-brand-lemon-dark) 2px, transparent 2px)`, 
        backgroundSize: '32px 32px' 
      }}
    >
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[100px] animate-float z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] animate-float z-0 pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <FloatingDoodle classes="top-[15%] left-[5%] text-brand-lime-dark w-12 h-12 opacity-70" delay="0s">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
        </svg>
      </FloatingDoodle>

      <FloatingDoodle classes="bottom-[10%] left-[45%] text-brand-text-primary w-16 h-16 opacity-60" delay="1s">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
          <path d="M10 50 C 10 20, 90 20, 90 50 C 90 80, 30 80, 30 50 C 30 30, 70 30, 70 50" />
        </svg>
      </FloatingDoodle>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        <div className="max-w-xl relative z-20">
          <div className="relative inline-block mb-8">
            <div className="absolute -top-2 -left-4 w-10 h-4 bg-brand-secondary/60 -rotate-12 z-50 shadow-sm backdrop-blur-sm"></div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-cream border-2 border-brand-lemon-dark text-brand-text font-bold font-sans text-sm shadow-sm relative z-10 hover:-rotate-2 transition-transform cursor-default">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              Real People. Real Conversations.
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-brand-text leading-[1.1] mb-6 relative">
            Find Your <br/>
            <span className="relative inline-block mt-2">
              Circle. Naturally.
              <svg className="absolute -bottom-1 -left-2 w-[110%] h-8 -z-10 text-brand-accent" viewBox="0 0 200 40" fill="none">
                <path d="M5 25 Q 100 5 195 25" stroke="currentColor" strokeWidth="20" strokeLinecap="round" className="draw-path" />
              </svg>
            </span>
          </h1>
          
          <p className="text-2xl font-serif font-medium text-brand-text-primary mb-5 leading-snug">
            Real People. Real Conversations. Real Friendships.
          </p>
          
          <p className="text-lg text-brand-text mb-10 font-sans leading-relaxed font-semibold">
            Making friends as an adult shouldn't be this hard. Whether you're new to the city, working remotely, navigating a life transition, or simply looking to expand your social circle, Rosebuddies helps you build meaningful friendships through real-life experiences and shared interests.<br/><br/>
            No algorithms. No swiping. No endless scrolling. Just genuine connection and a place to belong.
          </p>
          
          <div className="relative flex flex-col sm:flex-row items-center gap-6 z-50 mt-4">
            <div className="absolute -top-12 left-10 md:-left-12 md:top-2 text-brand-secondary w-12 h-12 animate-bounce rotate-[15deg] md:-rotate-[70deg] z-50 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 50 Q 50 10 90 50 M 70 30 L 90 50 L 70 70" />
              </svg>
            </div>

            {/* Primary Button */}
            <a href="#interest" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-dark text-brand-cream font-bold text-lg px-8 py-4 rounded-full shadow-[6px_6px_0px] shadow-brand-secondary hover:shadow-[8px_8px_0px] hover:shadow-brand-accent hover:-translate-y-1 hover:bg-brand-lime-dark hover:text-brand-cream transition-all duration-300 group">
               Find My Circle 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            
            {/* Secondary Button */}
            <a href="#meet" className="w-full sm:w-auto text-center px-8 py-4 border-4 border-brand-dark rounded-full font-bold text-brand-on-primary bg-brand-primary shadow-[4px_4px_0px_var(--color-brand-dark)] hover:translate-y-1 hover:shadow-none hover:bg-brand-dark hover:text-brand-cream transition-all duration-300">
               Join the Next Meet & Greet – $25 
            </a>
          </div>
        </div>

        <div className="relative h-[600px] hidden lg:block perspective-[1000px] z-10 pointer-events-none lg:pointer-events-auto">
          <Polaroid 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Friends laughing" 
            baseRotation={-8} 
            positionClasses="top-10 left-0 z-10"
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            depth={-15}
            tapeColor="bg-brand-accent/60" 
          >
            <path className="scribble-hover" d="M50 80 Q 20 50 30 20 Q 50 10 50 30 Q 50 10 70 20 Q 80 50 50 80" />
          </Polaroid>

          <Polaroid 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Group at cafe" 
            baseRotation={4} 
            positionClasses="top-32 right-0 z-30 scale-110"
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            depth={25}
            tapeColor="bg-brand-primary/60" 
          >
             <circle cx="35" cy="40" r="4" fill="currentColor"/>
             <circle cx="65" cy="40" r="4" fill="currentColor"/>
             <path className="scribble-hover" d="M30 65 Q 50 80 70 65" />
          </Polaroid>

          <Polaroid 
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Cheers with drinks" 
            baseRotation={-3} 
            positionClasses="bottom-10 left-20 z-20"
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            depth={10}
            tapeColor="bg-brand-secondary/60" 
          >
             <path className="scribble-hover" d="M50 10 L 60 40 L 90 40 L 65 60 L 75 90 L 50 70 L 25 90 L 35 60 L 10 40 L 40 40 Z" />
          </Polaroid>
        </div>
      </div>
    </section>
  );
}