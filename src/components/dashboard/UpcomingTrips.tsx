"use client";

import React, { useEffect, useState } from "react";
import { Trip } from "@/types/trip";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { TripCard } from "./TripCard";
import { Skeleton } from "@/components/ui/Skeleton"; // I'll create this
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const UpcomingTrips = () => {
  const { user } = useAuthStore();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_deleted", false)
        .order("start_date", { ascending: true })
        .limit(3);

      if (error) {
        console.error("Error fetching trips:", error);
      } else {
        setTrips(data || []);
      }
      setLoading(false);
    };

    fetchTrips();
  }, [user]);

  if (loading) {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Upcoming Trips</h2>
        <Link 
          href="/trips" 
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm font-semibold"
        >
          View all <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">No trips planned yet.</p>
          <Link
            href="/trips/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
          >
            Plan Your First Trip
          </Link>
        </div>
      )}
    </div>
  );
};
