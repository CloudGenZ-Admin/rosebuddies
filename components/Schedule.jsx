"use client";
import { Calendar } from 'lucide-react';

export default function Schedule() {
  const weeklySchedule = [
    {
      day: "Monday",
      color: "bg-brand-yellow",
      items: [
        { title: "🚶 Walk & Talk Club", time: "1st & 3rd Monday | 6:30 PM – 8:00 PM", desc: "Fresh air, movement, and genuine conversations." }
      ]
    },
    {
      day: "Tuesday",
      color: "bg-brand-pink",
      items: [
        { title: "☕ Coffee Meetup Club", time: "1st & 3rd Tuesday | 6:30 PM – 8:00 PM", desc: "Casual meetups designed to turn familiar faces into lasting friendships." },
        { title: "🗣️ Golden Years Club", time: "2nd & 4th Tuesday | 1:00 PM – 3:00 PM", desc: "For retirees, semi-retirees, empty nesters, and those looking to stay socially connected while enjoying life's next chapter." }
      ]
    },
    {
      day: "Wednesday",
      color: "bg-brand-primary",
      textColor: "text-brand-cream",
      items: [
        { title: "✨ Curated Experiences", time: "Every Wednesday | 6:30 PM – 9:00 PM", desc: "Small groups of 8–12 people. Dinner experiences, cooking classes, comedy nights, cultural outings, wellness experiences, and more." }
      ]
    },
    {
      day: "Thursday",
      color: "bg-brand-cream",
      items: [
        { title: "🌹 Rosebuddies Meet & Greet", time: "2nd Thursday | 6:30 PM – 9:00 PM", desc: "Your monthly gateway into the community." },
        { title: "🍽️ Dinner Club", time: "1st & 3rd Thursday | 6:30 PM – 8:30 PM", desc: "Connect over great food and even better conversations." }
      ]
    },
    {
      day: "Friday",
      color: "bg-brand-secondary",
      items: [
        { title: "🗣️ Golden Years Club", time: "2nd & 4th Friday | 11:30 AM – 1:30 PM", desc: "Meaningful discussions about life, relationships, culture, personal growth, current events, and the topics that matter most." }
      ]
    }
  ];

  const monthlyFlow = [
    { week: "Week 1", events: ["Monday → Walk & Talk", "Tuesday → Coffee Meetup", "Wednesday → Curated Experience", "Thursday → Dinner Club"] },
    { week: "Week 2", events: ["Tuesday → Golden Years", "Wednesday → Curated Experience", "Thursday → Meet & Greet", "Friday → Conversation Club"] },
    { week: "Week 3", events: ["Monday → Walk & Talk", "Tuesday → Coffee Meetup", "Wednesday → Curated Experience", "Thursday → Dinner Club"] },
    { week: "Week 4", events: ["Tuesday → Golden Years", "Wednesday → Curated Experience", "Friday → Conversation Club"] },
  ];

  return (
    <section id="schedule" className="py-24 px-6 md:px-12 bg-brand-pink-light relative z-20 border-y-4 border-dashed border-brand-pink-dark">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark inline-block relative">
            Rosebuddies Weekly Schedule
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-brand-yellow rounded-full border-4 border-brand-dark flex items-center justify-center shadow-[4px_4px_0px_#2A2A2A] rotate-12">
              <Calendar size={28} />
            </div>
          </h2>
        </div>

        {/* Weekly Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {weeklySchedule.map((day, idx) => (
            <div key={idx} className={`${day.color} ${day.textColor || 'text-brand-dark'} rounded-[24px] p-6 border-4 border-brand-dark shadow-[6px_6px_0px_#2A2A2A] relative transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0 transition-transform h-full flex flex-col`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-brand-cream/80 backdrop-blur-sm -rotate-2 z-20 border-2 border-brand-dark/20"></div>
              
              <h3 className="text-2xl font-black font-serif uppercase tracking-widest border-b-4 border-current/20 pb-4 mb-6 text-center">
                {day.day}
              </h3>
              
              <div className="space-y-6 flex-grow">
                {day.items.map((item, i) => (
                  <div key={i} className="bg-brand-dark/5 p-4 rounded-xl border-2 border-current/20">
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-sm font-black opacity-80 mb-2 uppercase">{item.time}</p>
                    <p className="font-medium text-sm leading-relaxed opacity-90">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Flow Grid */}
        <div className="bg-brand-cream rounded-[40px] p-8 md:p-14 border-4 border-brand-dark shadow-[12px_12px_0px_#2A2A2A]">
          <h3 className="text-3xl md:text-4xl font-serif text-brand-dark mb-10 text-center">Monthly Flow</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyFlow.map((flow, idx) => (
              <div key={idx} className="bg-brand-light p-6 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#2A2A2A]">
                <h4 className="text-xl font-black bg-brand-dark text-brand-cream inline-block px-4 py-1 rounded-full mb-6 -ml-2 -mt-2">
                  {flow.week}
                </h4>
                <ul className="space-y-4 font-bold text-brand-dark/80 font-sans text-sm md:text-base">
                  {flow.events.map((evt, i) => (
                    <li key={i} className="border-b-2 border-dashed border-brand-dark/20 pb-2 last:border-0">{evt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}