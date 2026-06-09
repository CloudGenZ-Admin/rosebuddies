"use client";
import { Heart } from 'lucide-react';
import Navbar from "../../components/Navbar"; // Adjust import path based on your folder structure
import Footer from "../../components/Footer"; // Adjust import path based on your folder structure

export default function DetailedHowItWorksPage() {
  return (
    <main className="bg-brand-light min-h-screen">
      <Navbar />
      
      {/* Spacer for sticky navbar */}
      <div className="pt-32"></div>

      {/* --- INTRO: No Algorithm --- */}
      <section className="py-12 relative z-30">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative mb-24">
          <div className="absolute -top-10 -right-10 opacity-10 text-brand-primary pointer-events-none">
            <Heart size={200} fill="currentColor" stroke="none" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-brand-dark mb-6 relative inline-block">
            How Rosebuddies Works
            <svg className="absolute -bottom-4 -left-4 w-[110%] h-6 -z-10 text-brand-yellow" viewBox="0 0 200 20" fill="none">
              <path d="M5 10 Q 100 20 195 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            </svg>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-8 mt-12">Friendship Was Never Meant To Be Decided by An Algorithm</h2>
          
          <div className="text-xl md:text-2xl font-medium font-sans leading-relaxed text-brand-dark/80 space-y-6">
            <p>Most friendship platforms ask you to create a profile, answer questions, and trust an algorithm to decide who you should meet.</p>
            <p className="font-bold text-brand-dark text-3xl">We believe there is a better way.</p>
            <p>At Rosebuddies, we create opportunities for people to meet naturally, build genuine connections, and develop meaningful friendships through real-life experiences, shared interests, positive energy, and authentic conversations.</p>
            <p>We believe no algorithm can predict chemistry, connection, or friendship. Some of life's best relationships begin unexpectedly, with a simple conversation, a shared laugh, or a chance encounter.</p>
            <ul className="text-brand-primary font-bold text-2xl md:text-3xl space-y-2 py-4">
              <li className="line-through decoration-brand-dark decoration-4">No matching systems</li>
              <li className="line-through decoration-brand-dark decoration-4">No compatibility scores</li>
              <li className="line-through decoration-brand-dark decoration-4">No endless scrolling</li>
              <li className="line-through decoration-brand-dark decoration-4">No swiping</li>
            </ul>
            <p>We don't want to rob you of the experience of meeting someone organically.</p>
            <p>Our Friendship Clubs and Curated Experiences are built around shared interests and real-world interaction. We create the space, facilitate the experience, and support the journey.</p>
            <p className="font-bold text-brand-dark text-2xl md:text-3xl p-8 bg-brand-cream border-4 border-brand-dark shadow-[8px_8px_0px_#E1AD01] rounded-2xl transform rotate-1 mt-8">
              The rest is up to you. Because friendship was never meant to be an algorithm. It was always meant to happen naturally.
            </p>
          </div>
        </div>
      </section>

      {/* --- THE 4 STEPS DEEP DIVE --- */}
      <section className="py-12 pb-32 bg-brand-cream border-t-4 border-dashed border-brand-dark z-20 relative">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-16 mt-16">
            
          {/* STEP 1 */}
          <div className="bg-brand-light rounded-[32px] p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-primary transform -rotate-1 relative">
            <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-yellow border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px] shadow-brand-dark">1</div>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-dark mb-2">Step 1: Start With a Meet & Greet</h3>
            <p className="text-2xl font-black text-brand-primary mb-6">$25 One-Time Experience</p>
            
            <div className="text-xl font-medium text-brand-dark/80 font-sans leading-relaxed space-y-4">
              <p>Every Rosebuddies journey begins with a Meet & Greet. Our Meet & Greets are welcoming social gatherings designed to help people connect naturally in a relaxed, pressure-free environment.</p>
              <p>You'll meet new people, join guided conversations, and discover shared interests without awkward networking or forced introductions.</p>
              <p className="font-bold text-brand-dark text-2xl">Most people attend alone.<br/>That's exactly why we're here.</p>
              
              <div className="mt-8 bg-brand-pink-light p-8 rounded-2xl border-4 border-brand-dark transform rotate-1">
                <h4 className="font-bold text-brand-dark mb-4 text-2xl">What's Included:</h4>
                <ul className="space-y-3 font-bold text-xl text-brand-dark/90">
                  <li>✓ Facilitated introductions</li>
                  <li>✓ Icebreakers and conversation prompts</li>
                  <li>✓ experienced Community hosts</li>
                  <li>✓ A welcoming environment</li>
                  <li>✓ Opportunities to meet potential Friendship Circle members</li>
                </ul>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-brand-pink rounded-[32px] p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark transform rotate-1 relative">
            <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-cream border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif text-brand-dark shadow-[4px_4px_0px] shadow-brand-dark">2</div>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-dark mb-6">Step 2: Find Your People</h3>
            
            <div className="text-xl font-medium text-brand-dark/90 font-sans leading-relaxed space-y-4">
              <p>Meaningful friendships rarely happen in a single conversation.</p>
              <p>That's why Rosebuddies focuses on helping people discover connections through shared experiences and repeated interactions.</p>
              <p>At your Meet & Greet, you'll naturally gravitate towards people you enjoy spending time with.</p>
              
              <div className="bg-brand-light p-6 mt-6 rounded-2xl border-2 border-brand-dark inline-block shadow-[4px_4px_0px_#2A2A2A] -rotate-2">
                <p className="font-black text-2xl md:text-3xl text-brand-primary uppercase tracking-wide">
                  No compatibility scores.<br/>
                  No personality tests.<br/>
                  <span className="text-brand-dark">Just authentic human connection.</span>
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3 - BIG DIVE */}
          <div className="bg-brand-yellow rounded-[32px] p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark relative mt-8">
            <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-primary text-brand-cream border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif shadow-[4px_4px_0px] shadow-brand-dark">3</div>
            
            <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Step 3: Choose Your Path</h3>
            <p className="text-2xl font-bold text-brand-dark/80 font-sans mb-12">After your Meet & Greet, you can continue your journey in one of two ways.</p>

            <div className="flex flex-col gap-12">
              
              {/* Option A (Clubs) */}
              <div className="bg-brand-cream p-8 md:p-12 rounded-[32px] border-4 border-brand-dark relative shadow-[6px_6px_0px_#2A2A2A]">
                <div className="absolute -top-4 -right-4 bg-brand-primary text-brand-cream font-black px-6 py-2 border-4 border-brand-dark rotate-3 shadow-[4px_4px_0px] shadow-brand-dark text-xl">OPTION A</div>
                <h4 className="text-3xl md:text-4xl font-serif font-black text-brand-dark">Join a Friendship Club</h4>
                <p className="text-2xl font-black text-brand-primary mb-6 mt-2">Starting at $40/month</p>
                <p className="text-xl font-medium font-sans mb-8 text-brand-dark/90">Friendship Circles are recurring communities built around shared interests and regular gatherings. Our founding clubs include:</p>
                
                <ul className="space-y-6 font-sans text-brand-dark/90 mb-12 text-lg">
                  <li className="bg-brand-light p-4 rounded-xl border-2 border-brand-dark"><strong className="text-brand-primary text-2xl block mb-1">🍽️ Dinner Club</strong> Connect over great food and even better conversations.</li>
                  <li className="bg-brand-light p-4 rounded-xl border-2 border-brand-dark"><strong className="text-brand-primary text-2xl block mb-1">🚶 Walk & Talk Club</strong> Fresh air, movement, and genuine conversations.</li>
                  <li className="bg-brand-light p-4 rounded-xl border-2 border-brand-dark"><strong className="text-brand-primary text-2xl block mb-1">☕ Coffee Meetup Club</strong> Casual meetups designed to turn familiar faces into lasting friendships.</li>
                  <li className="bg-brand-light p-4 rounded-xl border-2 border-brand-dark"><strong className="text-brand-primary text-2xl block mb-1">🗣️ Golden Years Club</strong> Retired, semi-retired or an empty nester Golden Years Club offers opportunities to enjoy life's next chapter together.</li>
                </ul>

                <div className="bg-brand-pink-light p-8 rounded-2xl border-4 border-brand-dark border-dashed">
                  <h5 className="font-black text-2xl mb-6 font-serif">Membership Options</h5>
                  <ul className="space-y-4 font-bold text-xl">
                    <li className="flex justify-between items-center border-b-2 border-brand-dark/10 pb-2"><span className="bg-brand-cream px-4 py-1 rounded-md border-2 border-brand-dark">Monthly</span> <span>$40/month</span></li>
                    <li className="flex justify-between items-center border-b-2 border-brand-dark/10 pb-2"><span className="bg-brand-cream px-4 py-1 rounded-md border-2 border-brand-dark">3-Month Circle</span> <span className="text-brand-primary font-black">Save 10%</span></li>
                    <li className="flex justify-between items-center border-b-2 border-brand-dark/10 pb-2"><span className="bg-brand-cream px-4 py-1 rounded-md border-2 border-brand-dark">6-Month Circle</span> <span className="text-brand-primary font-black">Save 15%</span></li>
                    <li className="flex justify-between items-center border-b-2 border-brand-dark/10 pb-2"><span className="bg-brand-cream px-4 py-1 rounded-md border-2 border-brand-dark">12-Month Circle</span> <span className="text-brand-primary font-black">Save 20%</span></li>
                  </ul>
                  <p className="mt-6 text-lg font-black text-center text-brand-dark bg-brand-yellow p-3 border-2 border-brand-dark rounded-xl uppercase tracking-wider -rotate-1">The longer you commit, the more you save.</p>
                </div>
              </div>

              {/* Option B (Experiences) */}
              <div className="bg-brand-dark text-brand-cream p-8 md:p-12 rounded-[32px] border-4 border-brand-dark relative shadow-[6px_6px_0px_#2A2A2A]">
                <div className="absolute -top-4 -right-4 bg-brand-pink text-brand-dark font-black px-6 py-2 border-4 border-brand-dark -rotate-3 shadow-[4px_4px_0px] shadow-brand-dark text-xl">OPTION B</div>
                <h4 className="text-3xl md:text-4xl font-serif font-black text-brand-cream">Join a Curated Experience</h4>
                <p className="text-2xl font-black text-brand-yellow mb-6 mt-2">$250 Experience Pass</p>
                <p className="text-xl font-medium font-sans mb-8 text-brand-cream/90">Prefer smaller groups and a more intimate experience? Our Curated Experiences are designed for people who want to build deeper connections within a small group setting.</p>
                
                <div className="bg-brand-cream text-brand-dark p-8 rounded-2xl border-4 border-brand-dark mb-6 transform rotate-1">
                  <h5 className="font-black text-2xl mb-4 font-serif">Each Curated Experience includes:</h5>
                  <ul className="space-y-3 font-bold text-xl text-brand-dark/90">
                    <li>✓ 5 weeks</li>
                    <li>✓ 1 experience per week</li>
                    <li>✓ 8–12 participants</li>
                    <li>✓ Professionally organized activities</li>
                    <li>✓ Facilitated introductions and group engagement</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* STEP 4 */}
          <div className="bg-brand-primary text-brand-cream rounded-[32px] p-8 md:p-14 border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark transform -rotate-1 relative mt-8">
            <div className="absolute -top-6 -left-6 md:-left-12 w-16 h-16 bg-brand-accent text-brand-dark border-4 border-brand-dark rounded-full flex items-center justify-center text-3xl font-black font-serif shadow-[4px_4px_0px] shadow-brand-dark">4</div>
            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-brand-yellow">Step 4: Build Your Circle</h3>
            
            <div className="text-2xl font-medium font-sans leading-relaxed space-y-6">
              <p className="text-3xl font-bold font-serif">This is where the magic happens.</p>
              <p>Over time, familiar faces become trusted friends.<br/>Conversations become connections.<br/>Connections become community.</p>
              <p>Whether you choose a Friendship Club, a Curated Experience, or both, Rosebuddies is designed to help you move beyond introductions and towards something many adults are searching for:</p>
              
              <div className="bg-brand-dark p-6 rounded-2xl border-4 border-brand-yellow transform rotate-2 inline-block shadow-[6px_6px_0px_#E1AD01] mt-4">
                <p className="text-3xl font-black text-brand-pink tracking-wide">A genuine sense of belonging.</p>
              </div>
              
              <div className="pt-12 border-t-4 border-dashed border-brand-cream/30 mt-8 text-center">
                <p className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-wide bg-brand-yellow inline-block px-6 py-2 border-4 border-brand-dark shadow-[4px_4px_0px_#FAF9F6] -rotate-2">
                  Less Scrolling.<br/>More Living.
                </p>
                <p className="mt-8 text-brand-cream text-xl max-w-2xl mx-auto">Rosebuddies isn't another app designed to keep you online. It's a community designed to bring you back to real life. <br/><br/><span className="text-brand-yellow font-black text-3xl">Log off. Show up.</span></p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}