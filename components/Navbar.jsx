"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Mail, MapPin, ArrowRight, Heart, Sparkles, ChevronDown, Check } from 'lucide-react';

const OTTAWA_AREAS = [
  { id: "centretown", label: "Centretown / Downtown" },
  { id: "glebe", label: "The Glebe / Old Ottawa South" },
  { id: "westboro", label: "Westboro / Hintonburg" },
  { id: "kanata", label: "Kanata / Stittsville" },
  { id: "orleans", label: "Orléans" },
  { id: "barrhaven", label: "Barrhaven / Riverside South" },
  { id: "nepean", label: "Nepean" },
  { id: "gloucester", label: "Gloucester" },
  { id: "other", label: "Other / Just outside Ottawa" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // --- Waitlist Modal State ---
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState("idle"); // idle, submitting, success
  
  // --- Custom Dropdown State ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const dropdownRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isWaitlistOpen || isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isWaitlistOpen, isOpen]);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Waitlist Form Submission
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!selectedArea) {
      setIsDropdownOpen(true);
      return;
    }
    setWaitlistStatus("submitting");
    setTimeout(() => {
      setWaitlistStatus("success");
    }, 1500);
  };

  return (
    <>
      {/* Changed Navbar background to brand-light */}
      <nav className="fixed top-0 left-0 right-0 w-full z-40 bg-brand-light border-b-4 border-brand-dark shadow-[0px_4px_0px_#1A5415]">
        {/* Expanded max-w to 1536px to support 2xl screens naturally */}
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative group cursor-pointer z-50 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-primary rounded-full border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415] group-hover:-translate-y-1 transition-transform flex items-center justify-center shrink-0">
              <Heart size={14} className="text-brand-dark fill-brand-dark" />
            </div>
            {/* Logo text fluid scaling */}
            <span className="text-[22px] sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-black font-serif text-brand-dark tracking-wide">
              Rosebuddies.
            </span>
          </Link>

          {/* Desktop Links - Scales down at 1024px (lg) to fit, expands at 1280px (xl) */}
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

          {/* Actions (Desktop) - Button sizes scale proportionally */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <Link href="/login" className="lg:px-4 lg:py-2 xl:px-6 xl:py-2.5 bg-brand-cream text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all whitespace-nowrap cursor-pointer lg:text-sm xl:text-base">
              Login
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

        {/* Mobile Menu Overlay & Panel */}
        <div className={`lg:hidden fixed inset-0 top-20 bg-brand-dark/40 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsOpen(false)}></div>

        {/* Mobile Menu background to brand-light to match navbar */}
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
            <Link href="/login" onClick={() => setIsOpen(false)} className="text-center text-lg sm:text-xl md:text-2xl px-6 py-3.5 sm:py-4 bg-brand-cream text-brand-dark border-2 sm:border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] sm:active:shadow-[4px_4px_0px_#1A5415] transition-all cursor-pointer">
              Login
            </Link>
            <button 
              onClick={() => { setIsOpen(false); setIsWaitlistOpen(true); }} 
              className="text-center text-lg sm:text-xl md:text-2xl px-6 py-3.5 sm:py-4 bg-brand-primary text-brand-dark border-2 sm:border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] sm:active:shadow-[4px_4px_0px_#1A5415] transition-all flex justify-center items-center gap-2 cursor-pointer"
            >
              Join The Movement
            </button>
          </div>
        </div>
      </nav>

      {/* --- WAITLIST MODAL --- */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
            onClick={() => setIsWaitlistOpen(false)}
          ></div>

          {/* Modal Container - Scales perfectly from w-[95%] on mobile to lg:max-w-xl on desktop */}
          <div className="bg-brand-cream border-4 border-brand-dark rounded-[20px] sm:rounded-[24px] shadow-[6px_6px_0px_#1A5415] sm:shadow-[8px_8px_0px_#1A5415] w-[95%] sm:w-full sm:max-w-md md:max-w-lg lg:max-w-xl relative z-10 flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsWaitlistOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-light rounded-xl md:rounded-2xl border-2 sm:border-4 border-brand-dark shadow-[2px_2px_0px_#1A5415] md:shadow-[4px_4px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] hover:bg-brand-primary transition-all z-20 cursor-pointer"
            >
              <X size={20} className="text-brand-dark md:w-6 md:h-6" strokeWidth={3} />
            </button>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-8 md:p-10 custom-scrollbar">
              {waitlistStatus === "success" ? (
                /* Success State */
                <div className="text-center py-6 sm:py-10 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415]">
                    <Sparkles size={32} className="text-brand-dark md:w-12 md:h-12" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-brand-dark mb-3 sm:mb-4 md:mb-5">You're on the list!</h3>
                  <p className="text-base sm:text-lg md:text-xl font-bold font-sans text-brand-dark/80 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                    Keep an eye on your inbox. We'll let you know as soon as we start hosting <strong className="text-brand-dark">real-life meetups</strong> in your area.
                  </p>
                  <button 
                    onClick={() => {
                      setIsWaitlistOpen(false);
                      setTimeout(() => setWaitlistStatus("idle"), 300);
                    }}
                    className="w-full bg-brand-light text-brand-dark font-black text-lg sm:text-xl md:text-2xl py-3.5 sm:py-4 md:py-5 rounded-xl md:rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] md:hover:shadow-[8px_8px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all cursor-pointer"
                  >
                    Awesome, Thanks!
                  </button>
                </div>
              ) : (
                /* Form State */
                <>
                  <div className="mb-5 sm:mb-6 md:mb-8 pr-10 sm:pr-12">
                    <div className="inline-block bg-brand-primary px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-md border-2 border-brand-dark font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-wide mb-3 sm:mb-4 md:mb-5 -rotate-2">
                      Log Off. Show Up. Belong.
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-brand-dark mb-2 sm:mb-3 md:mb-4 leading-tight">
                      Join The Movement
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-bold font-sans text-brand-dark/80 leading-snug">
                      We're bringing real connection back to Ottawa. Tell us your neighborhood!
                    </p>
                  </div>

                  <form onSubmit={handleWaitlistSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 pb-2">
                    {/* Email Field */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="email" className="block font-black text-brand-dark text-xs sm:text-sm md:text-base uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 text-brand-dark/50 group-focus-within:text-brand-dark transition-colors md:w-6 md:h-6" size={20} strokeWidth={2.5} />
                        <input 
                          type="email" 
                          id="email" 
                          required
                          placeholder="you@example.com"
                          className="w-full pl-10 sm:pl-12 md:pl-14 pr-4 py-3 sm:py-3.5 md:py-4 bg-brand-light border-4 border-brand-dark rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-xl text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-0 focus:bg-white transition-colors shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] focus:shadow-[2px_2px_0px_#1A5415] focus:translate-y-[2px]"
                        />
                      </div>
                    </div>

                    {/* Perfect Custom Dropdown */}
                    <div className="space-y-1.5 sm:space-y-2" ref={dropdownRef}>
                      <label className="block font-black text-brand-dark text-xs sm:text-sm md:text-base uppercase tracking-wide">
                        Your Ottawa Area
                      </label>
                      <div className="relative">
                        {/* Hidden required input for native form validation */}
                        <input type="text" required value={selectedArea} className="absolute opacity-0 w-0 h-0 pointer-events-none" readOnly />

                        {/* Dropdown Toggle Button */}
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full cursor-pointer flex items-center justify-between pl-10 sm:pl-12 md:pl-14 pr-4 py-3 sm:py-3.5 md:py-4 border-4 border-brand-dark font-bold text-base sm:text-lg md:text-xl transition-all ${
                            isDropdownOpen 
                              ? "bg-white rounded-t-xl md:rounded-t-2xl border-b-0 shadow-none translate-y-[2px]" 
                              : "bg-brand-light rounded-xl md:rounded-2xl shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1A5415] md:hover:shadow-[8px_8px_0px_#1A5415]"
                          } ${selectedArea ? "text-brand-dark" : "text-brand-dark/50"}`}
                        >
                          <MapPin className={`absolute left-3.5 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 transition-colors md:w-6 md:h-6 ${isDropdownOpen || selectedArea ? "text-brand-dark" : "text-brand-dark/50"}`} size={20} strokeWidth={2.5} />
                          
                          <span className="truncate pr-2 text-left w-full">
                            {selectedArea ? OTTAWA_AREAS.find(a => a.id === selectedArea)?.label : "Select neighborhood..."}
                          </span>
                          
                          <ChevronDown 
                            className={`transition-transform duration-300 text-brand-dark shrink-0 md:w-6 md:h-6 ${isDropdownOpen ? "rotate-180" : ""}`} 
                            size={20} 
                            strokeWidth={3} 
                          />
                        </button>

                        {/* Dropdown Options List */}
                        {isDropdownOpen && (
                          <div className="absolute z-50 left-0 right-0 top-full bg-white border-4 border-brand-dark rounded-b-xl md:rounded-b-2xl border-t-0 shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] max-h-[180px] sm:max-h-[220px] md:max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-in slide-in-from-top-2 duration-200">
                            <ul className="flex flex-col">
                              {OTTAWA_AREAS.map((area) => (
                                <li key={area.id}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedArea(area.id);
                                      setIsDropdownOpen(false);
                                    }}
                                    className={`w-full cursor-pointer flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 transition-all duration-200 focus:outline-none text-left font-bold text-sm sm:text-base md:text-lg border-b-2 border-brand-dark/10 last:border-b-0
                                      ${selectedArea === area.id 
                                        ? "bg-brand-primary/30 text-brand-dark pl-5 md:pl-8" 
                                        : "text-brand-dark/80 hover:bg-brand-primary hover:text-brand-dark hover:pl-6 md:hover:pl-8 focus:bg-brand-primary focus:pl-6 md:focus:pl-8"
                                      }`}
                                  >
                                    <span className="truncate pr-4">{area.label}</span>
                                    {selectedArea === area.id && (
                                      <Check size={18} strokeWidth={3} className="text-brand-dark shrink-0 md:w-6 md:h-6" />
                                    )}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 sm:pt-5 md:pt-6">
                      <button 
                        type="submit" 
                        disabled={waitlistStatus === "submitting"}
                        className="w-full bg-brand-primary text-brand-dark font-black text-lg sm:text-xl md:text-2xl py-3.5 sm:py-4 md:py-5 rounded-xl md:rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] md:hover:shadow-[8px_8px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all flex justify-center items-center gap-3 cursor-pointer disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:translate-y-0 disabled:shadow-[4px_4px_0px_#1A5415] md:disabled:shadow-[6px_6px_0px_#1A5415] disabled:cursor-not-allowed group"
                      >
                        {waitlistStatus === "submitting" ? (
                          "Submitting..."
                        ) : (
                          <>Count Me In <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-1 transition-transform md:w-7 md:h-7" /></>
                        )}
                      </button>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-center text-brand-dark/60 pt-3 sm:pt-4 md:pt-5">
                        No algorithms. No spam. Just real human connection.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Global styles for custom scrollbar within this component scope */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-left: 2px dashed rgba(26, 84, 21, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(26, 84, 21, 0.4);
          border: 2px solid #FEFDF7; /* Matches brand-cream visually */
          border-radius: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #1A5415;
        }
      `}} />
    </>
  );
}