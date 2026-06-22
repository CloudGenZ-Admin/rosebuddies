"use client";
import { useState } from 'react';

const WaveSVG = ({ className }) => (
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={className}>
    <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" />
  </svg>
);

export default function FinalCTA() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', city: '', vibe: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    try {
      // POST to the updated public route
      const response = await fetch('/api/meet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatusMessage({ type: 'success', text: "You're on the list! We'll be in touch." });
      setFormData({ username: '', email: '', city: '', vibe: '' });
      
      // Optional: hide form after a few seconds
      setTimeout(() => {
        setShowForm(false);
        setStatusMessage({ type: '', text: '' });
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setStatusMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Base section background: Lemonade Yellow
    <section id="waitlist" className="py-32 px-6 relative overflow-hidden z-20 bg-brand-light">
      
      {/* Animated Lemon/Juice Waves Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-[45%] md:h-[60%] flex animate-wave-1">
          <WaveSVG className="w-1/2 h-full text-brand-lemon-light fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-lemon-light fill-current" />
        </div>
        <div className="absolute bottom-0 left-0 w-[200%] h-[30%] md:h-[40%] flex animate-wave-2">
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
        </div>
      </div>

      {/* Main Card: Lemon Sorbet (Cream) with Dark Lemon-Bark Borders */}
      <div className="max-w-4xl mx-auto bg-brand-cream border-4 border-brand-dark rounded-[40px] p-8 md:p-16 shadow-[12px_12px_0px_var(--color-brand-dark)] relative z-10 mt-8 text-center">
        
        {/* Sticky Tape: Amber/Secondary Color */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-brand-secondary/80 backdrop-blur-md -rotate-2 border-2 border-brand-dark shadow-sm z-20"></div>

        <div className="mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-dark inline-block relative">
            Ready To Find Your Circle?
            {/* Accent Star: Lime Dark */}
            <svg className="absolute -right-12 -top-8 w-10 h-10 text-brand-lime-dark animate-bounce" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
              <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
            </svg>
          </h2>
        </div>
        
        <div className="text-2xl md:text-3xl leading-relaxed font-serif text-brand-dark relative z-10">
          <p className="mb-8 font-sans font-medium text-brand-dark/90">
            The first conversation could change everything. Take the Interest Check, join a Meet & Greet, and start building meaningful friendships in real life.
          </p>

          <p className="mb-12 font-black text-4xl md:text-5xl text-brand-lime-dark uppercase tracking-wide">
            Less Scrolling. More Living.<br/>
            <span className="text-brand-dark">Log Off. Show Up. Belong.</span>
          </p>

          {/* DYNAMIC AREA: Shows either the buttons OR the form */}
          {!showForm ? (
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center transition-all">
              {/* Button 1: Dark Button with Lime Shadow */}
              <a href="#interest" className="group relative inline-flex items-center justify-center bg-brand-dark text-brand-cream font-sans font-bold text-xl px-10 py-5 rounded-full hover:-translate-y-1 transition-transform w-full sm:w-auto border-4 border-brand-dark shadow-[6px_6px_0px_var(--color-brand-lime-dark)] hover:shadow-[8px_8px_0px_var(--color-brand-secondary)]">
                [ Find My Circle ]
              </a>

              {/* Button 2: Pure Lemon Button with Dark Shadow */}
              <button 
                onClick={() => setShowForm(true)}
                className="group relative inline-flex items-center justify-center bg-brand-primary text-brand-dark font-sans font-bold text-xl px-10 py-5 rounded-full hover:-translate-y-1 transition-transform w-full sm:w-auto border-4 border-brand-dark shadow-[6px_6px_0px_var(--color-brand-dark)] hover:shadow-[8px_8px_0px_var(--color-brand-lime-dark)]"
              >
                [ Join the Next Meet & Greet ]
              </button>
            </div>
          ) : (
            <div className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px_var(--color-brand-primary)] text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black font-sans mb-6 text-brand-dark flex justify-between items-center">
                Tell us about yourself
                <button onClick={() => setShowForm(false)} className="text-sm font-bold text-brand-dark/50 hover:text-brand-dark underline">Cancel</button>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 text-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" name="username" value={formData.username} onChange={handleInputChange} required placeholder="Your Name" 
                    className="w-full bg-brand-cream border-2 border-brand-dark rounded-xl px-4 py-3 text-brand-dark placeholder:text-brand-dark/50 outline-none focus:border-brand-lime-dark focus:ring-4 focus:ring-brand-lime-dark/30 font-bold font-sans transition-all" 
                  />
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Your Email" 
                    className="w-full bg-brand-cream border-2 border-brand-dark rounded-xl px-4 py-3 text-brand-dark placeholder:text-brand-dark/50 outline-none focus:border-brand-lime-dark focus:ring-4 focus:ring-brand-lime-dark/30 font-bold font-sans transition-all" 
                  />
                </div>
                <input 
                  type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="Your City" 
                  className="w-full bg-brand-cream border-2 border-brand-dark rounded-xl px-4 py-3 text-brand-dark placeholder:text-brand-dark/50 outline-none focus:border-brand-lime-dark focus:ring-4 focus:ring-brand-lime-dark/30 font-bold font-sans transition-all" 
                />
                <textarea 
                  name="vibe" value={formData.vibe} onChange={handleInputChange} required placeholder="What's your vibe? (e.g., Coffee shop reader, outdoor hiker...)" rows="2"
                  className="w-full bg-brand-cream border-2 border-brand-dark rounded-xl px-4 py-3 text-brand-dark placeholder:text-brand-dark/50 outline-none focus:border-brand-lime-dark focus:ring-4 focus:ring-brand-lime-dark/30 font-bold font-sans transition-all resize-none" 
                ></textarea>
                
                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-brand-dark text-brand-cream font-black font-sans text-xl px-6 py-4 rounded-xl border-4 border-brand-dark hover:bg-brand-lime-dark hover:text-brand-dark transition-all disabled:opacity-70 shadow-[4px_4px_0px_var(--color-brand-primary)]"
                >
                  {isSubmitting ? 'Sending...' : 'Submit & Join List'}
                </button>
                
                {statusMessage.text && (
                  <p className={`text-center font-bold font-sans text-sm mt-4 ${statusMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                    {statusMessage.text}
                  </p>
                )}
              </form>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .animate-wave-1 { animation: waveSlide 20s linear infinite; }
        .animate-wave-2 { animation: waveSlide 12s linear infinite reverse; }
        @keyframes waveSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}