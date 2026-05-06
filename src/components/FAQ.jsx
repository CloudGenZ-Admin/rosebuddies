import { ShieldCheck, HeartOff, Scissors } from 'lucide-react';

export default function FAQ() {
  return (
    // Warm Peach background with a subtle paper texture grid
    <section className="py-32 px-6 bg-[#FDF8F5] relative z-30" style={{ backgroundImage: 'radial-gradient(#DCAE96 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      <div className="max-w-6xl mx-auto relative">
        
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-6xl font-serif text-[#2A2A2A] inline-block relative">
            The Details.
            {/* Washi tape over the title */}
            <div className="absolute -top-4 -right-8 w-20 h-6 bg-[#FFB3C6]/80 backdrop-blur-sm rotate-6 z-20 border border-[#2A2A2A]/10 shadow-sm"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* --- BOX 1: SAFETY (The "Certified" Stamp) --- */}
          <div className="group relative bg-[#FFD6E0] p-8 rounded-3xl border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#2A2A2A] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#2A2A2A] transition-all duration-300 md:col-span-2 lg:col-span-1 overflow-hidden">
            {/* Background doodle */}
            <svg className="absolute -bottom-4 -right-4 w-32 h-32 text-[#FFB3C6] opacity-50 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 100 100" fill="currentColor">
               <circle cx="50" cy="50" r="50" />
            </svg>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={32} className="text-[#FD5E53] group-hover:animate-bounce" strokeWidth={2.5} />
                <h3 className="text-3xl font-serif text-[#2A2A2A]">Is it safe?</h3>
              </div>
              <p className="text-[#2A2A2A]/80 font-bold text-lg leading-relaxed">
                Yes. All initial meetings are in public spaces with curated groups. We enforce a strict Code of Conduct. <span className="bg-[#FAF9F6] px-2 py-1 border border-[#2A2A2A] rounded-md rotate-1 inline-block mt-1">No harassment, no exceptions.</span>
              </p>
            </div>
          </div>

          {/* --- BOX 2: NO DATING (The Crossed-Out Heart) --- */}
          <div className="group relative bg-[#FDE047] p-8 rounded-3xl border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#2A2A2A] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#2A2A2A] transition-all duration-300 overflow-hidden">
            
            {/* The "NO SWIPING" Hidden Sticker that pops up on hover */}
            <div className="absolute top-4 right-4 bg-[#FD5E53] text-[#FAF9F6] font-black text-xs px-3 py-1 border-2 border-[#2A2A2A] rotate-12 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-20 shadow-[2px_2px_0px_#2A2A2A]">
              NO SWIPING!
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <HeartOff size={32} className="text-[#2A2A2A] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                <h3 className="text-3xl font-serif text-[#2A2A2A]">Is this a dating app?</h3>
              </div>
              <p className="text-[#2A2A2A] font-black text-xl bg-[#FAF9F6] inline-block px-3 py-1 border-2 border-[#2A2A2A] -rotate-2 mb-3">
                Absolutely not.
              </p>
              <p className="text-[#2A2A2A]/80 font-bold text-lg leading-relaxed">
                This platform is strictly for building platonic, meaningful, and mature friendships. 
              </p>
            </div>
          </div>

          {/* --- BOX 3: PRICING (The Interactive Ticket/Receipt) --- */}
          <div className="group relative bg-[#FAF9F6] p-8 rounded-3xl border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#FD5E53] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#FD5E53] transition-all duration-300 lg:row-span-2 flex flex-col justify-center overflow-hidden pl-16">
            
            {/* The "Cut Here" Dotted Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0 border-l-[3px] border-dashed border-[#2A2A2A]/30"></div>
            
            {/* Interactive Scissors that slide down the dotted line on hover */}
            <div className="absolute left-[18px] top-4 text-[#2A2A2A] transition-all duration-[1.5s] ease-in-out group-hover:top-[80%] z-20">
              <Scissors size={24} className="rotate-180" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-6 text-[#E2725B]">What's the cost?</h3>
              <ul className="space-y-6 text-[#2A2A2A]/80 font-bold text-lg">
                <li className="relative">
                  <span className="absolute -left-6 top-2 w-2 h-2 bg-[#FDE047] border border-[#2A2A2A] rounded-full"></span> 
                  <span className="text-[#FD5E53] text-xl font-black block">$15</span> 
                  For the initial Meet & Greet.
                </li>
                <li className="relative">
                  <span className="absolute -left-6 top-2 w-2 h-2 bg-[#FFD6E0] border border-[#2A2A2A] rounded-full"></span> 
                  <span className="text-[#E2725B] text-xl font-black block">$39 - $129</span> 
                  4-Week Circles depending on activities.
                </li>
              </ul>
            </div>
          </div>

          {/* --- BOX 4: AUDIENCE (The "Hello, My Name Is..." Sticker) --- */}
          {/* Note: Removed standard padding, created a custom top header to look like a real name tag */}
          <div className="group relative bg-[#FAF9F6] rounded-3xl border-4 border-[#2A2A2A] shadow-[8px_8px_0px_#2A2A2A] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#2A2A2A] transition-all duration-300 md:col-span-2 flex flex-col overflow-hidden">
            
            {/* Name Tag Header */}
            <div className="bg-[#FD5E53] text-[#FAF9F6] py-4 text-center border-b-4 border-[#2A2A2A] relative">
              <h3 className="text-2xl font-black tracking-widest font-sans uppercase">Hello</h3>
              <p className="text-sm font-bold opacity-90">This circle is built for</p>
            </div>

            {/* Name Tag Body (Where the name goes) */}
            <div className="p-8 flex-grow flex items-center relative">
              {/* Hand-drawn underline inside the name tag */}
              <div className="absolute bottom-10 left-8 right-8 border-b-[3px] border-[#2A2A2A] opacity-20"></div>

              <p className="text-[#2A2A2A] font-medium text-xl leading-relaxed relative z-10 font-serif">
                <span className="font-black text-2xl text-[#E2725B]">Adults 25+</span> seeking genuine friendship. 
                Whether you are a newcomer to Ottawa, a remote worker missing water-cooler chats, 
                or just going through a life transition—you belong here.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}