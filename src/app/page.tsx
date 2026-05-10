import React from "react";
import Link from "next/link";
import { Compass, Map, Shield, Zap, ArrowRight, Star, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next-Gen Travel Planning is Here
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-8">
            Your Perfect Trip,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 animate-gradient">Reimagined.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 font-medium leading-relaxed">
            Consolidate your fragmented travel plans into one unified, stunning interface. Build itineraries, track budgets, and share memories effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center"
            >
              Get Started for Free <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-20 relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=2000" 
              alt="Dashboard Preview"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-8 text-white/60">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">10k+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Trips Planned</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">4.9/5</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">User Rating</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">50+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Features</h2>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Everything you need in one place.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl w-fit mb-6">
                <Compass size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Smart Itineraries</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Drag-and-drop activities and let our AI optimize your daily schedule.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl w-fit mb-6">
                <Globe size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Community Feed</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Discover public itineraries from top travelers and copy them with one click.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              <div className="p-4 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl w-fit mb-6">
                <Shield size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Budget Security</h4>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Real-time budget tracking with multi-currency support and expense logging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] -z-1" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready for your next<br />big adventure?</h2>
            <Link
              href="/register"
              className="inline-flex items-center px-12 py-5 bg-white text-blue-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl"
            >
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">© 2024 Traveloop. All rights reserved.</p>
      </footer>
    </div>
  );
}
