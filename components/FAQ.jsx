"use client";
import { ShieldCheck, HeartOff, Scissors, Sparkles } from 'lucide-react';

export default function FAQ() {
  return (
    // Background: Pale Butter Yellow with Olive Shadow dots
    <section id="faq" className="py-20 md:py-32 px-4 sm:px-6 bg-brand-light relative z-30 overflow-hidden" style={{ backgroundImage: `radial-gradient(var(--color-brand-lemon-dark) 2px, transparent 2px)`, backgroundSize: '40px 40px' }}>
      <div className="max-w-[1536px] mx-auto relative">
        
        <div className="text-center mb-16 md:mb-24 relative px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-brand-text inline-block relative z-10">
            Frequently Asked Questions
            {/* Tape: Golden Lemon (Secondary) */}
            <div className="absolute -top-3 md:-top-4 -right-2 md:-right-8 w-16 md:w-20 h-5 md:h-6 bg-brand-secondary/80 backdrop-blur-sm rotate-6 z-[-1] border border-brand-dark/10 shadow-sm"></div>
          </h2>
        </div>
        
        {/* ROW 1: The Basics (3 Cards) */}
        {/* FIX: Changed to md:grid-cols-2 lg:grid-cols-3 for better tablet viewing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Card 1: Cream Background */}
          <div className="group relative bg-brand-cream p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[6px_6px_0px_var(--color-brand-lemon-dark)] sm:hover:shadow-[12px_12px_0px_var(--color-brand-lemon-dark)] transition-all duration-300 flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">What is Rosebuddies?</h3>
            <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed flex-grow">
              Rosebuddies is a community designed to help adults build meaningful friendships through real-life experiences, shared interests, and ongoing social circles. We believe friendship grows through conversations, shared experiences, and showing up consistently—not through endless swiping or algorithms.
            </p>
          </div>

          {/* Card 2: Primary Lemon Background */}
          <div className="group relative bg-brand-primary p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-lemon-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-lemon-dark)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] sm:hover:shadow-[12px_12px_0px_var(--color-brand-dark)] transition-all duration-300 flex flex-col h-full">
            {/* Sticker: Accent Lime - Visible on mobile, hover on desktop */}
            <div className="absolute -top-4 right-2 sm:top-4 sm:right-4 bg-brand-accent text-brand-dark font-black text-[10px] sm:text-xs px-3 py-1.5 border-2 border-brand-dark rotate-12 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:scale-110 transition-all duration-300 z-20 shadow-[2px_2px_0px_var(--color-brand-dark)]">
              NO SWIPING!
            </div>
            <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-6">
              <HeartOff size={28} className="text-brand-dark lg:group-hover:scale-110 transition-transform shrink-0 mt-1 sm:mt-0" strokeWidth={2.5} />
              <h3 className="text-2xl sm:text-3xl font-serif text-brand-text leading-tight">Is this a dating app?</h3>
            </div>
            <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed flex-grow mb-6">
              Rosebuddies is designed for friendship, community, and meaningful social connection. While genuine relationships can grow from any connection, it is strictly built around platonic friendship and belonging.
            </p>
            {/* Box: Cream */}
            <div className="mt-auto self-start">
              <span className="text-brand-text font-black text-lg sm:text-xl bg-brand-cream inline-block px-4 py-1.5 border-2 border-brand-dark -rotate-2">
                No.
              </span>
            </div>
          </div>

          {/* Card 3: Cream Background */}
          {/* FIX: md:col-span-2 lg:col-span-1 makes it stretch beautifully on tablet, normal on desktop */}
          <div className="group relative bg-brand-cream p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-lime-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-lime-dark)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] sm:hover:shadow-[12px_12px_0px_var(--color-brand-dark)] transition-all duration-300 flex flex-col h-full md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">How is it different?</h3>
            <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed flex-grow">
              Most platforms focus on profiles, matching, and messaging. Rosebuddies focuses on bringing people together in real life. Instead of scrolling, members attend Meet & Greets and participate in curated experiences where connections develop naturally. No algorithms. Just real people.
            </p>
          </div>
        </div>

        {/* ROW 2: The Logic (2 Cards, 1 large, 1 medium) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Card 4: Dark Mint Background */}
          <div className="lg:col-span-3 group relative bg-brand-dark text-brand-cream p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-primary)] sm:shadow-[8px_8px_0px_var(--color-brand-primary)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[6px_6px_0px_var(--color-brand-accent)] sm:hover:shadow-[12px_12px_0px_var(--color-brand-accent)] transition-all duration-300 flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-brand-primary leading-tight">Why don't you use matching algorithms?</h3>
            <div className="text-brand-cream/90 font-medium text-base sm:text-lg md:text-xl leading-relaxed space-y-4 sm:space-y-6 flex-grow">
              <p className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-brand-accent">Because people aren't algorithms.</p>
              <p>Some of life's most meaningful friendships come from unexpected conversations, shared experiences, and people we may never have selected on a profile screen.</p>
              <p>Rather than trying to predict who should be friends, we create opportunities for people to meet naturally. Friendship is built through real-life interaction, not mathematical formulas.</p>
            </div>
          </div>

          {/* Card 5: Secondary Gold Background */}
          <div className="lg:col-span-2 group relative bg-brand-secondary text-brand-dark p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[6px_6px_0px_var(--color-brand-lime-dark)] sm:hover:shadow-[12px_12px_0px_var(--color-brand-lime-dark)] transition-all duration-300 flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-serif mb-4 sm:mb-6 text-brand-text leading-tight">Who is Rosebuddies for?</h3>
            <p className="text-brand-text font-bold text-base sm:text-lg leading-relaxed flex-grow mb-6 sm:mb-8">
              Adults looking to build meaningful social connections. Whether you're new to the city, working remotely, navigating a life transition, or rebuilding your social circle, you are welcome here.
            </p>
            <div className="mt-auto">
              <p className="bg-brand-cream text-brand-text font-black text-sm sm:text-base p-4 border-2 border-brand-dark rounded-xl transform rotate-2 shadow-[2px_2px_0px_var(--color-brand-dark)]">
                You don't need to be outgoing or experienced at networking. You simply need to be open to meeting people.
              </p>
            </div>
          </div>
        </div>

        {/* ROW 3: Cost & Memberships (Pricing info) */}
        {/* FIX: Changed to md:grid-cols-2 lg:grid-cols-3 for better tablet viewing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Card 6: Cream Background */}
          <div className="group relative bg-brand-cream py-6 pr-6 pl-12 sm:p-8 sm:pl-16 md:p-10 md:pl-20 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] sm:hover:shadow-[12px_12px_0px_var(--color-brand-dark)] transition-all duration-300 flex flex-col h-full overflow-hidden">
            {/* Scissor Line: Olive Shadow */}
            <div className="absolute left-6 sm:left-8 md:left-10 top-0 bottom-0 w-0 border-l-[3px] border-dashed border-brand-lemon-dark"></div>
            <div className="absolute left-[14px] sm:left-[18px] md:left-[26px] top-6 text-brand-dark transition-all duration-[1.5s] ease-in-out group-hover:top-[80%] z-20">
              <Scissors size={20} className="rotate-180 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif mb-4 sm:mb-6 text-brand-text leading-tight">How much does it cost?</h3>
            <ul className="space-y-6 sm:space-y-8 text-brand-text-primary font-bold text-base sm:text-lg flex-grow">
              <li className="relative">
                <span className="absolute -left-5 sm:-left-6 top-1.5 sm:top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-brand-primary border border-brand-dark rounded-full"></span> 
                <span className="text-brand-lime-dark text-lg sm:text-xl font-black block mb-1">$25</span> 
                For the initial Meet & Greet.
              </li>
              <li className="relative">
                <span className="absolute -left-5 sm:-left-6 top-1.5 sm:top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-brand-accent border border-brand-dark rounded-full"></span> 
                <span className="text-brand-text text-lg sm:text-xl font-black block mb-1">Monthly Memberships</span> 
                Join a Friendship Circle. Options for 1, 3, 6, or 12 months. Longer memberships receive discounted pricing.
              </li>
            </ul>
          </div>

          {/* Card 7: Accent Lime Background */}
          <div className="group relative bg-brand-accent p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">What's included in my membership?</h3>
            <ul className="space-y-2 sm:space-y-3 text-brand-text font-bold text-base sm:text-lg mb-6 sm:mb-8 flex-grow">
              <li className="flex items-start gap-2"><span className="text-brand-dark">✓</span> Friendship Circles and clubs</li>
              <li className="flex items-start gap-2"><span className="text-brand-dark">✓</span> Curated social experiences</li>
              <li className="flex items-start gap-2"><span className="text-brand-dark">✓</span> Community activities & gatherings</li>
              <li className="flex items-start gap-2"><span className="text-brand-dark">✓</span> Member-only opportunities</li>
              <li className="flex items-start gap-2"><span className="text-brand-dark">✓</span> Facilitated experiences</li>
            </ul>
            <div className="mt-auto self-start">
              <p className="bg-brand-cream text-brand-text text-sm sm:text-base px-4 py-2.5 border-2 border-brand-dark rounded-xl font-black inline-block -rotate-1 shadow-[2px_2px_0px_var(--color-brand-dark)]">
                We handle the planning. You simply show up.
              </p>
            </div>
          </div>

          {/* Card 8: Cream Background */}
          {/* FIX: md:col-span-2 lg:col-span-1 makes it stretch beautifully on tablet, normal on desktop */}
          <div className="group relative bg-brand-cream p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 flex flex-col h-full md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">Can I cancel my membership?</h3>
            <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed flex-grow mb-6 sm:mb-8">
              Yes. After attending a Meet & Greet and joining a Friendship Circle, members have 72 hours to cancel and receive a full refund. After that period, membership terms apply based on the plan selected.
            </p>
            <div className="mt-auto">
              <p className="text-brand-lime-dark font-black text-lg sm:text-xl leading-snug border-l-4 border-brand-lime-dark pl-4">
                Our goal is to create an experience people want to be part of—not one they feel locked into.
              </p>
            </div>
          </div>
        </div>

        {/* ROW 4: Experience Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Card 9: Cream Background */}
          <div className="bg-brand-cream p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-lemon-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-lemon-dark)] relative overflow-hidden flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">What happens at my first Meet & Greet?</h3>
            <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed flex-grow mb-6 sm:mb-8">
              Your first Meet & Greet is designed to be relaxed, welcoming, and pressure-free. You'll meet other members, participate in guided conversations, and discover common interests.
            </p>
            <div className="mt-auto">
              <p className="text-brand-text font-black text-lg sm:text-xl border-l-4 border-brand-primary pl-4 leading-snug">
                There are no awkward speed-friending sessions, forced networking, or uncomfortable introductions. Just a welcoming environment where meaningful conversations can happen naturally.
              </p>
            </div>
          </div>

          {/* Card 10: Primary Lemon Background */}
          <div className="bg-brand-primary p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] relative flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">What if I come alone? Or if I'm shy?</h3>
            <div className="flex-grow space-y-4 sm:space-y-6">
              <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed">
                Most members attend their first event alone. In fact, that's exactly why Rosebuddies exists.
              </p>
              <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed">
                And if you're introverted, that's completely okay. Our experiences focus on comfortable, small-group interactions where conversations develop organically. There is no pressure to perform or be the loudest person in the room.
              </p>
            </div>
          </div>
        </div>

        {/* ROW 5: Club Details & Safety */}
        {/* FIX: Changed from md:grid-cols-3 to md:grid-cols-2 lg:grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 11: Secondary Gold Background */}
          <div className="bg-brand-secondary p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] flex flex-col h-full">
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text mb-4 sm:mb-6 leading-tight">How do Friendship Circles work?</h3>
            <p className="text-brand-text font-bold text-base sm:text-lg leading-relaxed flex-grow mb-6 sm:mb-8">
              They are smaller communities built around shared interests (Dinner Club, Coffee Meetups, Walk & Talk, etc.). They meet regularly, giving you the chance to build familiarity and trust over time.
            </p>
            <div className="mt-auto self-start">
              <p className="text-brand-text-primary font-black text-sm sm:text-base bg-brand-cream px-4 py-2 border-2 border-brand-dark rounded-xl rotate-1 shadow-[2px_2px_0px_var(--color-brand-dark)]">
                Yes, you can join more than one!
              </p>
            </div>
          </div>

          {/* Card 12: Cream Background */}
          <div className="bg-brand-cream p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] relative flex flex-col h-full">
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-brand-secondary">
              <Sparkles size={24} className="sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-text pr-8 sm:pr-10 mb-4 sm:mb-6 leading-tight">What if I don't connect with anyone right away?</h3>
            <p className="text-brand-text-primary font-bold text-base sm:text-lg leading-relaxed flex-grow">
              That's completely normal. Meaningful friendships rarely happen overnight. We're built around repeated interactions because trust and connection develop over time. Many lasting friendships begin with a simple conversation and grow through continued participation.
            </p>
          </div>

          {/* Card 13: Accent Lime Background */}
          {/* FIX: md:col-span-2 lg:col-span-1 makes it stretch beautifully on tablet, normal on desktop */}
          <div className="bg-brand-accent p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] border-4 border-brand-dark shadow-[4px_4px_0px_var(--color-brand-dark)] sm:shadow-[8px_8px_0px_var(--color-brand-dark)] flex flex-col h-full md:col-span-2 lg:col-span-1">
            <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-6">
              <ShieldCheck size={28} className="text-brand-dark shrink-0 mt-1 sm:mt-0" strokeWidth={2.5} />
              <h3 className="text-2xl sm:text-3xl font-serif text-brand-dark leading-tight">How do you keep members safe?</h3>
            </div>
            <p className="text-brand-dark/90 font-bold text-base sm:text-lg leading-relaxed flex-grow">
              We have zero tolerance for harassment, discrimination, bullying, or boundary violations. All members agree to our Community Standards. Violators may be suspended or permanently removed. We take all concerns seriously to protect our members.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}