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

  return (
    <footer className="bg-brand-dark text-brand-cream pt-32 pb-16 px-6 relative mt-0 z-0 overflow-hidden">
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

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
        <div className="relative z-10">
          <div className="bg-brand-cream p-8 md:p-10 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-primary relative">
            <h2 className="text-4xl font-serif mb-2 text-brand-dark">Say Hello.</h2>
            <p className="text-brand-secondary text-lg mb-8 font-bold">We're real people. Drop us a note.</p>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-white border-2 border-brand-dark rounded-xl px-4 py-3 text-brand-dark placeholder:text-brand-dark/40 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold font-sans transition-all shadow-sm" 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-white border-2 border-brand-dark rounded-xl px-4 py-3 text-brand-dark placeholder:text-brand-dark/40 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold font-sans transition-all shadow-sm" 
              />
              <textarea 
                placeholder="How can we help?" 
                rows="3" 
                className="w-full bg-white border-2 border-brand-dark rounded-xl px-4 py-3 text-brand-dark placeholder:text-brand-dark/40 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold font-sans transition-all resize-none shadow-sm"
              ></textarea>
              
              <button className="group w-full flex items-center justify-center gap-3 bg-brand-dark text-brand-cream font-bold text-lg px-6 py-4 rounded-xl border-2 border-brand-dark hover:bg-brand-primary hover:border-brand-primary transition-colors shadow-md">
                Send Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col lg:items-end justify-between pt-10 lg:pt-0 relative z-10 w-full">
          <div className="text-center lg:text-right mb-12">
            <h3 className="text-4xl font-serif mb-8 text-brand-cream relative inline-block">
              Follow the vibes
              <svg className="absolute -bottom-3 -left-2 w-[110%] h-4 -z-10 text-brand-accent" viewBox="0 0 200 20" fill="none">
                <path d="M5 10 Q 50 20 100 5 T 195 15" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-end mt-4">
              <a href="#" className="bg-brand-yellow text-brand-dark px-5 py-2 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px] shadow-brand-dark hover:-translate-y-1 hover:shadow-[6px_6px_0px] hover:shadow-brand-dark font-black text-lg transform rotate-3 transition-all">
                Instagram
              </a>
              <a href="#" className="bg-brand-pink text-brand-dark px-5 py-2 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px] shadow-brand-dark hover:-translate-y-1 hover:shadow-[6px_6px_0px] hover:shadow-brand-dark font-black text-lg transform -rotate-2 transition-all">
                TikTok
              </a>
              <a href="#" className="bg-brand-cream text-brand-dark px-5 py-2 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px] shadow-brand-dark hover:-translate-y-1 hover:shadow-[6px_6px_0px] hover:shadow-brand-dark font-black text-lg transform rotate-1 transition-all">
                LinkedIn
              </a>
              <a href="#" className="bg-brand-primary text-brand-cream px-5 py-2 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px] shadow-brand-dark hover:-translate-y-1 hover:shadow-[6px_6px_0px] hover:shadow-brand-dark font-black text-lg transform -rotate-3 transition-all">
                Facebook
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end text-center lg:text-right mb-16 space-y-4">
            <h4 className="text-brand-pink-dark font-black tracking-widest uppercase text-sm mb-2">Support</h4>
            
            <a href="#giftcards" className="group flex items-center gap-2 text-brand-cream hover:text-brand-accent font-bold text-xl transition-colors">
              Gift cards
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            
            <a href="#refer" className="group flex items-center gap-2 text-brand-cream hover:text-brand-accent font-bold text-xl transition-colors">
              Refer a friend
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            
            <a href="#partner" className="group flex items-center gap-2 text-brand-cream hover:text-brand-accent font-bold text-xl transition-colors">
              Become a Partner
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>

            <a href={`mailto:${BRAND.email}`} className="text-brand-primary hover:text-brand-cream font-bold text-lg mt-4 border-b-2 border-dashed border-brand-primary hover:border-brand-cream transition-colors pb-1">
              {BRAND.email}
            </a>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between lg:justify-end items-center gap-6 lg:gap-8 pt-8 border-t-2 border-dashed border-brand-cream/20 text-sm font-bold">
            <span className="text-brand-cream/40 order-2 md:order-1">
              © {new Date().getFullYear()} {BRAND.name}.
            </span>
            <div className="flex gap-6 order-1 md:order-2">
              <button onClick={() => setModalType('terms')} className="text-brand-cream hover:text-brand-yellow transition-colors pb-1">
                Terms and condition
              </button>
              <button onClick={() => setModalType('privacy')} className="text-brand-cream hover:text-brand-yellow transition-colors pb-1">
                Privacy policy
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalType === 'privacy'} onClose={() => setModalType(null)} title="Privacy Policy">
        <p className="text-brand-dark/80 leading-relaxed font-semibold text-lg">
          <strong className="text-brand-primary">We don't sell your data.</strong> Period. Any information you provide in the Vibe Check is used strictly to curate amazing friendship circles for you. We store your data securely and you can request deletion at any time.
        </p>
      </Modal>

      <Modal isOpen={modalType === 'terms'} onClose={() => setModalType(null)} title="Terms and condition">
        <p className="text-brand-dark/80 leading-relaxed font-semibold text-lg">
          By joining our circles, you agree to our <strong className="text-brand-primary">Code of Conduct</strong>. This means bringing good vibes, respecting boundaries, and understanding this is not a dating platform. We reserve the right to remove anyone who makes others feel uncomfortable.
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