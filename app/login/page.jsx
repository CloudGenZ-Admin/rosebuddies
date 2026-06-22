"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Heart, Zap } from 'lucide-react';

// Firebase imports
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../lib/firebaseClient";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); 

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user && !data.user.profileCompleted) {
          router.push('/complete-profile');
        } else {
          router.push('/'); 
        }
      } else {
        setErrorMessage(data.error || "Invalid login credentials. Please try again.");
        setIsSubmitting(false);
      }
     } catch (error) {
      // Check if the user simply closed the popup or cancelled
      if (
        error.code === 'auth/popup-closed-by-user' || 
        error.code === 'auth/user-cancelled' ||
        error.code === 'auth/cancelled-popup-request'
      ) {
        console.log("Google login was cancelled by the user.");
        return; // Exit silently
      }

      console.error("Google Auth Error:", error);
      setErrorMessage("Network or authentication error. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Google Login Integration
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMessage("");
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      const response = await fetch('/api/auth/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseToken }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user && !data.user.profileCompleted) {
          router.push('/complete-profile');
        } else {
          router.push('/'); 
        }
      } else {
        setErrorMessage(data.error || "Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      // Ignore error if user just closed the popup
      if (error.code !== 'auth/popup-closed-by-user') {
        setErrorMessage("Network or authentication error. Please try again.");
      }
    } finally {
      setIsGoogleLoading(false);
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

        <div className="w-full max-w-5xl bg-brand-cream border-4 border-brand-dark rounded-[24px] lg:rounded-[32px] shadow-[8px_8px_0px_#1A5415] lg:shadow-[12px_12px_0px_#1A5415] relative z-10 flex flex-col lg:flex-row overflow-hidden animate-in zoom-in-95 duration-500">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-accent px-3 py-1.5 rounded-md border-2 border-brand-dark font-black text-xs sm:text-sm uppercase tracking-wide mb-6 -rotate-2 shadow-[2px_2px_0px_#1A5415]">
                <Zap size={14} className="fill-brand-dark text-brand-dark" />
                Welcome Back, Buddy
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-brand-dark mb-3 leading-tight">
                Log in to your account.
              </h1>
              <p className="text-base sm:text-lg font-bold font-sans text-brand-dark/80 mb-6">
                Ready to log off and show up?
              </p>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-100 border-4 border-brand-dark rounded-xl font-bold text-red-600 shadow-[4px_4px_0px_#1A5415] animate-in slide-in-from-top-2 duration-300">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="email" className="block font-black text-brand-dark text-xs sm:text-sm uppercase tracking-wide">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/50 group-focus-within:text-brand-lime-dark transition-colors" size={20} strokeWidth={2.5} />
                    <input 
                      type="email" id="email" required placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base sm:text-lg text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] focus:shadow-[2px_2px_0px_#1A5415] focus:translate-y-[2px] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block font-black text-brand-dark text-xs sm:text-sm uppercase tracking-wide">Password</label>
                    <Link href="/forgot-password" className="text-xs sm:text-sm font-bold text-brand-dark/70 hover:text-brand-lime-dark underline underline-offset-4 transition-colors">Forgot?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/50 group-focus-within:text-brand-lime-dark transition-colors" size={20} strokeWidth={2.5} />
                    <input 
                      type={showPassword ? "text" : "password"} id="password" required placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-brand-light border-4 border-brand-dark rounded-xl font-bold text-base sm:text-lg text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:border-brand-lime-dark shadow-[4px_4px_0px_#1A5415] focus:shadow-[2px_2px_0px_#1A5415] focus:translate-y-[2px] transition-all"
                    />
                    <button 
                      type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark/50 hover:text-brand-lime-dark transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={isSubmitting || isGoogleLoading} className="w-full bg-brand-primary text-brand-dark font-black text-lg sm:text-xl py-4 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group">
                    {isSubmitting ? "Logging in..." : <>Let's Go <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="h-1 flex-1 bg-brand-dark/10 rounded-full"></div>
                <span className="font-black text-brand-lemon-dark text-sm uppercase tracking-wider">Or</span>
                <div className="h-1 flex-1 bg-brand-dark/10 rounded-full"></div>
              </div>

              {/* Google Login Button */}
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting || isGoogleLoading}
                className="w-full bg-white text-brand-dark font-bold text-base sm:text-lg py-3.5 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1A5415] active:translate-y-[2px] active:shadow-[0px_0px_0px_#1A5415] transition-all flex justify-center items-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.73 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.68 17.54V20.25H19.24C21.32 18.33 22.56 15.56 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.24 20.25L15.68 17.54C14.72 18.18 13.47 18.59 12 18.59C9.15 18.59 6.74 16.66 5.88 14.07H2.21V16.92C4.01 20.49 7.72 23 12 23Z" fill="#34A853"/>
                  <path d="M5.88 14.07C5.66 13.41 5.54 12.72 5.54 12C5.54 11.28 5.66 10.59 5.88 9.93V7.08H2.21C1.46 8.57 1 10.24 1 12C1 13.76 1.46 15.43 2.21 16.92L5.88 14.07Z" fill="#FBBC05"/>
                  <path d="M12 5.41C13.62 5.41 15.07 5.97 16.21 7.05L19.33 3.93C17.45 2.18 14.97 1 12 1C7.72 1 4.01 3.51 2.21 7.08L5.88 9.93C6.74 7.34 9.15 5.41 12 5.41Z" fill="#EA4335"/>
                </svg>
                {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
              </button>
            </div>

            <div className="mt-8 text-center lg:hidden">
              <p className="font-bold text-brand-dark/80 text-sm sm:text-base">
                Don't have an account yet?{" "}
                <Link href="/signup" className="text-brand-dark font-black underline underline-offset-4 hover:text-brand-lime-dark transition-colors inline-flex items-center gap-1 group">
                  Create an account <Heart size={14} className="group-hover:fill-brand-lime-dark transition-colors" />
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex w-1/2 bg-brand-primary border-l-4 border-brand-dark p-12 flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-10 right-10 w-24 h-24 bg-brand-light rounded-full border-4 border-brand-dark opacity-50"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-accent rounded-tl-[80px] rounded-br-[80px] border-4 border-brand-dark opacity-60 rotate-12"></div>
            <Sparkles size={32} className="absolute top-1/4 left-16 text-brand-dark opacity-30" strokeWidth={2} />

            <div className="relative z-10 text-center max-w-sm flex flex-col items-center">
              <div className="w-24 h-24 bg-brand-cream rounded-full border-4 border-brand-dark shadow-[6px_6px_0px_#1A5415] flex items-center justify-center mb-8 rotate-[-10deg]">
                <Heart size={40} className="text-brand-lime-dark fill-brand-lime-dark" />
              </div>
              <h2 className="text-4xl xl:text-5xl font-black font-serif text-brand-dark mb-6 leading-tight">Real friends don't buffer.</h2>
              <p className="text-xl font-bold font-sans text-brand-dark/80 mb-10">
                Join thousands of people taking their social lives offline. No algorithms, just real human connection.
              </p>
              <div className="bg-brand-cream px-6 py-4 rounded-xl border-4 border-brand-dark shadow-[4px_4px_0px_#1A5415] -rotate-1">
                <p className="font-bold text-brand-dark text-base">
                  New here?{" "}
                  <Link href="/signup" className="text-brand-lime-dark font-black underline underline-offset-4 hover:text-brand-dark transition-colors inline-flex items-center gap-1">
                    Create an account <ArrowRight size={16} strokeWidth={3} />
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}