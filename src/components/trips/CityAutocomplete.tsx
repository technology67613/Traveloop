"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce"; // I'll create this

interface City {
  id: string;
  name: string;
  country: string;
}

interface CityAutocompleteProps {
  onSelect: (city: City) => void;
  error?: string;
}

export const CityAutocomplete = ({ onSelect, error }: CityAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCities = async () => {
      if (debouncedQuery.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/cities/search?query=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        setResults(data.data || []);
        setIsOpen(true);
      } catch (err) {
        console.error("City search error:", err);
      } finally {
        setLoading(false);
      }
    };

    searchCities();
  }, [debouncedQuery]);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Destination City
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.length >= 3 && setIsOpen(true)}
          placeholder="Where are you going?"
          className={`block w-full pl-10 pr-3 py-2 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            error ? "border-red-500" : "border-slate-200 dark:border-slate-700"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
          >
            {results.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => {
                  onSelect(city);
                  setQuery(`${city.name}, ${city.country}`);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center transition-colors border-b last:border-0 border-slate-100 dark:border-slate-700"
              >
                <MapPin size={16} className="text-slate-400 mr-3 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{city.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{city.country}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
