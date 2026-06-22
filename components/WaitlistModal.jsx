"use client";
import { useState, useEffect, useRef } from 'react';
import { X, Mail, MapPin, ArrowRight, Sparkles, ChevronDown, Check } from 'lucide-react';

const OTTAWA_AREAS = [
  { id: "west-carleton", label: "West Carleton" },
  { id: "kanata", label: "Kanata" },
  { id: "goulbourn", label: "Goulbourn" },
  { id: "nepean", label: "Nepean" },
  { id: "rideau", label: "Rideau" },
  { id: "ottawa", label: "Ottawa" },
  { id: "gloucester", label: "Gloucester" },
  { id: "osgoode", label: "Osgoode" },
  { id: "cumberland", label: "Cumberland" },
  { id: "clarence", label: "Clarence" },
  { id: "russell", label: "Russell" },
  { id: "cambridge", label: "Cambridge" },
  { id: "south-gower", label: "South Gower" },
  { id: "renfrew-county", label: "Renfrew County" },
  { id: "lanark-county", label: "Lanark County" },
  { id: "frontenac-county", label: "Frontenac County" },
  { id: "leeds-and-grenville", label: "Leeds and Grenville" },
  { id: "prescott-and-russell", label: "Prescott and Russell" },
  { id: "stormont-dundas-and-glengarry", label: "Stormont, Dundas and Glengarry" }
];

export default function WaitlistModal({ isOpen, onClose }) {
  const [waitlistStatus, setWaitlistStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const dropdownRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state when closed
      setTimeout(() => {
        setWaitlistStatus("idle");
        setErrorMessage("");
      }, 300);
      setSelectedArea("");
      setIsDropdownOpen(false);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Waitlist Form Submission
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Custom validation for dropdown to prevent hidden input focus errors
    if (!selectedArea) {
      setIsDropdownOpen(true);
      return;
    }

    setWaitlistStatus("submitting");

    try {
      const email = e.target.email.value;

      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          city: selectedArea, 
        }),
      });

      // Safely check if response is JSON to prevent <!DOCTYPE html> crashes on 404s
      const contentType = response.headers.get("content-type");
      let data = {};
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Server returned an invalid response (Endpoint might be missing).");
      }

      if (response.ok) {
        setWaitlistStatus("success");
      } else {
        setErrorMessage(data.error || "Failed to join the waitlist. Please try again.");
        setWaitlistStatus("error");
      }
    } catch (error) {
      console.error("Waitlist Submission Error:", error);
      setErrorMessage("System error. Please make sure the API endpoint exists and try again.");
      setWaitlistStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Outer Wrapper: Handles full screen centering and fallback scrolling for tiny screens */}
      <div className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="min-h-screen px-4 text-center flex items-center justify-center">
          
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-brand-dark/70 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
            onClick={onClose}
          ></div>

          {/* Modal Container */}
          <div className="relative inline-block w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl text-left align-middle bg-brand-cream border-4 border-brand-dark rounded-[20px] sm:rounded-[24px] shadow-[6px_6px_0px_#1A5415] sm:shadow-[8px_8px_0px_#1A5415] z-10 my-8 animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-5 md:-right-5 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-light rounded-full md:rounded-2xl border-2 sm:border-4 border-brand-dark shadow-[2px_2px_0px_#1A5415] md:shadow-[4px_4px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] hover:bg-brand-primary transition-all z-[80] cursor-pointer"
            >
              <X size={20} className="text-brand-dark md:w-6 md:h-6" strokeWidth={3} />
            </button>

            {/* Modal Body */}
            <div className="p-5 sm:p-8 md:p-10 w-full">
              {waitlistStatus === "success" ? (
                /* Success State */
                <div className="text-center py-6 sm:py-10 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-brand-primary border-4 border-brand-dark rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415]">
                    <Sparkles size={32} className="text-brand-dark md:w-12 md:h-12" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-brand-dark mb-3 sm:mb-4 md:mb-5">You're on the list!</h3>
                  <p className="text-base sm:text-lg md:text-xl font-bold font-sans text-brand-dark/80 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                    Keep an eye on your inbox. We'll let you know as soon as we start hosting <strong className="text-brand-dark">real-life meetups</strong> in your area.
                  </p>
                  <button 
                    onClick={onClose}
                    className="w-full bg-brand-light text-brand-dark font-black text-lg sm:text-xl md:text-2xl py-3.5 sm:py-4 md:py-5 rounded-xl md:rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] md:hover:shadow-[8px_8px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all cursor-pointer"
                  >
                    Awesome, Thanks!
                  </button>
                </div>
              ) : (
                /* Form State */
                <>
                  <div className="mb-5 sm:mb-6 md:mb-8 pr-6 sm:pr-8">
                    <div className="inline-block bg-brand-primary px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-md border-2 border-brand-dark font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-wide mb-3 sm:mb-4 md:mb-5 -rotate-2 shadow-[2px_2px_0px_#1A5415]">
                      Log Off. Show Up. Belong.
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-brand-dark mb-2 sm:mb-3 md:mb-4 leading-tight">
                      Join The Movement
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-bold font-sans text-brand-dark/80 leading-snug">
                      We're bringing real connection back to Ottawa. Tell us your neighborhood!
                    </p>
                  </div>

                  {/* Dynamic Error State matching brutalist theme */}
                  {errorMessage && (
                    <div className="mb-5 p-3.5 bg-red-100 border-4 border-brand-dark rounded-xl font-bold text-red-600 shadow-[4px_4px_0px_#1A5415] text-sm md:text-base animate-in slide-in-from-top-2">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleWaitlistSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 pb-2 w-full">
                    {/* Email Field */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="email" className="block font-black text-brand-dark text-xs sm:text-sm md:text-base uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 text-brand-dark/50 group-focus-within:text-brand-dark transition-colors md:w-6 md:h-6 z-10" size={20} strokeWidth={2.5} />
                        <input 
                          type="email" 
                          id="email" 
                          required
                          placeholder="you@example.com"
                          className="w-full relative z-0 pl-10 sm:pl-12 md:pl-14 pr-4 py-3 sm:py-3.5 md:py-4 bg-brand-light border-4 border-brand-dark rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-xl text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-0 focus:bg-white transition-colors shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] focus:shadow-[2px_2px_0px_#1A5415] focus:translate-y-[2px]"
                        />
                      </div>
                    </div>

                    {/* Pop-Upward Custom Dropdown (Floats over email input to stay inside modal) */}
                    <div className="space-y-1.5 sm:space-y-2 relative" ref={dropdownRef}>
                      <label className="block font-black text-brand-dark text-xs sm:text-sm md:text-base uppercase tracking-wide">
                        Your Ottawa Area
                      </label>
                      <div className="relative">
                        {/* Hidden input - Removed native HTML 'required' to prevent browser focus crashes on hidden inputs, validation is manual */}
                        <input type="text" value={selectedArea} className="absolute opacity-0 w-0 h-0 pointer-events-none" readOnly />

                        {/* Dropdown Options List (Pops UPWARDS over the email field) */}
                        {isDropdownOpen && (
                          <div className="absolute z-[70] left-0 right-0 bottom-[calc(100%-4px)] bg-white border-4 border-brand-dark rounded-t-xl md:rounded-t-2xl border-b-0 shadow-[4px_0px_0px_#1A5415] md:shadow-[6px_0px_0px_#1A5415] max-h-[180px] sm:max-h-[220px] overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-2 duration-200">
                            <ul className="flex flex-col">
                              {OTTAWA_AREAS.map((area) => (
                                <li key={area.id}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedArea(area.id);
                                      setIsDropdownOpen(false);
                                      setErrorMessage(""); // clear errors upon selecting area
                                    }}
                                    className={`w-full cursor-pointer flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 transition-all duration-200 focus:outline-none text-left font-bold text-sm sm:text-base md:text-lg border-b-2 border-brand-dark/10 last:border-b-0
                                      ${selectedArea === area.id 
                                        ? "bg-brand-primary/30 text-brand-dark pl-5 md:pl-8" 
                                        : "text-brand-dark/80 hover:bg-brand-primary hover:text-brand-dark hover:pl-6 md:hover:pl-8 focus:bg-brand-primary focus:pl-6 md:focus:pl-8"
                                      }`}
                                  >
                                    <span className="truncate pr-4">{area.label}</span>
                                    {selectedArea === area.id && (
                                      <Check size={18} strokeWidth={3} className="text-brand-dark shrink-0 md:w-6 md:h-6" />
                                    )}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Dropdown Toggle Button */}
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full relative z-20 cursor-pointer flex items-center justify-between pl-10 sm:pl-12 md:pl-14 pr-4 py-3 sm:py-3.5 md:py-4 border-4 border-brand-dark font-bold text-base sm:text-lg md:text-xl transition-all ${
                            isDropdownOpen 
                              ? "bg-white rounded-b-xl md:rounded-b-2xl border-t-transparent shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415]" 
                              : "bg-brand-light rounded-xl md:rounded-2xl shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1A5415] md:hover:shadow-[8px_8px_0px_#1A5415]"
                          } ${selectedArea ? "text-brand-dark" : "text-brand-dark/50"}`}
                        >
                          <MapPin className={`absolute left-3.5 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 transition-colors md:w-6 md:h-6 ${isDropdownOpen || selectedArea ? "text-brand-dark" : "text-brand-dark/50"}`} size={20} strokeWidth={2.5} />
                          
                          <span className="truncate pr-2 text-left w-full">
                            {selectedArea ? OTTAWA_AREAS.find(a => a.id === selectedArea)?.label : "Select neighborhood..."}
                          </span>
                          
                          <ChevronDown 
                            className={`transition-transform duration-300 text-brand-dark shrink-0 md:w-6 md:h-6 ${isDropdownOpen ? "rotate-180" : ""}`} 
                            size={20} 
                            strokeWidth={3} 
                          />
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 sm:pt-5 md:pt-6">
                      <button 
                        type="submit" 
                        disabled={waitlistStatus === "submitting"}
                        className="w-full bg-brand-primary text-brand-dark font-black text-lg sm:text-xl md:text-2xl py-3.5 sm:py-4 md:py-5 rounded-xl md:rounded-2xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] md:shadow-[6px_6px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] md:hover:shadow-[8px_8px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all flex justify-center items-center gap-3 cursor-pointer disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:translate-y-0 disabled:shadow-[4px_4px_0px_#1A5415] md:disabled:shadow-[6px_6px_0px_#1A5415] disabled:cursor-not-allowed group"
                      >
                        {waitlistStatus === "submitting" ? (
                          "Submitting..."
                        ) : (
                          <>Count Me In <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-1 transition-transform md:w-7 md:h-7" /></>
                        )}
                      </button>
                      <p className="text-xs sm:text-sm md:text-base font-bold text-center text-brand-dark/60 pt-3 sm:pt-4 md:pt-5">
                        No algorithms. No spam. Just real human connection.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for custom scrollbar within this component scope */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(26, 84, 21, 0.4);
          border-radius: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #1A5415;
        }
      `}} />
    </>
  );
}