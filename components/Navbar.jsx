"use client";
import { useState } from 'react';
import Link from 'next/link'; // <-- IMPORT NEXT.JS LINK
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-brand-cream border-b-4 border-brand-dark shadow-[0px_4px_0px_rgba(42,42,42,1)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo - Links back to Home Page */}
        <Link href="/" className="flex items-center gap-2 relative group cursor-pointer">
          <div className="w-8 h-8 bg-brand-primary rounded-full border-2 border-brand-dark shadow-[2px_2px_0px_#2A2A2A] group-hover:-translate-y-1 transition-transform"></div>
          <span className="text-2xl font-black font-serif text-brand-dark tracking-wide">Rosebuddies.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-sans font-bold text-brand-dark">
          {/* 👇 Points to your new page in app/how-it-works/page.jsx */}
          <Link href="/how-it-works" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            How it Works
          </Link>
          
          {/* 👇 Uses "/#" so it routes back to home page if they are on the How It Works page */}
          <Link href="/#schedule" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            Schedule
          </Link>
          <Link href="/#faq" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all">
            FAQ
          </Link>
        </div>

        {/* Actions (Login & CTA) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/#login" className="px-6 py-2 bg-brand-cream text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#2A2A2A] hover:bg-brand-light transition-all">
            Login
          </Link>
          <Link href="/#waitlist" className="px-6 py-2 bg-brand-yellow text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#FD5E53] transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-brand-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-brand-pink border-b-4 border-brand-dark flex flex-col p-6 gap-4 shadow-xl font-bold font-sans">
          {/* 👇 Mobile Links Updated Too */}
          <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark border-b-2 border-brand-dark/10 pb-2">
            How it Works
          </Link>
          <Link href="/#schedule" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark border-b-2 border-brand-dark/10 pb-2">
            Schedule
          </Link>
          <Link href="/#faq" onClick={() => setIsOpen(false)} className="text-xl text-brand-dark border-b-2 border-brand-dark/10 pb-2">
            FAQ
          </Link>
          
          <div className="flex flex-col gap-4 mt-4">
            <Link href="/#login" onClick={() => setIsOpen(false)} className="text-center px-6 py-3 bg-brand-cream text-brand-dark border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] rounded-full">
              Login
            </Link>
            <Link href="/#waitlist" onClick={() => setIsOpen(false)} className="text-center px-6 py-3 bg-brand-yellow text-brand-dark border-2 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] rounded-full">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}