"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, X, ArrowRight, Heart, ChevronDown, 
  LogOut, LayoutDashboard, Users, Settings, User 
} from 'lucide-react';
import WaitlistModal from './WaitlistModal'; // Adjust import path if needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false); // Waitlist modal state
  
  // Auth & Dropdown States
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Handle Client-Side Hydration and Auth Check
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  // Handle click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    setIsOpen(false);
    router.push('/');
  };

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
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 relative">
            
            {/* Display loading skeleton or nothing before mounted to avoid hydration mismatch */}
            {mounted && (
              isLoggedIn ? (
                // --- LOGGED IN STATE (DESKTOP) ---
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 lg:px-2 lg:py-1 xl:px-3 xl:py-1.5 bg-brand-light text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all cursor-pointer"
                  >
                    {user?.photoUrl ? (
                      <img src={user.photoUrl} alt="Profile" className="w-8 h-8 rounded-full border-2 border-brand-dark object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center border-2 border-brand-dark">
                        <User size={16} strokeWidth={2.5} />
                      </div>
                    )}
                    <span className="hidden xl:block max-w-[100px] truncate pr-1">
                      {user?.firstName || 'Profile'}
                    </span>
                    <ChevronDown size={18} strokeWidth={3} className={`mr-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute right-0 top-full mt-4 w-64 bg-brand-light border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] rounded-xl flex flex-col overflow-hidden z-50 transition-all origin-top-right ${isDropdownOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                    
                    {/* User Info Header inside Dropdown */}
                    <div className="px-4 py-3 border-b-4 border-brand-dark bg-brand-cream">
                      <p className="font-bold text-brand-dark truncate">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs font-semibold text-brand-dark opacity-70 truncate">{user?.email}</p>
                    </div>

                    <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="px-4 py-3 border-b-2 border-brand-dark hover:bg-brand-cream hover:pl-6 transition-all flex items-center gap-3 font-bold text-brand-dark cursor-pointer">
                      <LayoutDashboard size={18} strokeWidth={2.5} /> My Dashboard
                    </Link>
                    <Link href="/circles" onClick={() => setIsDropdownOpen(false)} className="px-4 py-3 border-b-2 border-brand-dark hover:bg-brand-cream hover:pl-6 transition-all flex items-center gap-3 font-bold text-brand-dark cursor-pointer">
                      <Users size={18} strokeWidth={2.5} /> My Circle
                    </Link>
                    <Link href="/preferences" onClick={() => setIsDropdownOpen(false)} className="px-4 py-3 border-b-2 border-brand-dark hover:bg-brand-cream hover:pl-6 transition-all flex items-center gap-3 font-bold text-brand-dark cursor-pointer">
                      <Settings size={18} strokeWidth={2.5} /> My Preferences
                    </Link>
                    <button onClick={handleLogout} className="px-4 py-3 hover:bg-red-100 hover:pl-6 transition-all flex items-center gap-3 font-bold text-red-600 w-full text-left cursor-pointer">
                      <LogOut size={18} strokeWidth={2.5} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                // --- LOGGED OUT STATE (DESKTOP) ---
                <>
                  <Link href="/login" className="lg:px-4 lg:py-2 xl:px-6 xl:py-2.5 bg-brand-light text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all whitespace-nowrap cursor-pointer lg:text-sm xl:text-base">
                    Login
                  </Link>
                  <Link href="/signup" className="lg:px-4 lg:py-2 xl:px-6 xl:py-2.5 bg-brand-cream text-brand-dark font-bold font-sans rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all whitespace-nowrap cursor-pointer lg:text-sm xl:text-base">
                    Sign Up
                  </Link>
                </>
              )
            )}
            
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
        <div className={`lg:hidden fixed top-20 left-0 right-0 bg-brand-light border-b-4 border-brand-dark flex flex-col p-5 sm:p-8 md:p-10 gap-4 sm:gap-6 shadow-[0px_8px_0px_#1A5415] font-bold font-sans z-50 max-h-[calc(100vh-5rem)] overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-[150%]'}`}>
          
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
            
            {mounted && (
              isLoggedIn ? (
                // --- LOGGED IN STATE (MOBILE) ---
                <div className="flex flex-col border-2 sm:border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] rounded-xl overflow-hidden bg-brand-light">
                  {/* Mobile Profile Header */}
                  <div className="flex items-center gap-4 p-4 border-b-2 sm:border-b-4 border-brand-dark bg-brand-cream">
                    {user?.photoUrl ? (
                      <img src={user.photoUrl} alt="Profile" className="w-12 h-12 rounded-full border-2 border-brand-dark object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center border-2 border-brand-dark">
                        <User size={24} strokeWidth={2.5} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-xl truncate">{user?.firstName || 'User'} {user?.lastName}</div>
                      <div className="text-sm font-semibold opacity-70 truncate">{user?.email}</div>
                    </div>
                  </div>
                  
                  {/* Mobile Dropdown Links */}
                  <div className="flex flex-col">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="px-5 py-4 border-b-2 sm:border-b-4 border-brand-dark flex items-center gap-3 text-lg font-black text-brand-dark active:bg-brand-cream transition-colors">
                      <LayoutDashboard size={22} strokeWidth={2.5} /> My Dashboard
                    </Link>
                    <Link href="/circles" onClick={() => setIsOpen(false)} className="px-5 py-4 border-b-2 sm:border-b-4 border-brand-dark flex items-center gap-3 text-lg font-black text-brand-dark active:bg-brand-cream transition-colors">
                      <Users size={22} strokeWidth={2.5} /> My Circle
                    </Link>
                    <Link href="/preferences" onClick={() => setIsOpen(false)} className="px-5 py-4 border-b-2 sm:border-b-4 border-brand-dark flex items-center gap-3 text-lg font-black text-brand-dark active:bg-brand-cream transition-colors">
                      <Settings size={22} strokeWidth={2.5} /> My Preferences
                    </Link>
                    <button onClick={handleLogout} className="px-5 py-4 flex items-center gap-3 text-lg font-black text-red-600 active:bg-red-100 transition-colors text-left w-full">
                      <LogOut size={22} strokeWidth={2.5} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                // --- LOGGED OUT STATE (MOBILE) ---
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
              )
            )}
            
            <button 
              onClick={() => { setIsOpen(false); setIsWaitlistOpen(true); }} 
              className="w-full text-center text-lg sm:text-xl md:text-2xl px-6 py-3.5 sm:py-4 bg-brand-primary text-brand-dark border-2 sm:border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] sm:shadow-[6px_6px_0px_#1A5415] rounded-xl active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] sm:active:shadow-[4px_4px_0px_#1A5415] transition-all flex justify-center items-center gap-2 cursor-pointer mb-4"
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