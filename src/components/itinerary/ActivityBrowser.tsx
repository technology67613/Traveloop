"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2, MapPin, Plus, X, Utensils, Camera, ShoppingBag, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

interface ActivityBrowserProps {
  city: string;
  onAdd: (activity: any) => void;
  onClose: () => void;
}

const categories = [
  { id: "sightseeing", icon: Camera, label: "Sights" },
  { id: "dining", icon: Utensils, label: "Food" },
  { id: "shopping", icon: ShoppingBag, label: "Shop" },
  { id: "museum", icon: Landmark, label: "Museums" },
];

export const ActivityBrowser = ({ city, onAdd, onClose }: ActivityBrowserProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [activeCategory, setActiveCategory] = useState("sightseeing");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/activities/search?city=${encodeURIComponent(city)}&query=${encodeURIComponent(
            debouncedQuery || activeCategory
          )}`
        );
        const data = await res.json();
        setActivities(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [city, debouncedQuery, activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-white dark:bg-slate-950 z-[100] shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
    >
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Discover Activities</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{city}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search attractions, restaurants..."
            className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-1 flex flex-col items-center p-3 rounded-2xl transition-all border ${
                activeCategory === cat.id
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-400"
              }`}
            >
              <cat.icon size={18} className="mb-1" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center py-12">
              <Loader2 size={32} className="text-blue-600 animate-spin mb-4" />
              <p className="text-xs text-slate-500 font-bold uppercase">Scanning local venues...</p>
            </div>
          ) : activities.length > 0 ? (
            activities.map((activity: any, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-all group"
              >
                <div className="flex gap-4">
                  {activity.imageUrl ? (
                    <img
                      src={activity.imageUrl}
                      alt={activity.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                      <Landmark size={24} className="text-slate-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase">{activity.category}</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">{activity.name}</h4>
                    <div className="flex items-center text-[10px] text-slate-500 mt-1">
                      <MapPin size={10} className="mr-1" /> {activity.address?.split(',')[0]}
                    </div>
                    <button
                      onClick={() => onAdd(activity)}
                      className="mt-3 w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-black hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center"
                    >
                      <Plus size={14} className="mr-1" /> Add to Day
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400 text-sm italic">No results found.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
