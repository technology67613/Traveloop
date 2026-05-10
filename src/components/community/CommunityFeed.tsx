"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trip } from "@/types/trip";
import { TripCard } from "../dashboard/TripCard";
import { Loader2, Compass, Users } from "lucide-react";
import { motion } from "framer-motion";

export const CommunityFeed = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicTrips = async () => {
      const { data } = await supabase
        .from("trips")
        .select("*")
        .eq("is_public", true)
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });
      
      setTrips(data || []);
      setLoading(false);
    };
    fetchPublicTrips();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center py-20">
      <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Curating Feed...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <Compass size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Global Itineraries</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Discover where others are going</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
          <Users size={16} />
          <span>{trips.length} Public Plans</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {trips.map((trip, idx) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <TripCard trip={trip} />
          </motion.div>
        ))}
      </div>

      {trips.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 italic">No public itineraries yet. Be the first to share one!</p>
        </div>
      )}
    </div>
  );
};
