"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trip, TripStop } from "@/types/trip";
import { TripHeader } from "@/components/itinerary/TripHeader";
import { ItinerarySummary } from "@/components/itinerary/ItinerarySummary";
import { ItineraryTimeline } from "@/components/itinerary/ItineraryTimeline";
import { Loader2, ChevronLeft, Printer } from "lucide-react";
import Link from "next/link";

export default function ItineraryViewPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<TripStop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripDetails = async () => {
      const { data: tripData } = await supabase
        .from("trips")
        .select("*")
        .eq("id", id)
        .single();

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

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!trip) return <div>Not found</div>;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Link 
            href={`/trips/${trip.id}`}
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Editor
          </Link>
          <button 
            onClick={() => window.print()}
            className="flex items-center px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all"
          >
            <Printer size={18} className="mr-2" />
            Print Itinerary
          </button>
        </div>
        
        <TripHeader trip={trip} />
        <ItinerarySummary trip={trip} stops={stops} />
        <ItineraryTimeline 
          trip={trip} 
          stops={stops} 
          activities={[]} 
        />
      </div>
    </main>
  );
}
