"use client";

export default function FriendshipClubs() {
  const categories = [
    { title: "Dinner Club", desc: "Connect over great food and even better conversations. For those who enjoy discovering local restaurants and building friendships around the table.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80", color: "bg-brand-cream", tape: "bg-brand-primary", rotation: "-rotate-2" },
    { title: "Walk & Talk Club", desc: "Fresh air, movement, and genuine conversations. Perfect for those who enjoy staying active while connecting with others.", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80", color: "bg-brand-pink", tape: "bg-brand-accent", rotation: "rotate-3" },
    { title: "Coffee Meetup Club", desc: "Casual meetups designed to turn familiar faces into lasting friendships. A relaxed space for coffee, conversation, and connection.", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80", color: "bg-brand-yellow", tape: "bg-brand-pink-dark", rotation: "-rotate-1" },
    { title: "Golden Years Club", desc: "Friendship, laughter, and shared experiences for life's next chapter. Retired, semi-retired, or an empty nester? Find a place to belong.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80", color: "bg-brand-peach", tape: "bg-brand-secondary", rotation: "rotate-2" },
  ];

  return (
    <section id="experiences" className="py-24 px-6 md:px-12 bg-brand-light relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark inline-block relative">
            Ongoing Communities <br/>
            <span className="relative inline-block mt-2">
              Built Around Shared Interests
              <svg className="absolute -bottom-2 -right-12 w-16 h-16 text-brand-primary animate-pulse" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 15 L60 40 L85 45 L65 60 L70 85 L50 70 L30 85 L35 60 L15 45 L40 40 Z" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {categories.map((cat, idx) => (
            <div key={idx} className={`relative group ${cat.rotation} hover:rotate-0 transition-transform duration-300 h-full flex flex-col`}>
              
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${cat.tape} backdrop-blur-md rotate-3 z-20 shadow-sm border border-brand-dark/10`}></div>
              
              <div className={`${cat.color} p-4 pb-10 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px] shadow-brand-dark group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px] group-hover:shadow-brand-dark transition-all flex-grow flex flex-col`}>
                <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden border-2 border-brand-dark mb-4 shrink-0">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-serif text-brand-dark text-center mb-2">{cat.title}</h3>
                <p className="text-brand-dark/80 text-center font-medium font-sans leading-snug flex-grow">{cat.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}