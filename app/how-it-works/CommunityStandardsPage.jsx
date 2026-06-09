"use client";
import { ShieldCheck, Heart, AlertTriangle, Users, Lock, MessageSquare, Handshake, Info } from 'lucide-react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import WaitlistForm from "./WaitlistForm";

export default function CommunityStandardsPage() {
  return (
    <main className="bg-brand-light min-h-screen">
      <Navbar />
      
      {/* Spacer for sticky navbar */}
      <div className="pt-32"></div>

      {/* --- INTRO SECTION --- */}
      <section className="py-16 px-6 md:px-12 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-pink rounded-full border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A] mb-8">
            <Heart size={36} className="text-brand-primary" fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-dark mb-8">Belonging, Respect & Community Standards</h1>
          
          <div className="text-xl md:text-2xl font-serif leading-relaxed text-brand-dark/80 space-y-6">
            <p>At Rosebuddies, we believe meaningful friendships can only grow in environments where people feel safe, respected, valued, and included.</p>
            <p>Our goal is not simply to help people meet. Our goal is to create a community where people can build genuine connections and experience a true sense of belonging.</p>
            <p className="font-bold text-brand-dark bg-brand-yellow inline-block px-4 py-2 border-2 border-brand-dark rounded-xl transform rotate-1 mt-4 shadow-[4px_4px_0px_#2A2A2A]">
              By joining Rosebuddies, every member agrees to help create that environment.
            </p>
          </div>
        </div>
      </section>

      {/* --- THE STANDARDS LIST --- */}
      <section className="py-16 px-6 md:px-12 relative z-30">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          {/* Section 1 */}
          <div className="bg-brand-cream p-8 md:p-12 rounded-[32px] border-4 border-brand-dark shadow-[8px_8px_0px_#E1AD01] relative transform -rotate-1">
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck size={32} className="text-brand-accent" />
              <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-dark">Safe Spaces, Real-Life Connections</h2>
            </div>
            <p className="text-xl font-medium font-sans text-brand-dark/80 leading-relaxed mb-4">
              Rosebuddies experiences take place in public venues, organized group settings, or approved community spaces designed to encourage comfortable and meaningful interactions.
            </p>
            <p className="text-xl font-medium font-sans text-brand-dark/80 leading-relaxed">
              For everyone's safety, we encourage members to get to know one another through Rosebuddies experiences before arranging private meetups independently.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-brand-pink p-8 md:p-12 rounded-[32px] border-4 border-brand-dark shadow-[8px_8px_0px_#2A2A2A] relative transform rotate-1">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle size={32} className="text-brand-dark" />
              <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-dark">Respect Is Non-Negotiable</h2>
            </div>
            <p className="text-xl font-bold font-sans text-brand-dark mb-6">Every member deserves to be treated with dignity and respect.</p>
            <p className="text-lg font-bold font-sans text-brand-dark/80 mb-4">We have zero tolerance for:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg font-bold text-brand-dark/90 font-sans mb-8">
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Harassment or intimidation</li>
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Bullying or discrimination</li>
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Hate speech</li>
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Threatening or aggressive behaviour</li>
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Unwanted advances</li>
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Repeated boundary violations</li>
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Dishonesty, impersonation, or fraudulent activity</li>
              <li className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark">Behaviour that creates an unsafe or unwelcoming environment</li>
            </ul>
            <p className="bg-brand-dark text-brand-cream p-4 rounded-xl font-black text-center shadow-[4px_4px_0px_#FAF9F6]">
              Members who violate these standards may be suspended or permanently removed from the Rosebuddies community.
            </p>
          </div>

          {/* Section 3 & 4 Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-brand-yellow/30 p-8 md:p-10 rounded-[32px] border-4 border-brand-dark">
              <div className="flex items-center gap-4 mb-6">
                <Users size={28} className="text-brand-dark" />
                <h2 className="text-2xl font-serif font-black text-brand-dark">Community Over Cliques</h2>
              </div>
              <p className="text-lg font-medium font-sans text-brand-dark/80 leading-relaxed space-y-4">
                <span className="block mb-4">Rosebuddies was created because many adults know what it feels like to be on the outside looking in. We encourage members to create welcoming spaces where new friendships can form naturally.</span>
                <span className="block mb-4">Exclusionary behaviour, intentional isolation of others, or conduct that undermines the spirit of community may be addressed by our team.</span>
                <strong className="text-brand-primary block text-xl">Great communities grow when people make room for new connections and diverse perspectives.</strong>
              </p>
            </div>

            <div className="bg-brand-light p-8 md:p-10 rounded-[32px] border-4 border-brand-dark">
              <div className="flex items-center gap-4 mb-6">
                <Lock size={28} className="text-brand-dark" />
                <h2 className="text-2xl font-serif font-black text-brand-dark">Privacy & Boundaries</h2>
              </div>
              <p className="text-lg font-medium font-sans text-brand-dark/80 leading-relaxed space-y-4">
                <span className="block mb-4">Your privacy matters. Members control what personal information they choose to share.</span>
                <span className="block mb-4">We encourage everyone to take their time getting to know others and to share contact information only when they feel comfortable doing so.</span>
                <strong className="text-brand-dark block text-xl bg-brand-cream border-2 border-brand-dark p-3 rounded-xl inline-block -rotate-1">Rosebuddies does not sell personal information to third parties.</strong>
              </p>
            </div>
          </div>

          {/* Section 5 & 6 Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-brand-light p-8 md:p-10 rounded-[32px] border-4 border-brand-dark">
              <div className="flex items-center gap-4 mb-6">
                <MessageSquare size={28} className="text-brand-primary" />
                <h2 className="text-2xl font-serif font-black text-brand-dark">Speak Up, We Will Listen</h2>
              </div>
              <p className="text-lg font-medium font-sans text-brand-dark/80 leading-relaxed space-y-4">
                <span className="block mb-4">If something doesn't feel right, we want to know.</span>
                <span className="block mb-4">Members can confidentially report concerns, inappropriate behaviour, safety issues, or violations of our community standards.</span>
                <strong className="text-brand-dark block text-xl">All reports are reviewed carefully and handled with discretion, fairness, and respect.</strong>
              </p>
            </div>

            <div className="bg-brand-cream p-8 md:p-10 rounded-[32px] border-4 border-brand-dark shadow-[6px_6px_0px_#2A2A2A]">
              <div className="flex items-center gap-4 mb-6">
                <Handshake size={28} className="text-brand-accent" />
                <h2 className="text-2xl font-serif font-black text-brand-dark">Shared Responsibility</h2>
              </div>
              <p className="text-lg font-medium font-sans text-brand-dark/80 leading-relaxed mb-4">Creating a welcoming community is a shared responsibility. Every member plays a role in shaping the Rosebuddies experience. We ask members to:</p>
              <ul className="space-y-2 text-brand-dark font-bold">
                <li>✓ Treat others with kindness and respect</li>
                <li>✓ Honour personal boundaries</li>
                <li>✓ Communicate honestly</li>
                <li>✓ Support an inclusive environment</li>
                <li>✓ Help create opportunities for connection and belonging</li>
              </ul>
            </div>
          </div>

          {/* Section 7 - Important Notices */}
          <div className="bg-brand-dark text-brand-cream p-8 md:p-12 rounded-[32px] border-4 border-brand-dark shadow-[8px_8px_0px_#FD5E53] relative transform -rotate-1 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <Info size={32} className="text-brand-yellow" />
              <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-cream">Membership & Disclaimers</h2>
            </div>
            
            <div className="space-y-8 text-xl font-medium font-sans leading-relaxed text-brand-cream/90">
              <div>
                <h3 className="text-brand-yellow font-bold text-2xl mb-2">Membership Accountability</h3>
                <p>Membership in Rosebuddies is a privilege, not a right. Rosebuddies reserves the right to suspend, restrict, or terminate membership at its sole discretion when a member's conduct is inconsistent with our community values, standards, or the wellbeing of other members.</p>
              </div>
              
              <div className="border-t-2 border-brand-cream/20 pt-8">
                <h3 className="text-brand-yellow font-bold text-2xl mb-2">Important Notice</h3>
                <p className="mb-4">While Rosebuddies works hard to create safe and welcoming experiences, we cannot guarantee the actions, behaviour, intentions, or compatibility of individual members.</p>
                <p>Participation in Rosebuddies events, activities, and experiences is voluntary and undertaken at each member's own discretion. Members are encouraged to exercise good judgment when interacting with others and when sharing personal information.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- OUR PROMISE --- */}
      <section className="py-24 px-6 md:px-12 bg-brand-primary border-y-4 border-brand-dark text-brand-cream text-center relative z-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-12 uppercase tracking-wide">Our Promise</h2>
          
          <div className="text-2xl md:text-4xl font-serif leading-relaxed space-y-4">
            <p>We believe everyone deserves more than a place to show up.</p>
            <p>They deserve a place where they feel <span className="text-brand-dark bg-brand-yellow px-3 py-1 rounded-xl shadow-[4px_4px_0px_#2A2A2A] transform -rotate-2 inline-block">respected.</span></p>
            <p>A place where they feel <span className="text-brand-dark bg-brand-cream px-3 py-1 rounded-xl shadow-[4px_4px_0px_#2A2A2A] transform rotate-2 inline-block">safe.</span></p>
            <p>A place where they feel <span className="text-brand-dark bg-brand-pink px-3 py-1 rounded-xl shadow-[4px_4px_0px_#2A2A2A] transform -rotate-1 inline-block">seen.</span></p>
            <p className="pt-8 font-black text-3xl md:text-5xl">And most importantly, a place where they feel they belong.</p>
          </div>
        </div>
      </section>

      <WaitlistForm />
      <Footer />
    </main>
  );
}