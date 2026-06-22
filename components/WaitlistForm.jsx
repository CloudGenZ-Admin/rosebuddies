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
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [energy, setEnergy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const apiPayload = {
      username: name,
      email: email,
      city: location,
      vibe: energy
    };

    try {
      const response = await fetch('/api/meet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json();
        console.error("Submission failed validation:", errorData);
        setStatus('idle');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('idle');
    }
  };

  return (
    // Background: Soft Buttery Yellow
    <section id="waitlist" className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden z-20 bg-brand-light">
      
      {/* --- BACKGROUND ANIMATED WAVES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-[45%] md:h-[60%] flex animate-wave-1">
          <WaveSVG className="w-1/2 h-full text-brand-lemon-dark/20 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-lemon-dark/20 fill-current" />
        </div>
        <div className="absolute bottom-0 left-0 w-[200%] h-[30%] md:h-[40%] flex animate-wave-2">
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
        </div>
      </div>

      {/* --- THE FORM CONTAINER --- */}
      <div className="max-w-4xl mx-auto bg-brand-cream border-4 border-brand-dark rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-16 shadow-[6px_6px_0px_var(--color-brand-dark)] md:shadow-[12px_12px_0px_var(--color-brand-dark)] relative z-10 mt-6 sm:mt-8 mx-2 sm:mx-auto">
        
        {/* Decorative Washi Tape */}
        <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-brand-secondary/80 backdrop-blur-md -rotate-2 border-2 border-brand-dark shadow-sm z-20"></div>

        <div className="text-center mb-8 md:mb-12 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-brand-dark inline-block relative mb-4 md:mb-6">
            Ready To Find Your Circle?
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
              <div className="absolute inset-0 border-4 border-brand-accent rounded-full animate-ping opacity-30"></div>
              <div className="absolute inset-0 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px_var(--color-brand-dark)]">
                <Check className="text-brand-dark w-10 h-10 md:w-[50px] md:h-[50px]" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-dark mb-3 md:mb-4">You're on the list!</h3>
            <p className="text-lg md:text-xl text-brand-text-primary font-medium">Keep an eye on your inbox. Warm vibes incoming.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-xl sm:text-2xl md:text-3xl leading-loose md:leading-[2.5] font-serif text-brand-dark relative z-10">
            
            {/* Added break-words to handle tight container constraints */}
            <p className="mb-4 text-center md:text-left break-words">
              Hi, my name is{' '}
              <span className={`input-wrapper ${focusedInput === 'name' ? 'active' : ''}`}>
                {/* The invisible sizer pushes the width perfectly */}
                <span className="inline-input-sizer">{name || '[ Your Name ]'}</span>
                <input 
                  type="text" 
                  required 
                  placeholder="[ Your Name ]" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="inline-input"
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                /> 
              </span>
              {' '}and you can reach me at{' '}
              <span className={`input-wrapper ${focusedInput === 'email' ? 'active' : ''}`}>
                <span className="inline-input-sizer">{email || '[ Your Email ]'}</span>
                <input 
                  type="email" 
                  required 
                  placeholder="[ Your Email ]" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inline-input"
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </span>.
            </p>

            <p className="mb-8 text-center md:text-left break-words">
              I'm currently hanging out in{' '}
              <span className={`select-wrapper ${focusedInput === 'location' ? 'active' : ''}`}>
                <select 
                  className="inline-select cursor-pointer"
                  onFocus={() => setFocusedInput('location')}
                  onBlur={() => setFocusedInput(null)}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option  value="" disabled>[ Select Area ]</option>
                  <option >Downtown</option>
                  <option>Westboro</option>
                  <option>The Glebe</option>
                  <option>Centretown</option>
                  <option>Hintonburg</option>
                  <option>Orleans</option>
                </select>
              </span>.
            </p>

            <p className="mb-10 md:mb-12 text-center md:text-left break-words">
              I'd describe my social energy as:{' '}
              <span className={`select-wrapper ${focusedInput === 'energy' ? 'active' : ''}`}>
                <select 
                  className="inline-select cursor-pointer"
                  onFocus={() => setFocusedInput('energy')}
                  onBlur={() => setFocusedInput(null)}
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  required
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
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="group relative inline-flex items-center justify-center bg-brand-dark text-brand-cream font-sans font-bold text-lg md:text-xl px-6 py-4 md:px-10 md:py-5 rounded-full hover:-translate-y-1 transition-transform disabled:opacity-70 disabled:hover:translate-y-0 w-full sm:w-auto border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-lime-dark)] md:shadow-[6px_6px_0px_var(--color-brand-lime-dark)] hover:shadow-[6px_6px_0px_var(--color-brand-secondary)] md:hover:shadow-[8px_8px_0px_var(--color-brand-secondary)]"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin mr-3" size={24} /> : null}
                  {status === 'loading' ? 'Checking Vibes...' : 'Find My Circle '}
                </button>
                
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
        .animate-wave-1 { animation: waveSlide 20s linear infinite; }
        .animate-wave-2 { animation: waveSlide 12s linear infinite reverse; }
        @keyframes waveSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* --- RESPONSIVE INLINE-GRID HACK --- */
        
        .input-wrapper {
          position: relative;
          display: inline-grid;
          align-items: end; 
          margin: 0 0.25rem;
          max-width: 100%;
          vertical-align: baseline;
        }

        .select-wrapper {
          position: relative;
          display: inline-block;
          margin: 0 0.25rem;
          max-width: 100%;
          vertical-align: baseline;
        }

        @media (min-width: 768px) {
          .input-wrapper, .select-wrapper { margin: 0 0.5rem; }
        }

        /* Dynamic Highlighter Background */
        .input-wrapper::before, .select-wrapper::before {
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

        .input-wrapper.active::before, .select-wrapper.active::before {
          transform: scaleX(1) rotate(-2deg);
        }

        /* Invisible text that perfectly maps out the size of the box */
        .inline-input-sizer {
          grid-area: 1 / 1;
          visibility: hidden;
          white-space: pre;
          max-width: 100%;
          overflow: hidden;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          padding: 0 0.25rem;
          border-bottom: 3px dashed transparent; /* maintains exact matching height */
          padding-bottom: 2px;
        }

        /* The actual input sits exactly on top, perfectly confined */
        .inline-input {
          grid-area: 1 / 1;
          width: 100%;
          min-width: 0; /* Prevents flex/grid blowouts */
          max-width: 100%;
          border: none;
          border-bottom: 3px dashed var(--color-brand-dark);
          background: transparent;
          outline: none;
          color: var(--color-brand-text-primary);
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          text-align: center;
          transition: border-color 0.3s ease, color 0.3s ease;
          padding: 0 0.25rem;
          padding-bottom: 2px;
          box-sizing: border-box;
          text-overflow: ellipsis; /* Shrinks large inputs with "..." safely */
        }

        /* Select menus behave natively so they dont need the invisible sizer */
        .inline-select {
          width: auto;
          max-width: 100%;
          border: none;
          border-bottom: 3px dashed var(--color-brand-dark);
          background: transparent;
          outline: none;
          color: var(--color-brand-text-primary);
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          text-align: center;
          transition: border-color 0.3s ease, color 0.3s ease;
          padding: 0 1.5rem 2px 0.25rem;
          box-sizing: border-box;
          text-overflow: ellipsis;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='%231A5415' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
          background-repeat: no-repeat;
          background-position-x: 100%;
          background-position-y: 50%;
        }

        @media (min-width: 768px) {
          .inline-input, .inline-input-sizer, .inline-select { border-bottom-width: 4px; }
        }

        .inline-input:focus, .inline-select:focus {
          border-bottom-color: var(--color-brand-lime-dark);
          color: var(--color-brand-lime-dark);
        }

        .inline-input::placeholder {
          color: #1A541566; 
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}