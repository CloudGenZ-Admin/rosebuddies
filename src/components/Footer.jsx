import { useState } from 'react';
import Modal from './Modal';
import { Send, ArrowRight } from 'lucide-react';

// Reusable SVG for the seamless wave
const WaveSVG = ({ className }) => (
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={className}>
    <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" />
  </svg>
);

export default function Footer() {
  const [modalType, setModalType] = useState(null); // 'privacy' | 'terms' | null

  return (
    <footer className="bg-[#2A2A2A] text-[#FAF9F6] pt-32 pb-16 px-6 relative mt-12 z-40 overflow-hidden">
      
     

      {/* --- BOTTOM ANIMATED SUNSET WAVES --- */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-1">
          <WaveSVG className="w-1/2 h-full text-[#E1AD01] fill-current" />
          <WaveSVG className="w-1/2 h-full text-[#E1AD01] fill-current" />
        </div>
        <div className="absolute bottom-[-20%] left-0 w-[200%] h-[80%] flex animate-wave-2">
          <WaveSVG className="w-1/2 h-full text-[#FD5E53] fill-current" />
          <WaveSVG className="w-1/2 h-full text-[#FD5E53] fill-current" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
        
        {/* --- LEFT SIDE: The Clean Form --- */}
        <div className="relative z-10">
          <div className="bg-[#FAF9F6] p-8 md:p-10 rounded-3xl border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#FD5E53] relative">
            <h2 className="text-4xl font-serif mb-2 text-[#2A2A2A]">Say Hello.</h2>
            <p className="text-[#E2725B] text-lg mb-8 font-bold">We're real people. Drop us a note.</p>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-white border-2 border-[#2A2A2A] rounded-xl px-4 py-3 text-[#2A2A2A] placeholder:text-[#2A2A2A]/40 outline-none focus:border-[#FD5E53] focus:ring-4 focus:ring-[#FD5E53]/20 font-bold font-sans transition-all shadow-sm" 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-white border-2 border-[#2A2A2A] rounded-xl px-4 py-3 text-[#2A2A2A] placeholder:text-[#2A2A2A]/40 outline-none focus:border-[#FD5E53] focus:ring-4 focus:ring-[#FD5E53]/20 font-bold font-sans transition-all shadow-sm" 
              />
              <textarea 
                placeholder="How can we help?" 
                rows="3" 
                className="w-full bg-white border-2 border-[#2A2A2A] rounded-xl px-4 py-3 text-[#2A2A2A] placeholder:text-[#2A2A2A]/40 outline-none focus:border-[#FD5E53] focus:ring-4 focus:ring-[#FD5E53]/20 font-bold font-sans transition-all resize-none shadow-sm"
              ></textarea>
              
              <button className="group w-full flex items-center justify-center gap-3 bg-[#2A2A2A] text-[#FAF9F6] font-bold text-lg px-6 py-4 rounded-xl border-2 border-[#2A2A2A] hover:bg-[#FD5E53] hover:border-[#FD5E53] transition-colors shadow-md">
                Send Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT SIDE: Socials, Explore Links & Legal --- */}
        <div className="flex flex-col lg:items-end justify-between pt-10 lg:pt-0 relative z-10 w-full">
          
          {/* Top Right: Follow the vibes & Stickers */}
          <div className="text-center lg:text-right mb-12">
            <h3 className="text-4xl font-serif mb-8 text-[#FAF9F6] relative inline-block">
              Follow the vibes
              <svg className="absolute -bottom-3 -left-2 w-[110%] h-4 -z-10 text-[#E1AD01]" viewBox="0 0 200 20" fill="none">
                <path d="M5 10 Q 50 20 100 5 T 195 15" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </h3>
            
            <div className="flex gap-4 justify-center lg:justify-end mt-4">
              <a href="#" className="bg-[#FDE047] text-[#2A2A2A] px-5 py-2 rounded-xl border-4 border-[#2A2A2A] shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#2A2A2A] font-black text-lg transform rotate-3 transition-all">
                Instagram
              </a>
              <a href="#" className="bg-[#FFD6E0] text-[#2A2A2A] px-5 py-2 rounded-xl border-4 border-[#2A2A2A] shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#2A2A2A] font-black text-lg transform -rotate-2 transition-all">
                TikTok
              </a>
            </div>
          </div>

          {/* Middle Right: Explore Links (NEW ADDITION) */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right mb-16 space-y-4">
            <h4 className="text-[#FFB3C6] font-black tracking-widest uppercase text-sm mb-2">Explore</h4>
            
            <a href="#how-it-works" className="group flex items-center gap-2 text-[#FAF9F6] hover:text-[#E1AD01] font-bold text-xl transition-colors">
              How it works 
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            
            <a href="#waitlist" className="group flex items-center gap-2 text-[#FAF9F6] hover:text-[#E1AD01] font-bold text-xl transition-colors">
              Join the Waitlist
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            
            {/* Added a link to become a host, perfect for your business model! */}
            <a href="#" className="group flex items-center gap-2 text-[#FAF9F6] hover:text-[#E1AD01] font-bold text-xl transition-colors">
              Become a Circle Host
              <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>

            <a href="mailto:hello@findyourpeople.com" className="text-[#FD5E53] hover:text-[#FAF9F6] font-bold text-lg mt-4 border-b-2 border-dashed border-[#FD5E53] hover:border-[#FAF9F6] transition-colors pb-1">
              hello@findyourpeople.ca
            </a>
          </div>

          {/* Bottom Right: Legal & Copyright (EXPANDED) */}
          {/* Dashed top border creates a clear separation like the bottom of a receipt */}
          <div className="w-full flex flex-col md:flex-row justify-between lg:justify-end items-center gap-6 lg:gap-8 pt-8 border-t-2 border-dashed border-[#FAF9F6]/20 text-sm font-bold">
            
            {/* Copyright Note */}
            <span className="text-[#FAF9F6]/40 order-2 md:order-1">
              © {new Date().getFullYear()} Find Your People.
            </span>
            
            {/* Legal Modals */}
            <div className="flex gap-6 order-1 md:order-2">
              <button onClick={() => setModalType('privacy')} className="text-[#FAF9F6] hover:text-[#FDE047] transition-colors pb-1">
                Privacy Policy
              </button>
              <button onClick={() => setModalType('terms')} className="text-[#FAF9F6] hover:text-[#FDE047] transition-colors pb-1">
                Terms of Service
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}
      <Modal isOpen={modalType === 'privacy'} onClose={() => setModalType(null)} title="Privacy Policy">
        <p className="text-[#2A2A2A]/80 leading-relaxed font-semibold text-lg">
          <strong className="text-[#FD5E53]">We don't sell your data.</strong> Period. Any information you provide in the Vibe Check is used strictly to curate amazing friendship circles for you. We store your data securely and you can request deletion at any time.
        </p>
      </Modal>

      <Modal isOpen={modalType === 'terms'} onClose={() => setModalType(null)} title="Terms of Service">
        <p className="text-[#2A2A2A]/80 leading-relaxed font-semibold text-lg">
          By joining our circles, you agree to our <strong className="text-[#FD5E53]">Code of Conduct</strong>. This means bringing good vibes, respecting boundaries, and understanding this is not a dating platform. We reserve the right to remove anyone who makes others feel uncomfortable.
        </p>
      </Modal>

      {/* --- WAVE ANIMATION STYLES --- */}
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