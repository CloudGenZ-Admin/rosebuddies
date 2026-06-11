"use client";
import { Check } from 'lucide-react';

export default function SocialProof() {
  return (
    // Background: Deep Forest Green (Brand Dark), Borders: Juicy Lemon (Brand Primary)
    <section className="bg-brand-dark py-12 px-6 border-y-4 border-brand-primary relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Heading: Juicy Lemon Yellow for high contrast against the dark green */}
        <h2 className="text-2xl md:text-3xl font-serif text-brand-primary min-w-[300px] text-center md:text-left">
          Building Friendship One Conversation At A Time
        </h2>
        
        {/* List Text: Pure White (Cream) for crisp readability */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-brand-cream font-sans font-bold text-sm md:text-base">
          
          {/* Checkmarks: Vibrant Lime Green (Accent) to add that fresh citrus pop */}
          <span className="flex items-center gap-2">
            <Check className="text-brand-accent" size={20}/> Real-life experiences
          </span>
          <span className="flex items-center gap-2">
            <Check className="text-brand-accent" size={20}/> Friendship-focused community
          </span>
          <span className="flex items-center gap-2">
            <Check className="text-brand-accent" size={20}/> Small groups and shared interests
          </span>
          <span className="flex items-center gap-2">
            <Check className="text-brand-accent" size={20}/> Conversations that become connections
          </span>
          <span className="flex items-center gap-2">
            <Check className="text-brand-accent" size={20}/> Designed for adults seeking meaningful friendships
          </span>
          
        </div>
      </div>
    </section>
  );
}