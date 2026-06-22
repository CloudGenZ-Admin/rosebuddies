"use client";
import { useState } from 'react';
import { ArrowRight, Check, Sparkles, Coffee, Users, Search, Loader2 } from 'lucide-react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Reusable SVG for the seamless wave
const WaveSVG = ({ className }) => (
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={className}>
    <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" />
  </svg>
);

// --- QUIZ DATA ---
const quizQuestions = [
  {
    id: 1,
    question: "Which experiences sound most like your ideal way to spend time with others?",
    subtitle: "(Select up to 3)",
    type: "multi",
    max: 3,
    options: [
      "Meaningful conversations over coffee",
      "Exploring new restaurants",
      "Walking and talking outdoors",
      "Learning and sharing life experiences",
      "Arts, culture, and local events",
      "Fitness and wellness activities",
      "Volunteering and giving back",
      "Trying new experiences and adventures"
    ]
  },
  {
    id: 2,
    question: "What are you hoping to find through Rosebuddies?",
    subtitle: "(Select all that apply)",
    type: "multi",
    max: 8,
    options: [
      "New friendships",
      "A sense of community",
      "More social activities",
      "Meaningful conversations",
      "People with similar interests",
      "Companionship and connection",
      "Opportunities to get out more",
      "A fresh start socially"
    ]
  },
  {
    id: 3,
    question: "What type of social setting feels most comfortable to you?",
    type: "single",
    options: [
      "One-on-one conversations",
      "Small groups (4–8 people)",
      "Medium groups (8–15 people)",
      "Larger social gatherings",
      "It depends on the activity"
    ]
  },
  {
    id: 4,
    question: "Which statement best describes you right now?",
    type: "single",
    options: [
      "I'm new to the city",
      "I work remotely or from home",
      "I'm looking to expand my social circle",
      "I'm entering a new chapter of life",
      "Most of my friends are busy with life",
      "I want to spend less time online and more time connecting in person",
      "I'm simply ready to meet new people"
    ]
  },
  {
    id: 5,
    question: "Which Rosebuddies experience would you be most excited to attend first?",
    type: "single",
    options: [
      "Coffee Meetup Club",
      "Walk & Talk Club",
      "Dinner Club",
      "Conversation Club",
      "Golden Years Club",
      "Curated Experience Series",
      "Open to anything"
    ]
  }
];

export default function GetStartedPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  
  // NEW: State to hold the Database ID of the saved VibeCheck
  const [savedVibeCheckId, setSavedVibeCheckId] = useState(null);

  const handleOptionToggle = (option) => {
    const q = quizQuestions[currentQIndex];
    const currentAnswers = answers[q.id] || [];

    if (q.type === 'single') {
      setAnswers({ ...answers, [q.id]: [option] });
    } else {
      if (currentAnswers.includes(option)) {
        setAnswers({ ...answers, [q.id]: currentAnswers.filter(item => item !== option) });
      } else {
        if (currentAnswers.length < q.max) {
          setAnswers({ ...answers, [q.id]: [...currentAnswers, option] });
        }
      }
    }
  };

  const nextQuestion = async () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      try {
        const formattedAnswersArray = Object.entries(answers).map(([qId, selected]) => ({
          question: qId,
          responses: selected
        }));

        const response = await fetch('/api/vibe-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: formattedAnswersArray })
        });
        
        const data = await response.json();
        
        if (response.ok && data.data?.id) {
          // NEW: Save the returned Database ID into React State
          setSavedVibeCheckId(data.data.id);
        } else {
          console.error("Vibe Check Validation Failed:", data);
        }
      } catch (error) {
        console.error("Failed to submit vibe check:", error);
      }
      setQuizFinished(true);
    }
  };

  const prevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const currentQ = quizQuestions[currentQIndex];
  const currentSelections = answers[currentQ.id] || [];
  const isNextDisabled = currentSelections.length === 0;

  return (
    <main className="bg-brand-light min-h-screen overflow-x-hidden flex flex-col font-sans">
      <Navbar />
      <div className="pt-24 md:pt-32"></div>

      {/* HERO SECTION */}
      <section className="py-12 md:py-20 relative z-10 px-5 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <div className="inline-block bg-brand-secondary px-6 sm:px-8 py-3 border-4 border-brand-dark rounded-full mb-8 shadow-[4px_4px_0px_#1A5415] -rotate-2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif text-brand-dark">Find Your Circle. Naturally.</h1>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-brand-dark/90 max-w-3xl mb-10 leading-relaxed">
          Take the Rosebuddies Vibe Check, discover the experiences that fit your interests, and join a Meet & Greet where real connections can happen organically.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-2xl">
          <button 
            onClick={() => document.getElementById('vibe-check').scrollIntoView({ behavior: 'smooth' })}
            className="flex-1 py-4 px-6 bg-brand-primary text-brand-dark font-black text-lg md:text-xl rounded-full border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all flex justify-center items-center gap-2"
          >
            Take the Vibe Check <Sparkles size={20} strokeWidth={3} />
          </button>
          <a 
            href="#meet-greet"
            className="flex-1 py-4 px-6 bg-brand-cream text-brand-dark font-bold text-lg md:text-xl rounded-full border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:bg-brand-light transition-all flex justify-center items-center"
          >
            Join the Next Meet & Greet — $25
          </a>
        </div>
      </section>

      {/* SECTION 1: HOW GETTING STARTED WORKS */}
      <section className="py-16 bg-brand-cream border-y-4 border-dashed border-brand-dark">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-dark mb-12 text-center">How Getting Started Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-light p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] relative mt-6 md:mt-0">
              <div className="absolute -top-6 -left-4 w-12 h-12 bg-brand-primary text-brand-dark font-black font-serif text-xl border-4 border-brand-dark rounded-full flex items-center justify-center rotate-[-10deg]">1</div>
              <h3 className="text-xl font-black font-serif text-brand-dark mb-3">Take the Interest Check</h3>
              <p className="font-medium text-brand-dark/80 text-sm md:text-base">Answer 5 simple interest-based questions so we can understand what types of experiences you may enjoy.</p>
            </div>
            <div className="bg-brand-secondary p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] relative mt-6 md:mt-0">
              <div className="absolute -top-6 -left-4 w-12 h-12 bg-brand-light text-brand-dark font-black font-serif text-xl border-4 border-brand-dark rounded-full flex items-center justify-center rotate-[5deg]">2</div>
              <h3 className="text-xl font-black font-serif text-brand-dark mb-3">Join a Meet & Greet</h3>
              <p className="font-medium text-brand-dark/80 text-sm md:text-base">Reserve your spot for a relaxed, welcoming Meet & Greet where you can meet people with similar interests.</p>
            </div>
            <div className="bg-brand-accent/20 p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] relative mt-6 lg:mt-0">
              <div className="absolute -top-6 -left-4 w-12 h-12 bg-brand-primary text-brand-dark font-black font-serif text-xl border-4 border-brand-dark rounded-full flex items-center justify-center rotate-[-5deg]">3</div>
              <h3 className="text-xl font-black font-serif text-brand-dark mb-3">Meet People Organically</h3>
              <p className="font-medium text-brand-dark/80 text-sm md:text-base">No swiping. No matching. No pressure. Just real conversations, shared interests, and natural connections.</p>
            </div>
            <div className="bg-brand-dark text-brand-cream p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#9FD62A] relative mt-6 lg:mt-0">
              <div className="absolute -top-6 -left-4 w-12 h-12 bg-brand-light text-brand-dark font-black font-serif text-xl border-4 border-brand-dark rounded-full flex items-center justify-center rotate-[10deg]">4</div>
              <h3 className="text-xl font-black font-serif text-brand-primary mb-3">Choose Your Circle</h3>
              <p className="font-medium text-brand-cream/80 text-sm md:text-base">After the Meet & Greet, join a Friendship Club or Curated Experience that feels right for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VIBE CHECK QUIZ */}
      <section id="vibe-check" className="py-20 relative px-5">
        <div className="max-w-3xl mx-auto">
          {!quizStarted ? (
            <div className="bg-brand-light border-4 border-brand-dark rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0px_#1A5415] text-center">
              <div className="w-20 h-20 bg-brand-secondary rounded-full border-4 border-brand-dark mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0px_#1A5415]">
                <Search size={32} strokeWidth={3} className="text-brand-dark" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mb-6">Rosebuddies Vibe Check</h2>
              <div className="text-lg md:text-xl font-medium text-brand-dark/80 space-y-4 mb-10">
                <p>This is <strong className="text-brand-lime-dark underline decoration-wavy decoration-2 underline-offset-4">not</strong> a compatibility test. We do not use algorithms to decide who your friends should be.</p>
                <p>The Vibe Check simply helps us understand your interests, comfort level, and the types of experiences you may enjoy.</p>
              </div>
              <button 
                onClick={() => setQuizStarted(true)}
                className="w-full sm:w-auto py-4 px-8 bg-brand-dark text-brand-cream font-black text-xl rounded-full border-4 border-brand-dark shadow-[6px_6px_0px_#9FD62A] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#9FD62A] transition-all flex justify-center items-center gap-3 mx-auto"
              >
                Start the Vibe Check <ArrowRight size={24} strokeWidth={3} />
              </button>
            </div>
          ) : !quizFinished ? (
            <div className="bg-brand-cream border-4 border-brand-dark rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0px_#1A5415] animate-fade-in">
              <div className="flex gap-2 mb-8">
                {quizQuestions.map((_, idx) => (
                  <div key={idx} className={`h-3 flex-1 rounded-full border-2 border-brand-dark ${idx <= currentQIndex ? 'bg-brand-lime-dark' : 'bg-brand-light'}`} />
                ))}
              </div>
              <div className="mb-8 min-h-[60px]">
                <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-dark leading-tight">
                  <span className="text-brand-lime-dark mr-2">{currentQ.id}.</span> 
                  {currentQ.question}
                </h3>
                {currentQ.subtitle && <p className="text-brand-dark/70 font-bold mt-2">{currentQ.subtitle}</p>}
              </div>
              <div className="space-y-3 mb-10">
                {currentQ.options.map((option, idx) => {
                  const isSelected = currentSelections.includes(option);
                  const isDisabled = !isSelected && currentQ.type === 'multi' && currentSelections.length >= currentQ.max;

                  return (
                    <button
                      key={idx}
                      disabled={isDisabled}
                      onClick={() => handleOptionToggle(option)}
                      className={`w-full text-left p-4 rounded-xl border-4 transition-all flex items-start gap-4
                        ${isSelected 
                          ? 'bg-brand-primary border-brand-dark shadow-[4px_4px_0px_#1A5415] translate-x-1' 
                          : isDisabled 
                            ? 'bg-brand-light/50 border-brand-dark/20 opacity-50 cursor-not-allowed'
                            : 'bg-brand-light border-brand-dark hover:bg-brand-secondary/50'
                        }`}
                    >
                      <div className={`w-6 h-6 shrink-0 mt-0.5 border-2 border-brand-dark flex items-center justify-center bg-brand-light ${currentQ.type === 'single' ? 'rounded-full' : 'rounded-md'}`}>
                        {isSelected && <Check size={16} strokeWidth={4} className="text-brand-lime-dark" />}
                      </div>
                      <span className="font-bold text-brand-dark text-base md:text-lg">{option}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center pt-6 border-t-4 border-dashed border-brand-dark/20">
                <button 
                  onClick={prevQuestion}
                  disabled={currentQIndex === 0}
                  className={`font-bold py-2 px-4 rounded-full border-2 border-brand-dark ${currentQIndex === 0 ? 'opacity-0 pointer-events-none' : 'bg-brand-light hover:bg-brand-cream'}`}
                >
                  Back
                </button>
                <button 
                  onClick={nextQuestion}
                  disabled={isNextDisabled}
                  className={`font-black py-3 px-8 rounded-full border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] transition-all flex items-center gap-2
                    ${isNextDisabled ? 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed border-gray-400 shadow-none' : 'bg-brand-dark text-brand-cream hover:-translate-y-1'}`}
                >
                  {currentQIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-brand-primary border-4 border-brand-dark rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0px_#1A5415] text-center animate-fade-in">
              <div className="w-24 h-24 bg-brand-light rounded-full border-4 border-brand-dark mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0px_#1A5415]">
                <Check size={48} strokeWidth={4} className="text-brand-lime-dark" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mb-4">Vibes Checked!</h2>
              <p className="text-lg md:text-xl font-medium text-brand-dark/90 mb-8">
                Thanks for sharing what you're looking for. Based on your interests, we think you're going to love our upcoming experiences. 
              </p>
              <a 
                href="#meet-greet"
                className="inline-block py-4 px-8 bg-brand-dark text-brand-cream font-black text-xl rounded-full border-4 border-brand-dark shadow-[6px_6px_0px_#9FD62A] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#9FD62A] transition-all"
              >
                Continue to Step 2
              </a>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: MEET & GREET SIGNUP */}
      <section id="meet-greet" className="py-20 bg-brand-dark text-brand-cream relative z-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 leading-tight">
                Your First Step Into the Rosebuddies Community
              </h2>
              <div className="text-lg font-medium space-y-4 text-brand-cream/90 mb-8">
                <p>Our Meet & Greet is a relaxed, pressure-free experience designed to help you meet people naturally.</p>
                <p>You’ll join guided conversations, discover shared interests, and experience what Rosebuddies is all about before choosing a Friendship Club or Curated Experience.</p>
              </div>
              <div className="bg-brand-cream text-brand-dark p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#9FD62A] inline-block -rotate-1 w-full sm:w-auto">
                <p className="font-serif font-black text-2xl md:text-3xl mb-1">Meet & Greet Experience</p>
                <p className="font-bold text-brand-lime-dark text-xl mb-6">— $25 One-Time</p>
                <a 
                  href="#waitlist"
                  className="block w-full text-center py-3 px-6 bg-brand-primary text-brand-dark font-black text-lg rounded-full border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 transition-all"
                >
                  Reserve My Spot
                </a>
              </div>
            </div>
            <div className="bg-brand-accent p-8 rounded-[32px] border-4 border-brand-dark shadow-[8px_8px_0px_#1A5415] text-brand-dark rotate-1">
              <h3 className="font-serif font-black text-2xl mb-6 flex items-center gap-3">
                <Coffee size={28} className="text-brand-lime-dark" /> What to expect:
              </h3>
              <ul className="space-y-4 font-bold text-lg">
                <li className="flex items-start gap-3 bg-brand-light p-3 rounded-xl border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                  <span className="text-brand-lime-dark">✓</span> A welcoming host
                </li>
                <li className="flex items-start gap-3 bg-brand-light p-3 rounded-xl border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                  <span className="text-brand-lime-dark">✓</span> Pressure-free icebreakers
                </li>
                <li className="flex items-start gap-3 bg-brand-light p-3 rounded-xl border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                  <span className="text-brand-lime-dark">✓</span> Group conversations
                </li>
                <li className="flex items-start gap-3 bg-brand-light p-3 rounded-xl border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                  <span className="text-brand-lime-dark">✓</span> Zero awkward networking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT HAPPENS AFTER? */}
      <section className="py-20 bg-brand-light border-b-4 border-dashed border-brand-dark">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mb-12">What Happens After the Meet & Greet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-brand-cream p-8 rounded-[32px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] flex flex-col">
              <div className="w-16 h-16 bg-brand-primary rounded-2xl border-4 border-brand-dark mb-6 flex items-center justify-center -rotate-3">
                <Users size={32} className="text-brand-dark" />
              </div>
              <h3 className="text-2xl font-serif font-black text-brand-dark mb-2">Join a Friendship Club</h3>
              <p className="text-brand-lime-dark font-black text-lg mb-4">Starting at $40/month</p>
              <p className="font-medium text-brand-dark/80 mb-6 flex-grow text-lg">
                For ongoing connection through regular club gatherings based around shared interests (Dinner Club, Walk & Talk, etc.).
              </p>
            </div>
            <div className="bg-brand-secondary p-8 rounded-[32px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] flex flex-col">
              <div className="w-16 h-16 bg-brand-light rounded-2xl border-4 border-brand-dark mb-6 flex items-center justify-center rotate-3">
                <Sparkles size={32} className="text-brand-dark" />
              </div>
              <h3 className="text-2xl font-serif font-black text-brand-dark mb-2">Join a Curated Experience</h3>
              <p className="text-brand-dark font-black text-lg mb-4">$250 Experience Pass</p>
              <p className="font-medium text-brand-dark/80 mb-6 flex-grow text-lg">
                For a smaller, more intimate 5-week group experience with 8–12 people designed to build deeper connections.
              </p>
            </div>
          </div>
          <div className="mt-12 bg-brand-light p-6 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] inline-block -rotate-1 max-w-3xl mx-auto">
            <h4 className="text-xl font-black font-serif text-brand-lime-dark uppercase tracking-wide mb-2">Stay Connected</h4>
            <p className="font-bold text-brand-dark text-lg md:text-xl">Continue showing up, meeting familiar faces, and building friendships over time.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRUST MESSAGE */}
      <section className="py-20 bg-brand-primary border-b-8 border-brand-dark text-center px-5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-dark mb-8 leading-tight">
            No Algorithms. <br className="hidden md:block"/>No Endless Swiping.
          </h2>
          <div className="text-xl md:text-2xl font-bold font-sans space-y-6 text-brand-dark/90">
            <p>Rosebuddies does not use matching systems to decide who you should meet. We believe friendship happens through real-life conversations, shared interests, positive energy, and showing up.</p>
            <p className="bg-brand-dark text-brand-cream p-4 md:p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] inline-block rotate-1">
              We create the space. You bring yourself. Connection grows naturally.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA / WAITLIST FORM */}
      {/* NEW: Pass the saved Database ID down to the Form */}
      <WaitlistForm vibeCheckId={savedVibeCheckId} />

      <Footer />
    </main>
  );
}

// =========================================
// WAITLIST FORM COMPONENT
// =========================================
// NEW: Accept the vibeCheckId as a prop
function WaitlistForm({ vibeCheckId }) {
  const [status, setStatus] = useState('idle'); 
  const [focusedInput, setFocusedInput] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    energy: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // NEW: Pass the linked ID back to the Database
    const apiPayload = {
      username: formData.name,
      email: formData.email,
      city: formData.location,
      vibe: formData.energy,
      vibeCheckId: vibeCheckId // <---- This is where the magic happens!
    };

    try {
      const response = await fetch('/api/get-started-meet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json();
        console.error("Submission failed validation:", errorData);
        setStatus('idle');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('idle');
    }
  };

  return (
    <section id="waitlist" className="py-32 px-6 relative overflow-hidden z-20 bg-brand-light">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-[45%] md:h-[60%] flex animate-wave-1">
          <WaveSVG className="w-1/2 h-full text-brand-lemon-dark/20 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-lemon-dark/20 fill-current" />
        </div>
        <div className="absolute bottom-0 left-0 w-[200%] h-[30%] md:h-[40%] flex animate-wave-2">
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
          <WaveSVG className="w-1/2 h-full text-brand-primary/40 fill-current" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-brand-cream border-4 border-brand-dark rounded-[40px] p-8 md:p-16 shadow-[12px_12px_0px_var(--color-brand-dark)] relative z-10 mt-8">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-brand-secondary/80 backdrop-blur-md -rotate-2 border-2 border-brand-dark shadow-sm z-20"></div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-dark inline-block relative mb-6">
            Ready to Meet Your People?
            <svg className="absolute -right-12 -top-8 w-10 h-10 text-brand-lime-dark animate-bounce" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
              <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
            </svg>
          </h2>
          <p className="text-xl md:text-2xl text-brand-text-primary font-medium font-sans max-w-2xl mx-auto leading-relaxed">
            Start with the Vibe Check, reserve your Meet & Greet spot, and take the first step toward real-life connection.
          </p>
        </div>
        
        {status === 'success' ? (
          <div className="text-center py-16 flex flex-col items-center animate-in fade-in duration-500">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 border-4 border-brand-accent rounded-full animate-ping opacity-30"></div>
              <div className="absolute inset-0 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px_var(--color-brand-dark)]">
                <Check className="text-brand-dark" size={50} strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-4xl font-serif text-brand-dark mb-4">You're on the list!</h3>
            <p className="text-xl text-brand-text-primary font-medium">Keep an eye on your inbox. Warm vibes incoming.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-2xl md:text-3xl leading-[2.5] font-serif text-brand-dark relative z-10">
            <p className="mb-8 text-center md:text-left break-words">
              Hi, my name is{' '}
              <span className={`input-wrapper ${focusedInput === 'name' ? 'active' : ''}`}>
                <span className="inline-input-sizer">{formData.name || '[ Your Name ]'}</span>
                <input 
                  type="text" 
                  required 
                  placeholder="[ Your Name ]" 
                  className="inline-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                /> 
              </span>
              {' '}and you can reach me at{' '}
              <span className={`input-wrapper ${focusedInput === 'email' ? 'active' : ''}`}>
                <span className="inline-input-sizer">{formData.email || '[ Your Email ]'}</span>
                <input 
                  type="email" 
                  required 
                  placeholder="[ Your Email ]" 
                  className="inline-input" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </span>.
            </p>

            <p className="mb-8 text-center md:text-left break-words">
              I'm currently hanging out in{' '}
              <span className={`select-wrapper ${focusedInput === 'location' ? 'active' : ''}`}>
                <select 
                  className="inline-select cursor-pointer"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                  onFocus={() => setFocusedInput('location')}
                  onBlur={() => setFocusedInput(null)}
                >
                  <option value="" disabled>[ Select Area ]</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Westboro">Westboro</option>
                  <option value="The Glebe">The Glebe</option>
                  <option value="Centretown">Centretown</option>
                  <option value="Hintonburg">Hintonburg</option>
                  <option value="Orleans">Orleans</option>
                </select>
              </span>.
            </p>

            <p className="mb-12 text-center md:text-left break-words">
              I'd describe my social energy as:{' '}
              <span className={`select-wrapper ${focusedInput === 'energy' ? 'active' : ''}`}>
                <select 
                  className="inline-select cursor-pointer"
                  required
                  value={formData.energy}
                  onChange={(e) => setFormData({ ...formData, energy: e.target.value })} 
                  onFocus={() => setFocusedInput('energy')}
                  onBlur={() => setFocusedInput(null)}
                >
                  <option value="" disabled>[ Select Vibe ]</option>
                  <option value="Introverted & Deep">Introverted & Deep</option>
                  <option value="Extroverted & Active">Extroverted & Active</option>
                  <option value="A bit of both">A bit of both</option>
                </select>
              </span>.
            </p>

            <div className="mt-16 text-center">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  type="button"
                  onClick={() => document.getElementById('vibe-check').scrollIntoView({ behavior: 'smooth' })}
                  className="group relative inline-flex items-center justify-center bg-brand-light text-brand-dark font-sans font-bold text-xl px-10 py-5 rounded-full hover:-translate-y-1 transition-transform w-full sm:w-auto border-4 border-brand-dark shadow-[6px_6px_0px_var(--color-brand-dark)] hover:shadow-[8px_8px_0px_var(--color-brand-lime-dark)] hover:bg-brand-cream"
                >
                  Take the Vibe Check
                </button>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="group relative inline-flex items-center justify-center bg-brand-dark text-brand-cream font-sans font-bold text-xl px-10 py-5 rounded-full hover:-translate-y-1 transition-transform disabled:opacity-70 disabled:hover:translate-y-0 w-full sm:w-auto border-4 border-brand-dark shadow-[6px_6px_0px_var(--color-brand-lime-dark)] hover:shadow-[8px_8px_0px_var(--color-brand-secondary)]"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin mr-3" size={24} /> : null}
                  {status === 'loading' ? 'Reserving...' : 'Reserve My Meet & Greet Spot'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .animate-wave-1 { animation: waveSlide 20s linear infinite; }
        .animate-wave-2 { animation: waveSlide 12s linear infinite reverse; }
        @keyframes waveSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .input-wrapper {
          position: relative;
          display: inline-grid;
          align-items: end; 
          margin: 0 0.25rem;
          max-width: 100%;
          vertical-align: baseline;
        }
        .select-wrapper {
          position: relative;
          display: inline-block;
          margin: 0 0.25rem;
          max-width: 100%;
          vertical-align: baseline;
        }
        @media (min-width: 768px) {
          .input-wrapper, .select-wrapper { margin: 0 0.5rem; }
        }
        .input-wrapper::before, .select-wrapper::before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: -4px;
          right: -4px;
          height: 40%;
          background-color: var(--color-brand-primary);
          z-index: -1;
          transform: scaleX(0) rotate(-2deg);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          border-radius: 4px;
        }
        .input-wrapper.active::before, .select-wrapper.active::before {
          transform: scaleX(1) rotate(-2deg);
        }
        .inline-input-sizer {
          grid-area: 1 / 1;
          visibility: hidden;
          white-space: pre;
          max-width: 100%;
          overflow: hidden;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          padding: 0 0.25rem;
          border-bottom: 3px dashed transparent; 
          padding-bottom: 2px;
        }
        .inline-input {
          grid-area: 1 / 1;
          width: 100%;
          min-width: 0; 
          max-width: 100%;
          border: none;
          border-bottom: 3px dashed var(--color-brand-dark);
          background: transparent;
          outline: none;
          color: var(--color-brand-text-primary);
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          text-align: center;
          transition: border-color 0.3s ease, color 0.3s ease;
          padding: 0 0.25rem;
          padding-bottom: 2px;
          box-sizing: border-box;
          text-overflow: ellipsis; 
        }
        .inline-select {
          width: auto;
          max-width: 100%;
          border: none;
          border-bottom: 3px dashed var(--color-brand-dark);
          background: transparent;
          outline: none;
          color: var(--color-brand-text-primary);
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          text-align: center;
          transition: border-color 0.3s ease, color 0.3s ease;
          padding: 0 1.5rem 2px 0.25rem;
          box-sizing: border-box;
          text-overflow: ellipsis;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg fill='%231A5415' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
          background-repeat: no-repeat;
          background-position-x: 100%;
          background-position-y: 50%;
        }
        @media (min-width: 768px) {
          .inline-input, .inline-input-sizer, .inline-select { border-bottom-width: 4px; }
        }
        .inline-input:focus, .inline-select:focus {
          border-bottom-color: var(--color-brand-lime-dark);
          color: var(--color-brand-lime-dark);
        }
        .inline-input::placeholder {
          color: #1A541566; 
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}