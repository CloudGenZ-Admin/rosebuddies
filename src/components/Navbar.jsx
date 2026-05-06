import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FDF8F5]/90 backdrop-blur-md border-b-4 border-[#2A2A2A] shadow-[0_4px_0px_#FD5E53] py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
        
        {/* Logo */}
        <a href="#" className="text-2xl md:text-3xl font-serif font-black text-[#2A2A2A] relative group">
          Find Your People
          <svg className="absolute -bottom-2 -left-1 w-[105%] h-3 text-[#E1AD01] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
            <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-[#2A2A2A]">
          <a href="#how-it-works" className="hover:text-[#FD5E53] hover:-translate-y-1 transition-all">How it Works</a>
          <a href="#experiences" className="hover:text-[#FD5E53] hover:-translate-y-1 transition-all">Experiences</a>
          <a href="#pricing" className="hover:text-[#FD5E53] hover:-translate-y-1 transition-all">Pricing</a>
          <a href="#waitlist" className="bg-[#2A2A2A] text-[#FAF9F6] px-6 py-3 rounded-xl border-2 border-[#2A2A2A] shadow-[4px_4px_0px_#FD5E53] hover:shadow-[6px_6px_0px_#E1AD01] hover:-translate-y-1 transition-all">
            Join Waitlist
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#2A2A2A]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF9F6] border-b-4 border-[#2A2A2A] shadow-[0_8px_0px_#FD5E53] flex flex-col p-6 gap-6 font-bold text-xl text-center">
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
          <a href="#experiences" onClick={() => setMobileMenuOpen(false)}>Experiences</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#waitlist" onClick={() => setMobileMenuOpen(false)} className="bg-[#FD5E53] text-[#FAF9F6] py-3 rounded-xl border-2 border-[#2A2A2A]">
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}