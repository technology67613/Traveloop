"use client";

import React from "react";
import { Trip, TripStop } from "@/types/trip";
import { Wallet, MapPin, Navigation, Info } from "lucide-react";
import { motion } from "framer-motion";

interface ItinerarySummaryProps {
  trip: Trip;
  stops: TripStop[];
}

export const ItinerarySummary = ({ trip, stops }: ItinerarySummaryProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Budget</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              ${trip.total_budget?.toLocaleString() || "0.00"}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Navigation size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Destinations</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {stops.length} Cities
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl">
            <Info size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {trip.invoice_status === 'paid' ? 'Finalized' : 'Drafting'}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
