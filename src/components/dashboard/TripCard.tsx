"use client";

import React from "react";
import { Trip } from "@/types/trip";
import { Calendar, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface TripCardProps {
  trip: Trip;
}

export const TripCard = ({ trip }: TripCardProps) => {
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={trip.cover_image_url || "/placeholder-trip.jpg"}
          alt={trip.name}
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400">
          {trip.invoice_status === 'paid' ? 'Completed' : 'Upcoming'}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
          {trip.name}
        </h3>
        
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Calendar size={16} className="mr-2 text-blue-500" />
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </div>
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <DollarSign size={16} className="mr-2 text-emerald-500" />
            Budget: ${trip.total_budget?.toLocaleString() || "0"}
          </div>
        </div>

        <Link
          href={`/trips/${trip.id}`}
          className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-900 dark:text-white text-center rounded-xl font-semibold transition-colors mt-auto"
        >
          View Itinerary
        </Link>
      </div>
    </motion.div>
  );
};
