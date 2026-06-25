"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Sparkles, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Static Quiz Questions (Matches your Vibe Check admin stats)
const QUIZ_QUESTIONS = [
  { id: 1, text: "What's your ideal way to spend a Friday night?", options: ["Quiet night in", "Dinner with friends", "Exploring the city", "Attending an event/party"] },
  { id: 2, text: "What are you hoping to find?", options: ["Deep 1-on-1 friendships", "A large social group", "Activity partners", "Professional networking"] },
  { id: 3, text: "Preferred social setting?", options: ["Coffee shops", "Bars/Lounges", "Outdoors/Parks", "Restaurants"] },
  { id: 4, text: "Current life chapter?", options: ["New to the city", "Recently single", "Career focused", "Looking to expand circle"] },
  { id: 5, text: "What excites you most?", options: ["Trying new food", "Art & Culture", "Fitness & Sports", "Live Music"] }
];

export default function UserPreferences() {
  const router = useRouter();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchPreferences(token);
  }, [router]);

  const fetchPreferences = async (token) => {
    try {
      const res = await fetch('/api/user/preferences', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // If they have existing answers, load them, else initialize empty
        setAnswers(data.quizAnswers && data.quizAnswers.length > 0 ? data.quizAnswers : QUIZ_QUESTIONS.map(q => ({ question: q.id, questionText: q.text, responses: [] })));
      }
    } catch (error) {
      console.error("Fetch Preferences Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOption = (questionId, optionText, questionText) => {
    setAnswers(prev => {
      const existingQ = prev.find(a => a.question === questionId);
      
      let newResponses = [];
      if (existingQ) {
        // Single choice logic (change to array manipulation if you want multiple choice)
        newResponses = [optionText]; 
      } else {
        newResponses = [optionText];
      }

      const newAnswer = { question: questionId, questionText: questionText, responses: newResponses };

      if (existingQ) {
        return prev.map(a => a.question === questionId ? newAnswer : a);
      } else {
        return [...prev, newAnswer];
      }
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    setSaving(true);
    setSuccessMsg("");

    try {
      const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ quizAnswers: answers })
      });

      if (res.ok) {
        setSuccessMsg("Vibe Check updated successfully! 🌸");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        alert("Failed to save preferences.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-light">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-28">
           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-dark"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-light relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #1A5415 2.5px, transparent 2.5px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-4xl mx-auto relative z-10 animate-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-lime-dark px-3 py-1.5 rounded-md border-2 border-brand-dark font-black text-xs uppercase tracking-wide mb-4 rotate-2 shadow-[2px_2px_0px_#1A5415]">
                <Sparkles size={14} className="fill-brand-dark text-brand-dark" />
                Vibe Check
              </div>
              <h1 className="text-4xl md:text-5xl font-black font-serif text-brand-dark">
                Your Preferences
              </h1>
              <p className="text-brand-dark/80 font-bold mt-2 font-sans">Update your vibe check so we can match you with the right people.</p>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-dark text-brand-cream font-black px-8 py-4 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#9FD62A] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#9FD62A] transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {saving ? 'Saving...' : <><Save size={20} /> Save Preferences</>}
            </button>
          </div>

          {successMsg && (
            <div className="mb-8 p-4 bg-brand-primary border-4 border-brand-dark rounded-xl font-bold shadow-[4px_4px_0px_#1A5415] flex items-center gap-3 text-brand-dark animate-in slide-in-from-top-2">
              <Check size={24} /> {successMsg}
            </div>
          )}

          <div className="space-y-8">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const currentAnswerObj = answers.find(a => a.question === q.id);
              const currentSelected = currentAnswerObj ? currentAnswerObj.responses[0] : null;

              return (
                <div key={q.id} className={`bg-brand-cream p-6 md:p-8 rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                  <h3 className="text-xl md:text-2xl font-serif font-black text-brand-dark mb-6">
                    {q.id}. {q.text}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.options.map(option => {
                      const isSelected = currentSelected === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleToggleOption(q.id, option, q.text)}
                          className={`text-left p-4 rounded-xl border-4 border-brand-dark font-bold transition-all
                            ${isSelected 
                              ? 'bg-brand-lime-dark text-brand-dark shadow-inner -translate-y-1' 
                              : 'bg-brand-light text-brand-dark hover:bg-brand-accent hover:-translate-y-1 shadow-[2px_2px_0px_#1A5415]'}
                          `}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}