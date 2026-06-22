"use client";
import { useState } from 'react';
import Modal from './Modal';
import { Send, ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand'; // Adjust Path

const WaveSVG = ({ className }) => (
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={className}>
    <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" />
  </svg>
);

export default function Footer() {
  const [modalType, setModalType] = useState(null); 
  
  // Form integration states
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
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
      // Integrated with the newly provided /api/footer-subscribe backend route
      const response = await fetch('/api/footer-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatusMessage({ type: 'success', text: 'Success! We got your message.' });
      setFormData({ username: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Submission error:', error);
      setStatusMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-brand-dark text-brand-cream pt-24 lg:pt-32 pb-12 px-6 relative mt-0 z-0 overflow-hidden">
      
      {/* --- BACKGROUND WAVES --- */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-1">
          <WaveSVG className="w-1/2 h-full text-brand-accent fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-accent fill-current" />
        </div>
        <div className="absolute bottom-[-20%] left-0 w-[200%] h-[80%] flex animate-wave-2">
          <WaveSVG className="w-1/2 h-full text-brand-primary fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-primary fill-current" />
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
        
        {/* LEFT COLUMN: CONTACT FORM */}
        <div className="relative z-10">
          <div className="bg-brand-cream p-8 md:p-10 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px_var(--color-brand-primary)] relative">
            <h2 className="text-4xl md:text-5xl font-serif mb-2 text-brand-dark">Say Hello.</h2>
            {/* Using brand-text-primary for good contrast against cream */}
            <p className="text-brand-text-primary text-lg mb-8 font-bold">We're real people. Drop us a note.</p>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Your Name" 
                className="w-full bg-white border-2 border-brand-dark rounded-xl px-4 py-4 text-brand-dark placeholder:text-brand-dark/50 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/30 font-bold font-sans transition-all shadow-sm" 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Your Email" 
                className="w-full bg-white border-2 border-brand-dark rounded-xl px-4 py-4 text-brand-dark placeholder:text-brand-dark/50 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/30 font-bold font-sans transition-all shadow-sm" 
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="How can we help?" 
                rows="4" 
                className="w-full bg-white border-2 border-brand-dark rounded-xl px-4 py-4 text-brand-dark placeholder:text-brand-dark/50 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/30 font-bold font-sans transition-all resize-none shadow-sm"
              ></textarea>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-3 bg-brand-dark text-brand-cream font-black text-xl px-6 py-4 rounded-xl border-4 border-brand-dark hover:bg-brand-primary hover:text-brand-dark hover:shadow-[6px_6px_0px_var(--color-brand-accent)] transition-all shadow-[4px_4px_0px_var(--color-brand-dark)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              {/* Status Message Display */}
              {statusMessage.text && (
                <p className={`text-center font-bold text-sm mt-2 ${statusMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                  {statusMessage.text}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: LINKS & SOCIALS */}
        <div className="flex flex-col items-center lg:items-start justify-between pt-10 lg:pt-4 relative z-10 w-full lg:pl-10">
          
          {/* Socials Block */}
          <div className="text-center lg:text-left mb-12 w-full">
            <h3 className="text-4xl md:text-5xl font-serif mb-8 text-brand-cream relative inline-block">
              Follow the vibes
              <svg className="absolute -bottom-3 -left-2 w-[110%] h-4 -z-10 text-brand-accent" viewBox="0 0 200 20" fill="none">
                <path d="M5 10 Q 50 20 100 5 T 195 15" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </h3>
            
            {/* Replaced undefined colors with real Theme colors */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
              <a href="#" className="bg-brand-primary text-brand-dark px-6 py-2.5 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] font-black text-lg transform rotate-3 transition-all">
                Instagram
              </a>
              <a href="#" className="bg-brand-accent text-brand-dark px-6 py-2.5 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] font-black text-lg transform -rotate-2 transition-all">
                TikTok
              </a>
              <a href="#" className="bg-brand-cream text-brand-dark px-6 py-2.5 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] font-black text-lg transform rotate-1 transition-all">
                LinkedIn
              </a>
              <a href="#" className="bg-brand-secondary text-brand-dark px-6 py-2.5 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] font-black text-lg transform -rotate-3 transition-all">
                Facebook
              </a>
            </div>
          </div>

          {/* Support Links Block */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-16 space-y-5 w-full">
            <h4 className="text-brand-primary font-black tracking-widest uppercase text-sm mb-2">Support</h4>
            
            <a href="#giftcards" className="group flex items-center gap-2 text-brand-cream hover:text-brand-primary font-bold text-xl md:text-2xl transition-colors">
              <ArrowRight size={24} className="hidden lg:block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-primary" />
              Gift cards
            </a>
            
            <a href="#refer" className="group flex items-center gap-2 text-brand-cream hover:text-brand-primary font-bold text-xl md:text-2xl transition-colors">
              <ArrowRight size={24} className="hidden lg:block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-primary" />
              Refer a friend
            </a>
            
            <a href="#partner" className="group flex items-center gap-2 text-brand-cream hover:text-brand-primary font-bold text-xl md:text-2xl transition-colors">
              <ArrowRight size={24} className="hidden lg:block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-primary" />
              Become a Partner
            </a>

            <a href={`mailto:${BRAND?.email || 'hello@brand.com'}`} className="text-brand-accent hover:text-brand-primary font-bold text-lg md:text-xl mt-6 border-b-2 border-dashed border-brand-accent hover:border-brand-primary transition-colors pb-1">
              {BRAND?.email || 'hello@brand.com'}
            </a>
          </div>

          {/* Copyright & Policies Bottom Row */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t-2 border-dashed border-brand-cream/20 text-sm font-bold">
            <span className="text-brand-light/60 order-2 md:order-1 text-center md:text-left">
              © {new Date().getFullYear()} {BRAND?.name || 'Brand'}.
            </span>
            <div className="flex flex-wrap justify-center gap-6 order-1 md:order-2">
              <button onClick={() => setModalType('terms')} className="text-brand-cream hover:text-brand-primary transition-colors pb-1 border-b-2 border-transparent hover:border-brand-primary">
                Terms & Conditions
              </button>
              <button onClick={() => setModalType('privacy')} className="text-brand-cream hover:text-brand-primary transition-colors pb-1 border-b-2 border-transparent hover:border-brand-primary">
                Privacy Policy
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODALS */}
      <Modal isOpen={modalType === 'privacy'} onClose={() => setModalType(null)} title="Privacy Policy">
        <p className="text-brand-dark/80 leading-relaxed font-semibold text-lg">
          <strong className="text-brand-lime-dark">We don't sell your data.</strong> Period. Any information you provide in the Vibe Check is used strictly to curate amazing friendship circles for you. We store your data securely and you can request deletion at any time.
        </p>
      </Modal>

      <Modal isOpen={modalType === 'terms'} onClose={() => setModalType(null)} title="Terms and condition">
        <p className="text-brand-dark/80 leading-relaxed font-semibold text-lg">
          By joining our circles, you agree to our <strong className="text-brand-lime-dark">Code of Conduct</strong>. This means bringing good vibes, respecting boundaries, and understanding this is not a dating platform. We reserve the right to remove anyone who makes others feel uncomfortable.
        </p>
      </Modal>

      <style>{`
        .animate-wave-1 { animation: waveSlide 25s linear infinite; }
        .animate-wave-2 { animation: waveSlide 15s linear infinite reverse; }
        @keyframes waveSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}