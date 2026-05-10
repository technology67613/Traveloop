"use client";

import React, { useState } from "react";
import { Trip, TripStop } from "@/types/trip";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Clock, MapPin, Trash2, ChevronRight, MoreVertical } from "lucide-react";
import { format, addDays, differenceInDays } from "date-fns";

interface ItineraryTimelineProps {
  trip: Trip;
  stops: TripStop[];
  activities: any[];
}

export const ItineraryTimeline = ({ trip, stops, activities }: ItineraryTimelineProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const totalDays = differenceInDays(new Date(trip.end_date), new Date(trip.start_date)) + 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Day Selector Sidebar */}
      <div className="lg:col-span-1 space-y-2">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Journey Timeline</h3>
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 no-scrollbar">
          {Array.from({ length: totalDays }).map((_, i) => {
            const date = addDays(new Date(trip.start_date), i);
            const isSelected = selectedDay === i;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`flex-shrink-0 flex items-center p-3 rounded-2xl transition-all border ${
                  isSelected 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30" 
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center mr-3 ${
                  isSelected ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800"
                }`}>
                  <span className="text-[10px] font-bold uppercase">{format(date, "MMM")}</span>
                  <span className="text-lg font-black leading-none">{format(date, "d")}</span>
                </div>
                <div className="text-left">
                  <div className={`text-xs font-bold ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                    Day {i + 1}
                  </div>
                  <div className="font-bold whitespace-nowrap">{format(date, "EEEE")}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activities Content */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Day {selectedDay + 1} Plan
            </h2>
            <p className="text-slate-500 font-medium">
              {format(addDays(new Date(trip.start_date), selectedDay), "MMMM d, yyyy")}
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform text-sm">
            <Plus size={18} className="mr-2" />
            Add Activity
          </button>
        </div>

        <div className="relative space-y-6">
          <div className="absolute top-0 left-6 h-full w-0.5 bg-slate-200 dark:bg-slate-800" />
          
          <AnimatePresence mode="popLayout">
            {activities.length > 0 ? (
              activities.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-14"
                >
                  <div className="absolute top-0 left-4 w-4 h-4 rounded-full border-4 border-blue-600 bg-white dark:bg-slate-950 z-10" />
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      {activity.imageUrl && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <img src={activity.imageUrl} alt={activity.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                            {activity.category}
                          </span>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 truncate">{activity.name}</h4>
                        <div className="flex items-center text-xs text-slate-500 mt-2 gap-3">
                          <span className="flex items-center"><Clock size={12} className="mr-1" /> 10:00 AM</span>
                          <span className="flex items-center"><MapPin size={12} className="mr-1" /> {activity.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="pl-14 py-10">
                <p className="text-slate-400 italic">No activities planned for this day yet.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
