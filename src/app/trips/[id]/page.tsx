"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trip, TripStop } from "@/types/trip";
import { TripHeader } from "@/components/itinerary/TripHeader";
import { ItineraryTimeline } from "@/components/itinerary/ItineraryTimeline";
import { Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TripDetailsPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<TripStop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripDetails = async () => {
      const { data: tripData, error: tripError } = await supabase
        .from("trips")
        .select("*")
        .eq("id", id)
        .single();

      if (tripError) {
        console.error("Trip fetch error:", tripError);
        return;
      }

      const { data: stopData } = await supabase
        .from("trip_stops")
        .select("*")
        .eq("trip_id", id)
        .order("order_index", { ascending: true });

      setTrip(tripData);
      setStops(stopData || []);
      setLoading(false);
    };

    if (id) fetchTripDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 size={48} className="text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold animate-pulse">Designing your itinerary...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Trip not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/trips"
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to My Journeys
        </Link>
        
        <TripHeader trip={trip} />
        <ItineraryTimeline 
          trip={trip} 
          stops={stops} 
          activities={[]} // I'll hook up real activities in M6
        />
      </div>
    </main>
  );
}
