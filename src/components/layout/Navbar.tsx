"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map, Users, User, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Compass },
    { name: "My Trips", href: "/trips", icon: Map },
    { name: "Community", href: "/community", icon: Users },
    { name: "Explore", href: "/explore", icon: User },
  ];

  if (!user) return null;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl rounded-[2.5rem] px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-500/30">
            T
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Traveloop</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center space-x-2 ${
                  isActive 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/profile" className="hidden md:flex items-center space-x-3 group">
            <div className="text-right">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-none">{profile?.first_name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pro Member</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
              )}
            </div>
          </Link>

          <button className="md:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-0 w-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold"
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={() => signOut()}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
