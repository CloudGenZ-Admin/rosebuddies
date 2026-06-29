"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, ArrowRight, Info, Users, Clock } from 'lucide-react';

export default function UserCirclesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('my-circle'); 
  const [myCircle, setMyCircle] = useState(null);
  const [exploreCircles, setExploreCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interestLoading, setInterestLoading] = useState(null); 
  const [message, setMessage] = useState({ type: '', text: '' });

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
      const myRes = await fetch('/api/user/circles/my-circle', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (myRes.ok) {
        const myData = await myRes.json();
        setMyCircle(myData.data);
      } else {
        setMyCircle(null);
      }

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
      } else {
        setMessage({ type: 'error', text: data.error || "Something went wrong." });
      }
    } catch (error) {
      setMessage({ type: 'error', text: "Network error. Try again." });
    } finally {
      setInterestLoading(null);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F7F5]">
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D48C71]"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F5] font-sans text-[#3A4035]">
      
      <main className="flex-grow pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">
                Circles
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                Your community hub and upcoming events.
              </p>
            </div>

            {/* Clean Tab Switcher */}
            <div className="flex bg-white p-1 rounded-full shadow-sm border border-gray-100 w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('my-circle')} 
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'my-circle' ? 'bg-[#4B5E50] text-white shadow-sm' : 'text-gray-500 hover:text-[#4B5E50]'}`}
              >
                My Circle
              </button>
              <button 
                onClick={() => setActiveTab('explore')} 
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'explore' ? 'bg-[#4B5E50] text-white shadow-sm' : 'text-gray-500 hover:text-[#4B5E50]'}`}
              >
                Explore
              </button>
            </div>
          </div>

          {/* Messages / Notifications */}
          {message.text && (
            <div className={`mb-8 p-4 rounded-2xl font-bold text-sm shadow-sm flex items-center gap-3 ${message.type === 'success' ? 'bg-[#9FD62A]/20 text-[#4B5E50] border border-[#9FD62A]/30' : 'bg-red-50 text-red-600 border border-red-100'}`}>
              <Info size={20} />
              {message.text}
            </div>
          )}

          {/* =========================================
              TAB 1: MY CIRCLE
          ========================================= */}
          {activeTab === 'my-circle' && (
            <div className="space-y-8">
              {!myCircle ? (
                /* Empty State */
                <div className="bg-white p-10 md:p-16 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Users size={32} className="text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#4B5E50] mb-3">You're Not in a Circle Yet!</h2>
                  <p className="text-gray-500 mb-8 max-w-md">
                    Ready to meet real people and build genuine connections? Head over to the Explore tab to find circles that are currently forming.
                  </p>
                  <button onClick={() => setActiveTab('explore')} className="bg-[#D48C71] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#c27a60] transition-colors flex items-center gap-2">
                    Explore Circles <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <>
                  {/* Circle Hero Banner */}
                  <div className="bg-[#4B5E50] p-8 md:p-10 rounded-3xl shadow-sm text-white">
                    <span className="inline-block bg-[#9FD62A] text-[#4B5E50] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                      {myCircle.type} Circle
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">{myCircle.name}</h2>
                    <p className="text-sm md:text-base text-gray-200 max-w-2xl">
                      {myCircle.description || "This is your active community space. Show up, engage, and let friendships grow naturally."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* UPCOMING EVENTS */}
                    <div className="lg:col-span-1 space-y-6">
                      <h3 className="text-xl font-bold text-[#4B5E50] mb-4">Upcoming Events</h3>
                      {myCircle.events && myCircle.events.length > 0 ? (
                        <div className="space-y-4">
                          {myCircle.events.map((event) => (
                            <div key={event.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                              <h4 className="font-bold text-[#4B5E50] mb-3">{event.title}</h4>
                              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2">
                                <Calendar size={14} className="text-[#D48C71]" />
                                {formatDate(event.date)}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                <MapPin size={14} className="text-[#9FD62A]" />
                                {event.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center text-sm text-gray-500">
                          No events scheduled yet. Check back soon!
                        </div>
                      )}
                    </div>

                    {/* MEET YOUR CIRCLE (FELLOW MEMBERS) */}
                    <div className="lg:col-span-2 space-y-6">
                       <h3 className="text-xl font-bold text-[#4B5E50] mb-4">Meet Your Circle</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {myCircle.members && myCircle.members.map((member) => (
                            <div key={member.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                  {member.profile?.profileImage ? (
                                    <img src={`/uploads/${member.id}/${member.profile.profileImage}`} alt={member.firstName} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="font-bold text-[#4B5E50] text-sm">
                                      {member.firstName.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                
                                {/* Info */}
                                <div>
                                  <h4 className="font-bold text-[#4B5E50] text-sm mb-1">{member.firstName} {member.lastName}</h4>
                                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                    {member.profile?.bio || "A mystery waiting to be discovered."}
                                  </p>
                                  {member.profile?.socialLink && (
                                    <a href={member.profile.socialLink} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#D48C71] hover:underline">
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
              TAB 2: EXPLORE
          ========================================= */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#4B5E50] mb-2">Find Your People.</h2>
                <p className="text-sm text-gray-500 max-w-2xl">
                  These circles are currently forming. Express interest in the ones that match your vibe, and our community team will help curate the perfect group for you.
                </p>
              </div>

              {exploreCircles.length === 0 ? (
                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center text-gray-500">
                  No new circles are forming right now. Check back soon!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exploreCircles.map((circle) => (
                    <div key={circle.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                      
                      {/* Image Banner */}
                      <div className="h-40 bg-gray-100 relative">
                        {circle.img ? (
                          <img src={`/uploads/${circle.id}/${circle.img}`} alt={circle.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                             <Users size={32} className="text-[#4B5E50] mb-2" />
                             <span className="font-bold text-xs uppercase tracking-widest text-[#4B5E50]">{circle.type}</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#4B5E50] shadow-sm flex items-center gap-1 uppercase tracking-wider">
                          <Clock size={10} className="text-[#D48C71]"/> Forming
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-[#4B5E50] mb-2">{circle.name}</h3>
                        <p className="text-sm text-gray-500 mb-6 flex-grow line-clamp-3">
                          {circle.description || "Join this new circle to experience real-life connections, great conversations, and meaningful friendships."}
                        </p>
                        
                        {/* Event Preview Area */}
                        <div className="bg-gray-50 p-4 rounded-2xl mb-6 text-xs text-gray-600 border border-gray-100">
                          <strong className="text-[#4B5E50] block mb-1">Upcoming Events: {circle.events?.length || 0}</strong>
                          {circle.events && circle.events.length > 0 ? (
                             <span className="truncate block font-medium">{circle.events[0].title}</span>
                          ) : (
                             <span className="italic text-gray-400">Schedule TBD</span>
                          )}
                        </div>

                        {/* Button */}
                        <button 
                          onClick={() => handleExpressInterest(circle.id)}
                          disabled={interestLoading === circle.id}
                          className="w-full py-3 bg-[#4B5E50] text-white font-bold text-sm rounded-full hover:bg-[#3a4a3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {interestLoading === circle.id ? 'Sending Request...' : "I'm Interested"}
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
    </div>
  );
}