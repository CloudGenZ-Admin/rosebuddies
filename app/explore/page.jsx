"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, MapPin, Sparkles, ArrowLeft, 
  Search, Compass, Info, Image as ImageIcon,
  UserPlus, X, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ExploreCirclesPage() {
  const router = useRouter();
  
  // Data States
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Interest Modal States
  const [interestModal, setInterestModal] = useState({ 
    isOpen: false, 
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    message: '' 
  });

  // Auth Check & Data Fetching
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchExploreCircles(token);
  }, [router]);

  const fetchExploreCircles = async (token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/circles/explore', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const circlesArray = Array.isArray(data.data) ? data.data : data.data ? [data.data] : [];
        setCircles(circlesArray);
      } else {
        setCircles([]);
      }
    } catch (error) {
      console.error("Failed to fetch explore circles data", error);
      setMessage({ type: 'error', text: "Failed to load forming circles." });
    } finally {
      setLoading(false);
    }
  };

  // --- API INTEGRATION: Express Interest ---
  const handleExpressInterest = async () => {
    if (!selectedCircle) return;
    
    // Open modal in loading state
    setInterestModal({ 
      isOpen: true, 
      status: 'loading', 
      message: 'Submitting your interest...' 
    });
    
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`/api/user/circles/${selectedCircle.id}/interest`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Success
        setInterestModal({ 
          isOpen: true, 
          status: 'success', 
          message: data.message || "Interest expressed successfully! Admin will review your profile." 
        });
      } else {
        // Error (e.g., already expressed interest)
        setInterestModal({ 
          isOpen: true, 
          status: 'error', 
          message: data.error || "Failed to express interest." 
        });
      }
    } catch (err) {
      console.error("Express Interest API Error:", err);
      setInterestModal({ 
        isOpen: true, 
        status: 'error', 
        message: "Network error. Please try again." 
      });
    }
  };

  const closeInterestModal = () => {
    setInterestModal({ isOpen: false, status: 'idle', message: '' });
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
            <div className="inline-flex items-center gap-2 bg-brand-primary px-3 py-1.5 rounded-md border-2 border-brand-dark font-black text-xs uppercase tracking-wide mb-4 -rotate-2 shadow-[2px_2px_0px_#1A5415]">
              <Compass size={14} className="text-brand-dark" />
              Discover Communities
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-brand-dark">
              Explore Circles
            </h1>
            <p className="text-lg font-bold text-brand-dark/70 mt-4 max-w-2xl">
              Find communities that are currently forming. Connect with like-minded individuals and be part of something new from the ground up.
            </p>
          </div>

          {/* Top-Level Alert Messages */}
          {message.text && (
            <div className={`mb-8 p-4 border-4 border-brand-dark rounded-xl font-bold shadow-[4px_4px_0px_#1A5415] animate-in slide-in-from-top-2 flex items-center gap-3
              ${message.type === 'success' ? 'bg-brand-lime-dark text-brand-dark' : 'bg-red-200 text-red-800'}
            `}>
              <Info size={24} />
              {message.text}
            </div>
          )}

          {/* =========================================
              VIEW 1: LIST OF FORMING CIRCLES
          ========================================= */}
          {!selectedCircle ? (
            <div className="space-y-8">
              {circles.length === 0 ? (
                /* Empty State */
                <div className="bg-brand-cream p-10 md:p-16 rounded-[24px] border-4 border-brand-dark shadow-[8px_8px_0px_#1A5415] text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-brand-light border-4 border-brand-dark rounded-full flex items-center justify-center shadow-[4px_4px_0px_#1A5415] mb-6 rotate-[-5deg]">
                    <Search size={40} className="text-brand-dark" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-dark mb-4">No Forming Circles Found</h2>
                  <p className="text-lg font-bold font-sans text-brand-dark/80 max-w-xl">
                    Check back later! New circles are constantly forming as more members join the community.
                  </p>
                </div>
              ) : (
                /* Grid List of Explore Circles */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {circles.map((circle) => (
                    <div 
                      key={circle.id} 
                      onClick={() => setSelectedCircle(circle)}
                      className="group cursor-pointer bg-brand-cream rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] hover:-translate-y-2 hover:shadow-[10px_10px_0px_#1A5415] transition-all duration-300 flex flex-col overflow-hidden relative"
                    >
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4 z-10 bg-brand-lime-dark text-brand-dark text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-brand-dark shadow-[2px_2px_0px_#1A5415]">
                        Forming
                      </div>

                      {/* Circle Image */}
                      <div className="h-40 border-b-4 border-brand-dark bg-brand-light relative overflow-hidden shrink-0">
                        {circle.img ? (
                          <img src={`/uploads/${circle.id}/${circle.img}`} alt={circle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-brand-primary opacity-80 group-hover:bg-brand-lime-dark transition-colors">
                             <Compass size={40} strokeWidth={1.5} className="text-brand-dark mb-2" />
                             <span className="font-black font-serif uppercase tracking-widest text-sm">{circle.type || 'Circle'}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-serif font-black text-brand-dark mb-2">{circle.name}</h3>
                        <p className="text-sm font-bold text-brand-dark/70 line-clamp-2 mb-6">
                          {circle.description || "A new community is forming. Join early to help shape the direction!"}
                        </p>
                        
                        <div className="mt-auto flex justify-between items-center border-t-4 border-dashed border-brand-dark pt-4">
                          <div className="text-sm font-bold text-brand-dark/80 flex items-center gap-2">
                            <Calendar size={16} /> 
                            {circle.events?.length || 0} Planned Events
                          </div>
                          
                          <span className="text-sm font-black uppercase text-brand-dark underline decoration-2 underline-offset-4 group-hover:text-brand-lime-dark transition-colors">
                            View Details
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
               VIEW 2: INDIVIDUAL EXPLORE CIRCLE DETAILS
            ========================================= */
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Back Button */}
              <button 
                onClick={() => setSelectedCircle(null)}
                className="flex items-center gap-2 font-black text-brand-dark hover:text-brand-lime-dark transition-colors"
              >
                <ArrowLeft strokeWidth={3} size={20} /> Back to Explore
              </button>

              {/* HERO CARD */}
              <div className="relative bg-brand-dark rounded-[32px] border-4 border-brand-dark shadow-[8px_8px_0px_#9FD62A] text-brand-light overflow-hidden flex flex-col md:flex-row md:h-72 lg:h-80">
                
                {/* Circle Image Side */}
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
                     <Sparkles size={200} fill="currentColor" />
                  </div>
                  
                  <div className="relative z-10">
                    <span className="inline-block bg-brand-lime-dark text-brand-dark font-black text-xs uppercase tracking-widest px-3 py-1 rounded-md border-2 border-brand-dark mb-4 transform -rotate-2">
                      Status: Forming
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 truncate">{selectedCircle.name}</h2>
                    <p className="text-lg md:text-xl font-medium max-w-2xl text-brand-cream/90 line-clamp-3">
                      {selectedCircle.description || "This community is currently in its forming phase. View their upcoming events below to see what they have planned."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Events (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between border-b-4 border-brand-dark pb-2 mb-6">
                    <h3 className="text-2xl font-serif font-black text-brand-dark">Planned Events</h3>
                    <span className="bg-brand-dark text-brand-light font-bold text-xs px-2 py-1 rounded-full border-2 border-brand-dark">
                      {selectedCircle.events?.length || 0}
                    </span>
                  </div>
                  
                  {selectedCircle.events && selectedCircle.events.length > 0 ? (
                    <div className="space-y-6">
                      {selectedCircle.events.map((event) => (
                        <div key={event.id} className="bg-brand-cream rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] overflow-hidden flex flex-col sm:flex-row">
                          
                          {/* Event Image Placeholder */}
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
                            
                            {/* Call out instead of RSVP */}
                            <div className="pt-4 border-t-2 border-dashed border-brand-dark flex items-center justify-between bg-brand-cream">
                              <p className="text-xs font-black uppercase tracking-wider text-brand-dark/60">
                                Join circle to RSVP
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-brand-light p-10 rounded-2xl border-4 border-dashed border-brand-dark text-center font-bold text-brand-dark/60">
                      This forming circle hasn't planned any events yet.
                    </div>
                  )}
                </div>

                {/* Right Column: Information/Join Action (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                   <div className="bg-brand-light p-6 rounded-[24px] border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] sticky top-28">
                     <div className="w-12 h-12 bg-brand-accent rounded-full border-2 border-brand-dark flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1A5415]">
                       <UserPlus size={24} className="text-brand-dark" />
                     </div>
                     <h3 className="text-2xl font-serif font-black text-brand-dark mb-3">Want to Join?</h3>
                     <p className="text-sm font-bold text-brand-dark/80 mb-6">
                       This circle is currently seeking new members. If their events and interests align with yours, express your interest to join them!
                     </p>
                     <p className="text-xs italic text-brand-dark/60 mb-6 border-l-4 border-brand-dark pl-3">
                       *Note: Member lists are hidden to protect the privacy of early joiners. You will be able to see members once admitted.
                     </p>
                     
                     <button 
                       className="w-full bg-brand-primary text-brand-dark font-black uppercase tracking-widest text-sm py-4 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] active:translate-y-1 active:shadow-[2px_2px_0px_#1A5415] transition-all flex justify-center items-center gap-2"
                       onClick={handleExpressInterest}
                       disabled={interestModal.isOpen && interestModal.status === 'loading'}
                     >
                       Express Interest
                     </button>
                   </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* =========================================
          INTEREST STATUS MODAL (POPUP)
      ========================================= */}
      {interestModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity"
            onClick={interestModal.status !== 'loading' ? closeInterestModal : undefined}
          ></div>
          
          {/* Modal Card */}
          <div className="relative bg-brand-cream border-4 border-brand-dark shadow-[8px_8px_0px_#1A5415] rounded-[24px] w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            
            {/* Close Button (Hidden during loading) */}
            {interestModal.status !== 'loading' && (
              <button 
                onClick={closeInterestModal}
                className="absolute top-4 right-4 text-brand-dark hover:scale-110 transition-transform bg-brand-light rounded-full border-2 border-brand-dark p-1"
              >
                <X size={20} strokeWidth={3} />
              </button>
            )}

            <div className="flex flex-col items-center text-center">
              {/* Dynamic Icon based on Status */}
              <div className="mb-6">
                {interestModal.status === 'loading' && (
                  <Loader2 size={64} className="text-brand-primary animate-spin" />
                )}
                {interestModal.status === 'success' && (
                  <div className="w-20 h-20 bg-brand-lime-dark rounded-full border-4 border-brand-dark flex items-center justify-center shadow-[4px_4px_0px_#1A5415]">
                    <CheckCircle size={40} className="text-brand-dark" />
                  </div>
                )}
                {interestModal.status === 'error' && (
                  <div className="w-20 h-20 bg-red-400 rounded-full border-4 border-brand-dark flex items-center justify-center shadow-[4px_4px_0px_#1A5415]">
                    <AlertCircle size={40} className="text-brand-dark" />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-serif font-black text-brand-dark mb-3">
                {interestModal.status === 'loading' ? 'Processing...' : 
                 interestModal.status === 'success' ? 'Success!' : 
                 'Something went wrong'}
              </h3>
              
              <p className="text-brand-dark/80 font-bold mb-8 px-2">
                {interestModal.message}
              </p>

              {/* Action Button */}
              {interestModal.status !== 'loading' && (
                <button 
                  onClick={closeInterestModal}
                  className="w-full bg-brand-dark text-brand-light font-black uppercase tracking-widest py-3 rounded-xl border-4 border-transparent hover:border-brand-primary transition-colors"
                >
                  {interestModal.status === 'success' ? 'Got It' : 'Try Again'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}