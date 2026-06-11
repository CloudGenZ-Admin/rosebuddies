"use client";
import Link from 'next/link';
import { Heart, Users, Coffee, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-brand-light min-h-screen overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="pt-24 md:pt-32"></div>

      {/* --- HERO SECTION --- */}
      <section className="py-12 relative z-30">
        <div className="max-w-5xl mx-auto px-5 md:px-12 relative">
          <div className="absolute -top-10 -right-4 md:-right-10 opacity-10 text-brand-primary pointer-events-none z-0">
            <Users size={150} fill="currentColor" stroke="none" className="w-24 h-24 md:w-40 md:h-40" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-block bg-brand-primary px-4 py-2 border-4 border-brand-dark rounded-full mb-6 shadow-[4px_4px_0px_#1A5415] -rotate-1 font-bold tracking-wide uppercase text-sm sm:text-base">
              Our Story
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-brand-dark mb-6 relative inline-block leading-tight">
              We're not another friendship app.
              <br />
              <span className="relative inline-block mt-2">
                We're a movement.
                <svg className="absolute -bottom-2 -left-2 w-[110%] h-3 md:h-5 -z-10 text-brand-secondary" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                  <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-serif text-brand-lime-dark mb-8 mt-4 leading-tight max-w-3xl">
              Most platforms are trying to solve loneliness with technology. We solve it by helping people spend less time on technology.
            </h2>
          </div>
        </div>
      </section>

      {/* --- THE PROBLEM VS SOLUTION --- */}
      <section className="py-12 bg-brand-cream border-t-4 border-dashed border-brand-dark relative z-20">
        <div className="max-w-6xl mx-auto px-5 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* The Status Quo */}
          <div className="bg-brand-light p-6 sm:p-8 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] flex flex-col h-full transform md:-rotate-1">
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-brand-dark mb-4 border-b-4 border-brand-dark pb-4">The Old Way</h3>
            <ul className="space-y-4 font-bold text-lg text-brand-dark/80 flex-grow pt-2">
              <li className="flex gap-3"><span className="text-red-500 text-xl">✖</span> Matching people with algorithms</li>
              <li className="flex gap-3"><span className="text-red-500 text-xl">✖</span> Spending hours swiping screens</li>
              <li className="flex gap-3"><span className="text-red-500 text-xl">✖</span> Predicting compatibility scores</li>
              <li className="flex gap-3"><span className="text-red-500 text-xl">✖</span> Endless chatting with no meetups</li>
            </ul>
          </div>

          {/* The Rosebuddies Way */}
          <div className="bg-brand-dark text-brand-cream p-6 sm:p-8 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#9FD62A] flex flex-col h-full transform md:rotate-1">
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-brand-primary mb-4 border-b-4 border-brand-primary/30 pb-4">The Rosebuddies Way</h3>
            <ul className="space-y-4 font-bold text-lg text-brand-cream/90 flex-grow pt-2">
              <li className="flex gap-3"><span className="text-brand-primary text-xl">✓</span> Real people</li>
              <li className="flex gap-3"><span className="text-brand-primary text-xl">✓</span> Real conversations</li>
              <li className="flex gap-3"><span className="text-brand-primary text-xl">✓</span> Organic connections</li>
              <li className="flex gap-3"><span className="text-brand-primary text-xl">✓</span> Shared experiences</li>
            </ul>
            <div className="mt-6 bg-brand-primary text-brand-dark p-3 rounded-xl border-2 border-brand-dark font-black text-center text-xl uppercase tracking-wide">
              Less Scrolling. More Living.
            </div>
          </div>

        </div>
      </section>

      {/* --- WHAT WE BELIEVE --- */}
      <section className="py-16 md:py-24 relative z-10 bg-brand-light">
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-dark">What We Believe</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            
            <div className="bg-brand-secondary p-8 rounded-[24px] border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1A5415] transition-all duration-300">
              <Coffee size={40} className="mb-4 text-brand-dark" strokeWidth={2.5} />
              <h3 className="text-2xl font-black font-serif text-brand-dark mb-3">People are not algorithms.</h3>
              <p className="text-lg font-medium text-brand-dark/80">
                Friendships cannot be categorized, calculated, or predicted. The beauty of human connection lies in its spontaneity, not its code.
              </p>
            </div>

            <div className="bg-brand-accent p-8 rounded-[24px] border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1A5415] transition-all duration-300 transform md:translate-y-6">
              <Sparkles size={40} className="mb-4 text-brand-dark" strokeWidth={2.5} />
              <h3 className="text-2xl font-black font-serif text-brand-dark mb-3">Unexpected is better.</h3>
              <p className="text-lg font-medium text-brand-dark/80">
                The best friendships often come from unexpected conversations, a shared laugh, and simply showing up to life.
              </p>
            </div>

            <div className="bg-brand-cream p-8 rounded-[24px] border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1A5415] transition-all duration-300">
              <Users size={40} className="mb-4 text-brand-dark" strokeWidth={2.5} />
              <h3 className="text-2xl font-black font-serif text-brand-dark mb-3">Organic connection matters.</h3>
              <p className="text-lg font-medium text-brand-dark/80">
                We exist to bring back organic human connection. We create the spaces, you bring the energy.
              </p>
            </div>

            <div className="bg-brand-primary p-8 rounded-[24px] border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1A5415] transition-all duration-300 transform md:translate-y-6">
              <Heart size={40} className="mb-4 text-brand-dark" strokeWidth={2.5} />
              <h3 className="text-2xl font-black font-serif text-brand-dark mb-3">Community over clicks.</h3>
              <p className="text-lg font-medium text-brand-dark/80">
                We aren't building a user base; we are building a community. A place to be known, respected, and valued.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- OUTRO CTA --- */}
      <section className="py-20 md:py-32 relative z-20 text-center px-5 bg-brand-dark border-t-8 border-brand-lime-dark">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-brand-cream mb-8 leading-tight">
            Log Off.<br/>
            Show Up.<br/>
            <span className="text-brand-primary">Belong.</span>
          </h2>
          
          <p className="text-xl md:text-2xl font-medium font-sans text-brand-light/80 mb-10 max-w-2xl">
            In a world designed to keep us scrolling, Rosebuddies helps people start living again. Your people are closer than you think.
          </p>
          
          <button 
            onClick={() => document.querySelector('nav button').click()} // Quick hack to open waitlist from navbar
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-brand-dark font-black text-xl md:text-2xl rounded-full border-4 border-brand-dark shadow-[6px_6px_0px_#9FD62A] hover:-translate-y-2 hover:shadow-[8px_8px_0px_#9FD62A] transition-all"
          >
            Join The Movement <ArrowRight size={28} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}