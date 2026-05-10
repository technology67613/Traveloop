"use client";

import React from "react";
import { Trip } from "@/types/trip";
import { Calendar, MapPin, Share2, MoreVertical, Edit } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface TripHeaderProps {
  trip: Trip;
}

export const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="relative w-full h-[40vh] min-h-[300px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
      <img
        src={trip.cover_image_url || "/placeholder-trip.jpg"}
        alt={trip.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                {trip.invoice_status === 'paid' ? 'Completed' : 'Upcoming'}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Private Trip
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {trip.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2 text-blue-400" />
                <span className="font-medium">
                  {format(new Date(trip.start_date), "MMM d")} - {format(new Date(trip.end_date), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-rose-400" />
                <span className="font-medium">Multi-stop Itinerary</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-2xl transition-all border border-white/20">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-2xl transition-all border border-white/20">
              <Edit size={20} />
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all">
              Manage Budget
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
