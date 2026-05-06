import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// Added Washi Tape to the Polaroids to make them feel like a real scrapbook!
const Polaroid = ({ src, alt, baseRotation, positionClasses, mouseX, mouseY, depth, tapeColor = "bg-[#DCAE96]/60", children }) => {
  const moveX = mouseX * depth;
  const moveY = mouseY * depth;

  return (
    <div 
      className={`absolute group bg-[#FFE9EE] border-2 border-[#FFB3C6] p-3 pb-12 shadow-2xl rounded-2xl cursor-pointer w-48 md:w-64 ${positionClasses}`}
      style={{
        transform: `translate(${moveX}px, ${moveY}px) rotate(${baseRotation}deg)`,
        transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' 
      }}
    >
      {/* Washi Tape Strip */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${tapeColor} backdrop-blur-sm -rotate-3 z-50 shadow-sm opacity-80`}></div>

      <div className="w-full h-48 md:h-56 bg-[#FFB3C6]/40 rounded-lg overflow-hidden relative transition-transform duration-500 group-hover:scale-[1.03]">
        <img src={src} alt={alt} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" />
        
        <svg className="absolute top-3 right-3 w-10 h-10 text-[#FD5E53] drop-shadow-md" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          {children}
        </svg>
      </div>
    </div>
  );
};

// Reusable component for background scrapbook doodles
const FloatingDoodle = ({ children, classes, delay = "0s" }) => (
  <div 
    className={`absolute pointer-events-none animate-float ${classes}`} 
    style={{ animationDelay: delay }}
  >
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
      className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden px-6 md:px-12 lg:px-24 bg-[#FFD6E0]"
      // 1. ADDED: Bullet Journal Dot Grid Pattern
      style={{ 
        backgroundImage: 'radial-gradient(#FFB3C6 2px, transparent 2px)', 
        backgroundSize: '32px 32px' 
      }}
    >
      
      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FD5E53]/10 rounded-full blur-[100px] animate-float z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E1AD01]/10 rounded-full blur-[120px] animate-float z-0 pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* --- 2. ADDED: FLOATING SCRAPBOOK DOODLES --- */}
      
      {/* Top Left Star */}
      <FloatingDoodle classes="top-[15%] left-[5%] text-[#E1AD01] w-12 h-12 opacity-70" delay="0s">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
        </svg>
      </FloatingDoodle>

      {/* Bottom Center Swirl */}
      <FloatingDoodle classes="bottom-[10%] left-[45%] text-[#E2725B] w-16 h-16 opacity-60" delay="1s">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
          <path d="M10 50 C 10 20, 90 20, 90 50 C 90 80, 30 80, 30 50 C 30 30, 70 30, 70 50" />
        </svg>
      </FloatingDoodle>

      {/* Center Top Sparkles */}
      <FloatingDoodle classes="top-[20%] left-[45%] text-[#FD5E53] w-10 h-10 opacity-70" delay="2s">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="15" r="5" />
          <circle cx="85" cy="50" r="5" />
          <circle cx="50" cy="85" r="5" />
          <circle cx="15" cy="50" r="5" />
        </svg>
      </FloatingDoodle>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* --- Text Content --- */}
        <div className="max-w-xl relative z-20">
          
          {/* Badge with Washi Tape */}
          <div className="relative inline-block mb-8">
             {/* Washi Tape on badge */}
            <div className="absolute -top-2 -left-4 w-10 h-4 bg-[#E2725B]/40 -rotate-12 z-50 shadow-sm backdrop-blur-sm"></div>
            
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFE9EE] border-2 border-[#FFB3C6] text-[#2A2A2A] font-bold font-sans text-sm shadow-sm relative z-10 hover:-rotate-2 transition-transform cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#FD5E53] animate-pulse"></span>
              Launching in Ottawa • Waitlist Open
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-[#2A2A2A] leading-[1.1] mb-6 relative">
            Find Your <br/>
            <span className="relative inline-block mt-2">
              People.
              {/* Animated Highlight Scribble */}
              <svg className="absolute -bottom-1 -left-2 w-[110%] h-8 -z-10 text-[#E1AD01]" viewBox="0 0 200 40" fill="none">
                <path d="M5 25 Q 100 5 195 25" stroke="currentColor" strokeWidth="20" strokeLinecap="round" className="draw-path" />
              </svg>
            </span>
          </h1>
          
          <p className="text-2xl font-serif font-medium text-[#E2725B] mb-5 leading-snug">
            Meaningful friendships start here.
          </p>
          
          <p className="text-lg text-[#2A2A2A]/80 mb-10 font-sans leading-relaxed font-semibold">
            Not a dating app. Not an awkward networking event. We build curated, 4-week friendship circles in Ottawa based on shared values, guided conversation, and real connection.
          </p>
          
          {/* CTA & Arrow Area */}
          <div className="relative flex flex-col sm:flex-row items-center gap-6 z-50 mt-4">
            
            {/* 3. ADDED: Hand-drawn pointing arrow targeting the CTA */}
            <div className="absolute -top-12 left-10 md:-left-12 md:top-2 text-[#FD5E53] w-12 h-12 animate-bounce rotate-[15deg] md:-rotate-[70deg] z-50 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 50 Q 50 10 90 50 M 70 30 L 90 50 L 70 70" />
              </svg>
            </div>

            <a href="#waitlist" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#2A2A2A] text-[#FFE9EE] font-bold text-lg px-8 py-4 rounded-full shadow-[6px_6px_0px_#FD5E53] hover:shadow-[8px_8px_0px_#E1AD01] hover:-translate-y-1 hover:bg-black transition-all duration-300 group">
              Take the Vibe Check
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <span className="text-sm font-bold text-[#2A2A2A]/60 font-sans">
              Only $15 for your first Meet & Greet
            </span>
          </div>
        </div>

        {/* --- Interactive Parallax Polaroids --- */}
        <div className="relative h-[600px] hidden lg:block perspective-[1000px] z-10 pointer-events-none lg:pointer-events-auto">
          <Polaroid 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
            alt="Friends laughing" 
            baseRotation={-8} 
            positionClasses="top-10 left-0 z-10"
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            depth={-15}
            tapeColor="bg-[#E1AD01]/60" // Mustard Tape
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
            tapeColor="bg-[#FD5E53]/50" // Sunset Tape
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
            tapeColor="bg-[#E2725B]/50" // Terracotta Tape
          >
             <path className="scribble-hover" d="M50 10 L 60 40 L 90 40 L 65 60 L 75 90 L 50 70 L 25 90 L 35 60 L 10 40 L 40 40 Z" />
          </Polaroid>
        </div>
      </div>
    </section>
  );
}