"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Phone, Link as LinkIcon, AlignLeft, Zap, MapPin, Target, Clock, Upload, ArrowRight } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  // Check auth on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Map basic text inputs
    formData.append('dateOfBirth', e.target.dateOfBirth.value);
    formData.append('phoneNumber', e.target.phoneNumber.value);
    formData.append('socialLink', e.target.socialLink.value);
    formData.append('bio', e.target.bio.value);
    formData.append('socialEnergy', e.target.socialEnergy.value);

    // Image Upload
    const profileImage = e.target.profileImage.files[0];
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    // Helper to safely parse comma separated strings into JSON arrays
    const parseArrayString = (val) => {
      if (!val) return JSON.stringify([]);
      return JSON.stringify(val.split(',').map(item => item.trim()).filter(Boolean));
    };

    formData.append('preferredNeighborhoods', parseArrayString(e.target.preferredNeighborhoods.value));
    formData.append('friendshipGoals', parseArrayString(e.target.friendshipGoals.value));
    formData.append('availability', parseArrayString(e.target.availability.value));

    try {
      const response = await fetch('/api/user/complete-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type, browser will automatically set multipart/form-data with bounds
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Update local user data to mark profileCompleted
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            user.profileCompleted = true;
            localStorage.setItem('user', JSON.stringify(user));
        }
        router.push('/');
      } else {
        setErrorMessage(data.error || "Failed to complete profile. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Profile Complete Error:", error);
      setErrorMessage("Network error. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-light relative">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at center, #1A5415 2.5px, transparent 2.5px)', backgroundSize: '32px 32px' }}
        ></div>

        <div className="w-full max-w-4xl bg-brand-cream border-4 border-brand-dark rounded-[24px] lg:rounded-[32px] shadow-[8px_8px_0px_#1A5415] lg:shadow-[12px_12px_0px_#1A5415] relative z-10 p-6 sm:p-8 md:p-12 animate-in slide-in-from-bottom-6 duration-500">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-brand-dark mb-3">
              Complete Your Profile
            </h1>
            <p className="text-base sm:text-lg font-bold font-sans text-brand-dark/80">
              Let's make sure people know the real you.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border-4 border-brand-dark rounded-xl font-bold text-red-600 shadow-[4px_4px_0px_#1A5415]">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Top Row: File Upload and DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-black text-brand-dark text-xs uppercase tracking-wide">Profile Image</label>
                <div className="relative">
                  <input type="file" id="profileImage" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="profileImage" className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base text-brand-dark hover:bg-brand-primary transition-all shadow-[4px_4px_0px_#1A5415] cursor-pointer">
                    <Upload size={18} strokeWidth={2.5} />
                    {fileName ? fileName : "Upload Image"}
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="dateOfBirth" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Date of Birth</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/50" size={18} strokeWidth={2.5} />
                  <input type="date" id="dateOfBirth" required className="w-full pl-12 pr-4 py-3 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] focus:shadow-[2px_2px_0px_#1A5415] focus:translate-y-[2px] transition-all" />
                </div>
              </div>
            </div>

            {/* Second Row: Phone & Social Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="phoneNumber" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/50" size={18} strokeWidth={2.5} />
                  <input type="tel" id="phoneNumber" required placeholder="+1 234 567 8900" className="w-full pl-12 pr-4 py-3 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] focus:translate-y-[2px] transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="socialLink" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Social Link (Optional)</label>
                <div className="relative group">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/50" size={18} strokeWidth={2.5} />
                  <input type="url" id="socialLink" placeholder="https://instagram.com/yourhandle" className="w-full pl-12 pr-4 py-3 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] focus:translate-y-[2px] transition-all" />
                </div>
              </div>
            </div>

            {/* Bio & Social Energy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5 md:col-span-2">
                <label htmlFor="bio" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Bio</label>
                <div className="relative group h-full">
                  <AlignLeft className="absolute left-4 top-4 text-brand-dark/50" size={18} strokeWidth={2.5} />
                  <textarea id="bio" rows="3" required placeholder="Tell us about yourself..." className="w-full pl-12 pr-4 py-3 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] focus:translate-y-[2px] transition-all resize-none"></textarea>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="socialEnergy" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Social Energy</label>
                <div className="relative group">
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/50 z-10" size={18} strokeWidth={2.5} />
                  <select id="socialEnergy" required className="w-full pl-12 pr-4 py-3 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] focus:translate-y-[2px] transition-all appearance-none cursor-pointer">
                    <option value="">Select...</option>
                    <option value="Introvert">Introvert</option>
                    <option value="Extrovert">Extrovert</option>
                    <option value="Ambivert">Ambivert</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Arrays (Comma separated text inputs) */}
            <div className="space-y-4 pt-2">
              <h3 className="font-black text-lg text-brand-dark border-b-4 border-brand-dark pb-2 inline-block">Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="preferredNeighborhoods" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Neighborhoods</label>
                  <p className="text-[10px] font-bold text-brand-dark/60 uppercase">Comma separated</p>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/50" size={16} />
                    <input type="text" id="preferredNeighborhoods" placeholder="Brooklyn, Queens" className="w-full pl-9 pr-3 py-2.5 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-sm text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="friendshipGoals" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Friendship Goals</label>
                  <p className="text-[10px] font-bold text-brand-dark/60 uppercase">Comma separated</p>
                  <div className="relative group">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/50" size={16} />
                    <input type="text" id="friendshipGoals" placeholder="Running, Board games" className="w-full pl-9 pr-3 py-2.5 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-sm text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="availability" className="block font-black text-brand-dark text-xs uppercase tracking-wide">Availability</label>
                  <p className="text-[10px] font-bold text-brand-dark/60 uppercase">Comma separated</p>
                  <div className="relative group">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/50" size={16} />
                    <input type="text" id="availability" placeholder="Weekends, Evenings" className="w-full pl-9 pr-3 py-2.5 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-sm text-brand-dark focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary text-brand-dark font-black text-xl py-4 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all flex justify-center items-center gap-3 disabled:opacity-70 group">
                {isSubmitting ? "Saving Profile..." : <>Save & Continue <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}