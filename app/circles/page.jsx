"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, MapPin, Sparkles, Heart, ArrowLeft, 
  Users, Clock, CheckCircle, Info, Image as ImageIcon 
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function MyCirclesPage() {
  const router = useRouter();
  
  // Data States
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [statusLoading, setStatusLoading] = useState(null); // ID of event being updated
  const [message, setMessage] = useState({ type: '', text: '' });

  // Auth Check & Data Fetching
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchMyCircles(token);
  }, [router]);

  const fetchMyCircles = async (token) => {
    setLoading(true);
    try {
      // Fetching only "My Circles"
      const res = await fetch('/api/user/circles/my-circle', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Ensure data is an array (if API returns a single object, wrap it)
        const circlesArray = Array.isArray(data.data) ? data.data : data.data ? [data.data] : [];
        setCircles(circlesArray);
      } else {
        setCircles([]);
      }
    } catch (error) {
      console.error("Failed to fetch my circles data", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Event RSVP / Status Change
  const handleEventStatusChange = async (eventId, newStatus) => {
    const token = localStorage.getItem('token');
    setStatusLoading(eventId);
    setMessage({ type: '', text: '' });

    try {
      // MATCHED WITH BACKEND: URL changed to /rsvp, Method to POST, Body to rsvpStatus
      const res = await fetch(`/api/user/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rsvpStatus: newStatus })
      });
      
      if (res.ok) {
        setMessage({ type: 'success', text: "Event status updated successfully!" });
        // Update local state to reflect the change immediately
        if (selectedCircle) {
          const updatedCircle = { ...selectedCircle };
          updatedCircle.events = updatedCircle.events.map(ev => 
            ev.id === eventId ? { ...ev, userStatus: newStatus } : ev
          );
          setSelectedCircle(updatedCircle);
        }
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || "Failed to update status." });
      }
    } catch (error) {
      setMessage({ type: 'error', text: "Network error. Try again." });
    } finally {
      setStatusLoading(null);
      setTimeout(() => setMessage({ type: '', text: '' }), 4000);
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

        <div className="max-w-7xl mx-auto relative z-10 animate-in slide-in-from-bottom-4 duration-500">
          
          {/* Header Section */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-accent px-3 py-1.5 rounded-md border-2 border-brand-dark font-black text-xs uppercase tracking-wide mb-4 -rotate-2 shadow-[2px_2px_0px_#1A5415]">
              <Sparkles size={14} className="fill-brand-dark text-brand-dark" />
              Your Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-brand-dark">
              My Circles
            </h1>
          </div>

          {/* Alert Messages */}
          {message.text && (
            <div className={`mb-8 p-4 border-4 border-brand-dark rounded-xl font-bold shadow-[4px_4px_0px_#1A5415] animate-in slide-in-from-top-2 flex items-center gap-3
              ${message.type === 'success' ? 'bg-brand-lime-dark text-brand-dark' : 'bg-red-200 text-red-800'}
            `}>
              <Info size={24} />
              {message.text}
            </div>
          )}

          {/* =========================================
              VIEW 1: LIST OF ALL USER'S CIRCLES
          ========================================= */}
          {!selectedCircle ? (
            <div className="space-y-8">
              {circles.length === 0 ? (
                /* Empty State */
                <div className="bg-brand-cream p-10 md:p-16 rounded-[24px] border-4 border-brand-dark shadow-[8px_8px_0px_#1A5415] text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-brand-light border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px_#1A5415] mb-6 rotate-[-5deg]">
                    <Users size={40} className="text-brand-dark" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-dark mb-4">You're Not in a Circle Yet!</h2>
                  <p className="text-lg font-bold font-sans text-brand-dark/80 max-w-xl">
                    Head over to the Explore page from your dashboard to find circles that are currently forming.
                  </p>
                </div>
              ) : (
                /* Grid List of User's Circles */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {circles.map((circle) => (
                    <div 
                      key={circle.id} 
                      onClick={() => setSelectedCircle(circle)}
                      className="group cursor-pointer bg-brand-cream rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] hover:-translate-y-2 hover:shadow-[10px_10px_0px_#1A5415] transition-all duration-300 flex flex-col overflow-hidden"
                    >
                      {/* Circle Image */}
                      <div className="h-40 border-b-4 border-brand-dark bg-brand-light relative overflow-hidden shrink-0">
                        {circle.img ? (
                          <img src={`/uploads/${circle.id}/${circle.img}`} alt={circle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-brand-primary opacity-80 group-hover:bg-brand-lime-dark transition-colors">
                             <Users size={40} strokeWidth={1.5} className="text-brand-dark mb-2" />
                             <span className="font-black font-serif uppercase tracking-widest text-sm">{circle.type || 'Circle'}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-serif font-black text-brand-dark mb-2">{circle.name}</h3>
                        <p className="text-sm font-bold text-brand-dark/70 line-clamp-2 mb-6">
                          {circle.description || "Your dedicated community space."}
                        </p>
                        
                        <div className="mt-auto flex justify-between items-center border-t-4 border-dashed border-brand-dark pt-4">
                          <div className="flex -space-x-2">
                            {/* Mini Member Avatars Placeholder */}
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-brand-secondary flex items-center justify-center overflow-hidden">
                                <Users size={12} className="text-brand-dark opacity-50" />
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-brand-dark bg-brand-light flex items-center justify-center text-[10px] font-black">
                              +{circle.members?.length || 0}
                            </div>
                          </div>
                          
                          <span className="text-sm font-black uppercase text-brand-dark underline decoration-2 underline-offset-4 group-hover:text-brand-lime-dark transition-colors">
                            Enter Circle
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* =========================================
               VIEW 2: INDIVIDUAL CIRCLE DETAILS
            ========================================= */
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Back Button */}
              <button 
                onClick={() => setSelectedCircle(null)}
                className="flex items-center gap-2 font-black text-brand-dark hover:text-brand-lime-dark transition-colors"
              >
                <ArrowLeft strokeWidth={3} size={20} /> Back to My Circles
              </button>

              {/* FIXED HERO CARD: Added md:h-72 and lg:h-80 to restrict height strictly */}
              <div className="relative bg-brand-dark rounded-[32px] border-4 border-brand-dark shadow-[8px_8px_0px_#9FD62A] text-brand-light overflow-hidden flex flex-col md:flex-row md:h-72 lg:h-80">
                
                {/* Circle Image Side - Fixed to fill exactly the container height */}
                <div className="w-full md:w-72 lg:w-96 shrink-0 bg-brand-primary border-b-4 md:border-b-0 md:border-r-4 border-brand-dark relative h-64 md:h-full">
                   {selectedCircle.img ? (
                      <img src={`/uploads/${selectedCircle.id}/${selectedCircle.img}`} alt={selectedCircle.name} className="absolute inset-0 w-full h-full object-cover" />
                   ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-secondary text-brand-dark p-6 text-center">
                         <ImageIcon size={48} strokeWidth={1} className="opacity-50 mb-2" />
                         <span className="font-black opacity-50 uppercase tracking-widest text-sm">No Cover</span>
                      </div>
                   )}
                </div>
                
                {/* Info Side */}
                <div className="w-full flex-1 p-8 md:p-10 relative flex flex-col justify-center overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                     <Heart size={200} fill="currentColor" />
                  </div>
                  
                  {/* Using a wrapping div to keep text nice even if it's long */}
                  <div className="relative z-10">
                    <span className="inline-block bg-brand-lime-dark text-brand-dark font-black text-xs uppercase tracking-widest px-3 py-1 rounded-md border-2 border-brand-dark mb-4 transform -rotate-2">
                      {selectedCircle.type || 'Active'} Circle
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 truncate">{selectedCircle.name}</h2>
                    <p className="text-lg md:text-xl font-medium max-w-2xl text-brand-cream/90 line-clamp-3">
                      {selectedCircle.description || "This is your active community space. Show up, engage, and let friendships grow naturally."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Events (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b-4 border-brand-dark pb-2 mb-6">
                    <h3 className="text-2xl font-serif font-black text-brand-dark">Upcoming Events</h3>
                    <span className="bg-brand-dark text-brand-light font-bold text-xs px-2 py-1 rounded-full border-2 border-brand-dark">
                      {selectedCircle.events?.length || 0}
                    </span>
                  </div>
                  
                  {selectedCircle.events && selectedCircle.events.length > 0 ? (
                    <div className="space-y-6">
                      {selectedCircle.events.map((event, idx) => (
                        <div key={event.id} className="bg-brand-cream rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] overflow-hidden flex flex-col sm:flex-row">
                          
                          {/* Event Image */}
                          <div className="w-full sm:w-40 h-40 sm:h-auto border-b-4 sm:border-b-0 sm:border-r-4 border-brand-dark bg-brand-light relative shrink-0">
                            {event.img ? (
                               <img src={`/uploads/events/${event.id}/${event.img}`} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                                  <Calendar size={32} />
                               </div>
                            )}
                          </div>

                          {/* Event Details */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-black text-xl text-brand-dark mb-2">{event.title}</h4>
                              <div className="flex items-center gap-2 text-sm font-bold text-brand-dark/80 mb-1">
                                <Calendar size={16} className="text-brand-lime-dark" />
                                {formatDate(event.date)}
                              </div>
                              <div className="flex items-center gap-2 text-sm font-bold text-brand-dark/80 mb-4">
                                <MapPin size={16} className="text-brand-accent" />
                                {event.location}
                              </div>
                            </div>
                            
                            {/* EVENT STATUS CHANGER UI */}
                            <div className="pt-4 border-t-2 border-dashed border-brand-dark flex items-center justify-between">
                              <label className="text-xs font-black uppercase tracking-wider text-brand-dark">
                                Your RSVP:
                              </label>
                              <div className="relative">
                                <select 
                                  value={event.userStatus || 'maybe'} 
                                  onChange={(e) => handleEventStatusChange(event.id, e.target.value)}
                                  disabled={statusLoading === event.id}
                                  className="appearance-none bg-brand-light border-2 border-brand-dark text-sm font-black px-4 py-2 pr-8 rounded-lg shadow-[2px_2px_0px_#1A5415] focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50 cursor-pointer"
                                >
                                  <option value="maybe">Pending</option>
                                  <option value="going">Attending</option>
                                  <option value="not_going">Not Attending</option>
                                </select>
                                <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-brand-light p-10 rounded-2xl border-4 border-dashed border-brand-dark text-center font-bold text-brand-dark/60">
                      No events scheduled yet. Keep an eye out!
                    </div>
                  )}
                </div>

                {/* Right Column: Members (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                   <div className="flex items-center justify-between border-b-4 border-brand-dark pb-2 mb-6">
                     <h3 className="text-2xl font-serif font-black text-brand-dark">Members</h3>
                     <span className="bg-brand-dark text-brand-light font-bold text-xs px-2 py-1 rounded-full border-2 border-brand-dark">
                       {selectedCircle.members?.length || 0}
                     </span>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-4">
                      {selectedCircle.members && selectedCircle.members.map((member) => (
                        <div key={member.id} className="bg-brand-light p-4 rounded-[16px] border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] flex gap-4 items-center">
                            
                            {/* Member Profile Image */}
                            <div className="w-14 h-14 rounded-full border-4 border-brand-dark bg-brand-secondary overflow-hidden flex-shrink-0">
                              {member.profile?.profileImage ? (
                                <img src={`/uploads/${member.profile.profileImage}`} alt={member.firstName} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-black text-xl text-brand-dark bg-brand-primary">
                                  {member.firstName?.charAt(0) || 'M'}
                                </div>
                              )}
                            </div>

                            {/* Member Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-lg text-brand-dark truncate">{member.firstName} {member.lastName}</h4>
                              <p className="text-xs font-bold text-brand-dark/60 truncate mb-1">
                                {member.profile?.bio || "A mystery waiting to be discovered."}
                              </p>
                              {member.profile?.socialLink && (
                                <a href={member.profile.socialLink} target="_blank" rel="noreferrer" className="text-[10px] font-black text-brand-lime-dark underline uppercase">
                                  View Social
                                </a>
                              )}
                            </div>
                        </div>
                      ))}
                   </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}