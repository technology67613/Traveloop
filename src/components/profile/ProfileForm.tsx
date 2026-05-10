"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase";
import { User, Mail, MapPin, Camera, Save, Loader2, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const ProfileForm = () => {
  const { profile, setProfile, signOut } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    city: profile?.city || "",
    country: profile?.country || "",
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", profile?.id)
      .select()
      .single();

    if (!error) {
      setProfile(data);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center mb-10">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-purple-600 p-1">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[2.3rem] overflow-hidden flex items-center justify-center">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-slate-300" />
              )}
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 text-blue-600 hover:scale-110 transition-transform">
            <Camera size={20} />
          </button>
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
          {profile?.first_name} {profile?.last_name}
        </h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{profile?.email}</p>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">First Name</label>
          <input
            className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Last Name</label>
          <input
            className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">City</label>
          <input
            className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Country</label>
          <input
            className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => signOut()}
            className="flex items-center px-6 py-3 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
          >
            <LogOut size={20} className="mr-2" /> Sign Out
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save className="mr-2" size={20} />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
