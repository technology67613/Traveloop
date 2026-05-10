"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2, Globe, TrendingUp } from "lucide-react";
import { CityCard } from "@/components/explore/CityCard";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchCities = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/cities/search?query=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    searchCities();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6"
          >
            Discover Your Next <span className="text-blue-600">Adventure</span>
          </motion.h1>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Search cities, countries, or regions..."
              className="w-full pl-16 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-blue-500/5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-bold">Scanning the globe...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map((city: any) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <div className="flex items-center space-x-2 mb-8">
                <TrendingUp size={24} className="text-blue-600" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Trending Destinations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Mock trending data */}
                {[
                  { id: "1", name: "Kyoto", country: "Japan" },
                  { id: "2", name: "Lisbon", country: "Portugal" },
                  { id: "3", name: "Reykjavik", country: "Iceland" },
                  { id: "4", name: "Florence", country: "Italy" },
                ].map((c) => <CityCard key={c.id} city={c} />)}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
