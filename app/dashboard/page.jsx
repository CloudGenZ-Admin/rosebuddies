"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, CheckCircle, XCircle, HelpCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserDashboard() {
  const router = useRouter();
  const [data, setData] = useState({ activeCircle: null, upcomingEvents: [] });
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchDashboard(token);
  }, [router]);

  const fetchDashboard = async (token) => {
    try {
      const res = await fetch('/api/user/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId, status) => {
    const token = localStorage.getItem('token');
    setRsvpLoading(eventId);
    
    // Optimistic Update for UI snappiness
    setData(prev => ({
      ...prev,
      upcomingEvents: prev.upcomingEvents.map(evt => 
        evt.id === eventId ? { ...evt, userRsvpStatus: status } : evt
      )
    }));

    try {
      const res = await fetch(`/api/user/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rsvpStatus: status })
      });
      
      if (!res.ok) {
        // Revert on failure
        const errorData = await res.json();
        alert(errorData.error || "Failed to update RSVP");
        fetchDashboard(token);
      }
    } catch (error) {
      alert("Network error updating RSVP.");
      fetchDashboard(token);
    } finally {
      setRsvpLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
        {/* Neobrutalist background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #1A5415 2.5px, transparent 2.5px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-5xl mx-auto relative z-10 animate-in slide-in-from-bottom-4 duration-500">
          
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-accent px-3 py-1.5 rounded-md border-2 border-brand-dark font-black text-xs uppercase tracking-wide mb-4 -rotate-2 shadow-[2px_2px_0px_#1A5415]">
              <Sparkles size={14} className="fill-brand-dark text-brand-dark" />
              Welcome Back
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-brand-dark">
              Your Dashboard
            </h1>
          </div>

          {!data.activeCircle ? (
             <div className="bg-brand-cream p-10 rounded-[24px] border-4 border-brand-dark shadow-[8px_8px_0px_#1A5415] text-center">
               <AlertCircle size={48} className="mx-auto text-brand-dark mb-4" />
               <h2 className="text-3xl font-serif font-black text-brand-dark mb-2">No Active Circle Yet</h2>
               <p className="text-lg font-bold text-brand-dark/70 mb-6">Your admin is currently curating the perfect group for you. Hang tight!</p>
               <button onClick={() => router.push('/circles')} className="bg-brand-primary text-brand-dark font-black px-8 py-4 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all inline-flex items-center gap-2">
                  Explore Forming Circles <ArrowRight strokeWidth={3} />
               </button>
             </div>
          ) : (
            <div className="space-y-10">
              {/* Active Circle Banner */}
              <div className="bg-brand-dark p-8 md:p-10 rounded-[24px] border-4 border-brand-dark shadow-[8px_8px_0px_#9FD62A] text-brand-light flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div>
                   <span className="inline-block bg-brand-lime-dark text-brand-dark font-black text-xs uppercase tracking-widest px-3 py-1 rounded-md border-2 border-brand-dark mb-3 transform -rotate-1">
                     Active Circle
                   </span>
                   <h2 className="text-3xl md:text-4xl font-serif font-black">{data.activeCircle.name}</h2>
                 </div>
                 <button onClick={() => router.push('/circles')} className="bg-brand-light text-brand-dark font-black px-6 py-3 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 transition-all flex-shrink-0">
                   View Fellow Members
                 </button>
              </div>

              {/* Upcoming Events & RSVP */}
              <div>
                <h3 className="text-2xl font-serif font-black text-brand-dark border-b-4 border-brand-dark pb-2 inline-block mb-6">Your Upcoming Events</h3>
                
                {data.upcomingEvents.length === 0 ? (
                  <div className="bg-brand-light p-8 rounded-[24px] border-4 border-dashed border-brand-dark text-center font-bold text-brand-dark/60">
                    No events scheduled for the next 30 days. Check back soon!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.upcomingEvents.map((evt) => (
                      <div key={evt.id} className="bg-brand-cream rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] overflow-hidden flex flex-col">
                        
                        {/* Event Details */}
                        <div className="p-6 flex-grow border-b-4 border-brand-dark">
                          <h4 className="text-2xl font-serif font-black text-brand-dark mb-4">{evt.title}</h4>
                          <div className="space-y-3 font-bold text-brand-dark/80">
                            <div className="flex items-start gap-3">
                              <Calendar className="text-brand-lime-dark mt-0.5" size={20} />
                              <span>{formatDate(evt.date)}</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="text-brand-accent mt-0.5" size={20} />
                              <span>{evt.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* RSVP Section */}
                        <div className="p-6 bg-brand-light">
                          <p className="font-black text-xs uppercase tracking-widest text-brand-dark mb-3">Are you attending?</p>
                          <div className="flex flex-wrap gap-3">
                            <button 
                              onClick={() => handleRSVP(evt.id, 'going')}
                              disabled={rsvpLoading === evt.id}
                              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-4 border-brand-dark font-black text-sm transition-all
                                ${evt.userRsvpStatus === 'going' ? 'bg-brand-lime-dark text-brand-dark shadow-inner' : 'bg-white text-brand-dark hover:-translate-y-1 shadow-[2px_2px_0px_#1A5415]'}
                              `}
                            >
                              <CheckCircle size={18} /> Going
                            </button>
                            <button 
                              onClick={() => handleRSVP(evt.id, 'maybe')}
                              disabled={rsvpLoading === evt.id}
                              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-4 border-brand-dark font-black text-sm transition-all
                                ${evt.userRsvpStatus === 'maybe' ? 'bg-brand-primary text-brand-dark shadow-inner' : 'bg-white text-brand-dark hover:-translate-y-1 shadow-[2px_2px_0px_#1A5415]'}
                              `}
                            >
                              <HelpCircle size={18} /> Maybe
                            </button>
                            <button 
                              onClick={() => handleRSVP(evt.id, 'not_going')}
                              disabled={rsvpLoading === evt.id}
                              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-4 border-brand-dark font-black text-sm transition-all
                                ${evt.userRsvpStatus === 'not_going' ? 'bg-red-500 text-white shadow-inner border-red-900' : 'bg-white text-brand-dark hover:-translate-y-1 shadow-[2px_2px_0px_#1A5415]'}
                              `}
                            >
                              <XCircle size={18} /> Can't Go
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}