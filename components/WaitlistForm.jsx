"use client";
import { useState } from 'react';
import { Loader2, Check } from 'lucide-react';

// Reusable SVG for the seamless wave
const WaveSVG = ({ className }) => (
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={className}>
    <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" />
  </svg>
);

export default function WaitlistForm() {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    // Background: Soft Buttery Yellow
    <section id="waitlist" className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden z-20 bg-brand-light">
      
      {/* --- BACKGROUND ANIMATED WAVES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-[45%] md:h-[60%] flex animate-wave-1">
          {/* Waves using the new Lemon shadow/dark shade for subtle blending */}
          <WaveSVG className="w-1/2 h-full text-brand-lemon-dark/20 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-lemon-dark/20 fill-current" />
        </div>
        <div className="absolute bottom-0 left-0 w-[200%] h-[30%] md:h-[40%] flex animate-wave-2">
          {/* Foreground wave using juicy primary lemon */}
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
        </div>
      </div>

      {/* --- THE FORM CONTAINER --- */}
      {/* Container: Pure White (Cream) with Deep Mint (Dark) borders */}
      <div className="max-w-4xl mx-auto bg-brand-cream border-4 border-brand-dark rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-16 shadow-[6px_6px_0px_var(--color-brand-dark)] md:shadow-[12px_12px_0px_var(--color-brand-dark)] relative z-10 mt-6 sm:mt-8 mx-2 sm:mx-auto">
        
        {/* Decorative Washi Tape: Golden Lemon (Secondary) */}
        <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-brand-secondary/80 backdrop-blur-md -rotate-2 border-2 border-brand-dark shadow-sm z-20"></div>

        <div className="text-center mb-8 md:mb-12 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-brand-dark inline-block relative mb-4 md:mb-6">
            Ready To Find Your Circle?
            {/* Doodle: Rich Forest Green (Lime Dark) */}
            <svg className="absolute -right-4 md:-right-12 -top-6 md:-top-8 w-8 h-8 md:w-10 md:h-10 text-brand-lime-dark animate-bounce" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
              <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
            </svg>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-brand-text-primary font-medium font-sans max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            The first conversation could change everything. Take the Interest Check, join a Meet & Greet, and start building meaningful friendships in real life.
          </p>
        </div>
        
        {status === 'success' ? (
          <div className="text-center py-10 md:py-16 flex flex-col items-center animate-in fade-in duration-500">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
              {/* Success Ping Ring: Accent Lime */}
              <div className="absolute inset-0 border-4 border-brand-accent rounded-full animate-ping opacity-30"></div>
              {/* Success Circle: Primary Lemon */}
              <div className="absolute inset-0 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px_var(--color-brand-dark)]">
                <Check className="text-brand-dark w-10 h-10 md:w-[50px] md:h-[50px]" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-dark mb-3 md:mb-4">You're on the list!</h3>
            <p className="text-lg md:text-xl text-brand-text-primary font-medium">Keep an eye on your inbox. Warm vibes incoming.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-xl sm:text-2xl md:text-3xl leading-[2.2] md:leading-[2.5] font-serif text-brand-dark relative z-10">
            
            <p className="mb-8 text-center md:text-left">
              Hi, my name is 
              <span className={`input-wrapper ${focusedInput === 'name' ? 'active' : ''}`}>
                <input 
                  type="text" 
                  required 
                  placeholder="[ Your Name ]" 
                  className="inline-input w-[140px] sm:w-48" 
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                /> 
              </span>
              and you can reach me at 
              <span className={`input-wrapper ${focusedInput === 'email' ? 'active' : ''}`}>
                <input 
                  type="email" 
                  required 
                  placeholder="[ Your Email ]" 
                  className="inline-input w-[180px] sm:w-72" 
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </span>.
            </p>

            <p className="mb-8 text-center md:text-left">
              I'm currently hanging out in 
              <span className={`input-wrapper ${focusedInput === 'location' ? 'active' : ''}`}>
                <select 
                  className="inline-input cursor-pointer appearance-none text-center w-[160px] sm:w-auto"
                  onFocus={() => setFocusedInput('location')}
                  onBlur={() => setFocusedInput(null)}
                  defaultValue=""
                >
                  <option value="" disabled>[ Select Area ]</option>
                  <option>Downtown</option>
                  <option>Westboro</option>
                  <option>The Glebe</option>
                  <option>Centretown</option>
                  <option>Hintonburg</option>
                  <option>Orleans</option>
                </select>
              </span>.
            </p>

            <p className="mb-10 md:mb-12 text-center md:text-left">
              I'd describe my social energy as:
              <span className={`input-wrapper ${focusedInput === 'energy' ? 'active' : ''}`}>
                <select 
                  className="inline-input cursor-pointer appearance-none text-center w-[180px] sm:w-80"
                  onFocus={() => setFocusedInput('energy')}
                  onBlur={() => setFocusedInput(null)}
                  defaultValue=""
                >
                  <option value="" disabled>[ Select Vibe ]</option>
                  <option>Introverted & Deep</option>
                  <option>Extroverted & Active</option>
                  <option>A bit of both</option>
                </select>
              </span>.
            </p>

            <div className="mt-12 md:mt-16 text-center">
              <p className="mb-6 md:mb-8 font-black text-xl sm:text-2xl md:text-3xl text-brand-lime-dark uppercase tracking-wide font-sans">
                Less Scrolling. More Living.<br/>
                <span className="text-brand-dark">Log Off. Show Up. Belong.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                {/* Submit Button: Dark background, Cream text, Lime shadow */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="group relative inline-flex items-center justify-center bg-brand-dark text-brand-cream font-sans font-bold text-lg md:text-xl px-6 py-4 md:px-10 md:py-5 rounded-full hover:-translate-y-1 transition-transform disabled:opacity-70 disabled:hover:translate-y-0 w-full sm:w-auto border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-lime-dark)] md:shadow-[6px_6px_0px_var(--color-brand-lime-dark)] hover:shadow-[6px_6px_0px_var(--color-brand-secondary)] md:hover:shadow-[8px_8px_0px_var(--color-brand-secondary)]"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin mr-3" size={24} /> : null}
                  {status === 'loading' ? 'Checking Vibes...' : 'Find My Circle '}
                </button>
                
                {/* Secondary Button: Lemon background, Dark text */}
                <a 
                  href="#meet" 
                  className="group relative inline-flex items-center justify-center bg-brand-primary text-brand-dark font-sans font-bold text-lg md:text-xl px-6 py-4 md:px-10 md:py-5 rounded-full hover:-translate-y-1 transition-transform w-full sm:w-auto border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] md:shadow-[6px_6px_0px_var(--color-brand-dark)] hover:shadow-[6px_6px_0px_var(--color-brand-lime-dark)] md:hover:shadow-[8px_8px_0px_var(--color-brand-lime-dark)] hover:bg-brand-secondary text-center leading-snug"
                >
                   Join the Next Meet & Greet 
                </a>
              </div>
            </div>
          </form>
        )}
      </div>

      <style>{`
        /* Wave Animations */
        .animate-wave-1 {
          animation: waveSlide 20s linear infinite;
        }
        .animate-wave-2 {
          animation: waveSlide 12s linear infinite reverse;
        }
        @keyframes waveSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Form Input Highlighter Styles */
        .input-wrapper {
          position: relative;
          display: inline-block;
          margin: 0 0.25rem;
        }
        @media (min-width: 768px) {
          .input-wrapper {
            margin: 0 0.5rem;
          }
        }

        /* Highlighter background uses primary lemon (#FFE51E) */
        .input-wrapper::before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: -4px;
          right: -4px;
          height: 40%;
          background-color: var(--color-brand-primary);
          z-index: -1;
          transform: scaleX(0) rotate(-2deg);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          border-radius: 4px;
        }

        .input-wrapper.active::before {
          transform: scaleX(1) rotate(-2deg);
        }

        /* Input text style uses deep red/brown (Mint Stem) for contrast */
        .inline-input {
          border: none;
          border-bottom: 3px dashed var(--color-brand-dark);
          background: transparent;
          outline: none;
          color: var(--color-brand-text-primary);
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          text-align: center;
          transition: all 0.3s ease;
          padding-bottom: 2px;
          max-width: 100%; /* Prevents breaking on small mobiles */
        }
        @media (min-width: 768px) {
          .inline-input {
            border-bottom: 4px dashed var(--color-brand-dark);
          }
        }

        /* On focus, input border and text changes to Forest Green (Lime Dark) */
        .inline-input:focus {
          border-bottom: 3px solid var(--color-brand-lime-dark);
          color: var(--color-brand-lime-dark);
        }
        @media (min-width: 768px) {
          .inline-input:focus {
            border-bottom: 4px solid var(--color-brand-lime-dark);
          }
        }

        .inline-input::placeholder {
          /* Using hex with opacity for Brand Dark (#1A5415 at 40%) */
          color: #1A541566; 
          font-weight: 600;
        }

        /* Clean dropdown arrows with Brand Dark color encoded (#1A5415) */
        select.inline-input {
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='%231A5415' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
          background-repeat: no-repeat;
          background-position-x: 100%;
          background-position-y: 50%;
          padding-right: 1.5rem;
          text-overflow: ellipsis;
        }
      `}</style>
    </section>
  );
}