import { ShieldCheck, HeartOff, Scissors, Sparkles } from 'lucide-react';

export default function FAQ() {
  return (
    <section id="faq" className="py-32 px-6 bg-brand-light relative z-30" style={{ backgroundImage: `radial-gradient(var(--color-brand-peach) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      <div className="max-w-6xl mx-auto relative">
        
        <div className="text-center mb-24 relative">
          <h2 className="text-5xl md:text-6xl font-serif text-brand-dark inline-block relative">
            Frequently Asked Questions
            <div className="absolute -top-4 -right-8 w-20 h-6 bg-brand-pink-dark/80 backdrop-blur-sm rotate-6 z-20 border border-brand-dark/10 shadow-sm"></div>
          </h2>
        </div>
        
        {/* ROW 1: The Basics (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="group relative bg-brand-pink p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark hover:-translate-y-2 hover:shadow-[12px_12px_0px] hover:shadow-brand-dark transition-all duration-300">
            <h3 className="text-2xl font-serif text-brand-dark mb-4">What is Rosebuddies?</h3>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed">
              Rosebuddies is a community designed to help adults build meaningful friendships through real-life experiences, shared interests, and ongoing social circles. We believe friendship grows through conversations, shared experiences, and showing up consistently—not through endless swiping or algorithms.
            </p>
          </div>

          <div className="group relative bg-brand-yellow p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark hover:-translate-y-2 hover:shadow-[12px_12px_0px] hover:shadow-brand-dark transition-all duration-300">
            <div className="absolute top-4 right-4 bg-brand-primary text-brand-cream font-black text-xs px-3 py-1 border-2 border-brand-dark rotate-12 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-20 shadow-[2px_2px_0px] shadow-brand-dark">
              NO SWIPING!
            </div>
            <div className="flex items-center gap-3 mb-4">
              <HeartOff size={28} className="text-brand-dark group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <h3 className="text-2xl font-serif text-brand-dark">Is this a dating app?</h3>
            </div>
            <p className="text-brand-dark font-black text-xl bg-brand-cream inline-block px-3 py-1 border-2 border-brand-dark -rotate-2 mb-3">
              No.
            </p>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed">
              Rosebuddies is designed for friendship, community, and meaningful social connection. While genuine relationships can grow from any connection, it is strictly built around platonic friendship and belonging.
            </p>
          </div>

          <div className="group relative bg-brand-cream p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-primary hover:-translate-y-2 hover:shadow-[12px_12px_0px] hover:shadow-brand-primary transition-all duration-300">
            <h3 className="text-2xl font-serif text-brand-dark mb-4">How is it different?</h3>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed">
              Most platforms focus on profiles, matching, and messaging. Rosebuddies focuses on bringing people together in real life. Instead of scrolling, members attend Meet & Greets and participate in curated experiences where connections develop naturally. No algorithms. Just real people.
            </p>
          </div>
        </div>

        {/* ROW 2: The Logic (2 Cards, 1 large, 1 medium) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-3 group relative bg-brand-dark text-brand-cream p-8 md:p-12 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-yellow hover:-translate-y-2 hover:shadow-[12px_12px_0px] hover:shadow-brand-yellow transition-all duration-300">
            <h3 className="text-3xl font-serif mb-6 text-brand-yellow">Why don't you use matching algorithms?</h3>
            <div className="text-brand-cream/90 font-medium text-xl leading-relaxed space-y-4">
              <p className="text-2xl font-black font-serif text-brand-pink">Because people aren't algorithms.</p>
              <p>Some of life's most meaningful friendships come from unexpected conversations, shared experiences, and people we may never have selected on a profile screen.</p>
              <p>Rather than trying to predict who should be friends, we create opportunities for people to meet naturally. Friendship is built through real-life interaction, not mathematical formulas.</p>
            </div>
          </div>

          <div className="lg:col-span-2 group relative bg-brand-secondary text-brand-cream p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark hover:-translate-y-2 hover:shadow-[12px_12px_0px] hover:shadow-brand-dark transition-all duration-300">
            <h3 className="text-2xl font-serif mb-4">Who is Rosebuddies for?</h3>
            <p className="text-brand-cream/90 font-bold text-lg leading-relaxed mb-4">
              Adults looking to build meaningful social connections. Whether you're new to the city, working remotely, navigating a life transition, or rebuilding your social circle, you are welcome here.
            </p>
            <p className="bg-brand-cream text-brand-dark font-black p-3 border-2 border-brand-dark rounded-xl transform rotate-2">
              You don't need to be outgoing or experienced at networking. You simply need to be open to meeting people.
            </p>
          </div>
        </div>

        {/* ROW 3: Cost & Memberships (Pricing info) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="group relative bg-brand-cream p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark hover:-translate-y-2 hover:shadow-[12px_12px_0px] hover:shadow-brand-dark transition-all duration-300 flex flex-col justify-center overflow-hidden pl-16">
            <div className="absolute left-8 top-0 bottom-0 w-0 border-l-[3px] border-dashed border-brand-dark/30"></div>
            <div className="absolute left-[18px] top-4 text-brand-dark transition-all duration-[1.5s] ease-in-out group-hover:top-[80%] z-20">
              <Scissors size={24} className="rotate-180" />
            </div>
            <h3 className="text-2xl font-serif mb-6 text-brand-secondary">How much does it cost?</h3>
            <ul className="space-y-6 text-brand-dark/80 font-bold text-lg">
              <li className="relative">
                <span className="absolute -left-6 top-2 w-2 h-2 bg-brand-yellow border border-brand-dark rounded-full"></span> 
                <span className="text-brand-primary text-xl font-black block">$25</span> 
                For the initial Meet & Greet.
              </li>
              <li className="relative">
                <span className="absolute -left-6 top-2 w-2 h-2 bg-brand-pink border border-brand-dark rounded-full"></span> 
                <span className="text-brand-secondary text-xl font-black block">Monthly Memberships</span> 
                Join a Friendship Circle. Options for 1, 3, 6, or 12 months. Longer memberships receive discounted pricing.
              </li>
            </ul>
          </div>

          <div className="group relative bg-brand-light p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-2xl font-serif text-brand-dark mb-4">What's included in my membership?</h3>
            <ul className="space-y-2 text-brand-dark/80 font-bold text-lg mb-6">
              <li>✓ Friendship Circles and clubs</li>
              <li>✓ Curated social experiences</li>
              <li>✓ Community activities & gatherings</li>
              <li>✓ Member-only opportunities</li>
              <li>✓ Facilitated experiences</li>
            </ul>
            <p className="bg-brand-yellow px-4 py-2 border-2 border-brand-dark rounded-lg font-black inline-block -rotate-1">
              We handle the planning. You simply show up.
            </p>
          </div>

          <div className="group relative bg-brand-pink-light p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-2xl font-serif text-brand-dark mb-4">Can I cancel my membership?</h3>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed mb-4">
              Yes. After attending a Meet & Greet and joining a Friendship Circle, members have 72 hours to cancel and receive a full refund. After that period, membership terms apply based on the plan selected.
            </p>
            <p className="text-brand-primary font-black text-xl">
              Our goal is to create an experience people want to be part of—not one they feel locked into.
            </p>
          </div>
        </div>

        {/* ROW 4: Experience Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-brand-cream p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark relative overflow-hidden">
            <h3 className="text-2xl font-serif text-brand-dark mb-4">What happens at my first Meet & Greet?</h3>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed mb-4">
              Your first Meet & Greet is designed to be relaxed, welcoming, and pressure-free. You'll meet other members, participate in guided conversations, and discover common interests.
            </p>
            <p className="text-brand-dark font-black text-xl border-l-4 border-brand-primary pl-4">
              There are no awkward speed-friending sessions, forced networking, or uncomfortable introductions. Just a welcoming environment where meaningful conversations can happen naturally.
            </p>
          </div>

          <div className="bg-brand-yellow p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark relative">
            <h3 className="text-2xl font-serif text-brand-dark mb-4">What if I come alone? Or if I'm shy?</h3>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed mb-4">
              Most members attend their first event alone. In fact, that's exactly why Rosebuddies exists.
            </p>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed">
              And if you're introverted, that's completely okay. Our experiences focus on comfortable, small-group interactions where conversations develop organically. There is no pressure to perform or be the loudest person in the room.
            </p>
          </div>
        </div>

        {/* ROW 5: Club Details & Safety */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-brand-light p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark">
            <h3 className="text-2xl font-serif text-brand-dark mb-4">How do Friendship Circles work?</h3>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed mb-4">
              They are smaller communities built around shared interests (Dinner Club, Coffee Meetups, Walk & Talk, etc.). They meet regularly, giving you the chance to build familiarity and trust over time.
            </p>
            <p className="text-brand-primary font-black">Yes, you can join more than one!</p>
          </div>

          <div className="bg-brand-cream p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark relative">
            <div className="absolute top-4 right-4 text-brand-accent">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-serif text-brand-dark mb-4">What if I don't connect with anyone right away?</h3>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed">
              That's completely normal. Meaningful friendships rarely happen overnight. We're built around repeated interactions because trust and connection develop over time. Many lasting friendships begin with a simple conversation and grow through continued participation.
            </p>
          </div>

          <div className="bg-brand-pink p-8 rounded-3xl border-4 border-brand-dark shadow-[8px_8px_0px] shadow-brand-dark">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={28} className="text-brand-primary" strokeWidth={2.5} />
              <h3 className="text-2xl font-serif text-brand-dark">How do you keep members safe?</h3>
            </div>
            <p className="text-brand-dark/80 font-bold text-lg leading-relaxed">
              We have zero tolerance for harassment, discrimination, bullying, or boundary violations. All members agree to our Community Standards. Violators may be suspended or permanently removed. We take all concerns seriously to protect our members.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}