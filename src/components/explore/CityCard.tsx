"use client";

import React, { useEffect, useState } from "react";
import { MapPin, ArrowRight, Star, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CityCardProps {
  city: {
    id: string;
    name: string;
    country: string;
    region?: string;
  };
}

export const CityCard = ({ city }: CityCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images?query=${encodeURIComponent(city.name)}`);
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (err) {
        console.error("Image fetch error:", err);
      }
    };
    fetchImage();
  }, [city.name]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="relative h-56">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={city.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">
            <MapPin size={12} className="mr-1" />
            {city.country}
          </div>
          <h3 className="text-2xl font-black text-white">{city.name}</h3>
        </div>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
          {city.region || "Top Rated"}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-yellow-500">
            <Star size={16} className="fill-current mr-1" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.8</span>
            <span className="text-xs text-slate-400 font-medium ml-1">(2.1k reviews)</span>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            300+ Activities
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 text-sm flex items-center justify-center">
            <Plus size={18} className="mr-2" />
            Add to Trip
          </button>
          <Link
            href={`/explore/${city.id}`}
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
