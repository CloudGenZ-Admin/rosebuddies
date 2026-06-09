"use client";
import { Heart } from 'lucide-react';

export default function NoAlgorithm() {
  return (
    <section id="no-algorithm" className="py-24 px-6 md:px-12 bg-brand-primary relative z-20 overflow-hidden text-brand-cream border-t-4 border-dashed border-brand-dark">
      <div className="absolute top-10 right-10 opacity-20">
        <Heart size={200} fill="currentColor" stroke="none" />
      </div>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center relative z-10">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            Friendship Was Never Meant To Be Decided By An Algorithm
          </h2>
          <div className="text-xl md:text-2xl font-medium font-sans leading-relaxed space-y-6">
            <p>Most friendship platforms ask you to create a profile, answer questions, and trust technology to decide who you should meet. We believe there is a better way.</p>
            <p>At Rosebuddies, we create opportunities for people to meet naturally through shared interests, positive energy, and real-life experiences.</p>
            <p>Some of life's most meaningful friendships begin unexpectedly.</p>
            <ul className="font-serif text-brand-yellow font-bold text-2xl space-y-2 mt-4 ml-4">
              <li>• A conversation.</li>
              <li>• A shared laugh.</li>
              <li>• A chance encounter.</li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-brand-dark text-brand-cream p-8 rounded-[32px] border-4 border-brand-cream shadow-[8px_8px_0px_#FAF9F6] transform rotate-2">
          <ul className="text-2xl font-serif space-y-4 mb-8 text-brand-pink">
            <li className="line-through decoration-brand-yellow decoration-4">No matching systems.</li>
            <li className="line-through decoration-brand-yellow decoration-4">No compatibility scores.</li>
            <li className="line-through decoration-brand-yellow decoration-4">No swiping.</li>
            <li className="line-through decoration-brand-yellow decoration-4">No endless scrolling.</li>
          </ul>
          <p className="text-2xl font-bold font-sans">We create the space.<br/>You bring yourself.<br/><span className="text-brand-yellow">Connection happens naturally.</span></p>
        </div>
      </div>
    </section>
  );
}