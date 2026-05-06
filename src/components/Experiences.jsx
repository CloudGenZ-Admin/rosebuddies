export default function Experiences() {
  const categories = [
    { title: "Coffee & Deep Chats", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80", color: "bg-[#FDE047]", tape: "bg-[#FFB3C6]", rotation: "-rotate-2" },
    { title: "Walks & Wellness", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80", color: "bg-[#FFD6E0]", tape: "bg-[#E1AD01]", rotation: "rotate-3" },
    { title: "Food & Culture", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80", color: "bg-[#FAF9F6]", tape: "bg-[#FD5E53]", rotation: "-rotate-1" },
    { title: "Trivia & Games", img: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=500&q=80", color: "bg-[#DCAE96]", tape: "bg-[#FAF9F6]", rotation: "rotate-2" },
  ];

  return (
    <section id="experiences" className="py-24 px-6 md:px-12 bg-[#FDF8F5] relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2A2A2A] inline-block relative">
            Curated Experiences.
            <svg className="absolute -bottom-2 -right-12 w-16 h-16 text-[#FD5E53] animate-pulse" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 15 L60 40 L85 45 L65 60 L70 85 L50 70 L30 85 L35 60 L15 45 L40 40 Z" />
            </svg>
          </h2>
          <p className="text-xl text-[#2A2A2A]/70 mt-6 font-medium max-w-2xl mx-auto">
            From bookstore browses to brewery trivia nights. We organize the plans, you just show up and bring good vibes.
          </p>
        </div>

        {/* Scrapbook Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {categories.map((cat, idx) => (
            <div key={idx} className={`relative group ${cat.rotation} hover:rotate-0 transition-transform duration-300`}>
              
              {/* Washi Tape */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${cat.tape} backdrop-blur-md rotate-3 z-20 shadow-sm border border-[#2A2A2A]/10`}></div>
              
              {/* Polaroid Card */}
              <div className={`${cat.color} p-4 pb-12 rounded-2xl border-4 border-[#2A2A2A] shadow-[6px_6px_0px_#2A2A2A] group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_#2A2A2A] transition-all`}>
                <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden border-2 border-[#2A2A2A] mb-4">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-serif text-[#2A2A2A] text-center">{cat.title}</h3>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}