"use client";

import React, { useEffect, useState } from "react";
import { Destination } from "@/types/trip";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

const mockDestinations: Destination[] = [
  { id: "1", name: "Tokyo", country: "Japan", imageUrl: "https://images.unsplash.com/photo-1540959733332-e94e1b389e7a?auto=format&fit=crop&q=80&w=800" },
  { id: "2", name: "Paris", country: "France", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800" },
  { id: "3", name: "Bali", country: "Indonesia", imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" },
  { id: "4", name: "New York", country: "USA", imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800" },
];

export const PopularDestinations = () => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Popular Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockDestinations.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-sm cursor-pointer"
          >
            <img
              src={dest.imageUrl}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center text-xs font-medium text-blue-300 mb-1">
                <MapPin size={12} className="mr-1" />
                {dest.country}
              </div>
              <h3 className="text-xl font-bold">{dest.name}</h3>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-bold flex items-center">
              <Star size={12} className="mr-1 text-yellow-400 fill-yellow-400" />
              4.9
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
