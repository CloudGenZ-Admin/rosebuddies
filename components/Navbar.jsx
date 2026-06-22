"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Heart } from 'lucide-react';
import WaitlistModal from './WaitlistModal'; // Adjust import path if needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false); // Waitlist modal state

  // Prevent background scrolling when mobile menu is open
  // Note: WaitlistModal handles its own scroll locking now
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-40 bg-brand-light border-b-4 border-brand-dark shadow-[0px_4px_0px_#1A5415]">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative group cursor-pointer z-50 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-primary rounded-full border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415] group-hover:-translate-y-1 transition-transform flex items-center justify-center shrink-0">
              <Heart size={14} className="text-brand-dark fill-brand-dark" />
            </div>
            <span className="text-[22px] sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-black font-serif text-brand-dark tracking-wide">
              Rosebuddies.
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 font-sans font-bold text-brand-dark">
            <Link href="/about" className="hover:text-brand-lime-dark hover:-translate-y-0.5 transition-all lg:text-base xl:text-lg cursor-pointer whitespace-nowrap">
              About Us
            </Link>
            <Link href="/how-it-works" className="hover:text-brand-lime-dark hover:-translate-y-0.5 transition-all lg:text-base xl:text-lg cursor-pointer whitespace-nowrap">
              How it Works
            </Link>
            <Link href="/get-started" className="hover:text-brand-lime-dark hover:-translate-y-0.5 transition-all lg:text-base xl:text-lg cursor-pointer whitespace-nowrap">
              Get Started
            </Link>
            <Link href="/contact" className="hover:text-brand-lime-dark hover:-translate-y-0.5 transition-all lg:text-base xl:text-lg cursor-pointer whitespace-nowrap">
              Contact Us
            </Link>
          </div>

          {/* Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link href="/login" className="lg:px-4 lg:py-2 xl:px-6 xl:py-2.5 bg-brand-light text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all whitespace-nowrap cursor-pointer lg:text-sm xl:text-base">
              Login
            </Link>
            <Link href="/signup" className="lg:px-4 lg:py-2 xl:px-6 xl:py-2.5 bg-brand-cream text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all whitespace-nowrap cursor-pointer lg:text-sm xl:text-base">
              Sign Up
            </Link>
            <button 
              onClick={() => setIsWaitlistOpen(true)} 
              className="flex items-center gap-2 lg:px-4 lg:py-2 xl:px-6 xl:py-2.5 bg-brand-primary text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#9FD62A] transition-all whitespace-nowrap cursor-pointer lg:text-sm xl:text-base"
            >
              Join The Movement
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-brand-dark z-50 bg-brand-cream p-2 sm:p-2.5 rounded-xl border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all cursor-pointer" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} strokeWidth={3} className="sm:w-7 sm:h-7" /> : <Menu size={24} strokeWidth={3} className="sm:w-7 sm:h-7" />}
          </button>

        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 top-20 bg-brand-dark/40 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsOpen(false)}></div>

        {/* Mobile Menu Panel */}
        <div className={`lg:hidden fixed top-20 left-0 right-0 bg-brand-light border-b-4 border-brand-dark flex flex-col p-5 sm:p-8 md:p-10 gap-4 sm:gap-6 shadow-[0px_8px_0px_#1A5415] font-bold font-sans z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-[150%]'}`}>
          <div className="flex flex-col gap-3 sm:gap-4">
            {[
              { href: "/about", label: "About Us" },
              { href: "/how-it-works", label: "How it Works" },
              { href: "/get-started", label: "Get Started" },
              { href: "/contact", label: "Contact Us" }
            ].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-lg sm:text-xl md:text-2xl text-brand-dark p-4 sm:p-5 bg-brand-cream border-2 sm:border-4 border-brand-dark rounded-xl shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] sm:active:shadow-[4px_4px_0px_#1A5415] transition-all flex items-center justify-between cursor-pointer">
                {link.label}
                <ArrowRight size={20} className="text-brand-dark opacity-40 sm:w-6 sm:h-6" strokeWidth={2.5} />
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-4 pt-5 sm:pt-6 border-t-4 border-brand-dark border-dashed">
            
            {/* Login and Sign Up side-by-side on mobile to save space */}
            <div className="flex gap-3 sm:gap-4">
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)} 
                className="flex-1 text-center text-lg sm:text-xl md:text-2xl px-4 py-3.5 sm:py-4 bg-brand-light text-brand-dark border-2 sm:border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] sm:active:shadow-[4px_4px_0px_#1A5415] transition-all cursor-pointer"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                onClick={() => setIsOpen(false)} 
                className="flex-1 text-center text-lg sm:text-xl md:text-2xl px-4 py-3.5 sm:py-4 bg-brand-cream text-brand-dark border-2 sm:border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] sm:active:shadow-[4px_4px_0px_#1A5415] transition-all cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
            
            <button 
              onClick={() => { setIsOpen(false); setIsWaitlistOpen(true); }} 
              className="w-full text-center text-lg sm:text-xl md:text-2xl px-6 py-3.5 sm:py-4 bg-brand-primary text-brand-dark border-2 sm:border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] sm:active:shadow-[4px_4px_0px_#1A5415] transition-all flex justify-center items-center gap-2 cursor-pointer"
            >
              Join The Movement
            </button>
          </div>
        </div>
      </nav>

      {/* Render the Waitlist Modal Component */}
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />
    </>
  );
}