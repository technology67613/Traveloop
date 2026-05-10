"use client";

import React, { useState } from "react";
import { Share2, Lock, Globe, Copy, Check, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ShareDialogProps {
  tripId: string;
  isPublic: boolean;
  onClose: () => void;
}

export const ShareDialog = ({ tripId, isPublic, onClose }: ShareDialogProps) => {
  const [isCurrentlyPublic, setIsCurrentlyPublic] = useState(isPublic);
  const [copied, setCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/trips/${tripId}/view`;

  const togglePrivacy = async () => {
    const { error } = await supabase
      .from("trips")
      .update({ is_public: !isCurrentlyPublic })
      .eq("id", tripId);

    if (!error) {
      setIsCurrentlyPublic(!isCurrentlyPublic);
      toast.success(`Trip is now ${!isCurrentlyPublic ? 'Public' : 'Private'}`);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-3xl">
              <Share2 size={28} />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Share Trip</h2>
          <p className="text-slate-500 font-medium mb-8">Control who can view your itinerary.</p>

          <div className="space-y-4">
            <button
              onClick={togglePrivacy}
              className={`w-full flex items-center p-6 rounded-3xl border-2 transition-all text-left ${
                isCurrentlyPublic 
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" 
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
              }`}
            >
              <div className={`p-3 rounded-2xl mr-4 ${isCurrentlyPublic ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                <Globe size={20} />
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-900 dark:text-white">Public Access</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Anyone with the link can view</p>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${isCurrentlyPublic ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isCurrentlyPublic ? "left-7" : "left-1"}`} />
              </div>
            </button>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Itinerary Link</p>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-medium text-slate-500 truncate"
                />
                <button
                  onClick={copyLink}
                  className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:scale-105 transition-transform"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Shield size={14} className="mr-2" /> End-to-end Encrypted
          </div>
        </div>
      </motion.div>
    </div>
  );
};
