"use client";
import { Check } from 'lucide-react';

export default function SocialProof() {
  return (
    // Background: Deep Forest Green (Brand Dark), Borders: Juicy Lemon (Brand Primary)
    <section className="bg-brand-dark py-12 px-6 border-y-4 border-brand-primary relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Heading: Juicy Lemon Yellow for high contrast against the dark green */}
        <h2 className="text-2xl md:text-3xl font-serif text-brand-primary w-full lg:w-1/3 text-center lg:text-left shrink-0">
          Building Friendship One Conversation At A Time
        </h2>
        
        {/* List Text: Pure White (Cream) for crisp readability */}
        {/* Switched to Grid for perfect alignment across all devices */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-brand-cream font-sans font-bold text-sm md:text-base">
          
          {/* Checkmarks: Vibrant Lime Green (Accent) to add that fresh citrus pop */}
          {/* Added items-start and shrink-0 to prevent icon squishing on mobile wrapping */}
          <div className="flex items-start gap-3">
            <Check className="text-brand-accent shrink-0 mt-0.5" size={20}/> 
            <span>Real-life experiences</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="text-brand-accent shrink-0 mt-0.5" size={20}/> 
            <span>Friendship-focused community</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="text-brand-accent shrink-0 mt-0.5" size={20}/> 
            <span>Small groups and shared interests</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="text-brand-accent shrink-0 mt-0.5" size={20}/> 
            <span>Conversations that become connections</span>
          </div>
          
          <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
            <Check className="text-brand-accent shrink-0 mt-0.5" size={20}/> 
            <span>Designed for adults seeking meaningful friendships</span>
          </div>
          
        </div>
      </div>
    </section>
  );
}