"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-brand-cream border-b-4 border-brand-dark shadow-[0px_4px_0px_rgba(42,42,42,1)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo - Links back to Home Page */}
        <Link href="/" className="flex items-center gap-2 relative group cursor-pointer z-50">
          <div className="w-8 h-8 bg-brand-primary rounded-full border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A] group-hover:-translate-y-1 transition-transform"></div>
          <span className="text-2xl font-black font-serif text-brand-dark tracking-wide">Rosebuddies.</span>
        </Link>

        {/* Desktop Links - Hidden on mobile/tablet, shows on lg screens */}
        <div className="hidden lg:flex items-center gap-8 font-sans font-bold text-brand-dark">
          <Link href="/how-it-works" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            How it Works
          </Link>
          <Link href="/clubs-experiences" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            Clubs & Experiences
          </Link>
          <Link href="/#schedule" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            Schedule
          </Link>
          <Link href="/our-story" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            Our Story
          </Link>
          <Link href="/#faq" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            FAQ
          </Link>
        </div>

        {/* Actions (Login & CTA) - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/#login" className="px-6 py-2 bg-brand-light text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#2A2A2A] transition-all">
            Login
          </Link>
          <Link href="/#waitlist" className="px-6 py-2 bg-brand-yellow text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#FD5E53] transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-brand-dark z-50 bg-brand-light p-2 rounded-xl border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A] active:translate-y-0.5 active:shadow-[0px_0px_0px_#2A2A2A]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-brand-cream border-b-4 border-brand-dark flex flex-col p-6 gap-3 shadow-[0px_8px_0px_rgba(42,42,42,1)] font-bold font-sans max-h-[calc(100vh-80px)] overflow-y-auto">
          
          <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark p-4 bg-brand-light border-2 border-brand-dark rounded-xl shadow-[4px_4px_0px_#2A2A2A] active:translate-y-1 active:shadow-[2px_2px_0px_#2A2A2A] transition-all flex items-center justify-between">
            How it Works
            <span className="text-brand-primary">→</span>
          </Link>

          <Link href="/clubs-experiences" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark p-4 bg-brand-light border-2 border-brand-dark rounded-xl shadow-[4px_4px_0px_#2A2A2A] active:translate-y-1 active:shadow-[2px_2px_0px_#2A2A2A] transition-all flex items-center justify-between">
            Clubs & Experiences
            <span className="text-brand-primary">→</span>
          </Link>

          <Link href="/#schedule" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark p-4 bg-brand-light border-2 border-brand-dark rounded-xl shadow-[4px_4px_0px_#2A2A2A] active:translate-y-1 active:shadow-[2px_2px_0px_#2A2A2A] transition-all flex items-center justify-between">
            Schedule
            <span className="text-brand-primary">→</span>
          </Link>

          <Link href="/our-story" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark p-4 bg-brand-light border-2 border-brand-dark rounded-xl shadow-[4px_4px_0px_#2A2A2A] active:translate-y-1 active:shadow-[2px_2px_0px_#2A2A2A] transition-all flex items-center justify-between">
            Our Story
            <span className="text-brand-primary">→</span>
          </Link>

          <Link href="/#faq" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark p-4 bg-brand-light border-2 border-brand-dark rounded-xl shadow-[4px_4px_0px_#2A2A2A] active:translate-y-1 active:shadow-[2px_2px_0px_#2A2A2A] transition-all flex items-center justify-between">
            FAQ
            <span className="text-brand-primary">→</span>
          </Link>
          
          {/* Mobile Buttons Area */}
          <div className="flex flex-col gap-4 mt-4 pt-6 border-t-4 border-brand-dark border-dashed">
            <Link href="/#login" onClick={() => setIsOpen(false)} className="text-center text-xl px-6 py-4 bg-brand-pink text-brand-dark border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#2A2A2A] transition-all">
              Login
            </Link>
            <Link href="/#waitlist" onClick={() => setIsOpen(false)} className="text-center text-xl px-6 py-4 bg-brand-yellow text-brand-dark border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#2A2A2A] transition-all">
              Get Started
            </Link>
          </div>
          
        </div>
      )}
    </nav>
  );
}