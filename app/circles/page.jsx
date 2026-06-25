"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Sparkles, Heart, ArrowRight, Info, Users, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserCirclesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('my-circle'); // 'my-circle' or 'explore'
  
  // Data States
  const [myCircle, setMyCircle] = useState(null);
  const [exploreCircles, setExploreCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interestLoading, setInterestLoading] = useState(null); // ID of circle being clicked
  const [message, setMessage] = useState({ type: '', text: '' });

  // Auth Check & Data Fetching
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchAllData(token);
  }, [router]);

  const fetchAllData = async (token) => {
    setLoading(true);
    try {
      // Fetch My Circle
      const myRes = await fetch('/api/user/circles/my-circle', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (myRes.ok) {
        const myData = await myRes.json();
        setMyCircle(myData.data);
      } else {
        setMyCircle(null);
      }

      // Fetch Explore Circles
      const exploreRes = await fetch('/api/user/circles/explore', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (exploreRes.ok) {
        const exploreData = await exploreRes.json();
        setExploreCircles(exploreData.data);
      }
    } catch (error) {
      console.error("Failed to fetch circles data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpressInterest = async (circleId) => {
    const token = localStorage.getItem('token');
    setInterestLoading(circleId);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(`/api/user/circles/${circleId}/interest`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: "Awesome! You've expressed interest. The admin will review your profile." });
        // Optional: Remove it from explore list or change button state locally
      } else {
        setMessage({ type: 'error', text: data.error || "Something went wrong." });
      }
    } catch (error) {
      setMessage({ type: 'error', text: "Network error. Try again." });
    } finally {
      setInterestLoading(null);
      // Auto clear message after 5 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-light relative">
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
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at center, #1A5415 2.5px, transparent 2.5px)', backgroundSize: '32px 32px' }}
        ></div>

        <div className="max-w-6xl mx-auto relative z-10 animate-in slide-in-from-bottom-4 duration-500">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-accent px-3 py-1.5 rounded-md border-2 border-brand-dark font-black text-xs uppercase tracking-wide mb-4 -rotate-2 shadow-[2px_2px_0px_#1A5415]">
                <Sparkles size={14} className="fill-brand-dark text-brand-dark" />
                Your Community Hub
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-brand-dark">
                Circles
              </h1>
            </div>

            {/* Custom Tab Switcher */}
            <div className="flex bg-brand-cream border-4 border-brand-dark rounded-xl shadow-[4px_4px_0px_#1A5415] overflow-hidden w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('my-circle')}
                className={`flex-1 md:flex-none px-6 py-3 font-black text-sm md:text-base uppercase tracking-wide transition-colors
                  ${activeTab === 'my-circle' ? 'bg-brand-primary text-brand-dark' : 'text-brand-dark hover:bg-brand-light'}
                `}
              >
                My Circle
              </button>
              <div className="w-1 bg-brand-dark"></div>
              <button 
                onClick={() => setActiveTab('explore')}
                className={`flex-1 md:flex-none px-6 py-3 font-black text-sm md:text-base uppercase tracking-wide transition-colors
                  ${activeTab === 'explore' ? 'bg-brand-primary text-brand-dark' : 'text-brand-dark hover:bg-brand-light'}
                `}
              >
                Explore
              </button>
            </div>
          </div>

          {/* Alert Messages */}
          {message.text && (
            <div className={`mb-8 p-4 border-4 border-brand-dark rounded-xl font-bold shadow-[4px_4px_0px_#1A5415] animate-in slide-in-from-top-2 flex items-center gap-3
              ${message.type === 'success' ? 'bg-brand-lime-dark text-brand-light' : 'bg-red-100 text-red-600'}
            `}>
              <Info size={24} />
              {message.text}
            </div>
          )}

          {/* =========================================
              TAB 1: MY CIRCLE
          ========================================= */}
          {activeTab === 'my-circle' && (
            <div className="space-y-10">
              {!myCircle ? (
                /* Empty State */
                <div className="bg-brand-cream p-10 md:p-16 rounded-[24px] border-4 border-brand-dark shadow-[8px_8px_0px_#1A5415] text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-brand-light border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px_#1A5415] mb-6 rotate-[-5deg]">
                    <Users size={40} className="text-brand-dark" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-dark mb-4">You're Not in a Circle Yet!</h2>
                  <p className="text-lg font-bold font-sans text-brand-dark/80 mb-8 max-w-xl">
                    Ready to meet real people and build genuine connections? Head over to the Explore tab to find circles that are currently forming.
                  </p>
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="bg-brand-primary text-brand-dark font-black px-8 py-4 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] transition-all flex items-center gap-2"
                  >
                    Explore Circles <ArrowRight strokeWidth={3} />
                  </button>
                </div>
              ) : (
                /* Active Circle Content */
                <>
                  {/* Circle Hero Card */}
                  <div className="bg-brand-dark p-8 md:p-10 rounded-[32px] border-4 border-brand-dark shadow-[8px_8px_0px_#9FD62A] text-brand-light relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-20 pointer-events-none">
                       <Heart size={200} fill="currentColor" />
                    </div>
                    <span className="inline-block bg-brand-lime-dark text-brand-dark font-black text-xs uppercase tracking-widest px-3 py-1 rounded-md border-2 border-brand-dark mb-4 transform -rotate-2">
                      {myCircle.type} Circle
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black mb-4">{myCircle.name}</h2>
                    <p className="text-lg md:text-xl font-medium max-w-2xl text-brand-cream/90">
                      {myCircle.description || "This is your active community space. Show up, engage, and let friendships grow naturally."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Events */}
                    <div className="lg:col-span-1 space-y-6">
                      <h3 className="text-2xl font-serif font-black text-brand-dark border-b-4 border-brand-dark pb-2 inline-block">Upcoming Events</h3>
                      
                      {myCircle.events && myCircle.events.length > 0 ? (
                        <div className="space-y-4">
                          {myCircle.events.map((event, idx) => (
                            <div key={event.id} className={`bg-brand-cream p-5 rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 transition-transform ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                              <h4 className="font-black text-xl text-brand-dark mb-3">{event.title}</h4>
                              <div className="flex items-center gap-2 text-sm font-bold text-brand-dark/80 mb-2">
                                <Calendar size={16} className="text-brand-lime-dark" />
                                {formatDate(event.date)}
                              </div>
                              <div className="flex items-center gap-2 text-sm font-bold text-brand-dark/80">
                                <MapPin size={16} className="text-brand-accent" />
                                {event.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-brand-light p-6 rounded-2xl border-4 border-dashed border-brand-dark text-center font-bold text-brand-dark/60">
                          No events scheduled yet. Check back soon!
                        </div>
                      )}
                    </div>

                    {/* Right Column: Fellow Members */}
                    <div className="lg:col-span-2 space-y-6">
                       <h3 className="text-2xl font-serif font-black text-brand-dark border-b-4 border-brand-dark pb-2 inline-block">Meet Your Circle</h3>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {myCircle.members && myCircle.members.map((member) => (
                            <div key={member.id} className="bg-brand-light p-5 rounded-[20px] border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] flex gap-4 items-start">
                                {/* Profile Image */}
                                <div className="w-16 h-16 rounded-full border-4 border-brand-dark bg-brand-secondary overflow-hidden flex-shrink-0">
                                  {member.profile?.profileImage ? (
                                    <img src={`/uploads/${member.profile.profileImage}`} alt={member.firstName} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center font-black text-xl text-brand-dark">
                                      {member.firstName.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                {/* Details */}
                                <div>
                                  <h4 className="font-black text-lg text-brand-dark">{member.firstName} {member.lastName}</h4>
                                  <p className="text-xs font-bold text-brand-dark/60 mb-2 line-clamp-2">
                                    {member.profile?.bio || "A mystery waiting to be discovered."}
                                  </p>
                                  {member.profile?.socialLink && (
                                    <a href={member.profile.socialLink} target="_blank" rel="noreferrer" className="text-xs font-black text-brand-lime-dark underline uppercase">
                                      View Social
                                    </a>
                                  )}
                                </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* =========================================
              TAB 2: EXPLORE CIRCLES
          ========================================= */}
          {activeTab === 'explore' && (
            <div className="space-y-8">
              <div className="bg-brand-secondary p-8 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] transform -rotate-1">
                <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-dark mb-2">Find Your People.</h2>
                <p className="text-base font-bold text-brand-dark/90">
                  These circles are currently forming. Express interest in the ones that match your vibe, and our community team will help curate the perfect group for you.
                </p>
              </div>

              {exploreCircles.length === 0 ? (
                <div className="text-center py-20 font-bold text-xl text-brand-dark/50">
                  No new circles are forming right now. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exploreCircles.map((circle) => (
                    <div key={circle.id} className="bg-brand-cream rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] flex flex-col hover:-translate-y-2 hover:shadow-[10px_10px_0px_#1A5415] transition-all duration-300 overflow-hidden">
                      
                      {/* Card Image / Banner Placeholder */}
                      <div className="h-40 border-b-4 border-brand-dark bg-brand-light relative">
                        {circle.img ? (
                          <img src={`/uploads/${circle.id}/${circle.img}`} alt={circle.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center opacity-50 bg-brand-primary">
                             <Users size={48} strokeWidth={1.5} className="text-brand-dark mb-2" />
                             <span className="font-black font-serif uppercase tracking-widest">{circle.type}</span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-brand-light px-3 py-1 rounded-full border-2 border-brand-dark text-xs font-black shadow-[2px_2px_0px_#1A5415] flex items-center gap-1">
                          <Clock size={12} className="text-brand-accent"/> Forming
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-serif font-black text-brand-dark mb-2">{circle.name}</h3>
                        <p className="text-sm font-medium text-brand-dark/80 mb-6 flex-grow line-clamp-3">
                          {circle.description || "Join this new circle to experience real-life connections, great conversations, and meaningful friendships."}
                        </p>
                        
                        {/* Event Preview */}
                        <div className="bg-brand-light p-3 rounded-xl border-2 border-brand-dark mb-6 text-xs font-bold shadow-inner">
                          <strong className="text-brand-lime-dark block uppercase tracking-wider mb-1">Upcoming Events: {circle.events?.length || 0}</strong>
                          {circle.events && circle.events.length > 0 ? (
                             <span className="truncate block">{circle.events[0].title}</span>
                          ) : (
                             <span className="text-brand-dark/50 italic">Schedule TBD</span>
                          )}
                        </div>

                        <button 
                          onClick={() => handleExpressInterest(circle.id)}
                          disabled={interestLoading === circle.id}
                          className="w-full py-3.5 bg-brand-dark text-brand-light font-black uppercase tracking-wide rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#9FD62A] hover:bg-brand-lime-dark hover:text-brand-dark hover:shadow-[4px_4px_0px_#1A5415] active:translate-y-1 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {interestLoading === circle.id ? 'Sending...' : "I'm Interested!"}
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}