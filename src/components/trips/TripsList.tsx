"use client";

import React, { useEffect, useState } from "react";
import { Trip } from "@/types/trip";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { TripCard } from "../dashboard/TripCard";
import { Loader2, Plus, Filter } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const TripsList = () => {
  const { user } = useAuthStore();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) return;
      
      setLoading(true);
      let query = supabase
        .from("trips")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_deleted", false)
        .order("start_date", { ascending: true });

      if (filter === 'upcoming') {
        query = query.gte('start_date', new Date().toISOString().split('T')[0]);
      } else if (filter === 'past') {
        query = query.lt('start_date', new Date().toISOString().split('T')[0]);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching trips:", error);
      } else {
        setTrips(data || []);
      }
      setLoading(false);
    };

    fetchTrips();
  }, [user, filter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500">Loading your journeys...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {(['all', 'upcoming', 'past'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === f
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        <Link
          href="/trips/create"
          className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30"
        >
          <Plus size={20} className="mr-2" />
          New Trip
        </Link>
      </div>

      <AnimatePresence mode="popLayout">
        {trips.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {trips.map((trip) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800"
          >
            <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Filter size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No trips found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {filter === 'all' 
                ? "You haven't created any trips yet." 
                : `You don't have any ${filter} trips.`}
            </p>
            <Link
              href="/trips/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
            >
              Create Your First Trip
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
